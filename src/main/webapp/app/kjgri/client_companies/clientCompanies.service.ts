import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import { UtilityService } from '../../kjcore/shared/services/utility.service';

import { CompanyQueryParams } from "./models";

import { RestResponse } from '../../kjcore/shared/models';
import { PaginationTableResult } from "./../kjgri_shared/models";
import { Company } from "./../../kjcore/company_management/models/company.model";

/**
 * Service for insurance comapnies management component
 * @author Mario Petrovic
 */
@Injectable()
export class ClientCompaniesService {
    pageId: string;
    baseUrl: string;

    constructor(
        private _http: Http,
        private _utilityService: UtilityService
    ) {
        this.baseUrl = 'rest/admin/companies';
    };

    /* --------------- GET --------------- */

    /**
     * GET call for retrieval of insurance companies
     * @author Mario Petrovic
     */
    getInsuranceCompanies(queryParams: CompanyQueryParams): Observable<RestResponse<PaginationTableResult<Company>>> {
        var url = this._utilityService.generateUrlWithQueryParams(this.baseUrl + '/insurance/clientCompanies', queryParams);

        return this._utilityService.getRequest(url);
    }


    /* --------------- DELETE --------------- */

    /**
     * DELETE call to detach from client company
     * @author Mario Petrovic
     */
    detachFromClientCompany(companyId: number): Observable<RestResponse<null>> {
        var url = this._utilityService.generateUrlWithQueryParams(this.baseUrl + '/insurance/clientCompanies/' + companyId);

        return this._utilityService.deleteRequest(url);
    }
}