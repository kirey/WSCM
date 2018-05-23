import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import { CompanyCss } from "./../../kjcore/company_management/models/companyCss.model";
import { UtilityService } from '../../kjcore/shared/services/utility.service';
import { RestResponse } from '../../kjcore/shared/models';

import { KJGriCompany, CompanyLocation, QueryParams, KJGriCompanyDetails, Package } from './models';

import { PaginationTableResult } from "./../kjgri_shared/models";

import { PolygonFeature } from "./../kjgri_home/models/polygonFeature.model";

@Injectable()
export class KJGriCompanyManagementService {
    pageId: string;
    baseUrl: string;
    private nominaticAddressSearchBaseUrl: string;

    /* ----------- Constructor ---------- */
    constructor(
        private _http: Http,
        private _utilityService: UtilityService
    ) {
        this.baseUrl = 'rest/admin/companies';
        this.pageId = 'kjgriAdminCompanies';
        this.nominaticAddressSearchBaseUrl = 'http://nominatim.openstreetmap.org/search';
    };

    /* --------------- GET --------------- */

    /**
     * GET call for retrieval of all companies and their details
     * @author Mario Petrovic
     */
    getAllCompaniesRest(queryParams: QueryParams): Observable<RestResponse<PaginationTableResult<KJGriCompany>>> {
        var url = this._utilityService.generateUrlWithQueryParams(this.baseUrl, queryParams)

        return this._utilityService.getRequest(url);
    }

    /**
     * GET call for retrieval of all companies and their details
     * @author Mario Petrovic
     */
    getPackages(companyType: string): Observable<RestResponse<Package[]>> {
        var url = this._utilityService.generateUrlWithQueryParams(this.baseUrl + '/packagesType', {
            companyType: companyType
        })

        return this._utilityService.getRequest(url);
    }

    /**
     * GET call for retrieval of company profile (in case of super admin, that is default company)
     * @author Mario Petrovic
     */
    getDefaultCompanyRest(): Observable<RestResponse<KJGriCompanyDetails>> {
        var url = this._utilityService.generateUrlWithQueryParams(this.baseUrl + '/defaultCompany')

        return this._utilityService.getRequest(url);
    }

    /**
     * GET call for retrieval of company profile by id
     * @author Mario Petrovic
     */
    getCompanyProfileByIdRest(id: number): Observable<RestResponse<KJGriCompanyDetails>> {
        var url = this._utilityService.generateUrlWithQueryParams(this.baseUrl + '/' + id)

        return this._utilityService.getRequest(url);
    }

    /**
     * GET call for retrieval of list of company's locations
     * @author Mario Petrovic
     */
    getCompanyLocationsById(id: number): Observable<RestResponse<CompanyLocation[]>> {
        var url = this._utilityService.generateUrlWithQueryParams(this.baseUrl + '/locations/' + id);

        return this._utilityService.getRequest(url);
    }

    /**
     * GET call for retrieval of all joined companies.
     * @author Nikola Gavric
     */
    getJoinedCompanies(companyId: number): Observable<RestResponse<any>> {
        var url = this._utilityService.generateUrlWithQueryParams(this.baseUrl + '/superdamin/join', {
            id: companyId
        });

        return this._utilityService.getRequest(url);
    }

    /**
     * GET call for retrieval of all client companies.
     * @author Nikola Gavric
     */
    getClientCompanies(): Observable<RestResponse<any>> {
        var url = this._utilityService.generateUrlWithQueryParams(this.baseUrl + '/client');

        return this._utilityService.getRequest(url);
    }

    /**
     * GET call for retrieval of all insurance companies.
     * @author Nikola Gavric
     */
    getInsuranceCompanies(): Observable<RestResponse<any>> {
        var url = this._utilityService.generateUrlWithQueryParams(this.baseUrl + '/insurance');

        return this._utilityService.getRequest(url);
    }

    /**
     * GET call for retrieval of geolocations for the map
     * @author Nikola Gavric
     */
    getGeolocations(searchData: { longitude1: number, latitude1: number, longitude2: number, latitude2: number }): Observable<RestResponse<any>> {
        var url = this._utilityService.generateUrlWithQueryParams(this.baseUrl + '/locations/draw', searchData);

        return this._utilityService.getRequest(url);
    }

    /* --------------- POST --------------- */
    /**
     * POST call for creating new company
     * @author Mario Petrovic
     */
    saveCompanyRest(newCompany: FormData): Observable<RestResponse<null>> {
        var url = this._utilityService.generateUrlWithQueryParams(this.baseUrl, {
            pageId: this.pageId
        });

        return this._utilityService.postRequest(url, newCompany)
    }

    /**
     * POST call to update default company css
     * @author Mario Petrovic
     */
    updateDefaultCssRest(defaultCss: CompanyCss[]): Observable<RestResponse<null>> {
        var url = this._utilityService.generateUrlWithQueryParams(this.baseUrl + '/newDefaultCss');

        return this._utilityService.postRequest(url, defaultCss)
    }

    /**
     * POST call to update default company css
     * @author Mario Petrovic
     */
    updateCompanyCssRest(id: number, defaultCss: CompanyCss[]): Observable<RestResponse<null>> {
        var url = this._utilityService.generateUrlWithQueryParams(this.baseUrl + '/newCompanyCss/' + id);

        return this._utilityService.postRequest(url, defaultCss)
    }

