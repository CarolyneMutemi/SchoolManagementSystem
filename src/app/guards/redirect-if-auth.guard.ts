import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';

import { AuthService } from '../services/auth.service';

export const redirectIfAuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService); // Inject AuthService
  const router = inject(Router); // Inject Router

    if (!authService.userAuthenticated()) {
      console.log("User is not authenticated - in guard");
      return true;
    }
    console.log("User is authenticated - in guard");
    router.navigate(['/']);
    return false;
};
