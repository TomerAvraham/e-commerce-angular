import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-shop-navbar',
  templateUrl: './shop-navbar.component.html',
  styleUrls: ['./shop-navbar.component.css'],
})
export class ShopNavbarComponent implements OnInit {
  constructor(public productService: ProductService) {}

  public handleTabChange(category) {
    this.productService.getProductByCategory(category._id);
    this.productService.activeTab = category;
  }

  ngOnInit(): void {
    this.productService.getAllCategories();
  }
}
