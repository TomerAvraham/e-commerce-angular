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

  downloadFile(data: File) {
    const blob = new Blob([data], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    window.open(url);
  }

  downloadReceipt() {
    return (
      this.http
        .get(this.ENDPOINT + `receipt/${this.order}`)
        .subscribe((res: File) => this.downloadFile(res)),
      (error) => console.log('Error downloading the file.')
    );
  }

  isOrderDateTaken(date: any) {
    return this.http.get(this.ENDPOINT + `/isOrderExistThreeTimes/${date}`);
  }
}
