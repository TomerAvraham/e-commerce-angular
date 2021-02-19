import { Product } from './product';

export interface CartProduct {
  _id: String;
  item: Product;
  cart: String;
  quantity: Number;
  totalPrice: Number;
}
