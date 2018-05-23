import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { UtilityService } from '../../kjcore/shared/services/utility.service';

import { RestResponse } from "./../../kjcore/shared/models";

@Injectable()
export class KJGriHistoryService {
    private baseUrl: string = 'rest/history/clients';

    constructor(
        private _http: Http,
        private _utilityService: UtilityService
    ) { }

    /**
     * GET Call - Returns client companies
     * @author Nikola Gavric
     */
    getClientCompanies(): Observable<RestResponse<any>> {
        return this._http.get(this.baseUrl + '/clientCompanies')
            .map(UtilityService.handleSuccess)
            .catch(UtilityService.handleError);
    }

    /**
     * GET Call - Returns all styles for indexes
     * @author Nikola Gavric
     */
    getAllStyles(selectedModuleFlag: string): Observable<RestResponse<any>> {
        var url = this._utilityService.generateUrlWithQueryParams(this.baseUrl + '/styles', {
            rfFlag: selectedModuleFlag.toUpperCase()
        })
        
        return this._utilityService.getRequest(url);
    }

    /**
     * GET Call - Returns company locations based on a company id
     * @author Nikola Gavric
     */
    getCompanyLocations(company?: any): Observable<RestResponse<any>> {
        let companyIdString = '';
        if (company) companyIdString = '?clientCompanyId=' + company.id;

        return this._http.get(this.baseUrl + '/clientLocations' + companyIdString)
            .map(UtilityService.handleSuccess)
            .catch(UtilityService.handleError);
    }

    /**
     * GET Call - Returns alerts based on a location id
     * @author Nikola Gavric
     */
    getCompanyAlerts(location: any, dateFrom?: Date, dateTo?: Date): Observable<RestResponse<any>> {
        let dateFromString = '';
        let dateToString = '';
        let locationIdString = '';

        if (dateFrom) dateFromString = '&dateFrom=' + dateFrom.getTime();
        if (dateTo) dateToString = '&dateTo=' + dateTo.getTime();
        if (location) locationIdString = '&locationId=' + location.id;

        let url = this.baseUrl + '/locationAlerts?' + dateFromString + dateToString + locationIdString;

        return this._http.get(url)
            .map(UtilityService.handleSuccess)
            .catch(UtilityService.handleError);
    }

    /**
     * GET Call - Returns base64 of all PDF's found
     * @author Nikola Gavric
     */
    getPDFs(locationId: number, dateFrom?: Date, dateTo?: Date): Observable<RestResponse<any>> {
        let dateFromString = '';
        let dateToString = '';

        if (dateFrom) dateFromString = '&dateFrom=' + dateFrom.getTime();
        if (dateTo) dateToString = '&dateTo=' + dateTo.getTime();

        let url = this.baseUrl + '/plans?locationId=' + locationId + dateFromString + dateToString;

        return this._http.get(url)
            .map(UtilityService.handleSuccess)
            .catch(UtilityService.handleError);
    }

    /**
     * GET Call - Returns risk indexes based on a location id and risk subtype id
     * @author Nikola Gavric
     */
    getRiskIndexes(locationId: number, dateFrom?: Date, dateTo?: Date): Observable<RestResponse<any>> {
        let dateFromString = '';
        let dateToString = '';

        if (dateFrom) dateFromString = '&dateFrom=' + dateFrom.getTime();
        if (dateTo) dateToString = '&dateTo=' + dateTo.getTime();

        let url = this.baseUrl + '/riskIndexes?locationId=' + locationId + dateFromString + dateToString;

        return this._http.get(url)
            .map(UtilityService.handleSuccess)
            .catch(UtilityService.handleError);
    }

    /**
     * GET Call - Returns forecast indexes based on a location id and risk subtype id
     * @author Nikola Gavric
     */
    getForecast(locationId: number, dateFrom?: Date, dateTo?: Date): Observable<RestResponse<any>> {
        let dateFromString = '';
        let dateToString = '';

        if (dateFrom) dateFromString = '&dateFrom=' + dateFrom.getTime();
        if (dateTo) dateToString = '&dateTo=' + dateTo.getTime();

        let url = this.baseUrl + '/forecastIndexes?locationId=' + locationId + dateFromString + dateToString;

        return this._http.get(url)
            .map(UtilityService.handleSuccess)
            .catch(UtilityService.handleError);
    }

    /**
     * GET Call for getting all available risks
     * @author Nikola Gavric
     */
    getAllRisks(): Observable<RestResponse<any>> {
        return this._http.get(this.baseUrl + '/initialized')
            .map(UtilityService.handleSuccess)
            .catch(UtilityService.handleError);
    }

    /**
     * Call for preview of an object
     * @author Nikola Gavric
     */
    previewObject(id: number, type: string): Observable<RestResponse<any>> {
        if (type == 'pdf') {
            return this._http.get(this.baseUrl + '/planDocument?id=' + id, [])
                .map(UtilityService.handleSuccess)
                .catch(UtilityService.handleError);
        }
    }
}
