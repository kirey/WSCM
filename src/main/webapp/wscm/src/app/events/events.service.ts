import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable()
export class EventsService {

    constructor(private _http: HttpClient) { }

    baseUrl = '/wscm/rest/scheduler/';

    getJobs(): Observable<any> {
        return this._http.get(this.baseUrl + 'events');
    }

    startJob(id): Observable<any> {
        return this._http.post(this.baseUrl + 'startJob/event/' + id, null);
    }

    stopJob(id): Observable<any> {
        return this._http.post(this.baseUrl + 'stopJob/event/' + id, null);
    }

    deleteJob(id: number): Observable<any> {
        return this._http.delete(this.baseUrl + 'events/' + id);
    }
    getHisory(id): Observable<any> {
        return this._http.get(this.baseUrl + 'jobHistory/event/' + id);
    }

}
