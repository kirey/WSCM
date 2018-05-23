import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { UtilityService } from '../shared/services/utility.service';
import { RestResponse } from '../shared/models';


@Injectable()
export class ErrorLogService {

    private baseUrl: string;

    errorLogForm: FormGroup;
    logs: any[];
    pageRow: any;
    cmbErrorName: any;
    cmbUsername: any;
    cmbProcessType: any;
    selectedErrorName: any;

    constructor(
        private _http: Http,
        private _formBuilder: FormBuilder
    ) {
        this.baseUrl = 'rest/errors/';

        this.errorLogForm = this._formBuilder.group({
            filterDateFrom: new FormControl(null, []),
            filterDateTo: new FormControl(null, []),
            filterErrorName: new FormControl(null, []),
            filterUsername: new FormControl(null, []),
            filterProcessType: new FormControl(null, [])
        });
        this.logs = [];
        this.pageRow = { first: 0, rows: 10 };
    }

    /**
     * Rest call for getting log trace by id
     * @author Stefan Svrkota
     */
    getLogByIdRest(id: number): Observable<RestResponse<any>> {
        return this._http.get(this.baseUrl + 'traces/' + id)
            .map((res: Response) => res.json())
            .catch(UtilityService.handleError);
    }

    /**
     * Rest call for causing exception on backend and storing it into DB
     * @author Stefan Svrkota
     */
    causeExceptionRest(): Observable<RestResponse<any>> {
        return this._http.get('rest/tests/exceptions')
            .map((res: Response) => res.json())
            .catch(UtilityService.handleError);
    }

    /**
     * Rest get all comboboxes
     * @author Stefan Svrkota
     */
    getLogsInitRest(): Observable<RestResponse<any>> {
        return this._http.get(this.baseUrl + 'populateFilters')
            .map((res: Response) => res.json())
            .catch(UtilityService.handleError);
    }

    /**
     * Rest get filtered logs
     * @author Stefan Svrkota
     */
    getFilteredLogsRest(filter: any): Observable<RestResponse<any>> {
        let encodedFilter = encodeURI(JSON.stringify(filter));

        return this._http.get(this.baseUrl + 'logs?filterMap=' + encodedFilter)
            .map((res: Response) => res.json())
            .catch(UtilityService.handleError);
    }
}