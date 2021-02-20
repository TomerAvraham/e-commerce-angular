import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

import {
  emailValidator,
  IDValidator,
  confirmPasswordMatch,
} from '../../validators/register.validators';

import { cities } from '../../../environments/environment';

@Component({
  selector: 'app-register-view',
  templateUrl: './register-view.component.html',
  styleUrls: ['./register-view.component.css'],
})
export class RegisterViewComponent implements OnInit {
  public cities = cities;

  constructor(
    public formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  registerFormFirstStep: FormGroup;
  registerFormSecondStep: FormGroup;

  ID = new FormControl(null, {
    validators: [
      Validators.required,
      Validators.pattern('^[0-9]*$'),
      Validators.minLength(9),
      Validators.maxLength(9),
    ],
    asyncValidators: [IDValidator(this.authService)],
    updateOn: 'blur',
  });

  email = new FormControl('', {
    validators: [Validators.required],
    asyncValidators: [emailValidator(this.authService)],
    updateOn: 'blur',
  });

  password = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
  ]);

  confirmPassword = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
  ]);

  city = new FormControl('', Validators.required);
  street = new FormControl('', Validators.required);
  last_name = new FormControl('', Validators.required);
  first_name = new FormControl('', Validators.required);

  ngOnInit(): void {
    this.registerFormFirstStep = this.formBuilder.group(
      {
        ID: this.ID,
        email: this.email,
        password: this.password,
        confirmPassword: this.confirmPassword,
      },
      {
        validators: confirmPasswordMatch('password', 'confirmPassword'),
      }
    );

    this.registerFormSecondStep = this.formBuilder.group({
      city: this.city,
      street: this.street,
      last_name: this.last_name,
      first_name: this.first_name,
    });
  }

  handleRegisterSubmit() {
    this.authService.register(
      this.registerFormFirstStep.value,
      this.registerFormSecondStep.value
    );
    this.router.navigateByUrl('/');
  }

  get emailExist() {
    return this.registerFormFirstStep.controls['email'];
  }

  get IDExist() {
    return this.registerFormFirstStep.controls['ID'];
  }
}
