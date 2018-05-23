import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import { UtilityService } from "./../shared/services/utility.service";

import { RestResponse } from "./../shared/models";

@Injectable()
export class SampleService {
    baseUrl: string;

    constructor(
        private _http: Http,
        private _utilityService: UtilityService
    ) {
        this.baseUrl = 'sampleUrl';
    }

    /**
     * GET calls go here
     * @author Kirey
     */
    getSomethingRest(): Observable<RestResponse<any>> {
        return this._http.get(this.baseUrl)
            .map(UtilityService.handleSuccess)
            .catch(UtilityService.handleError);
    }

    // Naming of methods should have *Rest()
    // * - this symbol is a place for purpose of methods
    // Rest() sufix is mandatory

}