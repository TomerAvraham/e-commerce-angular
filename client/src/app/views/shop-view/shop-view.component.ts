import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-shop-view',
  templateUrl: './shop-view.component.html',
  styleUrls: ['./shop-view.component.css'],
})
export class ShopViewComponent implements OnInit {
  constructor(
    public cartService: CartService,
    public productService: ProductService,
    private authService: AuthService,
    public adminService: AdminService
  ) {}

  public isAdmin: Boolean;

  ngOnInit(): void {
    this.productService.getAllProducts();
    this.isAdmin = this.authService.isAdmin();
  }
}
