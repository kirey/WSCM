import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { UtilityService } from '../../kjcore/shared/services/utility.service';

import { RestResponse } from "./../../kjcore/shared/models";

@Injectable()
export class MeasuredStyleService {
    public baseUrl: string = 'rest/admin/styles/measure';

    constructor(private _http: Http) {}

    /**
     * GET Call for getting all available risks
     * @author Nikola Gavric
     */
    getAllDicStyles(): Observable<RestResponse<any>> {
        return this._http.get(this.baseUrl)
            .map(UtilityService.handleSuccess)
            .catch(UtilityService.handleError);
    }

    /**
     * GET Call for getting all available risks
     * @author Nikola Gavric
     */
    getAllMeasuredStyles(id: number): Observable<RestResponse<any>> {
        return this._http.get(this.baseUrl + '/' + id)
            .map(UtilityService.handleSuccess)
            .catch(UtilityService.handleError);
    }

    /**
     * POST Call for creating an alert
     * @author Nikola Gavric
     */
    private createMeasuredStyle(data: any, obj: any): Observable<RestResponse<any>> {
        let id = null;
        if(obj) id = obj.id;
        return this._http.post(this.baseUrl + '/' + id + '?pageId=riskIndexStyles', data)
            .map(UtilityService.handleSuccess)
            .catch(UtilityService.handleError);
    }

    /**
     * PUT Call for updating an alert
     * @author Nikola Gavric
     */
    private updateMeasuredStyle(data: any): Observable<RestResponse<any>> {
        return this._http.put(this.baseUrl + '?pageId=riskIndexStyles', data)
            .map(UtilityService.handleSuccess)
            .catch(UtilityService.handleError);
    }

    /**
     * Create/Update call for alerts
     * @author Nikola Gavric
     */
    createOrUpdateMeasuredStyle(data: any, obj?: any): Observable<RestResponse<any>> {
        if(data.id) return this.updateMeasuredStyle(data);
        else return this.createMeasuredStyle(data, obj);
    }

    /**
     * DELETE Call for removing an alert
     * @author Nikola Gavric
     */
    removeMeasuredStyle(data: any): Observable<RestResponse<any>> {
        return this._http.delete(this.baseUrl + '/' + data.id + '?pageId=riskIndexStyles')
            .map(UtilityService.handleSuccess)
            .catch(UtilityService.handleError);
    }
}