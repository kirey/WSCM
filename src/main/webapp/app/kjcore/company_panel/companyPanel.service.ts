import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { UtilityService } from '../shared/services/utility.service';

import { CompanyDetails, Company, CompanyCss } from './models';

import { RestResponse } from './../shared/models';

@Injectable()
export class CompanyPanelService {
    pageId: string;
    baseUrl: string;

    constructor(private _http: Http) {
        this.baseUrl = 'rest/adminCompanies';
        this.pageId = 'adminCompanies';
    };


    /**
     * GET call to retrieve company details of current user
     * @author Mario Petrovic
     */
    getCompanyRest(): Observable<RestResponse<any>> {
        return this._http.get(this.baseUrl + '/company')
            .map(UtilityService.handleSuccess)
            .catch(UtilityService.handleError);
    }

    /**
     * PUT call update company details of current user
     * @author Mario Petrovic
     */
    updateCompanyRest(company: Company): Observable<RestResponse<any>> {
        return this._http.put(this.baseUrl + '/company?pageId=' + this.pageId, company)
            .map(UtilityService.handleSuccess)
            .catch(UtilityService.handleError);
    }

    /**
     * PUT call to reset company style to previous
     * @author Mario Petrovic
     */
    resetCompanyStyleToPreviousRest(id: number): Observable<RestResponse<any>> {
        return this._http.put(this.baseUrl + '/company/resetToPreviousCss', '')
            .map(UtilityService.handleSuccess)
            .catch(UtilityService.handleError);
    }


    /**
     * PUT call to reset company style to default
     * @author Mario Petrovic
     */
    resetCompanyStyleToDefault(): Observable<RestResponse<any>> {
        return this._http.put(this.baseUrl + '/company/resetToDefaultCss/', '')
            .map(UtilityService.handleSuccess)
            .catch(UtilityService.handleError);
    }

    /**
     * POST call to update default company css
     * @author Mario Petrovic
     */
    updateCompanyCssRest(newCss: CompanyCss[]): Observable<RestResponse<any>> {
        return this._http.post(this.baseUrl + '/company/newCompanyCss/', newCss)
            .map(UtilityService.handleSuccess)
            .catch(UtilityService.handleError);
    }
}