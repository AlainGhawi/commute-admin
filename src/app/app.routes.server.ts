import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'companies/:id',
    renderMode: RenderMode.Client,
  },
  {
    path: 'employees/:id',
    renderMode: RenderMode.Client,
  },
  {
    path: 'rides/:id',
    renderMode: RenderMode.Client,
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
