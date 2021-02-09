import { AbstractControl, AsyncValidatorFn, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

export function emailValidator(authService: AuthService): AsyncValidatorFn {
  return (control: AbstractControl) => {
    return authService.findEmail(control.value).pipe((res: any) => {
      return res;
    });
  };
}

export function IDValidator(authService: AuthService): AsyncValidatorFn {
  return (control: AbstractControl) => {
    return authService.findID(control.value).pipe((res: any) => {
      return res;
    });
  };
}

export function confirmPasswordMatch(
  controlName: string,
  matchingControlName: string
) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];
    if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
      return;
    }
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ confirmedValidator: true });
    } else {
      matchingControl.setErrors(null);
    }
  };
}
