import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-shop-view',
  templateUrl: './shop-view.component.html',
  styleUrls: ['./shop-view.component.css'],
})
export class ShopViewComponent implements OnInit {
  constructor(public cartService: CartService) {}

  ngOnInit(): void {}
}
