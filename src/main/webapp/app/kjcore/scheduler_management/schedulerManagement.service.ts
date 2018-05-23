import { Injectable } from '@angular/core';

import { Http, URLSearchParams, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

import { UtilityService } from '../shared/services/utility.service';

import { RestResponse} from '../shared/models';

@Injectable()
export class SchedulerManagementService {
    private _baseUrl = "rest/schedulerManagement"
    constructor(private _http: Http) { }

    /**
     * get all schedulers and their details
     * @author Roxana
     */
    getAllSchedulersRest(): Observable<RestResponse<any>> {
        return this._http.get(this._baseUrl)
            .map((res: Response) => res.json())
            .catch(UtilityService.handleError);
    }

    /**
     * save or update scheduler
     * @author Roxana
     */
    saveOrUpdateSchedulerRest(pageId: string, scheduler: any): Observable<RestResponse<any>> {
        return this._http.post(this._baseUrl + "?pageId=" + pageId, JSON.stringify(scheduler))
            .map((res: Response) => res.json())
            .catch(UtilityService.handleError);
    }

    /**
     * stop scheduler
     * @author Roxana
     */
    stopSchedulerRest(schedulerName: String): Observable<RestResponse<any>> {
        return this._http.post(this._baseUrl + "/stopScheduler", { "schedulerName": schedulerName })
            .map((res: Response) => res.json())
            .catch(UtilityService.handleError);
    }

    /**
     * delete scheduler
     * @author Roxana
     */
    deleteSchedulerRest(schedulerName: string): Observable<RestResponse<any>> {
        return this._http.delete(this._baseUrl + "/deleteScheduler/" + schedulerName)
            .map((res: Response) => res.json())
            .catch(UtilityService.handleError);
    }

    /**
     * remove scheduler parameter
     * @author Roxana
     */
    removeParameterRest(schedulerName: string, paramId: number): Observable<RestResponse<any>> {
        return this._http.delete(this._baseUrl + "/deleteParameters/" + schedulerName + "/" + paramId)
            .map((res: Response) => res.json())
            .catch(UtilityService.handleError);
    }

}