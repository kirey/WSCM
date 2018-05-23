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
var Observable_1 = require('rxjs/Observable');
require('rxjs/add/observable/interval');
var models_1 = require('./models');
var schedulerManagement_service_1 = require('./schedulerManagement.service');
var ng2_translate_1 = require('ng2-translate');
var ng2_bootstrap_1 = require('ng2-bootstrap');
var utility_service_1 = require('../shared/services/utility.service');
var app_service_1 = require('../shared/services/app.service');
var models_2 = require('../shared/models');
var SchedulerManagementCmp = (function () {
    function SchedulerManagementCmp(_schedulerManagementService, _utilityService, _appService, _translateService) {
        this._schedulerManagementService = _schedulerManagementService;
        this._utilityService = _utilityService;
        this._appService = _appService;
        this._translateService = _translateService;
        this.isRefreshing = false;
        this.pageId = "batchManagementValidation";
    }
    ;
    /*--------- NG On Init ---------*/
    SchedulerManagementCmp.prototype.ngOnInit = function () {
        var _this = this;
        // Initital method to be executed when page loads
        this._appService.pageLoaded('', this);
        this.newScheduler = new models_1.SchedulerModel();
        this.subscriptions = {};
        this.isNewScheduler = true;
        this.schedulers = new Array();
        this.getAllSchedulers();
        this.resetCronValues();
        this.resetErrorMessages();
        this.refreshTime = 3500;
        this.parametersBeforeAdd = [];
        this.startRefreshPageRecurentEvent(true);
        this.componentAlert = new models_2.Alert(3000, true);
        this.loadingState = false;
        this._appService.languageChangeForComponent(this, function () {
            _this.getAllSchedulers();
        });
    };
    /*--------- NG On Destroy ---------*/
    SchedulerManagementCmp.prototype.ngOnDestroy = function () {
        this._appService.refreshEmitters(this.subscriptions);
        // console.log("unsubscribed from schedulers refreshing");
        this.refreshDataEvent.unsubscribe();
    };
    /**
     * this method resets the value of the object used to build/parse the cron expression
     * @author Roxana
     */
    SchedulerManagementCmp.prototype.resetCronValues = function () {
        this.cronOption = "";
        this.cronValues = {
            "seconds": { "value": 0, "max": 59, "min": 0 },
            "minute": { "value": null, "max": 59, "min": 0 },
            "hour": { "value": null, "max": 23, "min": 0 },
            "dayOfMonth": { "value": null, "max": 31, "min": 1 },
            "month": { "value": null, "max": 12, "min": 1 },
            "dayOfWeek": { "value": null, "max": 7, "min": 1 },
        };
    };
    /**
     * this method uses _schedulerManagementService for retrieving all schedulers from the database
     * @author Roxana
     */
    SchedulerManagementCmp.prototype.getAllSchedulers = function () {
        var This = this;
        this.subscriptions["allSchedulers"] = this._schedulerManagementService.getAllSchedulersRest()
            .subscribe(function (res) {
            // console.log(res);
            This.schedulers = res.data.kjcTaskSchedulersList;
            setTimeout(function () { This.isRefreshing = false; }, 500);
        });
    };
    /**
    * this event is triggered when the user clicks "Add new parameter" button
    * @author Roxana
    */
    SchedulerManagementCmp.prototype.addParameterClick = function () {
        if (!this.newParams)
            this.newParams = new Array();
        //create empty parameter object and display inputs for them
        this.newParams.push({ "name": "", "value": "" });
    };
    /**
    * this event is triggered when the user clicks "Add new scheduler" button
    * @author Roxana
    */
    SchedulerManagementCmp.prototype.newSchedulerBtnClick = function () {
        this.isNewScheduler = true;
        this.newScheduler = new models_1.SchedulerModel();
        this.resetErrorMessages();
        this.componentAlert = new models_2.Alert(3000, true);
        // this.loadingState = false;
        this.resetCronValues();
        this.schedulerOperationsModal.show();
    };
    /**
    * this event is triggered when the user clicks "Edit" button
    * @author Roxana
    */
    SchedulerManagementCmp.prototype.editSchedulerClick = function (selectedScheduler) {
        this.resetErrorMessages();
        this.isNewScheduler = false;
        this.resetCronValues();
        this.newParams = new Array();
        this.componentAlert = new models_2.Alert(3000, true);
        this.loadingState = false;
        //create copy of the scheduler selected 
        //if the user modifies the scheduler but doesn't want to save the changes the object in the table will be modified due to two way data binding
        // - creating a copy resolves this issue
        this.newScheduler = JSON.parse(JSON.stringify(selectedScheduler));
        this.parseCronExpression(this.newScheduler.cronExpression);
        this.schedulerOperationsModal.show();
    };
    /**
     * this method replaces "" value with null, because onlyNumber directive replaces the value with "" but a number value is needed
     * @author Roxana
     */
    SchedulerManagementCmp.prototype.sanitizeCronValues = function () {
        if (this.cronValues["dayOfWeek"].value == "")
            this.cronValues["dayOfWeek"].value = null;
        if (this.cronValues["dayOfMonth"].value == "")
            this.cronValues["dayOfMonth"].value = null;
        if (this.cronValues["month"].value == "")
            this.cronValues["month"].value = null;
        if (this.cronValues["minute"].value == "")
            this.cronValues["minute"].value = null;
        if (this.cronValues["hour"].value == "")
            this.cronValues["hour"].value = null;
    };
    /**
     * this method is called when the user clicks "Save" button and the form is submitted
     * @author Roxana
     */
    SchedulerManagementCmp.prototype.newSchedulerSubmit = function () {
        var _this = this;
        var i = 0;
        this.sanitizeCronValues();
        this.parametersBeforeAdd = new Array();
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
        var newCronExpression = null;
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
        var This = this;
        this.removeWhitespacesFromScheduler();
        //call save or update
        //refresh list
        this.loadingState = true;
        this.subscriptions['saveOrUpdateSchedulerRest'] = this._schedulerManagementService.saveOrUpdateSchedulerRest(this.pageId, this.newScheduler).finally(function () {
            _this.loadingState = false;
        }).subscribe(function (res) {
            // console.log(res);
            This.newScheduler = new models_1.SchedulerModel();
            This.resetCronValues();
            This.getAllSchedulers();
            This._utilityService.setAlert(_this.componentAlert, res.message, res.statusCode);
            This.resetErrorMessages();
            This.newParams = new Array();
            This.parametersBeforeAdd = new Array();
            _this.schedulerOperationsModal.hide();
        }, function (err) {
            _this.formErrors = err;
            _this.newScheduler.kjcTaskParameterses = [];
            var i = 0;
            //restoring old parameteres
            for (i = 0; i < _this.parametersBeforeAdd.length; i++) {
                _this.newScheduler.kjcTaskParameterses.push(JSON.parse(JSON.stringify(_this.parametersBeforeAdd[i])));
            }
            This._utilityService.setAlert(This.componentAlert, err.message, err.statusCode);
        });
    };
    /**
     * remove whitespaces at the begining and end of scheduler name, job name, trigger name
     * @author Roxana
     */
    SchedulerManagementCmp.prototype.removeWhitespacesFromScheduler = function () {
        this.newScheduler.name = this.newScheduler.name.trim();
        this.newScheduler.jobName = this.newScheduler.jobName.trim();
        this.newScheduler.triggerName = this.newScheduler.triggerName.trim();
    };
    /**
     * reset the formErrors value to hide error messages in the page
     * @author Roxana
     */
    SchedulerManagementCmp.prototype.resetErrorMessages = function () {
        this.formErrors = null;
    };
    /**
     * this event is triggered when the user clicks "Refresh list" button
     * @author Roxana
     */
    SchedulerManagementCmp.prototype.onRefreshListClick = function () {
        this.isRefreshing = true;
        this.getAllSchedulers();
    };
    /**
     * this event is triggered when the user clicks "Stop" task button
     * @author Roxana
     */
    SchedulerManagementCmp.prototype.onStopClick = function (scheduler) {
        var _this = this;
        var This = this;
        var lastClickedScheduler = scheduler.name;
        this.subscriptions["stopScheduler"] = this._schedulerManagementService.stopSchedulerRest(scheduler.name)
            .subscribe(function (res) {
            This._utilityService.setAlert(_this.componentAlert, res.message, res.statusCode);
            This.getSchedulersAndKeepFormData(lastClickedScheduler);
        }, function (err) {
            This._utilityService.setAlert(This.componentAlert, err.message, err.statusCode);
        });
    };
    /**
    * get all schedulers and keep the data that was in the form before the requested action
    * @author Roxana
    */
    SchedulerManagementCmp.prototype.getSchedulersAndKeepFormData = function (lastClickedScheduler) {
        var This = this;
        this.subscriptions["allSchedulersWithStateSave"] = this._schedulerManagementService.getAllSchedulersRest().subscribe(function (res) {
            This.schedulers = res.data.kjcTaskSchedulersList;
            This.refreshTime = res.data.refreshTime;
            var schedulerRefreshed = This.findSchedulerByName(lastClickedScheduler);
            if (schedulerRefreshed) {
                This.newScheduler = JSON.parse(JSON.stringify(schedulerRefreshed));
                This.resetCronValues();
                This.parseCronExpression(This.newScheduler.cronExpression);
            }
            else {
                This.newScheduler = new models_1.SchedulerModel();
                This.resetCronValues();
            }
        });
    };
    /**
     * this method is used to check if the user checked a cron option like: every n minutes, every n hours, etc
     * a single option can be checked
     * if an option is checked the part of the cron expression is build using the incremental symbol /
     * format minValue/value example: 0/5 in the minutes part means every 5 minutes
     * @author Roxana
     */
    SchedulerManagementCmp.prototype.verifyCronOption = function (key, cron) {
        if (this.cronOption == key) {
            return " " + cron[key].min + "/" + cron[key].value;
        }
        if (key == "seconds")
            return cron[key].value;
        return " " + cron[key].value;
    };
    /**
     * this method is used to build the cron expression
     * return cronExpression as string
     * if an input is empty (null) his value will be replaced with * in the cronExpression excepting dayOfMonth and dayOfWeek that requires special values
     * dayOfMonth and dayOfMonth cannot have a numeric value in the same time  (their meanings are opposed)
     * example: we cannot say that a job has to be executed MONDAY (dayOfWeek=1) in the first day of the month (because MONDAY may not be the first day of month)
     * @author Roxana
     */
    SchedulerManagementCmp.prototype.buildCronExpression = function () {
        var cronExpr = "";
        var expressionParts = {};
        var i = 0;
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
    };
    /**
     * this method is used to parse the cron expression
     * parameter: expr is the cron expression as a string
     * return cronExpression as object with second, minutes, hours, etc, properties
     * @author Roxana
     */
    SchedulerManagementCmp.prototype.parseCronExpression = function (expr) {
        // the string expression is split by space separator
        if (expr != null) {
            var exprParts = expr.split(" ");
            var i = 0;
            for (var key in this.cronValues) {
                if (this.cronValues.hasOwnProperty(key)) {
                    //if a part of the expression is * or ? then the corresponding property value will be set to null
                    if (exprParts[i] == "*" || exprParts[i] == "?")
                        this.cronValues[key].value = null;
                    else {
                        var incrementalParts = exprParts[i].split("/");
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
        }
        else {
            this.resetCronValues();
        }
    };
    /**
     *retrieves scheduler by name from existing schedulers on the page
     * @author Roxana
     */
    SchedulerManagementCmp.prototype.findSchedulerByName = function (name) {
        var i = 0;
        for (i = 0; i < this.schedulers.length; i++) {
            if (this.schedulers[i].name == name) {
                return this.schedulers[i];
            }
        }
        return null;
    };
    /**
    * save current parameter name and scheduler id for delete
    * @author Roxana
    */
    SchedulerManagementCmp.prototype.displayConfirmRemove = function (isNewParameter, schedulerName, paramName, paramId) {
        if (paramId === void 0) { paramId = 0; }
        this.parameterNameToDelete = paramName;
        this.parameterIdToDelete = paramId;
        this.schedulerNameToDelete = schedulerName;
        this.isNewParameter = isNewParameter;
    };
    /**
    *remove parameter
    *if parameter is not saved in the database delete it from the local Array
    *otherwise make request to delete it from the database
    * @author Roxana
    */
    SchedulerManagementCmp.prototype.removeParameter = function () {
        var _this = this;
        var This = this;
        if (this.isNewParameter) {
            this.removeObjectByName(This.parameterNameToDelete, This.newParams);
        }
        else {
            this.subscriptions["removeParameter"] = This._schedulerManagementService.removeParameterRest(This.schedulerNameToDelete, This.parameterIdToDelete)
                .subscribe(function (res) {
                _this._utilityService.setAlert(_this.componentAlert, res.message, res.statusCode);
                var lastClickedScheduler = This.schedulerNameToDelete;
                _this.removeObjectByName(_this.parameterNameToDelete, _this.newScheduler.kjcTaskParameterses);
                _this.getSchedulersAndKeepFormData(lastClickedScheduler);
            }, function (err) {
                _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode);
            });
        }
    };
    /**
    *remove object from array by name
    * @author Roxana
    */
    SchedulerManagementCmp.prototype.removeObjectByName = function (name, params) {
        for (var i = params.length - 1; i >= 0; i--) {
            if (params[i].name == name) {
                // console.log("deleting " + name);
                params.splice(i, 1);
            }
        }
    };
    /**
    *verify if the user has changed the values for the cron expression input
    * @author Roxana
    */
    SchedulerManagementCmp.prototype.verifyIfCronValuesHaveChanged = function () {
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
    };
    /**
    *refresh table data at every 1.5 seconds
    * @author Roxana
    */
    SchedulerManagementCmp.prototype.refreshSchedulerData = function (timeInterval) {
        var _this = this;
        return Observable_1.Observable
            .interval(timeInterval)
            .flatMap(function () {
            return _this._schedulerManagementService.getAllSchedulersRest();
        });
    };
    /**
    * subscribes to refreshSchedulerData, updates the schedulers data and if the refreshTime changed  restart the refresh event
    * @author Roxana
    */
    SchedulerManagementCmp.prototype.startRefreshPageRecurentEvent = function (firstEvent) {
        if (firstEvent === void 0) { firstEvent = false; }
        var This = this;
        This.refreshDataEvent = This.refreshSchedulerData(This.refreshTime).subscribe(function (res) {
            This.schedulers = res.data.kjcTaskSchedulersList;
            var refreshTimeFormated = This.convertRefreshTimeToMilliseconds(res.data.refreshTime);
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
    };
    /**
   * converts time from HH:mm:ss to milliseconds
   * @author Roxana
   */
    SchedulerManagementCmp.prototype.convertRefreshTimeToMilliseconds = function (refreshTime) {
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
                ;
                timeInMilliseconds += timeAsNumber * nrOfMilliseconds[i];
            }
        }
        return timeInMilliseconds;
    };
    /**
    * unsubsribe from the current refresh event and start a new event with the new time interval
    * @author Roxana
    */
    SchedulerManagementCmp.prototype.restartPageRefresh = function (timeInterval) {
        // console.log("unsubscribed from schedulers refreshing");
        this.refreshDataEvent.unsubscribe();
        this.refreshTime = timeInterval;
        // console.log("restart refresh page event time: "+this.refreshTime);
        this.startRefreshPageRecurentEvent();
    };
    /**
   * delete scheduler by name
   * @author Roxana
   */
    SchedulerManagementCmp.prototype.deleteScheduler = function () {
        var _this = this;
        if (this.schedulerNameToDelete) {
            this.subscriptions["deleteScheduler"] = this._schedulerManagementService.deleteSchedulerRest(this.schedulerNameToDelete).subscribe(function (res) {
                _this._utilityService.setAlert(_this.componentAlert, res.message, res.statusCode);
                _this.getAllSchedulers();
            }, function (err) {
                _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode);
            });
        }
    };
    /**
   * validate form inputs
   * @author Roxana
   */
    SchedulerManagementCmp.prototype.validateSchedulerForm = function () {
        if (!this.newScheduler.name)
            return false;
        if (!this.newScheduler.jobName)
            return false;
        if (!this.newScheduler.jobDescription)
            return false;
        if (!this.newScheduler.triggerName)
            return false;
        if (this.cronValues["minute"].value && (this.cronValues["minute"].value < this.cronValues["minute"].min || this.cronValues["minute"].value > this.cronValues["minute"].max))
            return false;
        if (this.cronValues["hour"].value && (this.cronValues["hour"].value < this.cronValues["hour"].min || this.cronValues["hour"].value > this.cronValues["hour"].max))
            return false;
        if (this.cronValues["dayOfMonth"].value && (this.cronValues["dayOfMonth"].value < this.cronValues["dayOfMonth"].min || this.cronValues["dayOfMonth"].value > this.cronValues["dayOfMonth"].max))
            return false;
        if (this.cronValues["dayOfWeek"].value && (this.cronValues["dayOfWeek"].value < this.cronValues["dayOfWeek"].min || this.cronValues["dayOfWeek"].value > this.cronValues["dayOfWeek"].max))
            return false;
        if (this.cronValues["month"].value && (this.cronValues["month"].value < this.cronValues["month"].min || this.cronValues["month"].value > this.cronValues["month"].max))
            return false;
        return true;
    };
    /**
   * verfify if a input in the cron expression editor form is empty
   * @author Roxana
   */
    SchedulerManagementCmp.prototype.cronFieldNotEmpty = function (fieldName) {
        if (this.cronValues[fieldName].value == "")
            return false;
        if (this.cronValues[fieldName].value == null)
            return false;
        return true;
    };
    __decorate([
        core_1.ViewChild('schedulerOperationsModal'), 
        __metadata('design:type', ng2_bootstrap_1.ModalDirective)
    ], SchedulerManagementCmp.prototype, "schedulerOperationsModal", void 0);
    SchedulerManagementCmp = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'schedulerManagement.cmp.html',
            encapsulation: core_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [schedulerManagement_service_1.SchedulerManagementService, utility_service_1.UtilityService, app_service_1.AppService, ng2_translate_1.TranslateService])
    ], SchedulerManagementCmp);
    return SchedulerManagementCmp;
}());
exports.SchedulerManagementCmp = SchedulerManagementCmp;
//# sourceMappingURL=schedulerManagement.cmp.js.map