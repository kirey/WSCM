import { Component, OnInit ,ViewEncapsulation, ViewChild} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';

import { SchedulerModel } from './models';
import { SchedulerManagementService } from './schedulerManagement.service';

import { TranslateService } from 'ng2-translate';

import { ModalDirective } from 'ng2-bootstrap';

import { UtilityService } from '../shared/services/utility.service';

import { AppService } from '../shared/services/app.service';

import { Alert, RestResponse} from '../shared/models';



@Component({
    moduleId: module.id,
    templateUrl: 'schedulerManagement.cmp.html',
    encapsulation: ViewEncapsulation.None
})
export class SchedulerManagementCmp implements OnInit {
    schedulers: SchedulerModel[];
    fields: any;
    kjcTaskParameterses: any[];
    newParams: any[];
    newScheduler: SchedulerModel;
    cronValues: {};
    cronOption: String;
    isNewScheduler: Boolean;
    isRefreshing: boolean = false;
    parameterNameToDelete: string;
    parameterIdToDelete: number;
    isNewParameter: boolean;
    pageId: string;
    refreshDataEvent: any;
    isError: boolean;
    loadingState: boolean;
    componentAlert: Alert;
    refreshTime: number;
    formErrors: RestResponse<any>;
    schedulerNameToDelete: string;
    schedulerIdToDelete: number;
    subscriptions: {};
    parametersBeforeAdd:any[];

    @ViewChild('schedulerOperationsModal')
    schedulerOperationsModal: ModalDirective;

    constructor(private _schedulerManagementService: SchedulerManagementService,
        private _utilityService: UtilityService,
        private _appService: AppService,
        private _translateService: TranslateService) {
        this.pageId = "batchManagementValidation";

    };

    /*--------- NG On Init ---------*/
    ngOnInit() {
        // Initital method to be executed when page loads
        this._appService.pageLoaded('', this);
        this.newScheduler = new SchedulerModel();
        this.subscriptions = {};
        this.isNewScheduler = true;
        this.schedulers = new Array();
        this.getAllSchedulers();
        this.resetCronValues();
        this.resetErrorMessages();
        this.refreshTime = 3500;
        this.parametersBeforeAdd=[];
        this.startRefreshPageRecurentEvent(true);

        this.componentAlert = new Alert(3000, true);

        this.loadingState = false;

        this._appService.languageChangeForComponent(this, () => {
            this.getAllSchedulers();
        });
    }

     /*--------- NG On Destroy ---------*/
     ngOnDestroy(): void {
        this._appService.refreshEmitters(this.subscriptions);
        // console.log("unsubscribed from schedulers refreshing");
        this.refreshDataEvent.unsubscribe();
    }
    
    /**
     * this method resets the value of the object used to build/parse the cron expression
     * @author Roxana
     */
    resetCronValues() {
        this.cronOption = "";
        this.cronValues = {
            "seconds": { "value": 0, "max": 59, "min": 0 },
            "minute": { "value": null, "max": 59, "min": 0 },
            "hour": { "value": null, "max": 23, "min": 0 },
            "dayOfMonth": { "value": null, "max": 31, "min": 1 },
            "month": { "value": null, "max": 12, "min": 1 },
            "dayOfWeek": { "value": null, "max": 7, "min": 1 },
        };
    }

    /**
     * this method uses _schedulerManagementService for retrieving all schedulers from the database
     * @author Roxana
     */
    getAllSchedulers() {
        let This = this;
        this.subscriptions["allSchedulers"] = this._schedulerManagementService.getAllSchedulersRest()
            .subscribe(
            (res: RestResponse<any>) => {
                // console.log(res);
                This.schedulers = res.data.kjcTaskSchedulersList;
                setTimeout(function () { This.isRefreshing = false; }, 500);
            });
    }

    /**
    * this event is triggered when the user clicks "Add new parameter" button
    * @author Roxana
    */
    addParameterClick() {
        if (!this.newParams)
            this.newParams = new Array();
        //create empty parameter object and display inputs for them
        this.newParams.push({ "name": "", "value": "" });
    }

    /**
    * this event is triggered when the user clicks "Add new scheduler" button
    * @author Roxana
    */
    newSchedulerBtnClick()
    {
        this.isNewScheduler = true;
        this.newScheduler = new SchedulerModel();
        this.resetErrorMessages();
        this.componentAlert = new Alert(3000, true);

        // this.loadingState = false;
        this.resetCronValues();
        this.schedulerOperationsModal.show();
    }

