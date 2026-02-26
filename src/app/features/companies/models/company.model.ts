export interface Company {
  id: string;
  name: string;
  logo?: string;
  employeeCount: number;
  plan: 'starter' | 'professional' | 'enterprise';
  status: 'active' | 'inactive' | 'trial';
  createdAt: string;
}
