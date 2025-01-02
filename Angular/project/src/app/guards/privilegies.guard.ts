import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const privilegiesGuard: CanActivateFn = (route, state) => {
  if (sessionStorage.getItem('privilegies') === '2') {
    return true;
  } else {
    const router = inject(Router)
    return router.navigate(['home'])
  }
};
