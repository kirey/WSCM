import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
// import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(public http: Http) {}
  public url = 'authentication';

  public login(data) {
    return this.http.post(this.url, data);
  }
}
