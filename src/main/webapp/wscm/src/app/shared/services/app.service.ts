import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private _http: Http) { }

  baseUrl = "rest/content/";

  getContent(page: String, position: String) {
    return this._http.get(this.baseUrl + page + '/' + position).pipe(map(res => res.json()));
  }
}
