import { type Routes } from '@angular/router';

export const settingsRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/settings-page/settings-page').then((m) => m.SettingsPageComponent),
  },
];
