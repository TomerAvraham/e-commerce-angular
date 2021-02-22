import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-order-popup',
  templateUrl: './order-popup.component.html',
  styleUrls: ['./order-popup.component.css'],
})
export class OrderPopupComponent implements OnInit {
  public fileUrl;

  constructor(
    public router: Router,
    public orderService: OrderService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    const data = this.orderService.createReceipt();
    const blob = new Blob([data], { type: 'application/octet-stream' });

    this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      window.URL.createObjectURL(blob)
    );
  }
}
