import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

import { cities } from '../../../environments/environment';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css'],
})
export class OrderFormComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  public cities = cities;

  orderForm: FormGroup;

  city = new FormControl('', [Validators.required]);

  street = new FormControl('', [Validators.required]);

  deliveryDate = new FormControl('', [Validators.required]);

  creditCard = new FormControl('', [
    Validators.required,
    Validators.minLength(10),
    Validators.maxLength(20),
  ]);

  setCityCurrentUserValue() {
    this.orderForm
      .get('city')
      .setValue(`${this.authService.userInfo.user.city}`);
  }

  setStreetCurrentUserValue() {
    this.orderForm
      .get('street')
      .setValue(`${this.authService.userInfo.user.street}`);
  }

  ngOnInit(): void {
    this.orderForm = this.formBuilder.group({
      city: this.city,
      street: this.street,
      deliveryDate: this.deliveryDate,
      creditCard: this.creditCard,
    });
  }
}
