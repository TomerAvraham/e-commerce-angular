import { HttpInterceptor } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class JwtInterceptorService implements HttpInterceptor {
  constructor(private injector: Injector) {}

  intercept(req, next) {
    let authService = this.injector.get(AuthService);
    let tokenReq = req.clone({
      setHeaders: {
        'x-access-token': `${authService.getToken()}`,
      },
    });
    return next.handle(tokenReq);
  }
}
