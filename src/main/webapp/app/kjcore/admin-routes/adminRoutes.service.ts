import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { UtilityService } from '../shared/services/utility.service';
import { RestResponse, UserRoute } from '../shared/models';

import { Role } from "./../admin/users/models";

@Injectable()
export class AdminRoutesService {
    baseUrl: string;
    pageId: string;

    /* --------------- Constructor --------------- */
    constructor(
        private _http: Http,
        private _utilityService: UtilityService
    ) {
        this.baseUrl = 'rest/adminRoute';
        this.pageId = 'routes';
    }


    /* --------------- GET --------------- */
    /**
     * Rest GET call for all routes
     * @author Stefan Svrkota
     */
    getRoutesRest(): Observable<RestResponse<UserRoute[]>> {
        var url = this._utilityService.generateUrlWithQueryParams(this.baseUrl, {
            pageId: this.pageId
        });

        return this._utilityService.getRequest(url);
    }

    /**
     * Rest GET call for all roles
     * @author Stefan Svrkota
     */
    getRolesRest(): Observable<RestResponse<Role[]>> {
        var url = this._utilityService.generateUrlWithQueryParams(this.baseUrl + "/roles", {
            pageId: this.pageId
        });
        return this._utilityService.getRequest(url);
    }


    /* --------------- POST --------------- */
    /**
     * Rest POST call for route adding
     * @author Stefan Svrkota
     */
    postRouteRest(route: any): Observable<RestResponse<null>> {
        var url = this._utilityService.generateUrlWithQueryParams(this.baseUrl, {
            pageId: this.pageId
        });
        return this._utilityService.postRequest(url, route);
    }

    /* --------------- PUT --------------- */
    /**
     * Rest PUT call for route editing
     * @author Stefan Svrkota
     */
    editRouteRest(route: any): Observable<RestResponse<null>> {
        var url = this._utilityService.generateUrlWithQueryParams(this.baseUrl, {
            pageId: this.pageId
        });
        return this._utilityService.putRequest(url, route);
    }

    /* --------------- DELETE --------------- */
    /**
     * Rest POST call for route deleting
     * @author Stefan Svrkota
     */
    deleteRouteRest(routeId: number): Observable<RestResponse<null>> {
        var url = this._utilityService.generateUrlWithQueryParams(this.baseUrl + "/" + routeId, {
            pageId: this.pageId
        });
        return this._utilityService.deleteRequest(url);
    }
}