import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable()
export class EditJobService {

    constructor(private _http: HttpClient) { }

    baseUrl = '/wscm/rest/scheduler/';

    editJob(obj): Observable<any> {
      return this._http.put(this.baseUrl + 'editJob', obj);
  }

}
