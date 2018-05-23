import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { UtilityService } from '../shared/services/utility.service';

import { RestResponse } from '../shared/models';

@Injectable()
export class ReportManagementService {
    private baseUrl: string;

    /*--------- Constructor --------*/
    constructor(private _http: Http,
        private _utilityService: UtilityService) {
        this.baseUrl = 'rest/reports';
    }

    /**
     * Get filtered reports from database.
     * @author Mario Petrovic
     */
    getReports(): Observable<RestResponse<any>> {
        return this._http.get(this.baseUrl)
            .map(UtilityService.handleSuccess)
            .catch(UtilityService.handleError);
    }
    
    /**
     * Save a report into database for later use.
     * @author Kirey
     */
    addBooking(booking: any): Observable<RestResponse<any>> {
        return this._http.put(this.baseUrl + '/book?pageId=reportManagement', JSON.stringify(booking))
            .map(UtilityService.handleSuccess)
            .catch(UtilityService.handleError);
    }

    /**
     * Print a report.
     * @author Kirey
     */
    printReport(reportData: any): Observable<RestResponse<any>> {
        let url = this.baseUrl + '/' + reportData.format + '/inline?pageId=' + reportData.pageId;

        return this._http.put(url, reportData.report)
            .map(UtilityService.handleSuccess)
            .catch(UtilityService.handleError);
    }

    /**
     * REST - delete choosen report
     * @author Mario Petrovic
     */
    deleteReport(reportId: number): Observable<RestResponse<any>> {
        return this._http.delete(this.baseUrl + '/' + reportId + '?pageId=reportManagement')
            .map(UtilityService.handleSuccess)
            .catch(UtilityService.handleError);
    }

    /**
     * Rest POST call for report status update
     * @author Stefan Svrkota
     */
    updateReportStatus(reportStatus: number, reportId: number): Observable<RestResponse<any>> {
        return this._http.post(this.baseUrl + '/status/' + reportId +
            this._utilityService.generateQueryParams({
                enabled: reportStatus,
                pageId: 'reportManagement'
            }), null)
            .map(UtilityService.handleSuccess)
            .catch(UtilityService.handleError);
    }

    /**
     * Rest GET call that retrieve unavailable dates for a report
     * @author Ciprian Dorofte
     */
    getUnavailableDatesRest(reportId: number): Observable<any> {
        return this._http.get(this.baseUrl + '/book/' + reportId).
            map(UtilityService.handleSuccess)
            .catch(UtilityService.handleError);
    }

    /**
     * Rest GET call that retrieve unavailable dates for a report
     * @author Ciprian Dorofte
     */
    getDependencyFilteredList(dependencyValueId: number, dependentId: number): Observable<any> {
        return this._http.get(this.baseUrl + '/populateDropdownParameter' + this._utilityService.generateQueryParams({
            dependencyValueId: dependencyValueId,
            dependentId: dependentId
        })).map(UtilityService.handleSuccess)
            .catch(UtilityService.handleError);
    }
}