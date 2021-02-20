import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient, public cartService: CartService) {}

  private ENDPOINT: 'http://localhost:5000/api/order/';

  public success: Boolean = false;
  public error: String = '';

  submitNewOrder({ city, street, deliveryDate, creditCard }) {
    const body = {
      cart: this.cartService.cart._id,
      destination_city: city,
      destination_street: street,
      delivery_date: deliveryDate,
      credit_card: creditCard,
    };

    return this.http.post(this.ENDPOINT + 'newOrder', body);
  }
}
