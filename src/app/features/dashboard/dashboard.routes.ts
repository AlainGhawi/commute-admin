import { type Routes } from '@angular/router';

export const dashboardRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/dashboard-page/dashboard-page').then(
        (m) => m.DashboardPageComponent
      ),
  },
];
