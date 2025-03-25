import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    NgIf
  ],
  templateUrl: './product-form.component.html'
})
export class ProductFormComponent implements OnInit {
  product: Product = {
    id: '', // Changed to string
    name: '',
    description: '',
    price: 0,
    brand: '',
    type: '',
    imageUrl: ''
  };
  isEditMode = false;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.productService.getProduct(id).subscribe(product => {
        this.product = product;
      });
    }
  }

  onSubmit() {
    if (this.isEditMode) {
      this.productService.updateProduct(this.product.id, this.product).subscribe(() => {
        this.router.navigate(['/products', this.product.id]);
      });
    } else {
      // Generate a random string ID for new products
      this.product.id = this.generateRandomStringId();
      this.productService.addProduct(this.product).subscribe(product => {
        this.router.navigate(['/products', product.id]);
      });
    }
  }

  // Method to generate a random string ID
  private generateRandomStringId(): string {
    // Generate a random string ID (you can customize this as needed)
    return 'prod_' + Math.random().toString(36).substring(2, 9);
  }
}