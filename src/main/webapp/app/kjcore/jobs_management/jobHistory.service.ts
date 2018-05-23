import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { UtilityService } from '../shared/services/utility.service';

import { RestResponse } from '../shared/models';

@Injectable()
export class JobHistoryService {
    private _baseUrl: string;
    constructor(private _http: Http) {
        this._baseUrl = "rest/jobs";
    };
    /**
     *get job history
     * @author Roxana
     */
    getJobHistoryRest(jobName: string, startDate: String, endDate: String): Observable<RestResponse<any>> {
        return this._http.get(this._baseUrl + "/history?jobName=" + jobName+"&startDate="+startDate+"&endDate="+endDate)
            .map((res: Response) => res.json())
            .catch(UtilityService.handleError);
    }
    /**
     *get error details for a job execution
     * @author Roxana
     */
    getErrorsDetailsRest(jobInstanceId: string): Observable<RestResponse<any>> {
        return this._http.get(this._baseUrl + "/failureDetail?jobInstanceId=" + jobInstanceId)
            .map((res: Response) => res.json())
            .catch(UtilityService.handleError);
    }

    /**
     * Get trace for a runtime error
     * @author Ciprian Dorofte
     */
    getTraceRest(id: any): Observable<RestResponse<any>>{
        return this._http.get("rest/errors/traces/" + id).map((res: Response) => res.json())
            .catch(UtilityService.handleError);
    }
}