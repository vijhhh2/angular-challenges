import { IsAuthorizedGuard } from '@angular-challenges/module-to-standalone/admin/shared';
import { provideToken } from '@angular-challenges/module-to-standalone/core/providers';
import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    providers: [provideToken('main-shell-token')],
    loadChildren: () => import('@angular-challenges/module-to-standalone/home'),
  },
  {
    path: 'admin',
    canActivate: [IsAuthorizedGuard],
    loadChildren: () =>
      import('@angular-challenges/module-to-standalone/admin/feature'),
  },
  {
    path: 'user',
    providers: [provideToken('user-shell-token')],
    loadChildren: () =>
      import('@angular-challenges/module-to-standalone/user/shell'),
  },

  {
    path: 'forbidden',
    loadChildren: () =>
      import('@angular-challenges/module-to-standalone/forbidden'),
  },
];

export default appRoutes;
