import { Component, OnInit, ViewEncapsulation, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';

import { DataTable, Dropdown } from 'primeng/primeng';
import { TranslateService } from 'ng2-translate';
import { ModalDirective } from 'ng2-bootstrap';

import { UtilityService } from '../shared/services/utility.service';
import { AppService } from '../shared/services/app.service';

import { MonitoringBookedReportsService } from './monitoringBookedReports.service';

import { LazyLoadDropdownCmp } from '../shared/components/lazyLoadDropdown/lazyLoadDropdown.cmp'

import { Alert, RestResponse } from '../shared/models';

import { Constants } from "./../constants";

declare let saveAs: any;

@Component({
    moduleId: module.id,
    templateUrl: 'monitoringBookedReports.cmp.html',
    encapsulation: ViewEncapsulation.None
})
export class MonitoringBookedReportsCmp implements OnInit {

    reportList: any;
    maxDate: Date;

    validator: boolean = true;
    subscriptions: Object;
    componentAlert: Alert;

    filterUsernameDropdown: string;

    @ViewChild('companiesLazyDropDown')
    companiesLazyDropDown: LazyLoadDropdownCmp;

    @ViewChild('usersLazyDropDown')
    usersLazyDropDown: LazyLoadDropdownCmp;

    @ViewChild('monBookedRepDataTable')
    monBookedRepDataTable: DataTable;

    @ViewChild('globalFilter')
    globalFilter: any;

    isAdmin: boolean;
    isSuperAdmin: boolean;
    isUsernameFilter: boolean;
    isSubAdmin: boolean;
    isCompanyFilter: boolean;
    disabledUserFilter: boolean;

    isLoading: boolean = false;
    loadingState: boolean;

    context: any;

    /*--------- Constructor --------*/
    constructor(
        private _monBookedRepService: MonitoringBookedReportsService,
        private _utilityService: UtilityService,
        private _router: Router,
        private _appService: AppService,
        private _translateService: TranslateService,
        private _changeDetectionRef: ChangeDetectorRef,
        private _constants: Constants
    ) {

    }

   /*--------- App logic --------*/

    /**
     * Get dropdown lists data (list of companies and usernames)
     * @author Ciprian Dorofte
     */
    getBookedRepFiltersInit() {
        if (!this._monBookedRepService.cmbCompany && !this._monBookedRepService.cmbUsername) {
            this.subscriptions['getBookedRepFiltersInit'] = this._monBookedRepService.getBookedRepFiltersInitRest().subscribe(
                (res: RestResponse<any>) => {
                    for (let i = 0; i < res.data.length; i++) {
                        if (res.data[i].filterName == "company") {
                            this._monBookedRepService.cmbCompany = res.data[i].selectBoxList;
                        }
                        if (res.data[i].filterName == "user") {
                            this._monBookedRepService.cmbUsername = res.data[i].selectBoxList;
                        }
                    }
                },
                (err: RestResponse<any>) => {
                    this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode, err.errors);
                }
            )
        }
    }

    /**
     * Get filtered booked reports
     * @author Ciprian Dorofte
     */
    getFilteredBookedReports(filter: any) {
        this.subscriptions['getFilteredBookedReports'] = this._monBookedRepService.getFilteredBookedReportsRest(filter).subscribe(
            (res: RestResponse<any>) => {
                this.reportList = res.data;
                this.globalFilter.nativeElement.value = "";
                this.monBookedRepDataTable.reset();
            },
            (err: RestResponse<any>) => {
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode, err.errors);
            }
        )
    }

    /**
     * Download report file
     * @author Ciprian Dorofte
     */
    downloadReportFile(report: any, newWindow: boolean) {
        let contentType;
        if (report.format.toLowerCase() == 'pdf') {
            contentType = 'application/pdf';
        } else{
            contentType = 'application/vnd.ms-excel';
        }

        this.subscriptions['getBookedReportFileByIdRest'] = this._monBookedRepService.getBookedReportFileByIdRest(report.id).subscribe(
            (res: RestResponse<any>) => {
                var blob = this._appService.convertBase64ToBlob(res.data, contentType);

                if (newWindow) {
                    let fileURL = URL.createObjectURL(blob);
                    window.open(fileURL);
                } else {
                    saveAs(blob, report.reportName + (contentType == 'application/pdf' ? '.pdf' : '.xlsx'));
                    this._utilityService.setAlert(this.componentAlert, 'fe.monitoringBookedReports.bookedReportDownloaded');
                }
            }, (err: RestResponse<any>) => {
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode, err.errors);
            });
    }

    /**
     * Submit monitoring booked reports filters
     * @author Ciprian Dorofte
     */
    submitMonBookedRepForm(form: FormGroup) {
        let filterDateTo, filterDateFrom, filterDateFromMiliseconds, filterDateToMiliseconds, filterCompany, filterUsername, keys, values, filter;
        let today = new Date();

        if (form.value.filterDateFrom != null) {
            filterDateFrom = new Date(form.value.filterDateFrom);
            filterDateFrom.setHours(today.getHours(), today.getMinutes(), today.getSeconds());
            filterDateFromMiliseconds = {
                key: null,
                name: filterDateFrom.getTime()
            }
        } else {
            filterDateFrom = new Date("01/01/1970");
            filterDateFrom.setHours(today.getHours(), today.getMinutes(), today.getSeconds());
            filterDateFromMiliseconds = {
                key: null,
                name: filterDateFrom.getTime()
            }
        }
        if (form.value.filterDateTo != null) {
            filterDateTo = new Date(form.value.filterDateTo);
            filterDateTo.setHours(today.getHours(), today.getMinutes(), today.getSeconds());
            filterDateToMiliseconds = {
                key: null,
                name: filterDateTo.getTime()
            }

        } else {
            filterDateTo = today;
            filterDateToMiliseconds = {
                key: null,
                name: filterDateTo.getTime()
            }
        }
        filterCompany = form.value.filterCompany;
        filterUsername = form.value.filterUsername;

        keys = ["combobox.date.from.bookedDate", "combobox.date.to.bookedDate", "company", "user"];
        values = [filterDateFromMiliseconds, filterDateToMiliseconds, filterCompany, filterUsername];
        filter = [];

        for (let i = 0; i < 4; i++) {
            if (values[i]) {
                filter.push(
                    {
                        "filterName": keys[i],
                        "selectBoxList": [
                            values[i]
                        ]
                    }
                )
            }
        }
        this.monBookedRepDataTable.paginate({ first: 0, rows: this._monBookedRepService.pageRow.rows });
        this.getFilteredBookedReports(filter);
    }

    /**
     * Validate filters
     * @author Ciprian Dorofte
     */
    validateFilter(filterName?: string): void {
        setTimeout(() => {
            if(filterName == 'filterCompany'){
                this._monBookedRepService.cmbUsername = null;
                this.usersLazyDropDown.clearInput();

                let filterCompany = this._monBookedRepService.monBookedRepForm.controls['filterCompany'];
                if(filterCompany.value){
                    this.subscriptions['getUsersFilterRest'] = this._monBookedRepService.getUsersFilterRest(filterCompany.value.key).subscribe(
                        (res: RestResponse<any>) => {
                            this._monBookedRepService.cmbUsername = res.data.selectBoxList;
                            this.disabledUserFilter = false;
                        },
                        (err: RestResponse<any>) => {
                            this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode, err.errors);
                        }
                    );
                }else{
                    this.disabledUserFilter = true;
                }
            }

            if(this.isSuperAdmin){
                if ((this._monBookedRepService.monBookedRepForm.value.filterDateFrom && this._monBookedRepService.monBookedRepForm.value.filterDateTo) &&
                    (this._monBookedRepService.monBookedRepForm.value.filterDateFrom <= this._monBookedRepService.monBookedRepForm.value.filterDateTo) &&
                    this._monBookedRepService.monBookedRepForm.value.filterCompany) {
                    this.validator = false;
                }else {
                    this.validator = true;
                }
            }else{
                if ((this._monBookedRepService.monBookedRepForm.value.filterDateFrom && this._monBookedRepService.monBookedRepForm.value.filterDateTo) &&
                    (this._monBookedRepService.monBookedRepForm.value.filterDateFrom <= this._monBookedRepService.monBookedRepForm.value.filterDateTo)) {
                    this.validator = false;
                } else {
                    this.validator = true;
                }
            }
        });
    }

    /**
     * Clear form
     * @author Ciprian Dorofte
     */
    clearFilter() {
        this._monBookedRepService.monBookedRepForm.reset();
        this.companiesLazyDropDown.clearInput();
        this.usersLazyDropDown.clearInput();
        this.validateFilter();
    }

    /**
     * Clear field
     * @author Ciprian Dorofte
     */
    clearField(fieldName: string) {
        this._monBookedRepService.monBookedRepForm.controls[fieldName].reset();
        this.validateFilter();
    }

    /**
     * Event method when data table changes (page or size) 
     * @author Ciprian Dorofte
     */
    changePage(event: any) {
        this._monBookedRepService.pageRow = this._utilityService.copy(event);
    }

    /*--------- NgOnInit --------*/
    ngOnInit() {
        // Initital method to be executed when page loads
        this._appService.pageLoaded('', this);

        // Variable initialization
        this.subscriptions = {};
        this.componentAlert = new Alert(null, true);
        this.maxDate = new Date();
        this.context = this;
        this.monBookedRepDataTable.paginate(this._monBookedRepService.pageRow);
        this.disabledUserFilter = false;
        this.isCompanyFilter = false;
        this.isUsernameFilter = false;
        this.isAdmin = this._appService.isAuthorised(this._constants.getROLES().ADMIN);
        this.isSuperAdmin = this._appService.isAuthorised(this._constants.getROLES().SUPER_ADMIN);
        this.isSubAdmin = this._appService.isAuthorised(this._constants.getROLES().SUBADMIN);

        // Initial methods
        this.getBookedRepFiltersInit();
        this.validateFilter();

        this._appService.languageChangeForComponent(this);

        if(this.isSuperAdmin){
            this.isCompanyFilter = true;
            this.isUsernameFilter = true;
            this.disabledUserFilter = true;
        }else if(this.isAdmin || this.isSubAdmin) {
            this.isUsernameFilter = true;
        }
    }

    ngOnDestroy(): void {
        this._appService.refreshEmitters(this.subscriptions);
    }
}