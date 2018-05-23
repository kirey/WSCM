import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { UtilityService } from '../../kjcore/shared/services/utility.service';

import { RestResponse } from "./../../kjcore/shared/models";

import { RiskManagementService } from './../kjgri_shared/kjgri.services';

@Injectable()
export class AlertManagementService extends RiskManagementService {
    public alertBaseUrl: string = 'rest/admin/risks/subrisks';

    /**
     * Load all risks
     */
    getAllRisks(): Observable<RestResponse<any>> {
        return this._http.get(this.alertBaseUrl + '/types/forecast')
            .map(UtilityService.handleSuccess)
            .catch(UtilityService.handleError);
    }

    /**
     * Load all subrisks by risk id
     * @param id number
     */
    getAllSubRisks(id: number): Observable<RestResponse<any>> {
        return this._http.get(this.alertBaseUrl + '/' + id + '/subrisks/forecast')
            .map(UtilityService.handleSuccess)
            .catch(UtilityService.handleError);
    }

    /**
     * GET Call for all alerts for a given subtype risk
     * @author Nikola Gavric
     */
    getAlertsBySubriskId(subriskId: number): Observable<RestResponse<any>> {
        return this._http.get(this.alertBaseUrl + '/' + subriskId + '/alerts?pageId=risks')
            .map(UtilityService.handleSuccess)
            .catch(UtilityService.handleError);
    }

    /**
     * POST Call for creating an alert
     * @author Nikola Gavric
     */
    private createAlert(data: any): Observable<RestResponse<any>> {
        return this._http.post(this.alertBaseUrl + '/alerts?pageId=risks', data)
            .map(UtilityService.handleSuccess)
            .catch(UtilityService.handleError);
    }

    /**
     * PUT Call for updating an alert
     * @author Nikola Gavric
     */
    private updateAlert(data: any): Observable<RestResponse<any>> {
        return this._http.put(this.alertBaseUrl + '/alerts?pageId=risks', data)
            .map(UtilityService.handleSuccess)
            .catch(UtilityService.handleError);
    }

    /**
     * Create/Update call for alerts
     * @author Nikola Gavric
     */
    createOrUpdateAlert(data: any): Observable<RestResponse<any>> {
        if(data.id) return this.updateAlert(data);
        else return this.createAlert(data);
    }

    /**
     * DELETE Call for removing an alert
     * @author Nikola Gavric
     */
    removeAlert(data: any): Observable<RestResponse<any>> {
        return this._http.delete(this.alertBaseUrl + '/alerts/' + data.id + '?pageId=risks')
            .map(UtilityService.handleSuccess)
            .catch(UtilityService.handleError);
    }
}
