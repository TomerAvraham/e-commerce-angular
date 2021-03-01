import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CartService } from './cart.service';
import { SnackBarService } from './snack-bar.service';
import { UserInfo } from '../interfaces/user-info';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private cartService: CartService,
    private snackBar: SnackBarService
  ) {}

  ENDPOINT = 'http://localhost:5000/api/auth/';

  userInfo: UserInfo | any = localStorage.getItem('access_token')
    ? jwtDecode(localStorage.getItem('access_token'))
    : {};

  loading: Boolean = false;
  error: String = '';

  login({ email, password }) {
    this.loading = true;
    return this.http
      .post(this.ENDPOINT + 'login', {
        email,
        password,
      })
      .subscribe(
        (res: any) => {
          localStorage.setItem('access_token', res.access_token);
          localStorage.setItem('refresh_token', res.refresh_token);

          const user: any = jwtDecode(res.access_token);

          this.userInfo = user;
          this.loading = false;
          this.error = '';

          this.cartService.getNotifications();
        },
        (err) => {
          this.loading = false;
          this.error = err.error.message;
          this.snackBar.openSnackBar(`${this.error}`, 'OK');
        }
      );
  }

  register(stepOneForm, stepTwoForm) {
    const newUser = { ...stepOneForm, ...stepTwoForm };
    return this.http.post(this.ENDPOINT + `register`, newUser).subscribe(
      (res: any) => {
        localStorage.setItem('access_token', res.access_token);
        localStorage.setItem('refresh_token', res.refresh_token);

        const user = jwtDecode(res.access_token);

        this.userInfo = user;
        this.loading = false;
        this.error = '';
      },
      (err) => {
        this.loading = false;
        this.error = err.error.message;
        this.snackBar.openSnackBar(`${this.error}`, 'OK');
      }
    );
  }

  logout() {
    localStorage.clear();
    this.userInfo = {};
    this.router.navigate(['/']);
  }

  findEmail(email: String) {
    return this.http.get(this.ENDPOINT + `emailExist/${email}`);
  }

  findID(ID: Number) {
    return this.http.get(this.ENDPOINT + `IDExist/${ID}`);
  }

  isLogging() {
    return !!localStorage.getItem('access_token');
  }

  isAdmin() {
    return this.userInfo.user.admin;
  }

  getAccessToken() {
    return localStorage.getItem('access_token');
  }

  getRefreshToken() {
    return localStorage.getItem('refresh_token');
  }

  requestAccessToken() {
    const body = { refreshToken: this.getRefreshToken() };
    return this.http.post(this.ENDPOINT + `refresh`, body);
  }

  isAccessTokenExpired() {
    const helper = new JwtHelperService();
    return helper.isTokenExpired(this.getAccessToken());
  }

  isRefreshTokenExpired() {
    const helper = new JwtHelperService();
    return helper.isTokenExpired(this.getRefreshToken());
  }
}
