import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { StudentsComponent } from './components/students/students.component';
import { inject } from '@angular/core';
import { AuthService } from './core/auth.service';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [() => {
      const authService = inject(AuthService);
      return authService.isAuthenticated();
    }]
  },
  {
    path: 'students',
    component: StudentsComponent,
    canActivate: [() => {
      const authService = inject(AuthService);
      return authService.isAuthenticated();
    }]
  }
];