import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private tokenSubject = new BehaviorSubject<string | null>(localStorage.getItem('token'));
  token$ = this.tokenSubject.asObservable();

  login(username: string, password: string): Observable<any> {
    return this.http.post<{ token: string }>('http://localhost:3000/api/login', { username, password })
      .pipe(tap(res => {
        localStorage.setItem('token', res.token);
        this.tokenSubject.next(res.token);
      }));
  }

  logout() {
    localStorage.removeItem('token');
    this.tokenSubject.next(null);
  }

  isAuthenticated(): boolean {
    return !!this.tokenSubject.value;
  }
}