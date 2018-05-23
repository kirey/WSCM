import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { UtilityService } from '../../kjcore/shared/services/utility.service';

import { RestResponse } from "./../../kjcore/shared/models";

import { RiskManagementService } from './../kjgri_shared/kjgri.services';

@Injectable()
export class PlanManagementService extends RiskManagementService {
    public placeholderBaseUrl: string = 'rest/admin/risks/subrisks';

    /**
     * GET Call for getting all available risks
     * @author Nikola Gavric
     */
    getAllActionsByLocation(locationId: number): Observable<RestResponse<any>> {
        return this._http.get('rest/admin/risks/actions?locationId='+locationId)
            .map(UtilityService.handleSuccess)
            .catch(UtilityService.handleError);
    }

    /**
     * GET Call for getting all available locations
     * @author Nikola Gavric
     */
    getAllLocations(): Observable<RestResponse<any>> {
        return this._http.get('rest/admin/companies/locations')
            .map(UtilityService.handleSuccess)
            .catch(UtilityService.handleError);
    }

    /**
     * POST Call for creating an Placeholder
     * @author Nikola Gavric
     */
    private createPlaceholder(data: any): Observable<RestResponse<any>> {
        return this._http.post(this.placeholderBaseUrl + '/placeholder', data)
            .map(UtilityService.handleSuccess)
            .catch(UtilityService.handleError);
    }

    /**
     * PUT Call for updating an Placeholder
     * @author Nikola Gavric
     */
    private updatePlaceholder(data: any): Observable<RestResponse<any>> {
        return this._http.put(this.placeholderBaseUrl + '/placeholder', data)
            .map(UtilityService.handleSuccess)
            .catch(UtilityService.handleError);
    }

    /**
     * Create/Update call for Placeholder
     * @author Nikola Gavric
     */
    createOrUpdatePlaceholder(data: any): Observable<RestResponse<any>> {
        if(data.id) return this.updatePlaceholder(data);
        else return this.createPlaceholder(data);
    }

    /**
     * GET Call for all placeholders
     * @author Nikola Gavric
     */
    getPlaceholders(locationId: number): Observable<RestResponse<any>> {
        return this._http.get('rest/client/locations/' + locationId + '/placeholders')
            .map(UtilityService.handleSuccess)
            .catch(UtilityService.handleError);
    }

    /**
     * POST Call for saving actions chosen for plan
     * @author Nikola Gavric
     */
    saveActions(locationId: number, actions: any): Observable<RestResponse<any>> {
        return this._http.post('rest/client/locations/' + locationId + '/actions/checked', actions)
            .map(UtilityService.handleSuccess)
            .catch(UtilityService.handleError);
    }

    /**
     * POST Call for saving actions chosen for plan
     * @author Nikola Gavric
     */
    savePlaceholders(locationId: number, data: any): Observable<RestResponse<any>> {
        return this._http.post('rest/client/locations/' + locationId + '/placeholders', data)
            .map(UtilityService.handleSuccess)
            .catch(UtilityService.handleError);
    }

    /**
     * GET Call for for a plan preview
     * @author Nikola Gavric
     */
    previewPlan(locationId: number, placeholders: any): Observable<RestResponse<any>> {
        return this._http.put('rest/client/locations/' + locationId + '/preview', placeholders)
            .map(UtilityService.handleSuccess)
            .catch(UtilityService.handleError);
    }

    /**
     * GET Call for archiving a plan
     * @author Nikola Gavric
     */
    archivePlan(locationId: number, placeholders: any): Observable<RestResponse<any>> {
        return this._http.put('rest/client/locations/' + locationId + '/archive', placeholders)
            .map(UtilityService.handleSuccess)
            .catch(UtilityService.handleError);
    }
}