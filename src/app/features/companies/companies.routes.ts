import { type Routes } from '@angular/router';

export const companiesRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/company-list/company-list').then((m) => m.CompanyListComponent),
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./components/company-detail/company-detail').then((m) => m.CompanyDetailComponent),
  },
];
