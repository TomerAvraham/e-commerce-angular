import { Component, Input, OnInit, Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Product } from 'src/app/interfaces/product';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-shop-item',
  templateUrl: './shop-item.component.html',
  styleUrls: ['./shop-item.component.css'],
})
export class ShopItemComponent implements OnInit {
  @Input() product: Product;

  constructor(
    public dialog: MatDialog,
    public cartService: CartService,
    private authService: AuthService,
    private adminService: AdminService
  ) {}

  public amount: number = 1;
  public totalPrice: Number;
  public isAdmin: Boolean;

  handleAdminClick() {
    this.adminService.setEditProduct(this.product);
  }

  increaseAmount() {
    this.amount++;
    this.totalPrice = this.amount * this.product.price;
  }

  decrescAmount() {
    if (this.amount >= 2) {
      this.amount--;
      this.totalPrice = this.amount * this.product.price;
    } else {
      return;
    }
  }

  addProductToCart() {
    this.cartService.addProductToCart(
      this.product._id,
      this.amount,
      this.totalPrice
    );
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ItemAmountPopup, {
      width: '450px',
      height: '450px',
      data: {
        product: this.product,
        amount: this.amount,
        totalPrice: this.totalPrice,
        increaseAmount: this.increaseAmount,
        decrescAmount: this.decrescAmount,
        addProductToCart: this.addProductToCart,
        cartService: this.cartService,
      },
    });
  }

  ngOnInit(): void {
    this.totalPrice = this.amount * this.product.price;
    this.isAdmin = this.authService.isAdmin();
  }
}

@Component({
  selector: 'item-amount-popup',
  templateUrl: 'item-amount-popup.html',
  styleUrls: ['./shop-item.component.css'],
})
export class ItemAmountPopup {
  constructor(
    public dialogRef: MatDialogRef<ItemAmountPopup>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public cartService: CartService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
