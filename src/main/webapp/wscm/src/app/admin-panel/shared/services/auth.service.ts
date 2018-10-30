import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  constructor(public http: Http, public router: Router ) {}

  public login(data) {
    return this.http.post('authentication', data);
  }

  public logout() {
      return this.http.post('logout', {});
  }
  isLoggedIn() {
    if (localStorage.getItem('username') && localStorage.getItem('username').length > 0) {
      return true;
    } else {
      return false;
    }
  }
}
