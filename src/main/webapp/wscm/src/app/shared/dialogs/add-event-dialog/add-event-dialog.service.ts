import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable()
export class AddEventService {
  constructor(private _http: HttpClient) { }

  baseUrl = '/wscm/rest/scheduler/';


  addEvents(jobs): Observable<any> {
    return this._http.post(this.baseUrl + 'events', jobs);
  }
  getEvents(): Observable<any> {
    return this._http.get(this.baseUrl + 'events');
  }
  // editJobs(obj): Observable<any> {
  //   return this._http.put(this.baseUrl + 'events', obj);
  // }
  // getJobs(): Observable<any> {
  //   return this._http.get(this.baseUrl + 'events');
  // }
}
