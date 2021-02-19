import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-order-item-list',
  templateUrl: './order-item-list.component.html',
  styleUrls: ['./order-item-list.component.css'],
})
export class OrderItemListComponent implements OnInit {
  constructor(public cartService: CartService) {}

  ngOnInit(): void {}
}
