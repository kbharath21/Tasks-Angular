import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    CommonModule
  ],
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  productForm: FormGroup;
  isEditMode = false;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private route: ActivatedRoute,
    public router: Router
  ) {
    this.productForm = this.fb.group({
      id: [''],
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      price: [0, [Validators.required, Validators.min(0)]],
      brand: ['', Validators.required],
      type: ['', Validators.required],
      imageUrl: ['', [Validators.required, Validators.pattern('https?://.+')]]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.isLoading = true;
      this.productService.getProduct(id).subscribe({
        next: (product) => {
          this.productForm.patchValue(product);
          this.isLoading = false;
        },
        error: () => {
          this.isLoading = false;
          this.router.navigate(['/products']);
        }
      });
    }
  }

  navigateHome() {
    this.router.navigate(['/']);
  }

  onSubmit() {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }

    const product = this.productForm.value;
    if (this.isEditMode) {
      this.productService.updateProduct(product.id, product).subscribe({
        next: () => this.router.navigate(['/products', product.id]),
        error: () => alert('Failed to update product')
      });
    } else {
      product.id = this.generateRandomStringId();
      this.productService.addProduct(product).subscribe({
        next: (newProduct) => this.router.navigate(['/products', newProduct.id]),
        error: () => alert('Failed to add product')
      });
    }
  }

  private generateRandomStringId(): string {
    return 'prod_' + Math.random().toString(36).substring(2, 9);
  }
}