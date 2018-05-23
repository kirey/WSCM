import { Injectable } from '@angular/core';

import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { UtilityService } from '../shared/services/utility.service';

import { RestResponse } from '../shared/models';

@Injectable()
export class JobsService {
    private _baseUrl: string;
    constructor(private _http: Http) {
        this._baseUrl = "rest/jobs";
    };
    /**
    * get all jobs
    * @author Roxana
    */
    getAllJobsRest(): Observable<RestResponse<any>> {
        return this._http.get(this._baseUrl)
            .map((res: Response) => res.json())
            .catch(UtilityService.handleError);
    }

    /**
     * start job
     * @author Roxana
     */
    startJobRest(schedulerName: string): Observable<RestResponse<any>> {
        return this._http.post(this._baseUrl + "/startJob", { "schedulerName": schedulerName })
            .map((res: Response) => res.json())
            .catch(UtilityService.handleError);
    }
}