import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CurrencyPipe, NgIf } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [
    MatCardModule, 
    MatButtonModule, 
    NgIf,
    CurrencyPipe,
    RouterLink
  ],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product: Product | null = null;
  isLoading: boolean = true;
  errorMessage: string | null = null;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    // Use paramMap instead of snapshot for more reliable route parameter access
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      console.log('Extracted ID from route:', id); // Debug log

      if (id) {
        this.productService.getProduct(+id).subscribe({
          next: (product) => {
            console.log('Fetched Product:', product); // Debug log
            this.product = product;
            this.isLoading = false;
          },
          error: (error) => {
            console.error('Error fetching product:', error);
            this.errorMessage = 'Error fetching product details. Please try again later.';
            this.isLoading = false;
          }
        });
      } else {
        this.errorMessage = 'Invalid Product ID';
        this.isLoading = false;
      }
    });
  }

  deleteProduct(id: number) {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(id).subscribe(() => {
        this.router.navigate(['/products']);
      });
    }
  }
}