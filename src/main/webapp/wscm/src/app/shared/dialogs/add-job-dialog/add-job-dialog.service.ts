import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Observable } from 'rxjs';

@Injectable()
export class AddJobService {
  constructor(private _http: HttpClient) { }

  baseUrl = '/wscm/rest/scheduler/';
<<<<<<< Updated upstream
// Get Alll Categories
getAllCategories() {
  return this._http.get(this.baseUrl + '/' + 'categories').pipe(map(res => res));
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
  // addJobs(jobs): Observable<any> {
  //   return this._http.post(this.baseUrl + 'events', jobs);
  // }
  // getJobs(): Observable<any> {
  //   return this._http.get(this.baseUrl + 'events');
  // }
  // editJobs(obj): Observable<any> {
  //   return this._http.put(this.baseUrl + 'events', obj);
  // }
  // getJobs(): Observable<any> {
  //   return this._http.get(this.baseUrl + 'events');
  // }
=======
  // Get Alll Categories
  getAllCategories() {
    return this._http.get(this.baseUrl + '/' + 'categories').pipe(map(res => res));
  }
  // Get All Job Types
  getAllJobs(): Observable<any> {
    return this._http.get(this.baseUrl + '/' + 'jobTypes');
  }
  // Class Loading - Get All Classes
  getAllClasses(): Observable<any> {
    return this._http.get(this.baseUrl + '/' + 'classes');
  }

  getAllNotification(): Observable<any> {
    return this._http.get(this.baseUrl + '/' + 'notifications');
  }
  addJob(obj): Observable<any> {
    return this._http.post(this.baseUrl + 'add/Job', obj);
  }
>>>>>>> Stashed changes
}
