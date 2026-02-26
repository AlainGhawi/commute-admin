export interface Employee {
  id: string;
  name: string;
  email: string;
  role: 'rider' | 'driver' | 'both';
  homeZone: string;
  status: 'active' | 'inactive';
  companyId: string;
  joinedAt: string;
}
