import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const guestGuard: CanActivateFn = (route) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const user = authService.currentUser;

  const childPath = route.firstChild?.url.map((s) => s.path).join('/') ?? '';

  if (user?.isGuest && childPath === 'register') {
    return true;
  }

  if (authService.isLoggedIn) {
    router.navigate(['/dashboard']);
    return false;
  }

  return true;
};
