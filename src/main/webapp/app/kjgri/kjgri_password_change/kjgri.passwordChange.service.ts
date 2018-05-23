import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { PasswordChange } from './models';
import { RestResponse } from '../../kjcore/shared/models/restResponse.model';
import { UtilityService } from '../../kjcore/shared/services/utility.service';

/**
 * Service for Password Change component
 * @author Mario Petrovic
 */
@Injectable()
export class PasswordChangeService {
    private baseUrl: string;

    /*--------- Constructor --------*/
    constructor(private _http: Http) {
        this.baseUrl = 'rest/users';
    }

    /**
     * Rest GET call to retrieve user details based on hash value
     * @author Mario Petrovic
     */
    getUserDetailsRest(mailHash: string): Observable<RestResponse<any>> {
        return this._http.get(this.baseUrl + '/noAuth/userInfo?mailHash=' + mailHash)
            .map((res: Response) => res.json())
            .catch(UtilityService.handleError);
    }

    /**
     * Rest GET call for sending forgot password request as mail
     * @author Mario Petrovic
     */
    forgotPasswordRequestRest(email: string): Observable<RestResponse<any>> {
        return this._http.get(this.baseUrl + '/noAuth/forgotPassword?email=' + email)
            .map((res: Response) => res.json())
            .catch(UtilityService.handleError);
    }

    /**
     * Rest POST call for submitting change password form
     * @author Mario Petrovic
     */
    changePasswordSubmitRest(passwordChangeData: PasswordChange): Observable<RestResponse<any>> {
        return this._http.post('rest/common/users/noAuth/activate?pageId=registration', passwordChangeData)
            .map((res: Response) => res.json())
            .catch(UtilityService.handleError);
    }
}