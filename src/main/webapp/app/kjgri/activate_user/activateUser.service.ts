import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { UtilityService } from '../../kjcore/shared/services/utility.service';

import { ActivateUser } from './models';

import { RestResponse } from '../../kjcore/shared/models';

/**
 * Service for Password Change component
 * @author Mario Petrovic
 */
@Injectable()
export class ActivateUserService {
    private baseUrl: string;

    /*--------- Constructor --------*/
    constructor(private _http: Http) {
        this.baseUrl = 'rest/common/users/noAuth';
    }

    /**
     * Rest GET call to retrieve user details based on hash value
     * @author Mario Petrovic
     */
    getUserDetailsRest(mailHash: string): Observable<RestResponse<any>> {
        return this._http.get('rest/users/noAuth/userInfo?mailHash=' + mailHash)
            .map((res: Response) => res.json())
            .catch(UtilityService.handleError);
    }

    /**
     * Rest GET call for sending activate user request as mail
     * @author Mario Petrovic
     */
    activateUserRequestRest(email: string): Observable<RestResponse<any>> {
        return this._http.get(this.baseUrl + '/activateMail?email=' + email)
            .map((res: Response) => res.json())
            .catch(UtilityService.handleError);
    }

    /**
     * Rest POST call for activate user form
     * @author Mario Petrovic
     */
    activateUserSubmitRest(activateUser: ActivateUser): Observable<RestResponse<any>> {
        return this._http.post(this.baseUrl + '/activate?pageId=registration', activateUser)
            .map((res: Response) => res.json())
            .catch(UtilityService.handleError);
    }
}