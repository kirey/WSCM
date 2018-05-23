import { Injectable } from '@angular/core';
import { UserInfo } from "./../models/userInfo.model";
import { Headers, RequestOptions, Http, Response } from '@angular/http';
import { Params, NavigationExtras } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Subject } from 'rxjs/Rx';

import { AppService } from './app.service';
import { UtilityService } from "./utility.service";

import { UserLogin } from '../../login/models';
import { RestResponse } from '../models';

import { Constants } from "./../../constants";

@Injectable()
export class AuthService {
    static redirectUrl: string;
    private baseUrl: string;
    static loginStatus: boolean;

    requestedPageNavigationExtras: NavigationExtras;

    userRoutes: Object;
    initState: boolean;

    constructor(
        private _appService: AppService,
        private _http: Http,
        private _utilityService: UtilityService
    ) {
        AuthService.redirectUrl = '';
        this.baseUrl = 'rest/users';
        this.initState = false;

        AuthService.loginStatus = false;

        this.requestedPageNavigationExtras = {};
    }

    /**
     * Get login status
     * @author Kirey
     */
    getLoginStatus(): boolean {
        return AuthService.loginStatus;
    }

    /**
     * Check if user is authenticated before app loads
     * @author Kirey
     */
    initRest(): Observable<RestResponse<any>> {
        return this._http.get(this.baseUrl + '/userDetails')
            .map(res => res.json());
    }

    /**
     * Handle unsuccessful initial authentication check
     * @author Kirey
     */
    handleFailedInitRest(subject: Subject<boolean>, route?: string): void {
        this.initState = true;
        this._appService.setGlobalLoader(false);

        let tempPage = route == 'registration' || route == 'password_change' || route == 'confirm_registration' || route == 'activate_user' ? route : 'login';
        subject.next(false);
        AppService.router.navigate([tempPage], this.requestedPageNavigationExtras);
    }

    /**
     * After successful initial authentication check
     * @author Kirey
     */
    postAuthCheck(userInfo: UserInfo): void {
        this._appService.setGlobalLoader(false);

        //Building and setting app available languages
        this._appService.buildAvailableLanguages(userInfo.languages);

        this._appService.companyCss = userInfo.companyCssPrefix + '/' + userInfo.companyId;
        this._appService.userProfile.companyCss = userInfo.companyCssPrefix + '/' + userInfo.companyId;
        this._appService.userProfile.userName = userInfo.username;
        this._appService.userProfile.companyLogo = Constants.LOGO_URL_PREFIX + '/' + userInfo.companyId;

        this._appService.setStoredLanguage(userInfo.defaultLanguage);
        this.userRoutes = this._appService.convertRoutesToObjects(userInfo);

        this._appService.userProfile.roles = this._appService.convertRolesToObject(userInfo.roles);
        this._appService.userProfile.email = userInfo.email;
        this._appService.userProfile.companyId = userInfo.companyId;

        this._appService.setCompanyCSSInit()

        AuthService.loginStatus = true;
        this.initState = true;
    }

    /**
     * REST - Login authentication with token returned as data
     * @author Kirey 
     */
    login(loginData: UserLogin, code: string, hashCode: string): Observable<RestResponse<any>> {
        let headers = new Headers({
            'Content-Type': 'application/json'
        });
        let options = new RequestOptions({ headers: headers });

        return this._http.post(this.baseUrl + '/noAuth/authenticate?pageId=registration&code='+code+'&hashCode='+hashCode, JSON.stringify(loginData), options)
            .map((res: Response) => res.json())
            .catch(UtilityService.handleError);
    }

    /**
     * REST - Logout from app
     * @author Kirey 
     */
    logout(): Observable<RestResponse<any>> {
        return this._http.post(this.baseUrl + '/logout', '')
            .map((res: Response) => res.json())
            .map(() => {
                this.userRoutes = {};
                this._appService.initModuleLoaded = false;
            })
            .catch(UtilityService.handleError);
    }

    /**
     * Clear auth details from app
     * @author Kirey 
     */
    static clearAuth(): void {
        localStorage.removeItem(Constants.TOKEN_STORED_NAME);
        AuthService.redirectUrl = "";
        AuthService.loginStatus = false;
        AppService.router.navigate(['login']);
    }

    /**
     * REST - Check permission for current route and user
     * @author Kirey 
     */
    checkPermission(route: string): boolean {
        route = this._utilityService.trimPathParameter(route);
        if (this.userRoutes) {
            return !!this.userRoutes[route];
        }
        return false;
    }
}