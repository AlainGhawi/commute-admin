export type UserRole = 'Employee' | 'Admin' | 'SuperAdmin';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  companyId: string;
  companyName?: string;
}

export interface MagicLinkRequest {
  email: string;
}

export interface MagicLinkResponse {
  sent: boolean;
}

export interface RedeemRequest {
  token: string;
}

export interface AuthTokenResponse {
  accessToken: string;
  expiresAt: string;
}