    /**
    * this event is triggered when the user clicks "Edit" button
    * @author Roxana
    */
    editSchedulerClick(selectedScheduler)
    {
        this.resetErrorMessages();
        this.isNewScheduler = false;
        this.resetCronValues();
        this.newParams = new Array();
        this.componentAlert = new Alert(3000, true);

        this.loadingState = false;
        //create copy of the scheduler selected 
        //if the user modifies the scheduler but doesn't want to save the changes the object in the table will be modified due to two way data binding
        // - creating a copy resolves this issue
        this.newScheduler = JSON.parse(JSON.stringify(selectedScheduler));
        this.parseCronExpression(this.newScheduler.cronExpression);
        this.schedulerOperationsModal.show();
    }

    /**
     * this method replaces "" value with null, because onlyNumber directive replaces the value with "" but a number value is needed
     * @author Roxana
     */
    sanitizeCronValues()
    {
        if(this.cronValues["dayOfWeek"].value=="")
            this.cronValues["dayOfWeek"].value=null;
        if(this.cronValues["dayOfMonth"].value=="")
            this.cronValues["dayOfMonth"].value=null;
        if(this.cronValues["month"].value=="")
            this.cronValues["month"].value=null;
        if(this.cronValues["minute"].value=="")
            this.cronValues["minute"].value=null;
        if(this.cronValues["hour"].value=="")
            this.cronValues["hour"].value=null;
    }

    /**
     * this method is called when the user clicks "Save" button and the form is submitted
     * @author Roxana
     */
    newSchedulerSubmit() {
        let i = 0;
        this.sanitizeCronValues();
        this.parametersBeforeAdd=new Array();
        if (!this.newScheduler.kjcTaskParameterses) {
            this.newScheduler.kjcTaskParameterses = new Array();
        }
        //save the parameters before adding the new ones in order to restore them if something goes wrong at save/update
         for (i = 0; i < this.newScheduler.kjcTaskParameterses.length; i++) {
                this.parametersBeforeAdd.push(JSON.parse(JSON.stringify(this.newScheduler.kjcTaskParameterses[i])));
        }

        //for every new param introduced by the user verify that the name and value are not empty
        //if param is valid add it to the scheduler
        if (this.newParams) {
            for (i = 0; i < this.newParams.length; i++) {
                if (this.newParams[i].name != "" && this.newParams[i].value != "") {
                    this.newScheduler.kjcTaskParameterses.push(JSON.parse(JSON.stringify(this.newParams[i])));
                }
            }
        }
       
        let newCronExpression = null;
        this.newScheduler.cronModified = false;
        if (this.verifyIfCronValuesHaveChanged()) {
            newCronExpression = this.buildCronExpression();
        }
        else
            newCronExpression = null;
        if (newCronExpression != this.newScheduler.cronExpression) {
            this.newScheduler.cronModified = true;
        }
        if (this.isNewScheduler == true)
            this.newScheduler.cronModified = true;
        this.newScheduler.cronExpression = newCronExpression;
        // console.log("save or update");
        // console.log(this.newScheduler);
        let This = this;

        this.removeWhitespacesFromScheduler();
        //call save or update
        //refresh list
       
        this.loadingState = true;
        this.subscriptions['saveOrUpdateSchedulerRest'] = this._schedulerManagementService.saveOrUpdateSchedulerRest(this.pageId, this.newScheduler).finally(
            () => {
                this.loadingState = false;
            }
        ).subscribe(
            (res: RestResponse<any>) => {
                // console.log(res);
                This.newScheduler = new SchedulerModel();
                This.resetCronValues();
                This.getAllSchedulers();
                This._utilityService.setAlert(this.componentAlert, res.message, res.statusCode);
                This.resetErrorMessages();
                This.newParams = new Array();
                This.parametersBeforeAdd=new Array();
                this.schedulerOperationsModal.hide();
            }, (err: RestResponse<any>) => {
                this.formErrors = err;
                this.newScheduler.kjcTaskParameterses=[];
                let i=0;
                //restoring old parameteres
                for (i = 0; i < this.parametersBeforeAdd.length; i++)
                {
                    this.newScheduler.kjcTaskParameterses.push(JSON.parse(JSON.stringify(this.parametersBeforeAdd[i])));
                }
                This._utilityService.setAlert(This.componentAlert, err.message, err.statusCode);
            });
    }

