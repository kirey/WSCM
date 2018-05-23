import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { UtilityService } from '../../kjcore/shared/services/utility.service';

import { RestResponse } from "./../../kjcore/shared/models";

import { Risk, CompanyLocationGeo, RiskIndexes, RiskIndex, GeolocationSearchData, MeasurementType, PolygonFeature } from "./models";
import { CompanyLocation, KJGriCompany } from "./../kjgri_company_management/models";

import { Style } from "./../style_management/models";

/**
 * Service for Home page component
 * @author Mario Petrovic
 */
@Injectable()
export class KJGriHomeService {
    private baseUrl: string;
    private nominaticAddressSearchBaseUrl: string;

    constructor(
        private _http: Http,
        private _utilityService: UtilityService) {
        this.baseUrl = 'rest/admin/home';
        this.nominaticAddressSearchBaseUrl = 'http://nominatim.openstreetmap.org/search';
    }

    /* --------------- GET --------------- */
    /**
     * GET - Retrieve risks based on type
     * @author Mario Petrovic
     */
    getRisksByType(type: string): Observable<RestResponse<Risk[]>> {
        var url = 'rest/client/risks/subrisks/' + type;

        return this._utilityService.getRequest(url);
    }

    /**
     * GET - Retrieves list of clinet companies filtered by name
     * @author Mario Petrovic
     */
    getFilteredClientCompanies(searchName: string): Observable<RestResponse<KJGriCompany[]>> {
        var url = this._utilityService.generateUrlWithQueryParams(this.baseUrl + '/clientCompanies', {
            companyName: searchName
        })

        return this._utilityService.getRequest(url);
    }

    /**
     * GET - Retrieves list of clinet locations based on search criterias
     * @author Mario Petrovic
     */
    getClientLocations(searchData: { clientCompanyId: number, typeId: number, rfFlag: string, targetTimestamp: number }): Observable<RestResponse<CompanyLocationGeo[]>> {
        var url = this._utilityService.generateUrlWithQueryParams(this.baseUrl + '/clientLocations', searchData);

        return this._utilityService.getRequest(url);
    }

    /**
     * GET - Retrieves list of clinet locations based on search criterias
     * @author Mario Petrovic
     */
    getGeolocations(searchData: GeolocationSearchData): Observable<RestResponse<any>> {
        var url = this._utilityService.generateUrlWithQueryParams(this.baseUrl, searchData);

        return this._utilityService.getRequest(url);
    }

    /**
     * GET - Retrieves list of risks for chosen spot on the map 
     * @author Mario Petrovic
     */
    getAllRiskIndexesForLocation(data: any): Observable<RestResponse<RiskIndexes>> {
        var url = this._utilityService.generateUrlWithQueryParams(this.baseUrl + '/geolocations', {
            istat: data['istat'],
            sub: data['sub'],
            targetTimestamp: data['timestamp'],
            longitude: data['longitude'],
            latitude: data['latitude'],
            typeId: data['typeId'],
            rfFlag: data['rfFlag']
        });

        return this._utilityService.getRequest(url);
    }

    /**
     * GET - Retrieves list of locations for company of the loggedin user 
     * @author Mario Petrovic
     */
    getClientLocationsByContext(searchData: { typeId: number, rfFlag: string, targetTimestamp: number }): Observable<RestResponse<CompanyLocationGeo[]>> {
        var url = this._utilityService.generateUrlWithQueryParams(this.baseUrl + '/locations', searchData);

        return this._utilityService.getRequest(url);
    }

    /**
     * GET - Retrieves list of risks for choosen company location
     * @author Mario Petrovic
     */
    getAllRiskIndexesForCompanyLocation(data): Observable<RestResponse<RiskIndexes>> {
        var url = this._utilityService.generateUrlWithQueryParams(this.baseUrl + '/client/locations', {
            companyLocationId: data['companyLocationId'],
            targetTimestamp: data['targetTimestamp'],
            typeId: data['typeId'],
            rfFlag: data['rfFlag']
        });

        return this._utilityService.getRequest(url);
    }

    /**
     * GET - Retrieves list of risk history for location
     * @author Mario Petrovic
     */
    getRiskHistory(locationId: number, typeId: number, rfFlag: string): Observable<RestResponse<RiskIndex[]>> {
        var url = this._utilityService.generateUrlWithQueryParams(this.baseUrl + '/history', {
            locationId: locationId,
            typeId: typeId,
            rfFlag: rfFlag
        });

        return this._utilityService.getRequest(url);
    }

    /**
     * GET - Retrieves list of risk history for selected location from the map
     * @author Mario Petrovic
     */
    getRiskHistoryForLocation(searchData: { istat: string, sub: string, typeId: number, rfFlag: string, longitude: number, latitude: number }): Observable<RestResponse<RiskIndex[]>> {
        var url = this._utilityService.generateUrlWithQueryParams(this.baseUrl + '/geolocationHistory', {
            istat: searchData.istat,
            sub: searchData.sub,
            typeId: searchData.typeId,
            rfFlag: searchData.rfFlag,
            longitude: searchData.longitude,
            latitude: searchData.latitude
        });

        return this._utilityService.getRequest(url);
    }

    /**
     * GET - Retrieves list of risk index styles
     * @author Mario Petrovic
     */
    getRiskIndexStypes(searchData: { rfFlag: string, typeId: number }): Observable<RestResponse<Style[]>> {
        var url = this._utilityService.generateUrlWithQueryParams('rest/history/clients/styles', searchData);

        return this._utilityService.getRequest(url);
    }

    /**
     * GET - Retrieves measurement types
     * @author Mario Petrovic
     */
    getMeasurementTypes(): Observable<RestResponse<MeasurementType[]>> {
        return this._utilityService.getRequest(this.baseUrl + '/measureType');
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

    /**
     * GET call to return min and max date
     * for date picker under the map.
     * 
     * @author Nikola Gavric
     */
    getMinAndMaxDates(): Observable<any> {
        return this._utilityService.getRequest(this.baseUrl + '/minMax');
    }
}
