import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { switchMap, take, filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class JwtInterceptorService implements HttpInterceptor {
  private refreshTokenInProgress = false;
  private refreshTokenSubject: Subject<any> = new BehaviorSubject<any>(null);

  constructor(public authService: AuthService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler) {
    if (request.url.indexOf('refresh') !== -1) {
      return next.handle(request);
    }

    const accessExpired = this.authService.isAccessTokenExpired();
    const refreshExpired = this.authService.isRefreshTokenExpired();

    if (accessExpired && refreshExpired) {
      return next.handle(request);
    }
    if (accessExpired && !refreshExpired) {
      if (!this.refreshTokenInProgress) {
        this.refreshTokenInProgress = true;
        this.refreshTokenSubject.next(null);
        return this.authService.requestAccessToken().pipe(
          switchMap((authResponse: any) => {
            localStorage.setItem('access_token', authResponse.access_token);
            this.refreshTokenInProgress = false;
            this.refreshTokenSubject.next(authResponse.refresh_token);
            return next.handle(this.injectToken(request));
          })
        );
      } else {
        return this.refreshTokenSubject.pipe(
          filter((result) => result !== null),
          take(1),
          switchMap((res) => {
            return next.handle(this.injectToken(request));
          })
        );
      }
    }

    if (!accessExpired) {
      return next.handle(this.injectToken(request));
    }
  }

  injectToken(request: HttpRequest<any>) {
    const token = this.authService.getAccessToken();
    return request.clone({
      setHeaders: {
        'x-access-token': token,
      },
    });
  }
}
