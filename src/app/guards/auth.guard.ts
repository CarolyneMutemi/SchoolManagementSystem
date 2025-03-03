import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { tap, map, take } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService); // Inject AuthService
  if (authService.userAuthenticated()) {
    console.log("User is authenticated - in auth guard");
    if (authService.getUserProfile()){
      console.log("User profile is already set - continuing.");
      return of(true);
    }
    return authService.fetchUserProfile().pipe(
      take(1),
      map(user => {
        console.log("User in auth guard: ", user);
        if (user) {
          console.log("User is authenticated - continuing.");
          return true;
        } else {
          console.log("User is not authenticated - logging out.");
          authService.logout();
          return false;
        }
      })
    );
  } else {
    console.log("User is not authenticated - logging out.");
    authService.logout();
    return of(false);
  }
};
