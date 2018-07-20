import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Observable } from 'rxjs';

@Injectable()
export class EditJobService {
  constructor(private _http: HttpClient) { }

  baseUrl = '/wscm/rest/scheduler/';

  getJobs(): Observable<any> {
    return this._http.get(this.baseUrl + 'jobs');
}
// Get All Job Types
getAllJobs(): Observable<any> {
  return this._http.get(this.baseUrl + '/' + 'jobTypes');
}
// Class Loading - Get All Classes
getAllClasses(): Observable<any> {
  return this._http.get(this.baseUrl + '/' + 'classes');
}
// Get All Notifications - multiselect
getAllNotification(): Observable<any> {
  return this._http.get(this.baseUrl + '/' + 'notifications');
}
// Get Alll Categories
getAllCategories() {
  return this._http.get(this.baseUrl + '/' + 'categories').pipe(map(res => res));
}
  // editEvents(obj): Observable<any> {
  //   return this._http.put(this.baseUrl + 'events', obj);
  // }
}
