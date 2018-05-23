import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { UtilityService } from '../../shared/services/utility.service';

import { RestResponse } from "./../../shared/models";

import { Role } from "./../users/models";

@Injectable()
export class AdminRoleService {
    private baseUrl: string;
    pageId: string;

    /*************** Constructor ***************/
    constructor(
        private _http: Http,
        private _utilityService: UtilityService
        ) {
        this.baseUrl = 'rest/admin/users'
        this.pageId = 'roleUser';
    }

    /***************** GET ******************/
    /**
     * Fetches all roles
     * @author Mario Petrovic
     */
    getAllRolesSuperAdmin(): Observable<RestResponse<Role[]>> {
        var url = this._utilityService.generateUrlWithQueryParams(this.baseUrl + '/role', {
            pageId: this.pageId
        });

        return this._utilityService.getRequest(url);
    }

    /***************** POST ******************/
    /**
     * Adding a role
     * @author DynTech
     */
    addRole(role: Role): Observable<RestResponse<null>> {
        var url = this._utilityService.generateUrlWithQueryParams(this.baseUrl + '/role', {
            pageId: this.pageId
        });

        return this._utilityService.postRequest(url, role);
    }

    /***************** PUT ******************/
    /**
     * Editing a role
     * @author DynTech
     */
    editRole(role: Role): Observable<RestResponse<null>> {
        var url = this._utilityService.generateUrlWithQueryParams(this.baseUrl + '/role', {
            pageId: this.pageId
        });

        return this._utilityService.putRequest(url, role);
    }

    /***************** DELETE ******************/
    /**
     * Removing a role
     * @author DynTech
     */
    deleteRole(role: Role): Observable<RestResponse<null>> {
        var url = this._utilityService.generateUrlWithQueryParams(this.baseUrl + '/role/' + role.id, {
            pageId: this.pageId
        });

        return this._utilityService.deleteRequest(url, role);
    }
}