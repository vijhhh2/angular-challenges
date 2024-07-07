import { Routes } from '@angular/router';
import { hasRole, isAdmin } from './guards/enter.guard';

export const APP_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'no-user',
    loadComponent: () => import('./dashboard/no-user.component'),
  },
  {
    path: 'enter',
    canMatch: [() => isAdmin()],
    loadComponent: () => import('./dashboard/admin.component'),
  },
  {
    path: 'enter',
    canMatch: [() => hasRole(['MANAGER'])],
    loadComponent: () => import('./dashboard/manager.component'),
  },
  {
    path: 'enter',
    canMatch: [() => hasRole(['WRITER', 'READER'])],
    loadComponent: () => import('./dashboard/writer-reader.component'),
  },
  {
    path: 'enter',
    canMatch: [() => hasRole(['CLIENT'])],
    loadComponent: () => import('./dashboard/client.component'),
  },
  {
    path: 'enter',
    loadComponent: () => import('./dashboard/everyone.component'),
  },
];
