import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient, public cartService: CartService) {}

  private ENDPOINT: String = 'http://localhost:5000/api/order/';

  public success: Boolean = false;
  public order: String = '';
  public error: String = '';
  public amountOfOrders: Number;

  public fileUrl;

  submitNewOrder({ city, street, deliveryDate, creditCard }) {
    const body = {
      cart: this.cartService.cart._id,
      destination_city: city,
      destination_street: street,
      delivery_date: deliveryDate,
      credit_card: creditCard,
    };

    return this.http.post(this.ENDPOINT + 'newOrder', body).subscribe(
      (res: any) => {
        this.success = true;
        this.order = res.order;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  createReceipt() {
    let receipt = '';

    for (const product of this.cartService.cart.products) {
      receipt += `
        Name: ${product.item.name}, Quantity: ${product.quantity}, TotalPrice: ${product.totalPrice}
      `;
    }

    receipt += `
    ----------------------------------
      TOTAL: ${this.cartService.totalSum}
    `;

    return receipt;
  }

  getNumberOfOrders() {
    return this.http.get(this.ENDPOINT + 'countOrder').subscribe(
      (res: any) => {
        this.amountOfOrders = res.orderCount;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  confirmOrder() {
    this.success = false;
  }

  isOrderDateTaken(date: any) {
    return this.http.get(this.ENDPOINT + `/isOrderExistThreeTimes/${date}`);
  }
}
