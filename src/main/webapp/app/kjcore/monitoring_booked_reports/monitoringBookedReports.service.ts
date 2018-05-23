import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { UtilityService } from '../shared/services/utility.service';
import { RestResponse } from '../shared/models';


@Injectable()
export class MonitoringBookedReportsService {
    private baseUrl: string;

    monBookedRepForm: FormGroup;
    pageRow: any;
    cmbCompany: any;
    cmbUsername: any;
    selectedErrorName: any;

    constructor(
        private _http: Http,
        private _formBuilder: FormBuilder
    ) {
        this.baseUrl = 'rest/reports/';

        this.monBookedRepForm = this._formBuilder.group({
            filterDateFrom: new FormControl(null, []),
            filterDateTo: new FormControl(null, []),
            filterCompany: new FormControl(null, []),
            filterUsername: new FormControl(null, [])
        });
        this.pageRow = { first: 0, rows: 10 };
    }

    /**
     * Rest call for getting booked report file by id
     * @author Ciprian Dorofte
     */
    getBookedReportFileByIdRest(bookedReportId: string): Observable<RestResponse<any>> {
        return this._http.get(this.baseUrl + 'book/print/' + bookedReportId)
            .map((res: Response) => res.json())
            .catch(UtilityService.handleError);
    }

    /**
     * Rest get all comboboxes filters
     * @author Ciprian Dorofte
     */
    getBookedRepFiltersInitRest(): Observable<RestResponse<any>> {
        return this._http.get(this.baseUrl + 'book/populateBookedReportsFilters')
            .map((res: Response) => res.json())
            .catch(UtilityService.handleError);
    }

    /**
     * Rest get users combox filter
     * @author Ciprian Dorofte
     */
    getUsersFilterRest(companyId: string): Observable<RestResponse<any>>{
        return this._http.get(this.baseUrl + 'populateUsersFilter?company=' + companyId)
            .map((res: Response) => res.json())
            .catch(UtilityService.handleError);
    }

    /**
     * Rest get filtered booked reports
     * @author Ciprian Dorofte
     */
    getFilteredBookedReportsRest(filter: any): Observable<RestResponse<any>> {
        let encodedFilter = encodeURI(JSON.stringify(filter));

        return this._http.get(this.baseUrl + 'book/allFilteredBooked?filterMap=' + encodedFilter)
            .map((res: Response) => res.json())
            .catch(UtilityService.handleError);
    }
}