import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.routes').then((m) => m.AUTH_ROUTES),
  },
  {
    path: 'overview',
    loadComponent: () =>
      import('./features/dashboard/overview.component').then((m) => m.OverviewComponent),
    canActivate: [authGuard],
  },
  { path: '**', redirectTo: '/' },
];
