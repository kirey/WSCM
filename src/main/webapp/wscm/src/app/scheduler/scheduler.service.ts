import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable()
export class SchedulerService {

    constructor(private _http: HttpClient) { }

    baseUrl = '/wscm/rest/scheduler/';

    getJobs(): Observable<any> {
        return this._http.get(this.baseUrl + 'jobs');
    }

    startJob(id): Observable<any> {
        return this._http.post(this.baseUrl + 'startJob/' + id, null);
    }

    // stopJob(id): Observable<any> {
    //     return this._http.post(this.baseUrl + 'stopJob/' + id, null);
    // }

    addJob(jobs): Observable<any> {
        return this._http.post(this.baseUrl + 'addJob', jobs);
    }
    // editJob(obj): Observable<any> {
    //     return this._http.put(this.baseUrl + 'editJob', obj);
    // }
    deleteJob(id: number): Observable<any> {
        return this._http.delete(this.baseUrl + 'deleteJob/' + id);
    }
    // getHisory(id): Observable<any> {
    //     return this._http.get(this.baseUrl + 'jobHistory/' + id);
    // }

}
