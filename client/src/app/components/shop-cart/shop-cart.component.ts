import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-shop-cart',
  templateUrl: './shop-cart.component.html',
  styleUrls: ['./shop-cart.component.css'],
})
export class ShopCartComponent implements OnInit {
  constructor(
    public cartService: CartService,
    private authService: AuthService
  ) {}

  displayedColumns: string[] = [
    'image',
    'name',
    'quantity',
    'totalPrice',
    'delete',
  ];

  ngOnInit(): void {
    !this.authService.isAdmin() && this.cartService.getCart();
  }

  deleteFromCart(id) {
    this.cartService.deleteProductFromCart(id);
  }
}
