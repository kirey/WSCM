import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { UtilityService } from '../../kjcore/shared/services/utility.service';

import { RestResponse } from "./../../kjcore/shared/models";

@Injectable()
export class StyleManagementService {
    public baseUrl: string = 'rest/admin/styles';

    constructor(
        private _http: Http,
        private _utilityService: UtilityService
    ) { }

    /* --------------- GET --------------- */
    /**
     * GET Call for getting all available risks
     * @author Nikola Gavric
     */
    getAllStyles(): Observable<RestResponse<any>> {
        var url = this._utilityService.generateUrlWithQueryParams(this.baseUrl, {
            pageId: 'riskIndexStyles'
        });

        return this._utilityService.getRequest(url);
    }
    
    /**
     * GET Call for retrieving map pin image
     * @author Nikola Gavric
     */
    getMapPinImage(): Observable<RestResponse<string>> {
        var url = this._utilityService.generateUrlWithQueryParams(this.baseUrl + '/pin', {
            pageId: 'riskIndexStyles'
        });

        return this._utilityService.getRequest(url);
    }

    /* --------------- POST --------------- */
    /**
     * POST Call for creating an Placeholder
     * @author Nikola Gavric
     */
    private createStyle(data: any): Observable<RestResponse<any>> {
        var url = this._utilityService.generateUrlWithQueryParams(this.baseUrl, {
            pageId: 'riskIndexStyles'
        });

        return this._utilityService.postRequest(url, data);
    }
    /**
     * POST Call for changing pin icon
     * @author Nikola Gavric
     */
    changeMapPin(data: FormData): Observable<RestResponse<null>> {
        var url = this._utilityService.generateUrlWithQueryParams(this.baseUrl + '/pin');

        return this._utilityService.postRequest(url, data);
    }

    /* --------------- PUT --------------- */
    /**
     * PUT Call for updating an Placeholder
     * @author Nikola Gavric
     */
    private updateStyle(data: any): Observable<RestResponse<any>> {
        var url = this._utilityService.generateUrlWithQueryParams(this.baseUrl, {
            pageId: 'riskIndexStyles'
        });

        return this._utilityService.putRequest(url, data);
    }

    /* --------------- DELETE --------------- */
    /**
     * DELETE Call for removing an alert
     * @author Nikola Gavric
     */
    removeStyle(data: any): Observable<RestResponse<any>> {
        var url = this._utilityService.generateUrlWithQueryParams(this.baseUrl + '/' + data.id, {
            pageId: 'riskIndexStyles'
        });

        return this._utilityService.deleteRequest(url);
    }

    /* --------------- Utility methods --------------- */
    /**
     * Create/Update call for Placeholder
     * @author Nikola Gavric
     */
    createOrUpdateStyle(data: any): Observable<RestResponse<any>> {
        if (data.id) return this.updateStyle(data);
        else return this.createStyle(data);
    }
}