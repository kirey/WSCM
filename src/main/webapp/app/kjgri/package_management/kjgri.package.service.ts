import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { UtilityService } from '../../kjcore/shared/services/utility.service';

import { RestResponse } from "./../../kjcore/shared/models";

@Injectable()
export class PackageManagementService {
    public baseUrl: string = 'rest/admin/packages';

    constructor(private _http: Http) {}

    /**
     * GET Call for getting all available packages
     * @author Nikola Gavric
     */
    getAllPackages(): Observable<RestResponse<any>> {
        return this._http.get(this.baseUrl)
            .map(UtilityService.handleSuccess)
            .catch(UtilityService.handleError);
    }

    /**
     * PUT Call for updating a Package
     * @author Nikola Gavric
     */
    updatePackage(data: any): Observable<RestResponse<any>> {
        let url = this.baseUrl + '/' + data.id;
        url += '?numberOfAccounts=' + data.numberOfAccounts;
        if(data.numberOfLocations) url += '&numberOfLocations=' + data.numberOfLocations;
        else url+= '&numberOfLocations=0';
        url += '&duration=' + data.duration;

        return this._http.put(url, data)
            .map(UtilityService.handleSuccess)
            .catch(UtilityService.handleError);
    }
}