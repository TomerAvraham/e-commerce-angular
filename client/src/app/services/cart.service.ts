import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cart } from '../interfaces/cart';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private http: HttpClient) {}

  private ENDPOINT: string = 'http://localhost:5000/api/cart/';

  public cart: Cart = localStorage.getItem('cart')
    ? JSON.parse(localStorage.getItem('cart'))
    : null;

  public totalSum: Number;

  public afterLoginMessage: String;

  getCart() {
    return this.http.get(this.ENDPOINT).subscribe(
      (res: any) => {
        this.cart = res.cart;
        this.totalSum = res.totalSum;
        this.afterLoginMessage = res.message;
        localStorage.setItem('cart', JSON.stringify(res.cart));
      },
      (err) => {
        console.log(err);
      }
    );
  }

  addProductToCart(item, quantity, totalPrice) {
    const body = { item, quantity, totalPrice, cart: this.cart._id };
    return this.http.post(this.ENDPOINT + 'addProductToCart', body).subscribe(
      (res: any) => {
        this.cart = res.cart;
        this.totalSum = res.totalSum;

        localStorage.setItem('cart', JSON.stringify(res.cart));
      },
      (err) => {
        console.log(err);
      }
    );
  }

  deleteProductFromCart(productId) {
    return this.http
      .delete(
        `${this.ENDPOINT}deleteCartProduct/?productId=${productId}&cartId=${this.cart._id}`
      )
      .subscribe(
        (res: any) => {
          this.cart = res.cart;
          this.totalSum = res.totalSum;

          localStorage.setItem('cart', JSON.stringify(res.cart));
        },
        (err) => {
          console.log(err);
        }
      );
  }

  deleteAllProductFromCart() {
    return this.http
      .delete(`${this.ENDPOINT}deleteAllCartProduct/?cartId=${this.cart._id}`)
      .subscribe(
        (res: any) => {
          this.cart = res.cart;
          this.totalSum = res.totalSum;

          localStorage.setItem('cart', JSON.stringify(res.cart));
        },
        (err) => {
          console.log(err);
        }
      );
  }

  isCartEmpty() {
    if (this.cart.products.length) {
      return true;
    } else {
      return false;
    }
  }

  amountOfProducts() {
    if (this.cart.products.length === 0) {
      return 0;
    } else {
      let counter = 0;
      this.cart.products.map(
        (product) => (counter = counter + Number(product.quantity))
      );

      return counter;
    }
  }
}
