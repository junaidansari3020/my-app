import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  let isLoggedIn = sessionStorage.getItem('statusCode');
 
  // if (isLoggedIn == '400') {
  //   router.navigate(['login']);
  //   return false;
  // }
 
  return true;
};
