import { AbstractControl, AsyncValidatorFn, FormGroup } from '@angular/forms';
import { OrderService } from '../services/order.service';

export function orderDateValidator(
  OrderService: OrderService
): AsyncValidatorFn {
  return (control: AbstractControl) => {
    return OrderService.isOrderDateTaken(control.value).pipe((res: any) => {
      return res;
    });
  };
}
