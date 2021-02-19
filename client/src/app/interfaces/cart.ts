import { CartProduct } from './cartProduct';

export interface Cart {
  _id: String;
  active: Boolean;
  createAt: Date;
  client: String;
  totalPrice: Number;
  products: CartProduct[];
}
