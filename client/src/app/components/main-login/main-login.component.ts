import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-main-login',
  templateUrl: './main-login.component.html',
  styleUrls: ['./main-login.component.css'],
})
export class MainLoginComponent implements OnInit {
  constructor(
    public formBuilder: FormBuilder,
    public authService: AuthService,
    public cartService: CartService,
    private router: Router
  ) {}

  public hidePassword: Boolean = true;

  loginForm: FormGroup;

  email = new FormControl('', [Validators.required]);

  password = new FormControl('', [Validators.required]);

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: this.email,
      password: this.password,
    });
  }

  startShopClick() {
    this.cartService.getCart();
    this.router.navigate(['/shop']);
  }

  handleLoginSubmit() {
    this.authService.login(this.loginForm.value);
  }
}
