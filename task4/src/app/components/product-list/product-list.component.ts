import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { TruncatePipe } from 'src/app/pipes/truncate.pipe';
@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    TruncatePipe,
    MatCardModule,
    MatButtonModule,
    RouterLink,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatSelectModule,
    MatSliderModule,
    CommonModule,
    MatIconModule
  ],
  templateUrl: './product-list.component.html'
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  brands: string[] = [];
  types: string[] = [];
  searchTerm: string = '';
  selectedBrand: string = '';
  selectedType: string = '';
  priceRange: [number, number] = [0, 1000];
  maxPrice: number = 1000;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
    this.loadFilters();
  }
  formatLabel(value: number): string {
    return value.toString();
  }

  loadProducts() {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
      this.filteredProducts = [...products];
      this.maxPrice = Math.max(...products.map(p => p.price), 1000);
      this.priceRange = [0, this.maxPrice];
    });
  }

  loadFilters() {
    this.productService.getBrands().subscribe(brands => {
      this.brands = brands; // Brands are already strings
    });
  
    this.productService.getTypes().subscribe(types => {
      this.types = types; // Types are already strings
    });
  }
  

  applyFilters() {
    this.filteredProducts = this.products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(this.searchTerm.toLowerCase()) || 
                         product.description.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesBrand = !this.selectedBrand || product.brand === this.selectedBrand;
      const matchesType = !this.selectedType || product.type === this.selectedType;
      const matchesPrice = product.price >= this.priceRange[0] && product.price <= this.priceRange[1];
      
      return matchesSearch && matchesBrand && matchesType && matchesPrice;
    });
  }

  resetFilters() {
    this.searchTerm = '';
    this.selectedBrand = '';
    this.selectedType = '';
    this.priceRange = [0, this.maxPrice];
    this.applyFilters();
  }
}