import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-shop-item-list',
  templateUrl: './shop-item-list.component.html',
  styleUrls: ['./shop-item-list.component.css'],
})
export class ShopItemListComponent implements OnInit {
  constructor(public productService: ProductService) {}

  ngOnInit(): void {}
}
