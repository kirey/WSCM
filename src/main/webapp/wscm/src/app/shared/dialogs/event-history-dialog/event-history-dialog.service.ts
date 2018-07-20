import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable()
export class EventHistoryService {
  constructor(private _http: HttpClient) {}

  baseUrl = '/wscm/rest/scheduler/';

  // getHisory(id): Observable<any> {
  //   return this._http.get(this.baseUrl + 'jobHistory/event/' + id);
  // }
}
