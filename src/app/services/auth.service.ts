import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, tap, map, catchError, of, throwError } from 'rxjs';
import { JwtPayload, jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

import { LoginResponse, AccessToken } from '../interfaces/auth';
import { DecodedToken } from '../interfaces/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiURL = 'http://localhost:8000';
  private userSubject = new BehaviorSubject<any>(null);
  currentUser = this.userSubject.asObservable();

  private roleSubject = new BehaviorSubject<string>(this.getUserRoleFromToken());
  role$ = this.roleSubject.asObservable();

  constructor( private httpClient: HttpClient, private router: Router ) {
   }

  login( identifier: string, password: string ): Observable<LoginResponse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json'
    });
  
    const body = new HttpParams()
      .set('username', identifier)
      .set('password', password)

    return this.httpClient.post<LoginResponse>(`${this.apiURL}/auth/login`, body.toString(), { headers }).pipe(
      tap((response: LoginResponse) => {
        localStorage.setItem('access_token', response.access_token);
        localStorage.setItem('refresh_token', response.refresh_token);
        this.updateUserRole();
        this.fetchUserProfile().subscribe();
      }, error => {
        console.error(error);
      })
    );
  }

  fetchUserProfile(): Observable<any> {
    console.log("In fetch user profile.")
    if (this.userSubject.value) {
      console.log("User subject value exists.")
      return of(this.userSubject.value);
    }
    return this.httpClient.get(`${this.apiURL}/profile/me`).pipe(
      tap(user => {
        console.log("User fetched: ", user);
        this.userSubject.next(user);
      }),
      catchError(error => {
        console.error('Error fetching current user', error);
        return of(null);
      })
    )
  }

  getUserProfile(){
    return this.userSubject.value;
  }

  decodeToken(token: string): DecodedToken | null {
    if (!token) return null;
    try {
      return jwtDecode(token);
    } catch (error) {
      return null;
    }
  }

  private getUserRoleFromToken(): string {
    const access_token = localStorage.getItem('access_token');
    if (!access_token) return '';

    const decodedToken = this.decodeToken(access_token);
    return decodedToken?.role || '';
  }

  updateUserRole(): void {
    const newRole = this.getUserRoleFromToken();
    this.roleSubject.next(newRole); // Notify subscribers of the new role
  }

  userAuthenticated(): boolean {
    const storedAccessToken = localStorage.getItem('access_token');
    const storedRefreshToken = localStorage.getItem('refresh_token');
    return storedAccessToken !== null && storedRefreshToken!== null;
  }
  
  logout(): void {
    console.log("Logging out user - in service.");
  
    this.httpClient.post(`${this.apiURL}/auth/logout`, {}).subscribe({
      next: (response) => {
        console.log("User logged out - in service.");
        console.log(`response: ${response}`);
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        this.userSubject.next(null);
        this.router.navigate(['/login']); // Navigate after successful logout
      },
      error: (error) => {
        console.error('Error logging out', error);
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        this.userSubject.next(null);
        this.router.navigate(['/login']); // Navigate even if logout API fails
      }
    });
  }
  

  accessTokenExpired(): boolean {
    const storedJWT = localStorage.getItem('access_token');
    if (!storedJWT) {
      return true;
    }
  
    const decodedToken = jwtDecode<JwtPayload>(storedJWT);
    if (!decodedToken.exp) {
      return true;
    }
    return decodedToken.exp < Date.now() / 1000;
  }

  refreshToken(): Observable<AccessToken> {
    const refreshToken = localStorage.getItem('refresh_token');
    if (!refreshToken) {
      return new Observable<AccessToken>();
    }
  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${refreshToken}`
    });
  
    return this.httpClient.post<AccessToken>(`${this.apiURL}/auth/refresh`, { refresh_token: refreshToken }).pipe(
      tap((response: AccessToken) => {
        localStorage.setItem('access_token', response.access_token);
      }, error => {
        console.error('Error refreshing token', error);
        this.userSubject.next(null);
        this.router.navigate(['/login']);
      })
    );
  }
}
