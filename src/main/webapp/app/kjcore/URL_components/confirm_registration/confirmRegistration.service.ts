import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { UtilityService } from '../../shared/services/utility.service';

import { RestResponse } from '../../shared/models';

/**
 * Service for Confirm registration component
 * @author Mario Petrovic
 */
@Injectable()
export class ConfirmRegistrationService {
    private baseUrl: string;

    /*--------- Constructor --------*/
    constructor(private _http: Http) {
        this.baseUrl = 'rest/users';
    }

    /**
     * Rest POST call for confirming registration
     * @author Mario Petrovic
     */
    confirmRegistration(mailHash): Observable<RestResponse<any>> {
        return this._http.post(this.baseUrl + '/noAuth/confirmationRegistration?mailHash=' + mailHash, '')
            .catch(UtilityService.handleError);
    }
}