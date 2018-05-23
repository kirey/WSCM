import { Injectable } from '@angular/core';
import { Headers, RequestOptions, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { RestResponse } from './../shared/models';

/**
 * Service for Login component
 * @author Mario Petrovic
 */
@Injectable()
export class LoginService {
    private _baseUrl: string = 'rest/users/';

    constructor(private _http: Http) { }

    /**
     * REST - Select currently active company after login
     * @author Nikola Gavric
     */
    selectCompany(code: any): Observable<RestResponse<any>> {
        return this._http.post(this._baseUrl + 'selectCompany?companyId=' + code, '')
            .map((response: Response) => response.json());
    }
}