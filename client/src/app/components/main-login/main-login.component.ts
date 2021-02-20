import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
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
    public cartService: CartService
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

  handleLoginSubmit() {
    this.authService.login(this.loginForm.value);
  }
}
