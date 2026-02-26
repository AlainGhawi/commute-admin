import { type Routes } from '@angular/router';

export const ridesRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/ride-list/ride-list').then((m) => m.RideListComponent),
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./components/ride-detail/ride-detail').then((m) => m.RideDetailComponent),
  },
];
