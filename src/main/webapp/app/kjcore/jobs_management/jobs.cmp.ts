import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';

import { JobsService } from './jobs.service';
import { JobModel } from './models';

import { TranslateService } from 'ng2-translate';

import { UtilityService } from '../shared/services/utility.service';
import { AppService } from '../shared/services/app.service';
import { Alert, RestResponse } from '../shared/models';

import { Constants } from "../constants";
@Component({
    moduleId: module.id,
    templateUrl: 'jobs.cmp.html',
    encapsulation: ViewEncapsulation.None
})
export class JobsComponent implements OnInit {
    jobs: JobModel[];
    pageRefreshTime: number;
    isRefreshing: boolean = false;
    refreshDataEvent: any;
    componentAlert: Alert;
    subscriptions: {};

    constructor(
        private _utilityService: UtilityService,
        private _jobService: JobsService,
        private _appService: AppService,
        private _translateService: TranslateService,
        private _router: Router,
        private _constants: Constants
    ) { }

    /*--------- NG On Init ---------*/
    ngOnInit() {
        // Initital method to be executed when page loads
        this._appService.pageLoaded('', this);
        this.componentAlert = new Alert(3000, true);
        this.subscriptions = {};
        this.getAllJobs();
        this.pageRefreshTime = 1000;
        this.startRefreshPageRecurentEvent();
        this._appService.languageChangeForComponent(this);

    }

    /*--------- NG On Destroy ---------*/
    ngOnDestroy(): void {
        this._appService.refreshEmitters(this.subscriptions);
        // console.log("unsubscribed from jobs refreshing");
        this.refreshDataEvent.unsubscribe();
    }

    /**
     * retrieve all jobs from db
     * @author Roxana
     */
    getAllJobs() {
        this.jobs = [];
        let This = this;
        this.subscriptions["allJobs"] = this._jobService.getAllJobsRest().subscribe((res: RestResponse<any>) => {
            // console.log(res);
            This.jobs = res.data.jobsList;
            This.updateJobsDuration();
            setTimeout(function () { This.isRefreshing = false; }, 1000);
        });
    }


    /**
     * update jobs duration
     * @author Roxana
     */
    updateJobsDuration() {
        for (let i = 0; i < this.jobs.length; i++) {
            if (this.jobs[i].endTime == null || this.jobs[i].startTime == null)
                this.jobs[i].duration = "";
            else
                this.jobs[i].duration = this.millisecondsToTimeFormat(this.jobs[i].endTime - this.jobs[i].startTime);
        }
    }
    /**
     * this method triggers navigation to history page
     * @author Roxana
     */
    viewHistory(jobName: string) {
        this._router.navigate(['/admin/jobs/' + jobName]);
    }

    /**
     * this method triggers start job method
     * @author Roxana
     */
    startJob(schedulerName: string) {
        let This = this;
        this.subscriptions['startJobRest'] = this._jobService.startJobRest(schedulerName).subscribe(
            (res: RestResponse<any>) => {
                // console.log(res);
                this.getAllJobs();
                this._utilityService.setAlert(this.componentAlert, res.message, res.statusCode);
            },
            (err: RestResponse<any>) => {
                //console.log(err);
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode);
            })
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


    refreshJobs(timeInterval: number) {
        return Observable
            .interval(timeInterval)
            .flatMap(() => {
                return this._jobService.getAllJobsRest();
            });
    }
    /**
    * unsubsribe from the current refresh event and start a new event with the new time interval
    * @author Roxana
    */
    restartPageRefresh(timeInterval: number) {
        // console.log("unsubscribed from schedulers refreshing");
        this.refreshDataEvent.unsubscribe();
        this.pageRefreshTime = timeInterval;
        // console.log("restart refresh page event time: "+this.pageRefreshTime);
        this.startRefreshPageRecurentEvent();
    }

    /**
   * subscribes to refreshSchedulerData, updates the schedulers data and if the refreshTime changed  restart the refresh event
   * @author Roxana
   */
    startRefreshPageRecurentEvent() {
        let This = this;
        This.refreshDataEvent = This.refreshJobs(This.pageRefreshTime).subscribe(
            (res: RestResponse<any>) => {
                This.jobs = res.data.jobsList;
                This.updateJobsDuration();
                let refreshTimeFormated = This.convertRefreshTimeToMilliseconds(res.data.refreshTime);
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
    }

    /**
    * converts time from HH:mm:ss to milliseconds
    * @author Roxana
    */
    convertRefreshTimeToMilliseconds(refreshTime: String): number {
        let timeComponents = refreshTime.split(":");
        let timeAsNumber = 0;
        let nrOfMilliseconds = [3600000, 60000, 1000];
        let timeInMilliseconds = 0;
        let i = 0;
        if (timeComponents.length != 3) {
            // console.log("Error parsing refresh time, format not recognized");
        }
        else {
            for (i = 0; i < 3; i++) {
                timeAsNumber = +timeComponents[i];
                timeInMilliseconds += timeAsNumber * nrOfMilliseconds[i];
            }

        }

        return timeInMilliseconds;
    }

    /**
   * refresh the data in the table
   * @author Roxana
   */
    onRefreshListClick() {
        this.isRefreshing = true;
        this.getAllJobs();
    }
}