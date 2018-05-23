import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { UtilityService } from '../../../services/utility.service';
import { RestResponse } from '../../../models';

/**
 * Phone input component service for retrieving data required
 * by phone input component
 * 
 * @author Nikola Gavric
 */
@Injectable()
export class PhoneInputService {
    

    constructor(private _http: Http) {}

    /**
     * Rest GET call for getting all countries
     * 
     * @author Nikola Gavric
     */
    getAvailableCountries(): Observable<RestResponse<any>> {
        return this._http.get('rest/clientCompanies/countries')
            .map(UtilityService.handleSuccess)
            .catch(UtilityService.handleError);
    }
}