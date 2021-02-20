import { ViewFlags } from '@angular/compiler/src/core';
import { Component, Input, OnInit } from '@angular/core';
import { CartProduct } from 'src/app/interfaces/cartProduct';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.css'],
})
export class OrderItemComponent implements OnInit {
  constructor() {}

  @Input() product: CartProduct;
  @Input() searchInputValue: String;

  ngOnInit(): void {}
}
