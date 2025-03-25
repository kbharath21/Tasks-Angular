import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/users';
  private tokenKey = 'ecommerce_auth_token';
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(
    private http: HttpClient,
    private router: Router,
    private jwtHelper: JwtHelperService
  ) {
    const storedUser = localStorage.getItem(this.tokenKey);
    this.currentUserSubject = new BehaviorSubject<any>(
      storedUser ? JSON.parse(storedUser) : null
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue() {
    return this.currentUserSubject.value;
  }

// auth.service.ts
register(user: { email: string; password: string; name?: string }) {
  return this.http.post(`${this.apiUrl}/users`, user).pipe(
    tap((response: any) => {
      // For demo purposes, we'll create a mock token
      const authData = {
        ...response,
        token: 'demo.jwt.token'
      };
      localStorage.setItem(this.tokenKey, JSON.stringify(authData));
      this.currentUserSubject.next(authData);
    })
  );
}

  login(email: string, password: string) {
    return this.http.post(`${this.apiUrl}/login`, { email, password }).pipe(
      tap((response: any) => {
        if (response.token) {
          this.storeAuthData(response);
        }
      })
    );
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    // Check whether the token is expired and return true or false
    return !this.jwtHelper.isTokenExpired(token);
  }

  getToken(): string | null {
    const userData = localStorage.getItem(this.tokenKey);
    return userData ? JSON.parse(userData).token : null;
  }

  private storeAuthData(authData: any) {
    localStorage.setItem(this.tokenKey, JSON.stringify(authData));
    this.currentUserSubject.next(authData);
  }

  // Helper method to decode token
  getTokenData() {
    const token = this.getToken();
    return token ? this.jwtHelper.decodeToken(token) : null;
  }

  // Check if user has specific role (if you implement roles)
  hasRole(role: string): boolean {
    const tokenData = this.getTokenData();
    return tokenData?.roles?.includes(role) || false;
  }
}