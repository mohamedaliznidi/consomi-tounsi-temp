import { Product } from './product.model';

// cart items
export interface CartItem {
  id?: number;
  product: Product;
  quantity: number;
}
