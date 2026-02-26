import { type Routes } from '@angular/router';

export const employeesRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/employee-list/employee-list').then((m) => m.EmployeeListComponent),
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./components/employee-detail/employee-detail').then(
        (m) => m.EmployeeDetailComponent
      ),
  },
];
