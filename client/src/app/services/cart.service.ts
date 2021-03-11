import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cart } from '../interfaces/cart';
import { SnackBarService } from './snack-bar.service';
import { BASE_URL } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private http: HttpClient, private snackBar: SnackBarService) {}

  private ENDPOINT: string = `${BASE_URL}cart/`;

  public cart: Cart = localStorage.getItem('cart')
    ? JSON.parse(localStorage.getItem('cart'))
    : null;

  public totalSum: Number;

  public notification: String;

  getNotifications() {
    return this.http.get(this.ENDPOINT + '/notification').subscribe(
      (res: any) => {
        this.notification = res.notification;
      },
      (err) => {
        console.log(err);
        this.snackBar.openSnackBar(`${err.message}`, '');
      }
    );
  }

  getCart() {
    return this.http.get(this.ENDPOINT).subscribe(
      (res: any) => {
        this.cart = res.cart;
        this.totalSum = res.totalSum;
        localStorage.setItem('cart', JSON.stringify(res.cart));
      },
      (err) => {
        console.log(err);
        this.snackBar.openSnackBar(`${err.message}`, '');
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
        this.snackBar.openSnackBar(`${err.message}`, '');
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
          this.snackBar.openSnackBar(`${err.message}`, '');
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
          this.snackBar.openSnackBar(`${err.message}`, '');
        }
      );
  }

  isCartEmpty() {
    if (!this.cart || this.cart.products.length) {
      return true;
    } else {
      return false;
    }
  }

  amountOfProducts() {
    if (!this.cart || this.cart.products.length === 0) {
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
