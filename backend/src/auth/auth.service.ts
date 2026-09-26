import { Injectable, UnauthorizedException, BadRequestException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as argon2 from 'argon2';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto): Promise<{ access_token: string; user: Omit<User, 'passwordHash'> }> {
    if (dto.password !== dto.confirmPassword) {
      throw new BadRequestException('Passwords do not match');
    }

    const existing = await this.userService.findByEmail(dto.email);
    if (existing) {
      throw new ConflictException('Email already registered');
    }

    const user = await this.userService.create({
      name: dto.name,
      email: dto.email,
      password: dto.password,
    });

    const token = this.signToken(user);
    const { passwordHash, ...safeUser } = user;

    return { access_token: token, user: safeUser as Omit<User, 'passwordHash'> };
  }

  async login(dto: LoginDto): Promise<{ access_token: string; user: Omit<User, 'passwordHash'> }> {
    const user = await this.userService.findByEmail(dto.email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const valid = await argon2.verify(user.passwordHash, dto.password);
    if (!valid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = this.signToken(user);
    const { passwordHash, ...safeUser } = user;

    return { access_token: token, user: safeUser as Omit<User, 'passwordHash'> };
  }

  async getMe(userId: number): Promise<Omit<User, 'passwordHash'> | null> {
    const user = await this.userService.findOne(userId);
    if (!user) return null;
    const { passwordHash, ...safeUser } = user;
    return safeUser as Omit<User, 'passwordHash'>;
  }

  private signToken(user: User): string {
    return this.jwtService.sign({ sub: user.id, email: user.email, role: user.role });
  }
}
