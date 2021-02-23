import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-main-about-shop',
  templateUrl: './main-about-shop.component.html',
  styleUrls: ['./main-about-shop.component.css'],
})
export class MainAboutShopComponent implements OnInit {
  constructor(
    public authService: AuthService,
    public productService: ProductService,
    public orderService: OrderService,
    public cartService: CartService
  ) {}

  ngOnInit(): void {
    this.productService.getAllProducts();
    this.orderService.getNumberOfOrders();
    if (this.authService.isLogging()) {
      this.cartService.getNotifications();
    }
  }
}
