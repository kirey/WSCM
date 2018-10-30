import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Observable } from 'rxjs';

@Injectable()
export class AddJobService {
  constructor(private _http: HttpClient) { }

  baseUrl = '/wscm/rest/scheduler/';
  // Get Alll Categories
  getAllCategories() {
    return this._http.get(this.baseUrl + 'categories').pipe(map(res => res));
  }
  // Get All Job Types
  getAllJobs(): Observable<any> {
    return this._http.get(this.baseUrl + 'jobTypes');
  }
  // Class Loading - Get All Classes
  getAllClasses(): Observable<any> {
    return this._http.get(this.baseUrl + 'classes');
  }

  getAllNotification(): Observable<any> {
    return this._http.get(this.baseUrl + 'notifications');
  }
  addJob(obj): Observable<any> {
    return this._http.post(this.baseUrl + 'addJob', obj);
  }
}
