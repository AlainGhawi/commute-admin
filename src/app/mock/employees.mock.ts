import { type Employee } from '../features/employees/models/employee.model';

export const MOCK_EMPLOYEES: Employee[] = [
  {
    id: 'e1',
    name: 'Alice Martin',
    email: 'alice.martin@acme.com',
    role: 'both',
    homeZone: 'Plateau Mont-Royal',
    status: 'active',
    companyId: 'c1',
    joinedAt: '2025-06-15',
  },
  {
    id: 'e2',
    name: 'Bob Tremblay',
    email: 'bob.tremblay@acme.com',
    role: 'driver',
    homeZone: 'Laval',
    status: 'active',
    companyId: 'c1',
    joinedAt: '2025-07-01',
  },
  {
    id: 'e3',
    name: 'Clara Dubois',
    email: 'clara.dubois@techstart.com',
    role: 'rider',
    homeZone: 'Verdun',
    status: 'active',
    companyId: 'c2',
    joinedAt: '2025-09-01',
  },
  {
    id: 'e4',
    name: 'David Chen',
    email: 'david.chen@greenleaf.com',
    role: 'both',
    homeZone: 'NDG',
    status: 'inactive',
    companyId: 'c3',
    joinedAt: '2026-01-20',
  },
];
