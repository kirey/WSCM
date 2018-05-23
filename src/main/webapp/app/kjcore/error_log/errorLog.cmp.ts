import { Component, OnInit, ViewEncapsulation, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';

import { DataTable, Dropdown } from 'primeng/primeng';
import { TranslateService } from 'ng2-translate';
import { ModalDirective } from 'ng2-bootstrap';

import { ErrorLogService } from '../error_log/errorLog.service';

import { UtilityService } from '../shared/services/utility.service';
import { AppService } from '../shared/services/app.service';

import { Alert, RestResponse } from '../shared/models';

@Component({
    moduleId: module.id,
    templateUrl: 'errorLog.cmp.html',
    encapsulation: ViewEncapsulation.None
})
export class ErrorLogCmp implements OnInit {
    logs: any[];
    error: any;
    maxDate: Date;

    validator: boolean = true;
    subscriptions: Object;
    componentAlert: Alert;

    selectedErrorLog: any;

    filterUsernameDropdown: string;

    @ViewChild('errorLogDataTable')
    errorLogDataTable: DataTable;
    @ViewChild('singleErrorLogModal')
    errorLogModal: ModalDirective;
    @ViewChild('globalFilter')
    globalFilter: any;

    trace: any;
    isLoading: boolean = false;
    loadingState: boolean;

    context: any;

    /*--------- Constructor --------*/
    constructor(
        private _errorLogService: ErrorLogService,
        private _utilityService: UtilityService,
        private _router: Router,
        private _appService: AppService,
        private _translateService: TranslateService,
        private _changeDetectionRef: ChangeDetectorRef
    ) {

    }

    /*--------- App logic --------*/

    /**
     * Get dropdown lists data (list of errors and usernames)
     * @author Stefan Svrkota
     */
    getLogsInit() {
        if (!this._errorLogService.cmbErrorName && !this._errorLogService.cmbUsername && !this._errorLogService.cmbProcessType) {
            this.subscriptions['getLogsInit'] = this._errorLogService.getLogsInitRest().subscribe(
                (res: RestResponse<any>) => {
                    for (let i = 0; i < res.data.length; i++) {
                        if (res.data[i].filterName == "errorName") {
                            this._errorLogService.cmbErrorName = res.data[i].selectBoxList;
                        }
                        if (res.data[i].filterName == "username") {
                            this._errorLogService.cmbUsername = res.data[i].selectBoxList;
                        }
                        if (res.data[i].filterName == "processType") {
                            this._errorLogService.cmbProcessType = res.data[i].selectBoxList;
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
     * Get filtered logs
     * @author Stefan Svrkota
     */
    getFilteredLogs(filter: any) {
        this.subscriptions['getFilteredLogs'] = this._errorLogService.getFilteredLogsRest(filter).subscribe(
            (res: RestResponse<any>) => {
                this.logs = res.data;
                this.globalFilter.nativeElement.value = "";
                this.errorLogDataTable.reset();
            },
            (err: RestResponse<any>) => {
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode, err.errors);
            }
        )
    }

    /**
     * Validate filters
     * @author Stefan Svrkota
     */
    validateFilter(): void {
        setTimeout(() => {
            if ((this._errorLogService.errorLogForm.value.filterDateFrom && this._errorLogService.errorLogForm.value.filterDateTo) &&
                (this._errorLogService.errorLogForm.value.filterDateFrom > this._errorLogService.errorLogForm.value.filterDateTo)) {
                this.validator = true;
            }
            else if ((this._errorLogService.errorLogForm.value.filterDateFrom && this._errorLogService.errorLogForm.value.filterDateTo) ||
                this._errorLogService.errorLogForm.value.filterErrorName) {
                this.validator = false;
            } else {
                this.validator = true;
            }
        });
    }

    /**
     * Clear form
     * @author Stefan Svrkota
     */
    clearFilter() {
        this._errorLogService.errorLogForm.reset();
        this.validateFilter();
    }


    /**
     * Clear field
     * @author Kirey
     */
    clearField(fieldName: string) {
        this._errorLogService.errorLogForm.controls[fieldName].reset();
        this.validateFilter();
    }

    /**
     * Submit log filter
     * @author Stefan Svrkota
     */
    submitErrorLogForm(form: FormGroup) {
        let filterDateTo, filterDateFrom, filterDateFromMiliseconds, filterDateToMiliseconds, filterErrorName, filterUsername, filterProcessType, keys, values, filter;

        if (form.value.filterDateFrom != null) {
            filterDateFrom = new Date(form.value.filterDateFrom);
            filterDateFromMiliseconds = {
                key: null,
                name: filterDateFrom.getTime()
            }
        } else {
            filterDateFrom = new Date("01/01/1970");
            filterDateFromMiliseconds = {
                key: null,
                name: filterDateFrom.getTime()
            }
        }
        if (form.value.filterDateTo != null) {
            filterDateTo = new Date(form.value.filterDateTo);
            filterDateToMiliseconds = {
                key: null,
                name: filterDateTo.getTime()
            }

        } else {
            filterDateTo = new Date();
            filterDateToMiliseconds = {
                key: null,
                name: filterDateTo.getTime()
            }
        }
        filterErrorName = form.value.filterErrorName;
        filterUsername = form.value.filterUsername;
        filterProcessType = form.value.filterProcessType;

        keys = ["combobox.date.from.thrownDate", "combobox.date.to.thrownDate", "errorName", "username", "processType"];
        values = [filterDateFromMiliseconds, filterDateToMiliseconds, filterErrorName, filterUsername, filterProcessType];
        filter = [];

        for (let i = 0; i < 5; i++) {
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
        this.errorLogDataTable.paginate({ first: 0, rows: this._errorLogService.pageRow.rows });
        this.getFilteredLogs(filter);
    }

    /**
     * Event method when data table changes (page or size) 
     * @author Stefan Svrkota
     */
    changePage(event: any) {
        this._errorLogService.pageRow = this._utilityService.copy(event);
    }

    /**
     * Get log tracer by id
     * @author Stefan Svrkota
     */
    selectErrorLog(event: any) {
        this._errorLogService.logs = this._utilityService.copy(this.logs);
        this.selectedErrorLog = event.data;
        this.getLogById(event.data.id);
    }

    /**
     * Get all logs in list
     * @author Stefan Svrkota
     */
    getLogById(id: number) {
        this.subscriptions['getLogById'] = this._errorLogService.getLogByIdRest(id).subscribe(
            (res: RestResponse<any>) => {
                this.trace = this.formatLogMessage(res.data.trace);
                this.showSingleErrorLogModal();
            },
            (err: RestResponse<any>) => {
                this.trace = null;
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode, err.errors);
            }
        )
    }

    public showSingleErrorLogModal() {
        this.errorLogModal.show();
    }

    public closeSingleErrorLogModal() {
        this.errorLogModal.hide();
    }

    /**
     * Format trace message
     * @author Kirey
     */
    formatLogMessage(message: string): string {
        let tempMessage: any = message.replace(/(\r\n|\n|\r)/gm, "<br>");
        tempMessage = tempMessage.split('<br>');
        tempMessage.pop();

        for (let i in tempMessage) {
            let tempLineSecondSection = tempMessage[i].split("(");
            if (tempLineSecondSection[1]) {
                tempLineSecondSection[0] = '<div class="trace_row"><span class="method">' + tempLineSecondSection[0] + '</span><span class="code_trace">';
                tempLineSecondSection[1] += '</span></div>';
            } else {
                tempLineSecondSection[0] = '<div class="trace_row trace_start"><span class="code_trace">' + tempLineSecondSection[0] + '</span></div>';
            }

            tempMessage[i] = tempLineSecondSection.join('(');
        }

        return tempMessage.join("");
    }

    /**
     * Cause exception on backend and store into DB as new exception
     * @author Kirey
     */
    causeException() {
        this.loadingState = true;

        this._errorLogService.causeExceptionRest().subscribe(
            res => { },
            (err: RestResponse<any>) => {
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode, err.errors);
            }
        )
    }

    /*--------- NgOnInit --------*/
    ngOnInit() {
        // Initital method to be executed when page loads
        this._appService.pageLoaded('', this);

        // Variable initialization
        this.subscriptions = {};
        this.componentAlert = new Alert(null, true);
        this.maxDate = new Date();
        this.logs = this._errorLogService.logs;
        this.context = this;
        this.errorLogDataTable.paginate(this._errorLogService.pageRow);

        // Initial methods
        this.getLogsInit();
        this.validateFilter();

        this._appService.languageChangeForComponent(this);
    }

    ngOnDestroy(): void {
        this._appService.refreshEmitters(this.subscriptions);
    }
}