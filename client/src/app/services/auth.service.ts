import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  ENDPOINT = 'http://localhost:5000/api/auth/';

  userInfo: {};
  isAuth: Boolean = false;
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
          const user = jwtDecode(res.token);

          this.userInfo = user;
          this.isAuth = true;
          this.loading = false;
          this.error = '';
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
        const user = jwtDecode(res.token);

        this.userInfo = user;
        this.isAuth = true;
        this.loading = false;
        this.error = '';
      },
      (err) => {
        this.loading = false;
        this.error = err.error.message;
      }
    );
  }

  findEmail(email: String) {
    return this.http.get(this.ENDPOINT + `emailExist/${email}`);
  }

  findID(ID: Number) {
    return this.http.get(this.ENDPOINT + `IDExist/${ID}`);
  }
}
