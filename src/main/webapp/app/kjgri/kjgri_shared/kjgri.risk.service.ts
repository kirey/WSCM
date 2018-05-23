import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { UtilityService } from '../../kjcore/shared/services/utility.service';

import { RestResponse } from "./../../kjcore/shared/models";

@Injectable()
export class RiskManagementService {
    private baseUrl: string = 'rest/admin/risks';

    constructor(public _http: Http) {}

    /**
     * GET Call for getting all available risks
     * @author Nikola Gavric
     */
    getAllRisks(): Observable<RestResponse<any>> {
        return this._http.get(this.baseUrl+'/initialized?pageId=risks')
            .map(UtilityService.handleSuccess)
            .catch(UtilityService.handleError);
    }

    /**
     * GET Call for getting all available risks
     * @author Nikola Gavric
     */
    getAllSubRisks(id: number): Observable<RestResponse<any>> {
        return this._http.get(this.baseUrl + '/' + id + '/subrisks?pageId=risks')
            .map(UtilityService.handleSuccess)
            .catch(UtilityService.handleError);
    }

    /**
     * POST Call for creating a risk
     * @author Nikola Gavric
     */
    private createRisk(data: any): Observable<RestResponse<any>> {
        return this._http.post(this.baseUrl + '?pageId=risks', data)
            .map(UtilityService.handleSuccess)
            .catch(UtilityService.handleError);
    }

    /**
     * PUT Call for updating a risk
     * @author Nikola Gavric
     */
    private updateRisk(data: any): Observable<RestResponse<any>> {
        return this._http.put(this.baseUrl + '?pageId=risks', data)
            .map(UtilityService.handleSuccess)
            .catch(UtilityService.handleError);
    }

    /**
     * Create/Update call for risks
     * @author Nikola Gavric
     */
    createOrUpdateRisk(data: any): Observable<RestResponse<any>> {
        if(data.id) return this.updateRisk(data);
        else return this.createRisk(data);
    }

    /**
     * DELETE call for risk
     * @author Nikola Gavric
     */
    removeRisk(data: any): Observable<RestResponse<any>> {
        return this._http.delete(this.baseUrl + '/' + data.id + '?pageId=risks')
            .map(UtilityService.handleSuccess)
            .catch(UtilityService.handleError);
    }

    /**
     * POST Call for creating a risk subtype
     * @author Nikola Gavric
     */
    private createRiskSubtype(data: any): Observable<RestResponse<any>> {
        return this._http.post(this.baseUrl+'/subrisks?pageId=risks', data)
            .map(UtilityService.handleSuccess)
            .catch(UtilityService.handleError);
    }

    /**
     * PUT Call for updating a risk subtype
     * @author Nikola Gavric
     */
    private updateRiskSubtype(data: any): Observable<RestResponse<any>> {
        return this._http.put(this.baseUrl+'/subrisks?pageId=risks', data)
            .map(UtilityService.handleSuccess)
            .catch(UtilityService.handleError);
    }

    /**
     * Create/Update call for risk subtypes
     * @author Nikola Gavric
     */
    createOrUpdateRiskSubtype(data: any): Observable<RestResponse<any>> {
        if(data.id) return this.updateRiskSubtype(data);
        else return this.createRiskSubtype(data);
    }

    /**
     * DELETE call for risk subtype
     * @author Nikola Gavric
     */
    removeRiskSubtype(data: any): Observable<RestResponse<any>> {
        return this._http.delete(this.baseUrl + '/subrisks/' + data.id + '?pageId=risks')
            .map(UtilityService.handleSuccess)
            .catch(UtilityService.handleError);
    }
}
