import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { UtilityService } from '../../shared/services/utility.service';

import { AdminEmailConfigs } from '../models';
import { RestResponse } from "./../../shared/models";

@Injectable()
export class AdminEmailConfigsService {
    baseUrl: string;

    constructor(private _http: Http) {
        this.baseUrl = 'rest/adminEmails/';
    }

    /*  -------- Email Configs REST Cals --------**/

    /**
     * Rest GET call for retrieving all email Configs
     * @author Ciprian Dorofte
     */
    getAllEmailsConfigsRest(): Observable<RestResponse<any>> {
        return this._http.get(this.baseUrl + 'getAllEmailsConfigs')
            .map((res: Response) => res.json())
            .catch(UtilityService.handleError);
    }

    /**
     * Rest DELETE call for to deleting an email Configs
     * @author Ciprian Dorofte
     */
    deleteEmailConfigsRest(emailConfigId: number): Observable<RestResponse<any>> {
        return this._http.delete(this.baseUrl + 'deleteEmailConfigs/' + emailConfigId)
            .map((res: Response) => res.json())
            .catch(UtilityService.handleError);
    }

    /**
     * Rest POST call for saving an email config
     * @author Ciprian Dorofte
     */
    saveEmailConfigsRest(pageId: string, emailConfigs: AdminEmailConfigs): Observable<RestResponse<any>> {
        return this._http.post(this.baseUrl + 'saveEmailConfigs?pageId=' + pageId, emailConfigs)
            .map((res: Response) => res.json())
            .catch(UtilityService.handleError);
    }

    /**
     * Rest PUT call for updating an email config
     * @author Ciprian Dorofte
     */
    updateEmailConfigsRest(pageId: string, emailConfigs: AdminEmailConfigs): Observable<RestResponse<any>> {
        return this._http.put(this.baseUrl + 'updateEmailConfigs?pageId=' + pageId, emailConfigs)
            .map((res: Response) => res.json())
            .catch(UtilityService.handleError);
    }
}