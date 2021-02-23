import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { OrderService } from 'src/app/services/order.service';

import { cities } from '../../../environments/environment';

import { orderDateValidator } from '../../validators/order.validators';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css'],
})
export class OrderFormComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    public orderService: OrderService
  ) {}

  public cities = cities;

  orderForm: FormGroup;

  city = new FormControl('', [Validators.required]);

  street = new FormControl('', [Validators.required]);

  deliveryDate = new FormControl('', {
    validators: [Validators.required],
    asyncValidators: [orderDateValidator(this.orderService)],
  });

  creditCard = new FormControl('', [
    Validators.required,
    Validators.pattern('^[0-9]*$'),
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

  submitNewOrder() {
    this.orderService.submitNewOrder(this.orderForm.value);
  }
}
