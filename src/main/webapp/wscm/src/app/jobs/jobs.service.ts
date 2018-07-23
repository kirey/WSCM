import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable()
export class JobsService {

    constructor(private _http: HttpClient) { }

    baseUrl = '/wscm/rest/scheduler/';

    getJobs(): Observable<any> {
        return this._http.get(this.baseUrl + 'jobs');
    }

    deleteJob(id): Observable<any> {
        return this._http.delete(this.baseUrl + 'deleteJob/' + id);
    }

    startJob(id): Observable<any> {
        return this._http.post(this.baseUrl + 'startJob/' + id, null);
    }

    stopJob(id): Observable<any> {
        return this._http.post(this.baseUrl + 'stopJob/' + id, null);
    }

    // deleteJob(id: number): Observable<any> {
    //     return this._http.delete(this.baseUrl + 'deleteJob/' + id);
    // }
    getHisory(id): Observable<any> {
        return this._http.get(this.baseUrl + 'jobHistory/' + id);
    }

}
