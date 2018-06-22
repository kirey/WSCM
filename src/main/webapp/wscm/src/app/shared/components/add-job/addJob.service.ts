import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable()
export class AddJobService {

    constructor(private _http: HttpClient) { }

    baseUrl = '/wscm/rest/scheduler/';

  addJob(jobs): Observable<any> {
    return this._http.post(this.baseUrl + 'addJob', jobs);
  }
}