    /**
     * POST - upload company logo
     * @author Mario Petrovic
     */
    uploadCompanyLogoRest(companyLogo: FormData): Observable<RestResponse<null>> {
        var url = this._utilityService.generateUrlWithQueryParams(this.baseUrl + '/logo');

        return this._utilityService.postRequest(url, companyLogo)
    }

    /**
     * POST call to add new company location
     * @author Mario Petrovic
     */
    saveCompanyLocation(company: CompanyLocation, companyId: number): Observable<RestResponse<null>> {
        var url = this._utilityService.generateUrlWithQueryParams(this.baseUrl + '/locations/superadmin', {
            pageId: this.pageId,
            companyId: companyId
        });

        return this._utilityService.postRequest(url, company)
    }

    /**
     * POST call to add new company location
     * @author Mario Petrovic
     */
    connectCompany(clientId: number, insuranceId: number, flag: boolean): Observable<RestResponse<null>> {
        var url = this._utilityService.generateUrlWithQueryParams(this.baseUrl + '/superadmin/join', {
            clientId: clientId,
            insuranceId: insuranceId,
            flConsentToView: flag,
            pageId: this.pageId
        });

        return this._utilityService.postRequest(url, [])
    }


    /* --------------- PUT --------------- */
    /**
     * PUT call update company details
     * @author Mario Petrovic
     */
    updateCompanyRest(company: KJGriCompany): Observable<RestResponse<null>> {
        var url = this._utilityService.generateUrlWithQueryParams(this.baseUrl + '/?pageId=' + this.pageId);

        return this._utilityService.putRequest(url, company);
    }

    /**
     * PUT call update default company
     * @author Mario Petrovic
     */
    updateDefaultCompanyRest(company: KJGriCompany): Observable<RestResponse<null>> {
        var url = this._utilityService.generateUrlWithQueryParams(this.baseUrl + '/defaultCompany', {
            name: company.name,
            description: company.description
        });

        return this._utilityService.putRequest(url);
    }

    /**
     * PUT call to activate company
     * @author Mario Petrovic
     */
    updateCompanyStatusRest(id: Number, status: boolean): Observable<RestResponse<null>> {
        var url = this._utilityService.generateUrlWithQueryParams(this.baseUrl + '/' + id + '/' + status);

        return this._utilityService.putRequest(url);
    }

    /**
     * PUT call to reset default css to initial
     * @author Mario Petrovic
     */
    resetDefaultCssToInitRest(): Observable<RestResponse<null>> {
        var url = this._utilityService.generateUrlWithQueryParams(this.baseUrl + '/resetToInitialCss');

        return this._utilityService.putRequest(url);
    }

    /**
     * PUT call to reset company style to default
     * @author Mario Petrovic
     */
    resetCompanyStyleToDefault(id: number): Observable<RestResponse<null>> {
        var url = this._utilityService.generateUrlWithQueryParams(this.baseUrl + '/resetToDefaultCss/' + id);

        return this._utilityService.putRequest(url);
    }

    /**
     * PUT call to reset company style to previous
     * @author Mario Petrovic
     */
    resetCompanyStyleToPreviousRest(id: number): Observable<RestResponse<null>> {
        var url = this._utilityService.generateUrlWithQueryParams(this.baseUrl + '/resetToPreviousCss/' + id);

        return this._utilityService.putRequest(url);
    }

    /**
     * PUT call to update company location
     * @author Mario Petrovic
     */
    updateCompanyLocation(company: CompanyLocation, companyId: number): Observable<RestResponse<null>> {
        var url = this._utilityService.generateUrlWithQueryParams(this.baseUrl + '/locations/superadmin/' + companyId, {
            pageId: this.pageId
        });

        return this._utilityService.putRequest(url, company);
    }

    /**
     * PUT call
     * @author Nikola Gavric
     */
    updateInfoConsent(clientId: number, insuranceId: number, flag: boolean): Observable<RestResponse<null>> {
        var url = this._utilityService.generateUrlWithQueryParams(this.baseUrl + '/join', {
            clientId: clientId,
            insuranceId: insuranceId,
            flag: flag
        });

        return this._utilityService.putRequest(url);
    }

    /* --------------- DELETE --------------- */
    /**
     * DELETE call for detaching insurance company
     * @author Nikola Gavric
     */
    detachCompany(clientId: number, insuranceId: number): Observable<RestResponse<null>> {
        var url = this._utilityService.generateUrlWithQueryParams(this.baseUrl + '/join', {
            clientId: clientId,
            insuranceId: insuranceId
        });

        return this._utilityService.deleteRequest(url);
    }

    /**
     * Searches the external server for results
     * Must not exceed https://operations.osmfoundation.org/policies/nominatim/ usage
     * 
     * @param data any
     * @author Nikola Gavric
     */
    searchAddress(data: any): Observable<any> {
        let url = this._utilityService.generateUrlWithQueryParams(this.nominaticAddressSearchBaseUrl, {
            q: data, 
            format: 'json', 
            dedupe: 1, 
            polygon_geojson: 1, 
            addressdetails: 1,
            limit: 10
        });
        return this._http.get(url)
            .map(res => res.json())
            .catch(UtilityService.handleError);
    }
}