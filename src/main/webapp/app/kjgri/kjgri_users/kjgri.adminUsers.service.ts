import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { UtilityService } from '../../kjcore/shared/services/utility.service';

import { RestResponse } from "./../../kjcore/shared/models";

import { Role } from "./../../kjcore/admin/users/models/role.model";
import { Company } from "./../../kjcore/company_management/models/company.model";

@Injectable()
export class KJGriAdminUserService {
    private baseUrl: string;
    pageId: string;

    /************** Constructor ***************** */
    constructor(
        private _http: Http,
        private _utilityService: UtilityService
    ) {
        this.baseUrl = 'rest/kjgriAdmin/users';
        this.pageId = 'roleUser';
    }

    /************** GET ***************** */

    /**
     * GET - Fetches all users
     * @author DynTech
     */
    getAllUsers(): Observable<RestResponse<any>> {
        return this._utilityService.getRequest(this.baseUrl);
    }

    /**
     * GET - Get roles by company id
     * @author Mario Petrovic
     */
    getRolesByCompanyId(companyId: number): Observable<RestResponse<Role[]>> {
        return this._utilityService.getRequest(this.baseUrl + '/role/' + companyId);
    }

    /**
     * GET - Get roles by logged in user
     * @author Mario Petrovic
     */
    getRolesByUserCompany(): Observable<RestResponse<Role[]>> {
        return this._utilityService.getRequest(this.baseUrl + '/client/role');
    }

    /**
     * GET - Loading all languages
     * @author Nikola Gavric
     */
    getLanguagesRest(): Observable<RestResponse<any>> {
        return this._utilityService.getRequest('rest/users/noAuth/availableLanguages');
    }

    /**
     * GET - Loading all filtered users as Company admin and Agent
     * @author Nikola Gavric
     */
    getFilteredUsers(filter: any): Observable<RestResponse<any>> {
        var url = this._utilityService.generateUrlWithQueryParams(this.baseUrl + '/filtered', {
            pageId: this.pageId,
            companyId: filter && filter.company ? filter.company.id : '',
            username: filter ? filter.username : ''
        });

        return this._utilityService.getRequest(url);
    }

    /**
     * GET - Loading all modal companies
     * based on logged in user role
     * @author Nikola Gavric
     */
    getActiveCompanies(): Observable<RestResponse<Company[]>> {
        return this._utilityService.getRequest(this.baseUrl + '/activeCompany');
    }

    /************** POST ***************** */

    /**
     * POST - Adding new user
     * @author DynTech
     */
    addUser(user): Observable<RestResponse<null>> {
        var url = this._utilityService.generateUrlWithQueryParams(this.baseUrl, {
            pageId: this.pageId
        });

        return this._utilityService.postRequest(url, user);
    }

    /************** PUT ***************** */

    /**
     * PUT - Enables or disables the user
     * @author DynTech
     */
    updateUserStatus(user): Observable<RestResponse<null>> {
        let status = (!user.enabled == false) ? 0 : 1;

        var url = this._utilityService.generateUrlWithQueryParams(this.baseUrl + '/enable/' + user.id, {
            checked: status,
            pageId: this.pageId
        });

        return this._utilityService.putRequest(url, user);
    }

    /**
     * PUT - Editing a user
     * @author DynTech
     */
    editUser(user): Observable<RestResponse<null>> {
        var url = this._utilityService.generateUrlWithQueryParams(this.baseUrl, {
            pageId: this.pageId
        });

        return this._utilityService.putRequest(url, user);
    }
}
