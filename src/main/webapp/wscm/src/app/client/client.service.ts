import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private _http: Http) { }

    baseUrl = 'rest/content/';

    getPosition() {
        return this._http.get(this.baseUrl + 'home/P1/EN');
    }
}
