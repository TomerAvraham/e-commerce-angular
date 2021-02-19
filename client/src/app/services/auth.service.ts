import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private cartService: CartService
  ) {}

  ENDPOINT = 'http://localhost:5000/api/auth/';

  userInfo: Object = localStorage.getItem('access_token')
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

          const user = jwtDecode(res.access_token);

          this.userInfo = user;
          this.loading = false;
          this.error = '';

          this.cartService.getCart();
        },
        (err) => {
          this.loading = false;
          this.error = err.error.message;
        }
      );
  }

  register(stepOneForm, stepTwoForm) {
    const newUser = { ...stepOneForm, ...stepTwoForm };
    return this.http.post(this.ENDPOINT + `register`, newUser).subscribe(
      (res: any) => {
        const user = jwtDecode(res.access_token);

        this.userInfo = user;
        this.loading = false;
        this.error = '';
      },
      (err) => {
        this.loading = false;
        this.error = err.error.message;
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

  getToken() {
    return localStorage.getItem('access_token');
  }
}
