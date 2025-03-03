import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, switchMap, filter, take } from 'rxjs/operators';

import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let accessToken = localStorage.getItem('access_token');

    console.log("In interceptor!!")
    // Attach access token to request
    if (accessToken) {
      request = this.addToken(request, accessToken);
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log("Error in interceptor: ", error);
        if (error.status === 401 && !request.url.includes('/auth/login') && !request.url.includes('/auth/logout') && !request.url.includes('/auth/refresh')) {
          // Unauthorized error, attempt to refresh token
          return this.handle401Error(request, next);
        }
        return throwError(() => error);
      })
    );
  }

  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.authService.refreshToken().pipe(
        switchMap((token) => {
          if (token && token.access_token) {
            localStorage.setItem('access_token', token.access_token);
            this.refreshTokenSubject.next(token.access_token);
            return next.handle(this.addToken(request, token.access_token));
          }
          return throwError(() => new Error('No access token in refresh response'));
        }),
        catchError((err) => {
          // Logout user if refresh fails
          this.authService.logout();
          return throwError(() => err);
        }),
        switchMap(() => {
          this.isRefreshing = false;
          return this.refreshTokenSubject.pipe(filter(token => token !== null), take(1), switchMap(token => next.handle(this.addToken(request, token!))));
        })
      );
    } else {
      return this.refreshTokenSubject.pipe(
        filter(token => token !== null),
        take(1),
        switchMap(token => next.handle(this.addToken(request, token!)))
      );
    }
  }
}
