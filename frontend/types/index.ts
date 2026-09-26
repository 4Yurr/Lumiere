export type Role = 'USER' | 'ADMIN';
export type UserStatus = 'ACTIVE' | 'INACTIVE' | 'BANNED';
export type CategoryType = 'INVITATION' | 'PHOTOGRAPHER';
export type CategoryStatus = 'ACTIVE' | 'INACTIVE';
export type TemplateStatus = 'ACTIVE' | 'INACTIVE';
export type InvitationStatus = 'DRAFT' | 'PENDING_PAYMENT' | 'ACTIVE' | 'EXPIRED' | 'DISABLED';
export type OrderStatus = 'PENDING' | 'PAID' | 'FAILED' | 'EXPIRED' | 'CANCELLED';
export type PaymentStatus = 'PENDING' | 'PAID' | 'FAILED' | 'EXPIRED' | 'CANCELLED';
export type PhotographerStatus = 'ACTIVE' | 'INACTIVE';

export interface User {
  id: number;
  name: string;
  email: string;
  role: Role;
  status: UserStatus;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: number;
  name: string;
  type: CategoryType;
  status: CategoryStatus;
  createdAt?: string;
  updatedAt?: string;
  _count?: {
    templates?: number;
    photographers?: number;
  };
}

export interface Template {
  id: number;
  categoryId: number;
  name: string;
  slug: string;
  description: string | null;
  thumbnail: string | null;
  price: number;
  templateData: any;
  status: TemplateStatus;
  createdAt?: string;
  updatedAt?: string;
  category?: Category;
}

export interface InvitationData {
  title?: string;
  subtitle?: string;
  // Wedding
  groom?: {
    name: string;
    parents?: string;
    photo?: string;
    instagram?: string;
  };
  bride?: {
    name: string;
    parents?: string;
    photo?: string;
    instagram?: string;
  };
  event?: {
    date: string;
    time: string;
    venue: string;
    address?: string;
  };
  reception?: {
    date: string;
    time: string;
    venue: string;
    address?: string;
  };
  mapsUrl?: string;
  story?: string;
  gallery?: string[];
  rsvp?: {
    enabled?: boolean;
    whatsappTarget?: string;
  };
  gift?: {
    bankName?: string;
    accountNumber?: string;
    accountHolder?: string;
  };
  musicUrl?: string;
  // Mahasiswa / Event
  graduate?: {
    name: string;
    university: string;
    faculty: string;
    degree: string;
    photo?: string;
  };
  notes?: string;
}

export interface Invitation {
  id: number;
  userId: number;
  templateId: number;
  slug: string;
  data: InvitationData;
  status: InvitationStatus;
  createdAt: string;
  updatedAt: string;
  user?: User;
  template?: Template;
  orders?: Order[];
}

export interface Order {
  id: number;
  userId: number;
  invitationId: number;
  amount: number;
  status: OrderStatus;
  paymentReference: string | null;
  createdAt: string;
  updatedAt: string;
  user?: User;
  invitation?: Invitation;
  payments?: Payment[];
}

export interface Payment {
  id: number;
  orderId: number;
  provider: string;
  transactionId: string | null;
  amount: number;
  status: PaymentStatus;
  paidAt: string | null;
  rawResponse?: any;
  createdAt: string;
  updatedAt: string;
  order?: Order;
}

export interface Photographer {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  location: string | null;
  whatsapp: string | null;
  categoryId: number;
  startingPrice: number | null;
  profileImage: string | null;
  status: PhotographerStatus;
  createdAt?: string;
  updatedAt?: string;
  category?: Category;
  portfolios?: PhotographerPortfolio[];
}

export interface PhotographerPortfolio {
  id: number;
  photographerId: number;
  imageUrl: string;
  title: string | null;
  sortOrder: number | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthResponse {
  access_token: string;
  user: User;
}
