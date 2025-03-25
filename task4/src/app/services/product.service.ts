import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:3000/products';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }

  updateProduct(id: number, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, product);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getBrands(): Observable<string[]> {
    return this.http.get<Product[]>(`${this.apiUrl}?_sort=brand&_order=asc`).pipe(
      map(products => {
        // Extract unique brands and filter out empty/null values
        return [...new Set(products.map(p => p.brand))].filter(brand => brand);
      })
    );
  }

  getTypes(): Observable<string[]> {
    return this.http.get<Product[]>(`${this.apiUrl}?_sort=type&_order=asc`).pipe(
      map(products => {
        // Extract unique types and filter out empty/null values
        return [...new Set(products.map(p => p.type))].filter(type => type);
      })
    );
  }
}