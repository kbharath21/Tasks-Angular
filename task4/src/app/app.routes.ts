import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { 
    path: '', 
    loadComponent: () => import('./components/product-list/product-list.component').then(m => m.ProductListComponent) 
  },
  { 
    path: 'products/add', 
    loadComponent: () => import('./components/product-form/product-form.component').then(m => m.ProductFormComponent),
    canActivate: [AuthGuard]
  },
  { 
    path: 'products/edit/:id', 
    loadComponent: () => import('./components/product-form/product-form.component').then(m => m.ProductFormComponent),
    canActivate: [AuthGuard]
  },
  { 
    path: 'products/:id', 
    loadComponent: () => import('./components/product-details/product-details.component').then(m => m.ProductDetailsComponent) 
  },
  { 
    path: 'login', 
    loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent) 
  },
  { 
    path: 'register', 
    loadComponent: () => import('./components/register/register.component').then(m => m.RegisterComponent) 
  },
  { path: '**', redirectTo: '' }
];