import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { JobHistoryService } from './jobHistory.service';

import { TranslateService } from 'ng2-translate';

import { DataTable } from 'primeng/primeng';

import { UtilityService } from '../shared/services/utility.service';
import { AppService } from '../shared/services/app.service';

import { JobModel, RuntimeErrorModel, BatchValidationErrorModel } from './models';
import { RestResponse } from '../shared/models';

@Component({
    moduleId: module.id,
    templateUrl: 'jobHistory.cmp.html',
    encapsulation: ViewEncapsulation.None
})
export class JobHistoryCmp implements OnInit {
    expandedRuntimeErrors: Array<any> = new Array<any>();
    expandedBatchValidErrors: Array<any> = new Array<any>();

    jobHistory: JobModel[];
    runtimeErrors: RuntimeErrorModel[];
    batchValidationErrors: BatchValidationErrorModel[];
    displayErrorModal: boolean = false;
    selectedJobHistory: JobModel;
    subscriptions: {};
    startDate: Date;
    endDate: Date;
    currentJobName: string;
    traceRuntimeError: string;
    constructor(
        private _utilityService: UtilityService,
        private _jobHistoryService: JobHistoryService,
        private _appService: AppService,
        private _translateService: TranslateService,
        private route: ActivatedRoute,
        private router: Router
    ) {
        this.selectedJobHistory = new JobModel();
    }

    /*--------- NG On Init ---------*/
    ngOnInit() {
        // Initital method to be executed when page loads
        this._appService.pageLoaded('', this);
        this.subscriptions = {};
        this.jobHistory = new Array();
        this.batchValidationErrors = new Array();
        this.runtimeErrors = new Array();
        this.currentJobName = this.route.snapshot.params['name'];
        this.traceRuntimeError = '';
        this._appService.languageChangeForComponent(this);
    }

    /*--------- NG On Destroy ---------*/
    ngOnDestroy(): void {
        this._appService.refreshEmitters(this.subscriptions);
    }

    /**
     *retrieve job history from database
     * @author Roxana
     */
    getJobHistory(jobName: string, startDate: string, endDate: string) {
        let This = this;
        this.subscriptions["getJobHistory"] = this._jobHistoryService.getJobHistoryRest(jobName,startDate,endDate).subscribe(
            (resp: RestResponse<any>) => {
                This.jobHistory = resp.data;
                // console.log(resp);
                for (let i = 0; i < This.jobHistory.length; i++) {
                    if (This.jobHistory[i].endTime == null || This.jobHistory[i].startTime == null)
                        This.jobHistory[i].duration = "";
                    else
                        This.jobHistory[i].duration = This.millisecondsToTimeFormat((This.jobHistory[i].endTime - This.jobHistory[i].startTime));
                }
        }   );
    }
    /**
     * when row is clicked if the selected job's status is failed dispalay modal with error details
     * @author Roxana
     */
    onRowSelect($event) {
        this.selectedJobHistory = $event.data;
        let This = this;
        if (this.selectedJobHistory.exitCode=='FAILED' || this.selectedJobHistory.exitCode=='COMPLETED WITH ERRORS') {
            //show modal with error details
            this.subscriptions["getErrorsDetails"] = this._jobHistoryService.getErrorsDetailsRest(This.selectedJobHistory.jobInstanceId.toString()).subscribe(
                (res: RestResponse<any>) => {
                    This.runtimeErrors = res.data.runtimeErrors;
                    This.batchValidationErrors = res.data.validationErrors;
                }
            )
        }
    }

    /**
     * Expand click event on runtime error
     * @author Ciprian Dorofte
     */
    onRowClickRuntimeError(event){
        this.subscriptions["getTraceRest"] = this._jobHistoryService.getTraceRest(event.data.id).subscribe(
                (res: RestResponse<any>) => {
                    this.traceRuntimeError = res.data.trace;
                }
            )

        this.expandedRuntimeErrors = [];
        this.expandedRuntimeErrors.push(event.data);
    }

    /**
     * Expand click event on batch validation error
     * @author Ciprian Dorofte
     */
    onRowClickBatchValidError(event){
        this.expandedBatchValidErrors = [];
        this.expandedBatchValidErrors.push(event.data);
    }

    /**
     * this method converts from milliseconds to h:m:s format
     * @author Roxana
     */
    millisecondsToTimeFormat(millisec: number): string {
        let res = "";
        var hours = Math.floor(millisec / 36e5),
            mins = Math.floor((millisec % 36e5) / 6e4),
            secs = Math.floor((millisec % 6e4) / 1000);
        res = (hours <= 9 ? "0" : "") + hours + ":" + (mins <= 9 ? "0" : "") + mins + ":" + (secs <= 9 ? "0" : "") + secs;
        return res;
    }

     /**
     * this method is triggered when the user clicks "View history button"
     * gets job history between two dates (startDate and endDate) 
     * @author Roxana
     */
    viewHistory(){
        let endDateFormated=this.endDate.getDate()+'/'+(this.endDate.getMonth() + 1) + '/' +  this.endDate.getFullYear();
        let startDateFormated=this.startDate.getDate()+'/'+(this.startDate.getMonth() + 1) + '/' +  this.startDate.getFullYear();
        this.getJobHistory(this.currentJobName,startDateFormated,endDateFormated);
    }
}