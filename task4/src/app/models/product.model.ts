// models/product.model.ts
export interface Product {
    id: number;
    name: string;
    brand: string;
    price: number;
    type: string;
    description: string;
    imageUrl: string;
  }