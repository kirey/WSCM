import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable()
export class EditEventService {
  constructor(private _http: HttpClient) {}

  baseUrl = '/wscm/rest/scheduler/';

  editJobs(obj): Observable<any> {
    return this._http.put(this.baseUrl + 'events', obj);
  }
  getJobs(): Observable<any> {
    return this._http.get(this.baseUrl + 'events');
  }
}
