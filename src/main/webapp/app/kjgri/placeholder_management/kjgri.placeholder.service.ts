import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { UtilityService } from '../../kjcore/shared/services/utility.service';

import { RestResponse } from "./../../kjcore/shared/models";

@Injectable()
export class PlaceholderManagementService {
    public baseUrl: string = 'rest/admin/placeholders';

    constructor(private _http: Http) {}

    /**
     * GET Call for getting all available risks
     * @author Nikola Gavric
     */
    getAllPlaceholders(): Observable<RestResponse<any>> {
        return this._http.get(this.baseUrl+'/default')
            .map(UtilityService.handleSuccess)
            .catch(UtilityService.handleError);
    }

    /**
     * POST Call for creating an alert
     * @author Nikola Gavric
     */
    private createPlaceholder(data: any): Observable<RestResponse<any>> {
        return this._http.post(this.baseUrl+'?pageId=placeholders', data)
            .map(UtilityService.handleSuccess)
            .catch(UtilityService.handleError);
    }

    /**
     * PUT Call for updating an alert
     * @author Nikola Gavric
     */
    private updatePlaceholder(data: any): Observable<RestResponse<any>> {
        return this._http.put(this.baseUrl + '?pageId=placeholders', data)
            .map(UtilityService.handleSuccess)
            .catch(UtilityService.handleError);
    }

    /**
     * Create/Update call for alerts
     * @author Nikola Gavric
     */
    createOrUpdatePlaceholder(data: any): Observable<RestResponse<any>> {
        if(data.id) return this.updatePlaceholder(data);
        else return this.createPlaceholder(data);
    }

    /**
     * DELETE Call for removing an alert
     * @author Nikola Gavric
     */
    removePlaceholder(data: any): Observable<RestResponse<any>> {
        return this._http.delete(this.baseUrl + '/' + data.id + '?pageId=placeholders')
            .map(UtilityService.handleSuccess)
            .catch(UtilityService.handleError);
    }
}