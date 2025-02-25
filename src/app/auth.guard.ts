import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const isLoggedIn = sessionStorage.getItem('statusCode');

  if (isLoggedIn !== '200') { 
    router.navigate(['login']);
    return false;
  }

  return true;
};
