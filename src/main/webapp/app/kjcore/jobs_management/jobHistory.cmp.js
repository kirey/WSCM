"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var jobHistory_service_1 = require('./jobHistory.service');
var ng2_translate_1 = require('ng2-translate');
var utility_service_1 = require('../shared/services/utility.service');
var app_service_1 = require('../shared/services/app.service');
var models_1 = require('./models');
var JobHistoryCmp = (function () {
    function JobHistoryCmp(_utilityService, _jobHistoryService, _appService, _translateService, route, router) {
        this._utilityService = _utilityService;
        this._jobHistoryService = _jobHistoryService;
        this._appService = _appService;
        this._translateService = _translateService;
        this.route = route;
        this.router = router;
        this.expandedRuntimeErrors = new Array();
        this.expandedBatchValidErrors = new Array();
        this.displayErrorModal = false;
        this.selectedJobHistory = new models_1.JobModel();
    }
    /*--------- NG On Init ---------*/
    JobHistoryCmp.prototype.ngOnInit = function () {
        // Initital method to be executed when page loads
        this._appService.pageLoaded('', this);
        this.subscriptions = {};
        this.jobHistory = new Array();
        this.batchValidationErrors = new Array();
        this.runtimeErrors = new Array();
        this.currentJobName = this.route.snapshot.params['name'];
        this.traceRuntimeError = '';
        this._appService.languageChangeForComponent(this);
    };
    /*--------- NG On Destroy ---------*/
    JobHistoryCmp.prototype.ngOnDestroy = function () {
        this._appService.refreshEmitters(this.subscriptions);
    };
    /**
     *retrieve job history from database
     * @author Roxana
     */
    JobHistoryCmp.prototype.getJobHistory = function (jobName, startDate, endDate) {
        var This = this;
        this.subscriptions["getJobHistory"] = this._jobHistoryService.getJobHistoryRest(jobName, startDate, endDate).subscribe(function (resp) {
            This.jobHistory = resp.data;
            // console.log(resp);
            for (var i = 0; i < This.jobHistory.length; i++) {
                if (This.jobHistory[i].endTime == null || This.jobHistory[i].startTime == null)
                    This.jobHistory[i].duration = "";
                else
                    This.jobHistory[i].duration = This.millisecondsToTimeFormat((This.jobHistory[i].endTime - This.jobHistory[i].startTime));
            }
        });
    };
    /**
     * when row is clicked if the selected job's status is failed dispalay modal with error details
     * @author Roxana
     */
    JobHistoryCmp.prototype.onRowSelect = function ($event) {
        this.selectedJobHistory = $event.data;
        var This = this;
        if (this.selectedJobHistory.exitCode == 'FAILED' || this.selectedJobHistory.exitCode == 'COMPLETED WITH ERRORS') {
            //show modal with error details
            this.subscriptions["getErrorsDetails"] = this._jobHistoryService.getErrorsDetailsRest(This.selectedJobHistory.jobInstanceId.toString()).subscribe(function (res) {
                This.runtimeErrors = res.data.runtimeErrors;
                This.batchValidationErrors = res.data.validationErrors;
            });
        }
    };
    /**
     * Expand click event on runtime error
     * @author Ciprian Dorofte
     */
    JobHistoryCmp.prototype.onRowClickRuntimeError = function (event) {
        var _this = this;
        this.subscriptions["getTraceRest"] = this._jobHistoryService.getTraceRest(event.data.id).subscribe(function (res) {
            _this.traceRuntimeError = res.data.trace;
        });
        this.expandedRuntimeErrors = [];
        this.expandedRuntimeErrors.push(event.data);
    };
    /**
     * Expand click event on batch validation error
     * @author Ciprian Dorofte
     */
    JobHistoryCmp.prototype.onRowClickBatchValidError = function (event) {
        this.expandedBatchValidErrors = [];
        this.expandedBatchValidErrors.push(event.data);
    };
    /**
     * this method converts from milliseconds to h:m:s format
     * @author Roxana
     */
    JobHistoryCmp.prototype.millisecondsToTimeFormat = function (millisec) {
        var res = "";
        var hours = Math.floor(millisec / 36e5), mins = Math.floor((millisec % 36e5) / 6e4), secs = Math.floor((millisec % 6e4) / 1000);
        res = (hours <= 9 ? "0" : "") + hours + ":" + (mins <= 9 ? "0" : "") + mins + ":" + (secs <= 9 ? "0" : "") + secs;
        return res;
    };
    /**
    * this method is triggered when the user clicks "View history button"
    * gets job history between two dates (startDate and endDate)
    * @author Roxana
    */
    JobHistoryCmp.prototype.viewHistory = function () {
        var endDateFormated = this.endDate.getDate() + '/' + (this.endDate.getMonth() + 1) + '/' + this.endDate.getFullYear();
        var startDateFormated = this.startDate.getDate() + '/' + (this.startDate.getMonth() + 1) + '/' + this.startDate.getFullYear();
        this.getJobHistory(this.currentJobName, startDateFormated, endDateFormated);
    };
    JobHistoryCmp = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'jobHistory.cmp.html',
            encapsulation: core_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [utility_service_1.UtilityService, jobHistory_service_1.JobHistoryService, app_service_1.AppService, ng2_translate_1.TranslateService, router_1.ActivatedRoute, router_1.Router])
    ], JobHistoryCmp);
    return JobHistoryCmp;
}());
exports.JobHistoryCmp = JobHistoryCmp;
//# sourceMappingURL=jobHistory.cmp.js.map