    /**
     * remove whitespaces at the begining and end of scheduler name, job name, trigger name
     * @author Roxana
     */
    removeWhitespacesFromScheduler()
    {
        this.newScheduler.name=this.newScheduler.name.trim();
        this.newScheduler.jobName=this.newScheduler.jobName.trim();
        this.newScheduler.triggerName=this.newScheduler.triggerName.trim();
    }

    /**
     * reset the formErrors value to hide error messages in the page
     * @author Roxana
     */
    resetErrorMessages() {
        this.formErrors = null;
    }

    /**
     * this event is triggered when the user clicks "Refresh list" button
     * @author Roxana
     */
    onRefreshListClick() {
        this.isRefreshing = true;
        this.getAllSchedulers();
    }

    /**
     * this event is triggered when the user clicks "Stop" task button
     * @author Roxana
     */
    onStopClick(scheduler: SchedulerModel) {
        let This = this;
        let lastClickedScheduler = scheduler.name;
        this.subscriptions["stopScheduler"] = this._schedulerManagementService.stopSchedulerRest(scheduler.name)
            .subscribe(
            (res: RestResponse<any>) => {
                This._utilityService.setAlert(this.componentAlert, res.message, res.statusCode);
                This.getSchedulersAndKeepFormData(lastClickedScheduler);
                
            },
            (err: RestResponse<any>) => {
                This._utilityService.setAlert(This.componentAlert, err.message, err.statusCode);
            }
            )
    }


    /**
    * get all schedulers and keep the data that was in the form before the requested action
    * @author Roxana
    */
    getSchedulersAndKeepFormData(lastClickedScheduler: any) {
        let This = this;
        this.subscriptions["allSchedulersWithStateSave"] = this._schedulerManagementService.getAllSchedulersRest().subscribe(
            (res: RestResponse<any>) => {
                This.schedulers = res.data.kjcTaskSchedulersList;
                This.refreshTime = res.data.refreshTime;
                let schedulerRefreshed = This.findSchedulerByName(lastClickedScheduler);
                if (schedulerRefreshed) {
                    This.newScheduler = JSON.parse(JSON.stringify(schedulerRefreshed));
                    This.resetCronValues();
                    This.parseCronExpression(This.newScheduler.cronExpression);
                }
                else {
                    This.newScheduler = new SchedulerModel();
                    This.resetCronValues();
                }
            });
    }
    /**
     * this method is used to check if the user checked a cron option like: every n minutes, every n hours, etc
     * a single option can be checked
     * if an option is checked the part of the cron expression is build using the incremental symbol /
     * format minValue/value example: 0/5 in the minutes part means every 5 minutes
     * @author Roxana
     */
    verifyCronOption(key: string, cron: any) {
        if (this.cronOption == key) {
            return " " + cron[key].min + "/" + cron[key].value;
        }
        if (key == "seconds")
            return cron[key].value;
        return " " + cron[key].value;
    }

    /**
     * this method is used to build the cron expression
     * return cronExpression as string
     * if an input is empty (null) his value will be replaced with * in the cronExpression excepting dayOfMonth and dayOfWeek that requires special values
     * dayOfMonth and dayOfMonth cannot have a numeric value in the same time  (their meanings are opposed)
     * example: we cannot say that a job has to be executed MONDAY (dayOfWeek=1) in the first day of the month (because MONDAY may not be the first day of month)
     * @author Roxana
     */
    buildCronExpression(): String {
        let cronExpr = "";
        let expressionParts = {};
        let i = 0;
        for (var key in this.cronValues) {
            if (this.cronValues.hasOwnProperty(key)) {
                if (this.cronValues[key].value != null) {
                    switch (key) {
                        case "dayOfMonth":
                            //if dayOfMonth has a numeric value then dayOfWeek can have only ? value
                            if (this.cronValues["dayOfWeek"].value == null) {
                                expressionParts["dayOfMonth"] = this.verifyCronOption(key, this.cronValues);
                                expressionParts["dayOfWeek"] = " ?";
                            }
                            break;
                        //if dayOfWeek has a numeric value then dayOfMonth can have only ? value
                        case "dayOfWeek":
                            if (this.cronValues["dayOfMonth"].value == null) {
                                expressionParts["dayOfWeek"] = this.verifyCronOption(key, this.cronValues);
                                expressionParts["dayOfMonth"] = " ?";
                            }
                            break;
                        default:
                            expressionParts[key] = this.verifyCronOption(key, this.cronValues);
                            break;
                    }
                }
                else {
                    //dayOfWeek and dayOfMonth cannot be * in the same time
                    // if both are null we set dayOfMonth to allValues (*) and dayOfWeek to no specific value (?)
                    if (this.cronValues["dayOfWeek"].value == null && this.cronValues["dayOfMonth"].value == null) {
                        expressionParts["dayOfWeek"] = " ?";
                        expressionParts["dayOfMonth"] = " *";
                    }
                    if (key != "dayOfWeek" && key != "dayOfMonth")
                        expressionParts[key] = " *";
                }
            }
        }

        //build the cron expression
        //order of append is important
        cronExpr += expressionParts["seconds"];
        cronExpr += expressionParts["minute"];
        cronExpr += expressionParts["hour"];
        cronExpr += expressionParts["dayOfMonth"];
        cronExpr += expressionParts["month"];
        cronExpr += expressionParts["dayOfWeek"];
        return cronExpr;
    }

