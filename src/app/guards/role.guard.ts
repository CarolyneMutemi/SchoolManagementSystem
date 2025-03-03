import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const roleGuard: CanActivateFn = (route, state) => {
  const router = inject(Router); // Inject Router
  const authService = inject(AuthService); // Inject AuthService

  const expectedRoles: string[] = route.data["roles"];
  let userRole = '';

  authService.role$.subscribe((role) => {
    console.log("Guard - User role: ", role);
    userRole = role;
  });

  if (userRole && expectedRoles.includes(userRole)) {
    return true;
  }

  console.log("User is not authorized - logging out, in role guard.");
  authService.logout();
  return false;
};
