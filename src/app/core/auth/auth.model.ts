export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'manager';
  tenantId: string;
  tenantName: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}