    /**
     * this method is used to parse the cron expression 
     * parameter: expr is the cron expression as a string
     * return cronExpression as object with second, minutes, hours, etc, properties
     * @author Roxana
     */
    parseCronExpression(expr: String) {
        // the string expression is split by space separator
        if (expr != null) {
            let exprParts = expr.split(" ");
            let i = 0;
            for (var key in this.cronValues) {
                if (this.cronValues.hasOwnProperty(key)) {
                    //if a part of the expression is * or ? then the corresponding property value will be set to null
                    if (exprParts[i] == "*" || exprParts[i] == "?")
                        this.cronValues[key].value = null;
                    else {
                        let incrementalParts = exprParts[i].split("/");
                        //if a part of the expression contains the incremental symbol / then the corresponding cron option will be checked in the page
                        if (incrementalParts.length == 2) {
                            this.cronOption = key;
                            this.cronValues[key].value = incrementalParts[1];
                        }
                        else
                            this.cronValues[key].value = exprParts[i];
                    }
                    i++;
                }
            }
            // console.log(this.cronValues);
        }
        else {
            this.resetCronValues();
        }
    }
    /**
     *retrieves scheduler by name from existing schedulers on the page
     * @author Roxana
     */
    findSchedulerByName(name: string) {
        let i = 0;
        for (i = 0; i < this.schedulers.length; i++) {
            if (this.schedulers[i].name == name) {
                return this.schedulers[i];
            }
        }
        return null;
    }
    
