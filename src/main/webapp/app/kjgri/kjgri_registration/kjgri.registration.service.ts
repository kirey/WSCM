import { Injectable } from '@angular/core';
import { Http, ResponseContentType, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { UtilityService } from '../../kjcore/shared/services/utility.service';
import { RestResponse } from '../../kjcore/shared/models/restResponse.model';

/**
 * Service for RegistrationCmp
 * @author Stefan Svrkota
 */
@Injectable()
export class RegistrationService {
    baseUrl: string;

    constructor(private _http: Http) {
        this.baseUrl = 'rest/users';
    }

    /**
     * Rest GET call for retrieving captcha
     * @author Stefan Svrkota
     */
    getCaptchaRest(): Observable<RestResponse<any>> {
        return this._http.get(this.baseUrl + '/noAuth/captchacode?pageId=registration')
            .map((res: Response) => res.json());
    }

    /**
     * Rest GET call for retrieving lanugages
     * @author Stefan Svrkota
     */
    getLanguagesRest(): Observable<RestResponse<any>> {
        return this._http.get(this.baseUrl + '/noAuth/availableLanguages?pageId=registration')
            .map((res: Response) => res.json());
    }

    /**
     * Rest POST call for registering user
     * @author Stefan Svrkota
     */
    registerRest(userForm: any, code: string, hashCode: string): Observable<RestResponse<any>> {
        return this._http.post(this.baseUrl + '/noAuth/signup?pageId=registration&code=' + code + '&hashCode=' + hashCode, userForm)
            .map((res: Response) => res.json())
            .catch(UtilityService.handleError);
    }
}