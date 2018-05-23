import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import { UtilityService } from '../../kjcore/shared/services/utility.service';

import { RestResponse } from '../../kjcore/shared/models';

import { AttachForm, InsuranceCompany } from "./models";

/**
 * Service for insurance comapnies management component
 * @author Mario Petrovic
 */
@Injectable()
export class InsuranceCompaniesService {
    pageId: string;
    baseUrl: string;

    constructor(
        private _http: Http,
        private _utilityService: UtilityService
    ) {
        this.baseUrl = 'rest/admin/companies';
        this.pageId = 'adminCompanies';
    };

    /* --------------- GET --------------- */

    /**
     * GET call for retrieval of insurance companies
     * @author Mario Petrovic
     */
    getInsuranceCompanies(): Observable<RestResponse<InsuranceCompany[]>> {
        return this._utilityService.getRequest(this.baseUrl + '/join')
    }


    /* --------------- POST --------------- */

    /**
     * POST call to attach loggedin user's company to insurance company
     * @author Mario Petrovic
     */
    attachToInsuranceCompany(attachForm: AttachForm): Observable<RestResponse<null>> {
        attachForm['pageId'] = 'kjgriAdminCompanies';
        var url = this._utilityService.generateUrlWithQueryParams(this.baseUrl + '/join', attachForm);
        
        return this._utilityService.postRequest(url);
    }


    /* --------------- PUT --------------- */
    /**
     * PUT call to allow insurance company to see info from loggedin user's company
     * @author Mario Petrovic
     */
    updateInfoConsent(insuranceId: number, flag: boolean): Observable<RestResponse<null>> {
        var url = this._utilityService.generateUrlWithQueryParams(this.baseUrl + '/join', {
            insuranceId: insuranceId,
            flag: flag
        });
        
        return this._utilityService.putRequest(url);
    }

    /* --------------- DELETE --------------- */

    /**
     * GET call for retrieval of all companies and their details
     * @author Mario Petrovic
     */
    detachFromInsuranceCompany(insuranceId: number): Observable<RestResponse<null>> {
        var url = this._utilityService.generateUrlWithQueryParams(this.baseUrl + '/join', {
            insuranceId: insuranceId
        });

        return this._utilityService.deleteRequest(url);
    }
}