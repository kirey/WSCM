import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { UtilityService } from '../shared/services/utility.service';
import { RestResponse } from '../shared/models';

@Injectable()
export class AdminCreateReportService {
    private baseUrl: string;

    constructor(
        private _http: Http,
        private _utilityService: UtilityService
    ) {
        this.baseUrl = 'rest/reports'
    }

    /**
     * Create new report with given data
     * @author Mario Petrovic
     */
    createReport(reportData: FormData, override: number): Observable<RestResponse<any>> {
        return this._http.post(this.baseUrl + '?pageId=reportManagement&checked=' + override, reportData)
            .map((res: Response) => res.json())
            .catch(UtilityService.handleError);
    }

    /**
     * Create new report with given data
     * @author Mario Petrovic
     */
    updateReport(reportProfile: any): Observable<RestResponse<any>> {
        return this._http.post(this.baseUrl + '/edited?pageId=reportManagement', reportProfile)
            .map((res: Response) => res.json())
            .catch(UtilityService.handleError);
    }

    /**
     * Get report by id
     * @author Mario Petrovic
     */
    getReportById(id: number): Observable<RestResponse<any>> {
        return this._http.get(this.baseUrl + '/' + id +
            this._utilityService.generateQueryParams({
                pageId: 'reportManagement'
            }))
            .map((res: Response) => res.json())
            .catch(UtilityService.handleError);
    }

    /**
     * Get tables
     * @author Nikola Gavric
     */
    getAllTables(): Observable<RestResponse<any>> {
        return this._http.get(this.baseUrl + '/tables')
            .map((res: Response) => res.json())
            .catch(UtilityService.handleError);
    }

    /**
     * Get columns for table
     * @author Nikola Gavric
     */
    getAllColumns(tableName: string): Observable<RestResponse<any>> {
        return this._http.get(this.baseUrl + '/tables/columns?tableName=' + encodeURIComponent(tableName))
            .map((res: Response) => res.json())
            .catch(UtilityService.handleError);
    }

    /**
     * Rest GET call for all roles
     * @author Stefan Svrkota
     */
    getRolesRest(): Observable<RestResponse<any>> {
        return this._http.get(this.baseUrl + '/roles')
            .map((res: Response) => res.json())
            .catch(UtilityService.handleError);
    }

    /**
     * Rest DELETE call for deleting
     * validation class of report
     * @author Nikola Gavric
     */
    deleteValidationClassByReportId(reportId: any): Observable<RestResponse<any>> {
        return this._http.delete(this.baseUrl + "/validationClass/" + reportId)
            .map((res: Response) => res.json())
            .catch(UtilityService.handleError);
    }

    /**
     * Rest GET call for all existing
     * validation classes
     * @author Nikola Gavric
     */
    getValidationClasses(): Observable<RestResponse<any>> {
        return this._http.get(this.baseUrl + '/classes')
            .map((res: Response) => res.json())
            .catch(UtilityService.handleError);
    }

    /**
     * Loading all filtered companies
     * based on logged in user role
     * @author Nikola Gavric
     */
    getAvailableCompanies(): Observable<RestResponse<any>> {
        return this._http.get(this.baseUrl + '/company')
            .map((res: Response) => res.json())
            .catch(UtilityService.handleError);
    }
}