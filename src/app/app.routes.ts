import { type Routes } from '@angular/router';
import { authGuard } from './core/auth/auth.guard';
import { AdminShellComponent } from './shared/components/admin-shell/admin-shell';

export const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./features/login/login.routes').then((m) => m.loginRoutes),
  },
  {
    path: '',
    component: AdminShellComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./features/dashboard/dashboard.routes').then((m) => m.dashboardRoutes),
      },
      {
        path: 'companies',
        loadChildren: () =>
          import('./features/companies/companies.routes').then((m) => m.companiesRoutes),
      },
      {
        path: 'employees',
        loadChildren: () =>
          import('./features/employees/employees.routes').then((m) => m.employeesRoutes),
      },
      {
        path: 'rides',
        loadChildren: () =>
          import('./features/rides/rides.routes').then((m) => m.ridesRoutes),
      },
      {
        path: 'reports',
        loadChildren: () =>
          import('./features/reports/reports.routes').then((m) => m.reportsRoutes),
      },
      {
        path: 'settings',
        loadChildren: () =>
          import('./features/settings/settings.routes').then((m) => m.settingsRoutes),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
