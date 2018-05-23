import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { UtilityService } from '../shared/services/utility.service';

import { CompanyDetails, Company, CompanyCss } from './models';

import { RestResponse } from './../shared/models';

@Injectable()
export class CompanyManagementService {
    pageId: string;
    baseUrl: string;

    constructor(
        private _http: Http,
        private _utilityService: UtilityService
    ) {
        this.baseUrl = 'rest/adminCompanies';
        this.pageId = 'adminCompanies';
    };


    /**
     * GET call for retrieval of all companies and their details
     * @author Mario Petrovic
     */
    getAllCompaniesRest(): Observable<RestResponse<any>> {
        return this._http.get(this.baseUrl + '/superAdmin/company')
            .map(UtilityService.handleSuccess)
            .catch(UtilityService.handleError);
    }

    /**
     * GET call for retrieval of company profile (in case of super admin, that is default company)
     * @author Mario Petrovic
     */
    getDefaultCompanyRest(): Observable<RestResponse<any>> {
        return this._http.get(this.baseUrl + '/company')
            .map(UtilityService.handleSuccess)
            .catch(UtilityService.handleError);
    }

    /**
     * GET call for retrieval of company profile by id
     * @author Mario Petrovic
     */
    getCompanyProfileByIdRest(id: number): Observable<RestResponse<any>> {
        return this._http.get(this.baseUrl + '/superAdmin/company/' + id)
            .map(UtilityService.handleSuccess)
            .catch(UtilityService.handleError);
    }

    /**
     * PUT call update company details
     * @author Mario Petrovic
     */
    updateCompanyRest(company: Company): Observable<RestResponse<any>> {
        return this._http.put(this.baseUrl + '/superAdmin/company?pageId=' + this.pageId, company)
            .map(UtilityService.handleSuccess)
            .catch(UtilityService.handleError);
    }

    /**
     * PUT call update default company
     * @author Mario Petrovic
     */
    updateDefaultCompanyRest(company: Company): Observable<RestResponse<any>> {
        return this._http.put(
            this.baseUrl + '/defaultCompany' + this._utilityService.generateQueryParams({
                name: company.name,
                description: company.description
            }), '')
            .map(UtilityService.handleSuccess)
            .catch(UtilityService.handleError);
    }

    /**
     * POST call for creating new company
     * @author Mario Petrovic
     */
    saveCompanyRest(newCompany: FormData): Observable<RestResponse<any>> {
        return this._http.post(this.baseUrl + '/superAdmin/company?pageId=' + this.pageId, newCompany)
            .map(UtilityService.handleSuccess)
            .catch(UtilityService.handleError);
    }

    /**
     * PUT call to activate company
     * @author Mario Petrovic
     */
    updateCompanyStatusRest(id: Number, status: boolean): Observable<RestResponse<any>> {
        return this._http.put(this.baseUrl + '/superAdmin/company/' + id + '/' + status, '')
            .map(UtilityService.handleSuccess)
            .catch(UtilityService.handleError);
    }

    /**
     * POST call to update default company css
     * @author Mario Petrovic
     */
    updateDefaultCssRest(defaultCss: CompanyCss[]): Observable<RestResponse<any>> {
        return this._http.post(this.baseUrl + '/superAdmin/newDefaultCss', defaultCss)
            .map(UtilityService.handleSuccess)
            .catch(UtilityService.handleError);
    }

    /**
     * POST call to update default company css
     * @author Mario Petrovic
     */
    updateCompanyCssRest(id: number, defaultCss: CompanyCss[]): Observable<RestResponse<any>> {
        return this._http.post(this.baseUrl + '/superAdmin/company/newCompanyCss/' + id, defaultCss)
            .map(UtilityService.handleSuccess)
            .catch(UtilityService.handleError);
    }

    /**
     * PUT call to reset default css to initial
     * @author Mario Petrovic
     */
    resetDefaultCssToInitRest(): Observable<RestResponse<any>> {
        return this._http.put(this.baseUrl + '/superAdmin/resetToInitialCss', '')
            .map(UtilityService.handleSuccess)
            .catch(UtilityService.handleError);
    }

    /**
     * PUT call to reset company style to default
     * @author Mario Petrovic
     */
    resetCompanyStyleToDefault(id: number): Observable<RestResponse<any>> {
        return this._http.put(this.baseUrl + '/superAdmin/company/resetToDefaultCss/' + id, '')
            .map(UtilityService.handleSuccess)
            .catch(UtilityService.handleError);
    }

    /**
     * PUT call to reset company style to previous
     * @author Mario Petrovic
     */
    resetCompanyStyleToPreviousRest(id: number): Observable<RestResponse<any>> {
        return this._http.put(this.baseUrl + '/superAdmin/company/resetToPreviousCss/' + id, '')
            .map(UtilityService.handleSuccess)
            .catch(UtilityService.handleError);
    }

    /**
     * POST - upload company logo
     * @author Mario Petrovic
     */
    uploadCompanyLogoRest(companyLogo: FormData): Observable<RestResponse<any>> {
        return this._http.post(this.baseUrl + '/company/logo', companyLogo)
            .map(UtilityService.handleSuccess)
            .catch(UtilityService.handleError);
    }
}