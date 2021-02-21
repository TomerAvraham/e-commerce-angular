import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-popup',
  templateUrl: './order-popup.component.html',
  styleUrls: ['./order-popup.component.css'],
})
export class OrderPopupComponent implements OnInit {
  constructor(public router: Router, public orderService: OrderService) {}

  ngOnInit(): void {}

  handleClick() {
    this.orderService.downloadReceipt();
  }
}
