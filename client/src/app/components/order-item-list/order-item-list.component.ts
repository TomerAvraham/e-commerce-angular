import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-order-item-list',
  templateUrl: './order-item-list.component.html',
  styleUrls: ['./order-item-list.component.css'],
})
export class OrderItemListComponent implements OnInit {
  constructor(public cartService: CartService, public router: Router) {}

  searchInputValue: String = '';

  ngOnInit(): void {
    this.cartService.getCart();
  }

  updateSearchInputValue(event) {
    this.searchInputValue = event.target.value;
  }
}
