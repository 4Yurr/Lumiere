# Lumiere Backend

This is the backend for the **Lumiere** project, built with **NestJS**, **TypeScript**, **Prisma**, and **PostgreSQL**.

## Getting Started

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env   # edit with your DB credentials

# Generate Prisma client
npm run prisma:generate

# Run migrations (development)
npm run prisma:migrate

# Start the development server
npm run start:dev
```

## Project Structure

```
backend/
├─ src/
│  ├─ app.module.ts
│  ├─ main.ts
│  ├─ prisma/
│  │  ├─ prisma.module.ts
│  │  └─ prisma.service.ts
│  └─ user/
│     ├─ dto/
│     │   └─ create-user.dto.ts
│     ├─ user.controller.ts
│     ├─ user.module.ts
│     └─ user.service.ts
├─ prisma/
│  ├─ schema.prisma
│  └─ .gitignore
├─ .env.example
├─ package.json
├─ tsconfig.json
├─ Dockerfile
└─ docker-compose.yml
```
