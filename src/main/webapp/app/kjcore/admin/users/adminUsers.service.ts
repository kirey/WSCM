import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { UtilityService } from '../../shared/services/utility.service';

import { RestResponse } from "./../../shared/models";

@Injectable()
export class AdminUserService {
    private baseUrl: string;

    constructor(private _http: Http) {
        this.baseUrl = 'rest/admin/users'
    }

    /**
     * GET - Fetches all users
     * @author DynTech
     */
    getAllUsers(): Observable<RestResponse<any>> {
        return this._http.get(this.baseUrl)
            .map(UtilityService.handleSuccess)
            .catch(UtilityService.handleError);
    }

    /**
     * PUT - Enables or disables the user
     * @author DynTech
     */
    updateUserStatus(user): Observable<RestResponse<any>> {
        let status = (!user.enabled == false) ? 0 : 1;
        return this._http.put(this.baseUrl + "/enable/" + user.id + "?checked=" + status + "&pageId=roleUser", "")
            .map(UtilityService.handleSuccess)
            .catch(UtilityService.handleError);
    }

    /**
     * PUT - Editing a user
     * @author DynTech
     */
    editUser(user): Observable<RestResponse<any>> {
        return this._http.put(this.baseUrl + "?pageId=roleUser", JSON.stringify(user))
            .map(UtilityService.handleSuccess)
            .catch(UtilityService.handleError);
    }

    /**
     * POST - Adding new user
     * @author DynTech
     */
    addUser(user): Observable<RestResponse<any>> {
        return this._http.post(this.baseUrl + "?pageId=roleUser", JSON.stringify(user))
            .map(UtilityService.handleSuccess)
            .catch(UtilityService.handleError);
    }

    /**
     * GET - Loading all languages
     * @author Nikola Gavric
     */
    getLanguagesRest(): Observable<RestResponse<any>> {
        return this._http.get('rest/users/noAuth/availableLanguages')
            .map(UtilityService.handleSuccess)
            .catch(UtilityService.handleError);
    }

    /**
     * GET - Loading all filtered users as Company admin and Agent
     * @author Nikola Gavric
     */
    getFilteredUsers(filter: any): Observable<RestResponse<any>> {
        return this._http.get(this.baseUrl + '/filtered?pageId=roleUser&company=' + filter.company + '&role=' + filter.role + '&username=' + filter.username)
            .map(UtilityService.handleSuccess)
            .catch(UtilityService.handleError);
    }

    /**
     * GET - Loading all filtered companies
     * based on logged in user role
     * @author Nikola Gavric
     */
    getCompanies(): Observable<RestResponse<any>> {
        return this._http.get(this.baseUrl + '/company')
            .map(UtilityService.handleSuccess)
            .catch(UtilityService.handleError);
    }

    /**
     * GET - Loading all modal companies
     * based on logged in user role
     * @author Nikola Gavric
     */
    getActiveCompanies(): Observable<RestResponse<any>> {
        return this._http.get(this.baseUrl + '/activeCompany')
            .map(UtilityService.handleSuccess)
            .catch(UtilityService.handleError);
    }

    /**
     * Fetches all roles
     * @author Nikola Gavric
     */
    getAllRoles(): Observable<RestResponse<any>> {
        return this._http.get(this.baseUrl + '/role?pageId=roleUser')
            .map((res: Response) => res.json())
            .catch(UtilityService.handleError);
    }
}
