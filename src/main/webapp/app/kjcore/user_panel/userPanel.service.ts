import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import { UtilityService } from '../shared/services/utility.service';

import { UserData } from './models';

import { RestResponse } from '../shared/models';

@Injectable()
export class UserPanelService {
    baseUrl: string;

    constructor(private _http: Http) {
        this.baseUrl = 'rest/users';
    }

    /**
     * Rest - Change password for logged user
     * @author Kirey
     */
    changePassword(userCredentials: any, code: string, hashCode: string): Observable<RestResponse<any>> {
        return this._http.put('/rest/common/users/userPassword?pageId=registration&code='+code+'&hashCode='+hashCode, userCredentials)
            .map((res: Response) => res.json())
            .catch(UtilityService.handleError);
    }

    /**
     * Rest - Update user data
     * @author Kirey
     */
    updateUserData(userData: UserData, code: string, hashCode: string): Observable<RestResponse<any>> {
        return this._http.put(this.baseUrl + '/userDetails?pageId=registration&code='+code+'&hashCode='+hashCode, userData)
            .map((res: Response) => res.json())
            .catch(UtilityService.handleError);
    }

    /**
     * Rest - Get all languages
     * @author Kirey
     */
    getAvailableLanguages(): Observable<RestResponse<any>> {
        return this._http.get(this.baseUrl + '/noAuth/availableLanguages')
            .map((res: Response) => res.json())
            .catch(UtilityService.handleError);
    }
}