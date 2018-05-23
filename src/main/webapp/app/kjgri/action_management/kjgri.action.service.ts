import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { UtilityService } from '../../kjcore/shared/services/utility.service';

import { RestResponse } from "./../../kjcore/shared/models";

import { RiskManagementService } from './../kjgri_shared/kjgri.services';

@Injectable()
export class ActionManagementService extends RiskManagementService {
    private actionBaseUrl: string = 'rest/admin/risks/subrisks';

    /**
     * Load all risks
     */
    getAllRisks(): Observable<RestResponse<any>> {
        return this._http.get(this.actionBaseUrl + '/types/risk')
            .map(UtilityService.handleSuccess)
            .catch(UtilityService.handleError);
    }

    /**
     * Load all subrisks by risk id
     * @param id number
     */
    getAllSubRisks(id: number): Observable<RestResponse<any>> {
        return this._http.get(this.actionBaseUrl + '/' + id + '/subrisks/risk')
            .map(UtilityService.handleSuccess)
            .catch(UtilityService.handleError);
    }

    /**
     * GET Call for all actions for a given subtype risk
     * @author Nikola Gavric
     */
    getActionsBySubriskId(subriskId: number): Observable<RestResponse<any>> {
        return this._http.get(this.actionBaseUrl+ '/' + subriskId + '/actions?pageId=risks')
            .map(UtilityService.handleSuccess)
            .catch(UtilityService.handleError);
    }

    /**
     * POST Call for creating an action
     * @author Nikola Gavric
     */
    private createAction(data: any): Observable<RestResponse<any>> {
        return this._http.post(this.actionBaseUrl + '/actions?pageId=risks', data)
            .map(UtilityService.handleSuccess)
            .catch(UtilityService.handleError);
    }

    /**
     * PUT Call for updating an action
     * @author Nikola Gavric
     */
    private updateAction(data: any): Observable<RestResponse<any>> {
        return this._http.put(this.actionBaseUrl + '/actions?pageId=risks', data)
            .map(UtilityService.handleSuccess)
            .catch(UtilityService.handleError);
    }

    /**
     * PUT/POST call for actions
     * @author Nikola Gavric
     */
    createOrUpdateAction(data: any): Observable<RestResponse<any>> {
        if(data.id) return this.updateAction(data);
        else return this.createAction(data);
    }

    /**
     * DELETE call for actions
     * @author Nikola Gavric
     */
    removeAction(data: any): Observable<RestResponse<any>> {
        console.log(data);
        return this._http.delete(this.actionBaseUrl + '/actions/' + data.id + '?pageId=risks')
            .map(UtilityService.handleSuccess)
            .catch(UtilityService.handleError);
    }
}
