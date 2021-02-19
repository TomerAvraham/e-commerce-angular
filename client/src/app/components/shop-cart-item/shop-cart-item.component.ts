import { Component, Input, OnInit } from '@angular/core';
import { CartProduct } from 'src/app/interfaces/cartProduct';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-shop-cart-item',
  templateUrl: './shop-cart-item.component.html',
  styleUrls: ['./shop-cart-item.component.css'],
})
export class ShopCartItemComponent implements OnInit {
  constructor(public cartService: CartService) {}

  @Input()
  product: CartProduct;

  deleteFromCart() {
    this.cartService.deleteProductFromCart(this.product._id);
  }

  ngOnInit(): void {}
}
