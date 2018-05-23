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
var Observable_1 = require('rxjs/Observable');
require('rxjs/add/observable/interval');
var jobs_service_1 = require('./jobs.service');
var ng2_translate_1 = require('ng2-translate');
var utility_service_1 = require('../shared/services/utility.service');
var app_service_1 = require('../shared/services/app.service');
var models_1 = require('../shared/models');
var constants_1 = require("../constants");
var JobsComponent = (function () {
    function JobsComponent(_utilityService, _jobService, _appService, _translateService, _router, _constants) {
        this._utilityService = _utilityService;
        this._jobService = _jobService;
        this._appService = _appService;
        this._translateService = _translateService;
        this._router = _router;
        this._constants = _constants;
        this.isRefreshing = false;
    }
    /*--------- NG On Init ---------*/
    JobsComponent.prototype.ngOnInit = function () {
        // Initital method to be executed when page loads
        this._appService.pageLoaded('', this);
        this.componentAlert = new models_1.Alert(3000, true);
        this.subscriptions = {};
        this.getAllJobs();
        this.pageRefreshTime = 1000;
        this.startRefreshPageRecurentEvent();
        this._appService.languageChangeForComponent(this);
    };
    /*--------- NG On Destroy ---------*/
    JobsComponent.prototype.ngOnDestroy = function () {
        this._appService.refreshEmitters(this.subscriptions);
        // console.log("unsubscribed from jobs refreshing");
        this.refreshDataEvent.unsubscribe();
    };
    /**
     * retrieve all jobs from db
     * @author Roxana
     */
    JobsComponent.prototype.getAllJobs = function () {
        this.jobs = [];
        var This = this;
        this.subscriptions["allJobs"] = this._jobService.getAllJobsRest().subscribe(function (res) {
            // console.log(res);
            This.jobs = res.data.jobsList;
            This.updateJobsDuration();
            setTimeout(function () { This.isRefreshing = false; }, 1000);
        });
    };
    /**
     * update jobs duration
     * @author Roxana
     */
    JobsComponent.prototype.updateJobsDuration = function () {
        for (var i = 0; i < this.jobs.length; i++) {
            if (this.jobs[i].endTime == null || this.jobs[i].startTime == null)
                this.jobs[i].duration = "";
            else
                this.jobs[i].duration = this.millisecondsToTimeFormat(this.jobs[i].endTime - this.jobs[i].startTime);
        }
    };
    /**
     * this method triggers navigation to history page
     * @author Roxana
     */
    JobsComponent.prototype.viewHistory = function (jobName) {
        this._router.navigate(['/admin/jobs/' + jobName]);
    };
    /**
     * this method triggers start job method
     * @author Roxana
     */
    JobsComponent.prototype.startJob = function (schedulerName) {
        var _this = this;
        var This = this;
        this.subscriptions['startJobRest'] = this._jobService.startJobRest(schedulerName).subscribe(function (res) {
            // console.log(res);
            _this.getAllJobs();
            _this._utilityService.setAlert(_this.componentAlert, res.message, res.statusCode);
        }, function (err) {
            //console.log(err);
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode);
        });
    };
    /**
     * this method converts from milliseconds to h:m:s format
     * @author Roxana
     */
    JobsComponent.prototype.millisecondsToTimeFormat = function (millisec) {
        var res = "";
        var hours = Math.floor(millisec / 36e5), mins = Math.floor((millisec % 36e5) / 6e4), secs = Math.floor((millisec % 6e4) / 1000);
        res = (hours <= 9 ? "0" : "") + hours + ":" + (mins <= 9 ? "0" : "") + mins + ":" + (secs <= 9 ? "0" : "") + secs;
        return res;
    };
    JobsComponent.prototype.refreshJobs = function (timeInterval) {
        var _this = this;
        return Observable_1.Observable
            .interval(timeInterval)
            .flatMap(function () {
            return _this._jobService.getAllJobsRest();
        });
    };
    /**
    * unsubsribe from the current refresh event and start a new event with the new time interval
    * @author Roxana
    */
    JobsComponent.prototype.restartPageRefresh = function (timeInterval) {
        // console.log("unsubscribed from schedulers refreshing");
        this.refreshDataEvent.unsubscribe();
        this.pageRefreshTime = timeInterval;
        // console.log("restart refresh page event time: "+this.pageRefreshTime);
        this.startRefreshPageRecurentEvent();
    };
    /**
   * subscribes to refreshSchedulerData, updates the schedulers data and if the refreshTime changed  restart the refresh event
   * @author Roxana
   */
    JobsComponent.prototype.startRefreshPageRecurentEvent = function () {
        var This = this;
        This.refreshDataEvent = This.refreshJobs(This.pageRefreshTime).subscribe(function (res) {
            This.jobs = res.data.jobsList;
            This.updateJobsDuration();
            var refreshTimeFormated = This.convertRefreshTimeToMilliseconds(res.data.refreshTime);
            // console.log("Refresh time : "+refreshTimeFormated);
            if (refreshTimeFormated == 0) {
                This.pageRefreshTime = 0;
                // console.log("Refresh time 0- Unsubscribe from refresh");
                This.refreshDataEvent.unsubscribe();
            }
            else {
                // console.log("Refresh time "+refreshTimeFormated);
                if (refreshTimeFormated != This.pageRefreshTime) {
                    This.restartPageRefresh(refreshTimeFormated);
                }
            }
        });
    };
    /**
    * converts time from HH:mm:ss to milliseconds
    * @author Roxana
    */
    JobsComponent.prototype.convertRefreshTimeToMilliseconds = function (refreshTime) {
        var timeComponents = refreshTime.split(":");
        var timeAsNumber = 0;
        var nrOfMilliseconds = [3600000, 60000, 1000];
        var timeInMilliseconds = 0;
        var i = 0;
        if (timeComponents.length != 3) {
        }
        else {
            for (i = 0; i < 3; i++) {
                timeAsNumber = +timeComponents[i];
                timeInMilliseconds += timeAsNumber * nrOfMilliseconds[i];
            }
        }
        return timeInMilliseconds;
    };
    /**
   * refresh the data in the table
   * @author Roxana
   */
    JobsComponent.prototype.onRefreshListClick = function () {
        this.isRefreshing = true;
        this.getAllJobs();
    };
    JobsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'jobs.cmp.html',
            encapsulation: core_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [utility_service_1.UtilityService, jobs_service_1.JobsService, app_service_1.AppService, ng2_translate_1.TranslateService, router_1.Router, constants_1.Constants])
    ], JobsComponent);
    return JobsComponent;
}());
exports.JobsComponent = JobsComponent;
//# sourceMappingURL=jobs.cmp.js.map