    /**
    * save current parameter name and scheduler id for delete
    * @author Roxana
    */
    displayConfirmRemove(isNewParameter: boolean, schedulerName: string, paramName: string, paramId: number = 0) {
        this.parameterNameToDelete = paramName;
        this.parameterIdToDelete = paramId;
        this.schedulerNameToDelete = schedulerName;
        this.isNewParameter = isNewParameter;
    }
    /**
    *remove parameter
    *if parameter is not saved in the database delete it from the local Array
    *otherwise make request to delete it from the database
    * @author Roxana
    */
    removeParameter() {
        let This = this;
        if (this.isNewParameter) {
            this.removeObjectByName(This.parameterNameToDelete, This.newParams);
        }
        else {
            this.subscriptions["removeParameter"] = This._schedulerManagementService.removeParameterRest(This.schedulerNameToDelete, This.parameterIdToDelete)
                .subscribe(
                (res: RestResponse<any>) => {
                    this._utilityService.setAlert(this.componentAlert, res.message, res.statusCode);
                    let lastClickedScheduler = This.schedulerNameToDelete;
                    this.removeObjectByName(this.parameterNameToDelete, this.newScheduler.kjcTaskParameterses);
                    this.getSchedulersAndKeepFormData(lastClickedScheduler);
                },
                (err: RestResponse<any>) => {
                    this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode);
                }
            )
        }
    }
    /**
    *remove object from array by name
    * @author Roxana
    */
    removeObjectByName(name: string, params: any[]) {
        for (let i = params.length - 1; i >= 0; i--) {
            if (params[i].name == name) {
                // console.log("deleting " + name);
                params.splice(i, 1);
            }
        }
    }

    /**
    *verify if the user has changed the values for the cron expression input
    * @author Roxana
    */
    verifyIfCronValuesHaveChanged(): boolean {
        if (this.cronValues["seconds"].value != 0) {
            // console.log("cron val seconds changed " + this.cronValues["seconds"].value);
            return true;
        }
        for (var key in this.cronValues) {
            if (this.cronValues.hasOwnProperty(key) && this.cronValues[key].value != null && key != "seconds") {
                // console.log("cron val " + key + " changed " + this.cronValues[key].value);
                return true;
            }
        }
        return false;
    }

    /**
    *refresh table data at every 1.5 seconds
    * @author Roxana
    */
    refreshSchedulerData(timeInterval: number) {
        return Observable
            .interval(timeInterval)
            .flatMap(() => {
                return this._schedulerManagementService.getAllSchedulersRest();
            });
    }

    /**
    * subscribes to refreshSchedulerData, updates the schedulers data and if the refreshTime changed  restart the refresh event
    * @author Roxana
    */
    startRefreshPageRecurentEvent(firstEvent = false) {
        let This = this;
        This.refreshDataEvent = This.refreshSchedulerData(This.refreshTime).subscribe(
            (res: RestResponse<any>) => {
                This.schedulers = res.data.kjcTaskSchedulersList;
                let refreshTimeFormated = This.convertRefreshTimeToMilliseconds(res.data.refreshTime);
                if (refreshTimeFormated == 0) {
                    This.refreshTime = 0;
                    // console.log("Refresh time 0- Unsubscribe from refresh");
                    This.refreshDataEvent.unsubscribe();

                }
                else {

                    // console.log("Refresh time "+refreshTimeFormated);
                    if (refreshTimeFormated != This.refreshTime) {
                        This.restartPageRefresh(refreshTimeFormated);
                    }
                    else {
                        if (firstEvent == true) {
                            This.restartPageRefresh(refreshTimeFormated);
                        }
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
                timeAsNumber = +timeComponents[i];;
                timeInMilliseconds += timeAsNumber * nrOfMilliseconds[i];
            }

        }

        return timeInMilliseconds;
    }
    /**
    * unsubsribe from the current refresh event and start a new event with the new time interval
    * @author Roxana
    */
    restartPageRefresh(timeInterval: number) {
        // console.log("unsubscribed from schedulers refreshing");
        this.refreshDataEvent.unsubscribe();
        this.refreshTime = timeInterval;
        // console.log("restart refresh page event time: "+this.refreshTime);
        this.startRefreshPageRecurentEvent();
    }


    /**
   * delete scheduler by name
   * @author Roxana
   */
    deleteScheduler() {
        if (this.schedulerNameToDelete) {
            this.subscriptions["deleteScheduler"] = this._schedulerManagementService.deleteSchedulerRest(this.schedulerNameToDelete).subscribe(
                (res: RestResponse<any>) => {
                    this._utilityService.setAlert(this.componentAlert, res.message, res.statusCode);
                    this.getAllSchedulers();
                },
                (err: RestResponse<any>) => {
                    this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode);
                }
            )
        }
    }

    /**
   * validate form inputs
   * @author Roxana
   */
    validateSchedulerForm():boolean {
        if(!this.newScheduler.name)
            return false;
        if(!this.newScheduler.jobName)
            return false;
        if(!this.newScheduler.jobDescription)
            return false;
        if(!this.newScheduler.triggerName)
            return false;
        if(this.cronValues["minute"].value && ( this.cronValues["minute"].value < this.cronValues["minute"].min || this.cronValues["minute"].value>this.cronValues["minute"].max))
            return false;
        if(this.cronValues["hour"].value && (this.cronValues["hour"].value < this.cronValues["hour"].min || this.cronValues["hour"].value > this.cronValues["hour"].max))
            return false;
        if(this.cronValues["dayOfMonth"].value && (this.cronValues["dayOfMonth"].value < this.cronValues["dayOfMonth"].min || this.cronValues["dayOfMonth"].value > this.cronValues["dayOfMonth"].max))
            return false;
        if(this.cronValues["dayOfWeek"].value && (this.cronValues["dayOfWeek"].value < this.cronValues["dayOfWeek"].min || this.cronValues["dayOfWeek"].value > this.cronValues["dayOfWeek"].max))
            return false;
        if(this.cronValues["month"].value && (this.cronValues["month"].value < this.cronValues["month"].min || this.cronValues["month"].value > this.cronValues["month"].max))
            return false;
        return true;
    }

    /**
   * verfify if a input in the cron expression editor form is empty
   * @author Roxana
   */
    cronFieldNotEmpty(fieldName: string)
    {
        if(this.cronValues[fieldName].value=="")
            return false;
        if(this.cronValues[fieldName].value==null)
            return false;
        return true;
    }
}