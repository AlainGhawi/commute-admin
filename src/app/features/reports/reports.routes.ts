import { type Routes } from '@angular/router';

export const reportsRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/reports-page/reports-page').then((m) => m.ReportsPageComponent),
  },
];
