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
  {
    path: 'scenarios',
    loadComponent: () =>
      import('./features/scenarios/scenario-list/scenario-list.component').then(
        (m) => m.ScenarioListComponent,
      ),
    canActivate: [authGuard],
  },
  {
    path: 'scenarios/new',
    loadComponent: () =>
      import('./features/scenarios/scenario-create/scenario-create.component').then(
        (m) => m.ScenarioCreateComponent,
      ),
    canActivate: [authGuard],
  },
  {
    path: 'scenarios/:id',
    loadComponent: () =>
      import('./features/scenarios/scenario-detail/scenario-detail.component').then(
        (m) => m.ScenarioDetailComponent,
      ),
    canActivate: [authGuard],
  },
  { path: '**', redirectTo: '/' },
];
