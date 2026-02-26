import { type Company } from '../features/companies/models/company.model';

export const MOCK_COMPANIES: Company[] = [
  {
    id: 'c1',
    name: 'Acme Corp',
    employeeCount: 150,
    plan: 'enterprise',
    status: 'active',
    createdAt: '2025-06-01',
  },
  {
    id: 'c2',
    name: 'TechStart Inc',
    employeeCount: 45,
    plan: 'professional',
    status: 'active',
    createdAt: '2025-08-15',
  },
  {
    id: 'c3',
    name: 'GreenLeaf Solutions',
    employeeCount: 80,
    plan: 'starter',
    status: 'trial',
    createdAt: '2026-01-10',
  },
];
