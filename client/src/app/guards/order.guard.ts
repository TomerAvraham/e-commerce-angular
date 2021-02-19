import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CartService } from '../services/cart.service';

@Injectable({
  providedIn: 'root',
})
export class OrderGuard implements CanActivate {
  constructor(private cartService: CartService, private router: Router) {}

  canActivate() {
    if (this.cartService.isCartEmpty()) {
      return true;
    } else {
      this.router.navigate(['/shop']);
      return false;
    }
  }
}
