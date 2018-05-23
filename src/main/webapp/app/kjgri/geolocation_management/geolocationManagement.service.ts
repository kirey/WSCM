import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { UtilityService } from '../../kjcore/shared/services/utility.service';

import { RestResponse } from "./../../kjcore/shared/models";

import { PaginationTableResult } from "./../kjgri_shared/models";

import { Geolocation, SearchQueryParams } from "./models";

/**
 * Service for geolocation management component
 * @author Nikola Gavric
 */
@Injectable()
export class GeolocationManagementService {
    baseUrl: string;

    /* --------------- Constructor --------------- */
    constructor(
        private _http: Http,
        private _utilityService: UtilityService
    ) {
        this.baseUrl = 'rest/admin/geolocations';
    }

    /* --------------- GET --------------- */
    /**
     * GET - retrieves geolocation by search parameters and pagination
     * @author Mario Petrovic
     */
    getAllGeolocations(istat: string): Observable<RestResponse<Geolocation[]>> {
        var url = this._utilityService.generateUrlWithQueryParams(this.baseUrl + '/near', {
            istat: istat
        });

        return this._utilityService.getRequest(url);
    }

    /**
     * GET - retrieves geolocation as polygons for map drawing
     * @author Mario Petrovic
     */
    getMapGeolocations(geolocationSearchData: { longitude1: number, latitude1: number, longitude2: number, latitude2: number }): Observable<RestResponse<any>> {
        var url = this._utilityService.generateUrlWithQueryParams(this.baseUrl + '/draw', geolocationSearchData);

        return this._utilityService.getRequest(url);
    }

    /**
     * GET - retrieves geolocation by coordinates picked from the map or inputed in the form
     * @author Mario petrovic
     */
    getGeolocationByCoordinates(geolocationInfo: { istat: string, sub: string }): Observable<RestResponse<Geolocation>> {
        var url = this._utilityService.generateUrlWithQueryParams(this.baseUrl + '/geolocation', geolocationInfo);

        return this._utilityService.getRequest(url);
    }
}