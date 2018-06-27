import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class AddNewPositionService {

  baseUrl = 'rest/admin/content';
    options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

    constructor(private _http: HttpClient) { }

 // Add  position
 addContent(obj: Object) {
  return this._http.post(this.baseUrl, obj, this.options).pipe(map(res => res));
}

}
