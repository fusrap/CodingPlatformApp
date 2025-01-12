import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const email = sessionStorage.getItem('email');
  const role = sessionStorage.getItem('role');

  if (!email) {
    router.navigate(['login']);
    return false;
  }

  const requiredRole = route.data['role'];

  if (requiredRole && role !== requiredRole) {
    router.navigate(['unauthorized']);
    return false;
  }

  return true;
};




