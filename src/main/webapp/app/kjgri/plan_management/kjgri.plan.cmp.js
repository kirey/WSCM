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
var forms_1 = require('@angular/forms');
var ng2_translate_1 = require('ng2-translate');
var kjgri_plan_service_1 = require('./kjgri.plan.service');
var utility_service_1 = require('../../kjcore/shared/services/utility.service');
var app_service_1 = require('../../kjcore/shared/services/app.service');
var models_1 = require('../../kjcore/shared/models');
var kjgri_history_service_1 = require('./../history/kjgri.history.service');
var PlanManagementCmp = (function () {
    /*--------- Constructor ---------*/
    function PlanManagementCmp(_utilityService, _planManagement, _appService, _translateService, _formBuilder, _changeDetector, _historyService) {
        this._utilityService = _utilityService;
        this._planManagement = _planManagement;
        this._appService = _appService;
        this._translateService = _translateService;
        this._formBuilder = _formBuilder;
        this._changeDetector = _changeDetector;
        this._historyService = _historyService;
        this.subscriptions = [];
        this.riskList = [];
        this.riskListCopy = [];
    }
    /**
     *
     */
    PlanManagementCmp.prototype.loadData = function () {
        this._loadLocations();
    };
    /**
     *
     */
    PlanManagementCmp.prototype.onLocationChange = function () {
        this.loadPlaceholders();
        this._loadRisks();
        this._loadStyles();
    };
    /**
     *
     * @param $event Boolean
     * @param action json
     */
    PlanManagementCmp.prototype.addOrRemoveAction = function ($event, action, riskKey, subriskKey) {
        var elem = this.riskListCopy[riskKey].dicRiskSubtypeses[subriskKey].actionses.filter(function (singleAction) {
            return action.name == singleAction.name;
        })[0];
        var index = -1;
        if (elem)
            index = this.riskListCopy[riskKey].dicRiskSubtypeses[subriskKey].actionses.indexOf(elem);
        if ($event && index == -1) {
            this.riskListCopy[riskKey].dicRiskSubtypeses[subriskKey].actionses.push(action);
        }
        else {
            this.riskListCopy[riskKey].dicRiskSubtypeses[subriskKey].actionses.splice(index, 1);
        }
    };
    Object.defineProperty(PlanManagementCmp.prototype, "isRiskListEmpty", {
        /**
         *
         */
        get: function () {
            var isEmpty = true;
            OUTERLOOP: for (var _i = 0, _a = this.riskListCopy; _i < _a.length; _i++) {
                var risk = _a[_i];
                for (var _b = 0, _c = risk.dicRiskSubtypeses; _b < _c.length; _b++) {
                    var subrisk = _c[_b];
                    isEmpty = !(subrisk.actionses && subrisk.actionses.length > 0);
                    if (!isEmpty)
                        break OUTERLOOP;
                }
            }
            return isEmpty;
        },
        enumerable: true,
        configurable: true
    });
    /**
     *
     * @param riskKey
     * @param subriskKey
     * @param subrisk
     */
    PlanManagementCmp.prototype.drawSubriskAlert = function (riskKey, subriskKey, subrisk) {
        var indexValue = (subrisk.riskIndexValueses && subrisk.riskIndexValueses.length > 0) ? subrisk.riskIndexValueses[0].value : null;
        var initialLength = this.risks[riskKey].dicRiskSubtypeses[subriskKey].actionses.length;
        var actualLength = this.riskListCopy[riskKey].dicRiskSubtypeses[subriskKey].actionses.length;
        var style = null;
        var riskIndexIcon = '';
        if (indexValue && this.styles) {
            style = this.styles.filter(function (curr) { return curr.indexValue == indexValue; })[0];
            //-1 ili null primeni stil N/A i primeni still od -1
            if (style) {
                var tempIndex = void 0;
                var splitStr = style.fill.split(',');
                splitStr[splitStr.length - 1] = "1)";
                style.fill = splitStr.join(',');
                if (style.indexValue == -1) {
                    tempIndex = 'N/A';
                }
                else {
                    tempIndex = style.indexValue;
                }
                riskIndexIcon = "<span class='badge' style='background-color: " + style.fill + "'>" + tempIndex + "</span>";
                //Read index number from style 09.11
                indexValue = style.numericIndexValue;
            }
        }
        var missingAlert = riskIndexIcon + ' ' + subrisk.name + ' (' + subrisk.actionses.length + ' actions) <i style="left: initial;top: initial;margin-top: auto;position: relative;" class="fa fa-question-circle text-warning" aria-hidden="true"></i>';
        var dangerAlert = riskIndexIcon + ' ' + subrisk.name + ' (' + subrisk.actionses.length + ' actions) <i style="left: initial;top: initial;margin-top: auto;position: relative;" class="fa fa-exclamation-triangle text-danger" aria-hidden="true"></i>';
        var infoAlert = riskIndexIcon + ' ' + subrisk.name + ' (' + subrisk.actionses.length + ' actions) <i style="left: initial;top: initial;margin-top: auto;position: relative;" class="fa fa-exclamation-triangle text-info" aria-hidden="true"></i>';
        var noAlert = riskIndexIcon + ' ' + subrisk.name + ' (' + subrisk.actionses.length + ' actions)';
        if (indexValue == -1) {
            this.riskListCopy[riskKey]['missingAlert'] = '<i style="left: initial;top: initial;margin-top: auto;position: relative;" class="fa fa-question-circle text-warning" aria-hidden="true"></i>';
            return missingAlert;
        }
        else if (indexValue == 0) {
            if (actualLength > 0) {
                this.riskListCopy[riskKey]['infoAlert'] = '<i style="left: initial;top: initial;margin-top: auto;position: relative;" class="fa fa-exclamation-triangle text-info" aria-hidden="true"></i>';
                return infoAlert;
            }
        }
        else if (indexValue > 0) {
            if (actualLength == 0 || actualLength < initialLength) {
                this.riskListCopy[riskKey]['dangerAlert'] = '<i style="left: initial;top: initial;margin-top: auto;position: relative;" class="fa fa-exclamation-triangle text-danger" aria-hidden="true"></i>';
                return dangerAlert;
            }
        }
        return noAlert;
    };
    // /**
    //  * 
    //  * @param riskKey 
    //  * @param subriskKey 
    //  * @param subrisk 
    //  */
    // public drawRiskAlert(riskKey: any, risk: any): string {
    //     let name = '<h5>' + risk.name;
    //     let actualRisk = this.riskListCopy[riskKey];
    //     if (actualRisk.hasOwnProperty('missingAlert'))
    //         name += ' ' + actualRisk['missingAlert'];
    //     if (actualRisk.hasOwnProperty('dangerAlert'))
    //         name += ' ' + actualRisk['dangerAlert'];
    //     if (actualRisk.hasOwnProperty('infoAlert'))
    //         name += ' ' + actualRisk['infoAlert'];
    //     name += '</h5>';
    //     return name;
    // }
    PlanManagementCmp.prototype._loadStyles = function () {
        var _this = this;
        if (this.selectedLocation) {
            this.subscriptions['_loadStyles'] = this._historyService.getAllStyles("R").subscribe(function (res) {
                _this.styles = res.data;
            }, function (err) {
                console.log(err);
            });
        }
    };
    /**
     *
     */
    PlanManagementCmp.prototype._loadRisks = function () {
        var _this = this;
        if (this.selectedLocation) {
            this.subscriptions['loadRisks'] = this._planManagement.getAllActionsByLocation(this.selectedLocation.id).subscribe(function (res) {
                _this.risks = res.data;
                //Sorting
                _this.risks.forEach(function (risk) {
                    risk.dicRiskSubtypeses.forEach(function (subrisk) {
                        //Sort actions
                        subrisk.actionses.sort(function (a, b) {
                            return a.name.localeCompare(b.name);
                        });
                    });
                    //Sort subrisks
                    risk.dicRiskSubtypeses.sort(function (a, b) {
                        return a.name.localeCompare(b.name);
                    });
                });
                //Sort risks
                _this.risks.sort(function (a, b) {
                    return a.name.localeCompare(b.name);
                });
                //Sorting END
                _this.risks.forEach(function (risk, riskIndex) {
                    _this.riskList[riskIndex] = _this._utilityService.copy(risk);
                    _this.riskListCopy[riskIndex] = _this._utilityService.copy(risk);
                    risk.dicRiskSubtypeses.forEach(function (subrisk, subriskIndex) {
                        _this.riskList[riskIndex].dicRiskSubtypeses[subriskIndex] = _this._utilityService.copy(subrisk);
                        _this.riskListCopy[riskIndex].dicRiskSubtypeses[subriskIndex] = _this._utilityService.copy(subrisk);
                        _this.riskList[riskIndex].dicRiskSubtypeses[subriskIndex].actionses = [];
                        _this.riskListCopy[riskIndex].dicRiskSubtypeses[subriskIndex].actionses = [];
                        subrisk.actionses.forEach(function (action, actionIndex) {
                            if (action.clientCompanyActionses.length > 0) {
                                action.description = action.clientCompanyActionses[0].actionDescription;
                                //Ovde je problem jer ne moze da ubaci kopiranu akciju nego mora original
                                //Da bi bila oznacena u modalu i da bi se updateovala
                                //this._utilityService.copy();
                                _this.riskList[riskIndex].dicRiskSubtypeses[subriskIndex].actionses.push(action);
                                _this.riskListCopy[riskIndex].dicRiskSubtypeses[subriskIndex].actionses.push(action);
                            }
                        });
                    });
                });
            }, function (err) {
                console.log(err);
            });
        }
    };
    /**
     *
     */
    PlanManagementCmp.prototype.savePlan = function () {
        this._savePlaceholders(this.saveActions);
    };
    /**
     *
     */
    PlanManagementCmp.prototype.previewPlan = function () {
        this._savePlaceholders(this.saveActions.bind(this, this._previewPlan));
    };
    /**
     *
     */
    PlanManagementCmp.prototype.archivePlan = function () {
        this._savePlaceholders(this.saveActions.bind(this, this._archivePlan));
    };
    /**
     *
     */
    PlanManagementCmp.prototype._previewPlan = function () {
        var _this = this;
        this.subscriptions['previewPlan'] = this._planManagement.previewPlan(this.selectedLocation.id, this.placeholders).subscribe(function (res) {
            var blob = _this._appService.convertBase64ToBlob(res.data, 'application/pdf');
            var fileURL = URL.createObjectURL(blob);
            // If site settings has popups blocked, this variable will be null, thus try/catch is required
            var newWindowState = window.open(fileURL);
            setTimeout(function () {
                try {
                    if (newWindowState.closed) {
                        _this._utilityService.setAlert(_this.componentAlert, 'fe.placeholderManagement.popupBlockerPresent', 400);
                    }
                    else {
                        _this._utilityService.setAlert(_this.componentAlert, 'fe.placeholderManagement.planPrinted', 200);
                    }
                }
                catch (e) {
                    _this._utilityService.setAlert(_this.componentAlert, 'fe.placeholderManagement.popupBlockerPresent', 400);
                }
            }, 700);
            _this.formErrors = null;
        }, function (err) {
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode, err.errors);
            _this.formErrors = err;
        });
    };
    /**
     *
     */
    PlanManagementCmp.prototype._archivePlan = function () {
        var _this = this;
        this.subscriptions['archivePlan'] = this._planManagement.archivePlan(this.selectedLocation.id, this.placeholders).subscribe(function (res) {
            _this._utilityService.setAlert(_this.componentAlert, res.message, res.statusCode);
        }, function (err) {
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode, err.errors);
            _this.formErrors = err;
        });
    };
    /**
     *
     */
    PlanManagementCmp.prototype.loadPlaceholders = function () {
        var _this = this;
        if (this.selectedLocation) {
            this.subscriptions['loadPlaceholders'] = this._planManagement.getPlaceholders(this.selectedLocation.id).subscribe(function (res) {
                _this.placeholders = res.data;
            }, function (err) {
                console.log(err);
            });
        }
    };
    /**
     *
     */
    PlanManagementCmp.prototype._loadLocations = function () {
        var _this = this;
        this.subscriptions['loadLocations'] = this._planManagement.getAllLocations().subscribe(function (res) {
            _this.locations = res.data;
        }, function (err) {
            console.log(err);
        });
    };
    /**
     *
     */
    PlanManagementCmp.prototype.saveActions = function (callback) {
        var _this = this;
        var actions = [];
        for (var _i = 0, _a = this.riskListCopy; _i < _a.length; _i++) {
            var risk = _a[_i];
            for (var _b = 0, _c = risk.dicRiskSubtypeses; _b < _c.length; _b++) {
                var subrisk = _c[_b];
                for (var _d = 0, _e = subrisk.actionses; _d < _e.length; _d++) {
                    var action = _e[_d];
                    actions.push(action);
                }
            }
        }
        this.subscriptions['saveActions'] = this._planManagement.saveActions(this.selectedLocation.id, actions).subscribe(function (res) {
            _this._utilityService.setAlert(_this.componentAlert, res.message, res.statusCode);
            if (callback)
                callback.call(_this);
        }, function (err) {
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode);
            _this.formErrors = err;
            console.log(err);
        });
    };
    /**
     *
     */
    PlanManagementCmp.prototype._savePlaceholders = function (callback) {
        var _this = this;
        this.subscriptions['savePlaceholders'] = this._planManagement.savePlaceholders(this.selectedLocation.id, this.placeholders).subscribe(function (res) {
            _this._utilityService.setAlert(_this.componentAlert, res.message, res.statusCode);
            if (callback)
                callback.call(_this);
        }, function (err) {
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode);
            _this.formErrors = err;
            console.log(err);
        });
    };
    /**
     *
     * @param arr
     * @param id
     */
    PlanManagementCmp.prototype._findById = function (arr, id) {
        return arr.filter(function (obj) { return obj.id === id; })[0];
    };
    /**
     *
     * @param arr
     * @param id
     */
    PlanManagementCmp.prototype._findIndex = function (arr, id) {
        return arr.indexOf(this._findById(arr, id));
    };
    /**
     *
     * @param riskKey
     * @param id
     */
    PlanManagementCmp.prototype.removeAction = function (modal) {
        if (this.actionToDelete) {
            var riskKey = this.actionToDelete[0];
            var subriskKey = this.actionToDelete[1];
            var action_1 = this.actionToDelete[2];
            this.risks[riskKey].dicRiskSubtypeses[subriskKey].actionses.some(function (currAction) {
                if (action_1.id == currAction.id) {
                    action_1.description = action_1.oldDescription;
                    return true;
                }
                return false;
            });
            this.riskList[riskKey].dicRiskSubtypeses[subriskKey].actionses = this.riskList[riskKey].dicRiskSubtypeses[subriskKey].actionses.filter(function (currAction) {
                return currAction.id != action_1.id;
            });
            this.riskListCopy[riskKey].dicRiskSubtypeses[subriskKey].actionses = this.riskListCopy[riskKey].dicRiskSubtypeses[subriskKey].actionses.filter(function (currAction) {
                return currAction.id != action_1.id;
            });
            this.hideModal(modal);
        }
    };
    /**
     *
     * @param modal
     */
    PlanManagementCmp.prototype.saveAction = function (modal) {
        OUTERLOOP: for (var _i = 0, _a = this.riskListCopy; _i < _a.length; _i++) {
            var risk = _a[_i];
            for (var _b = 0, _c = risk.dicRiskSubtypeses; _b < _c.length; _b++) {
                var subrisk = _c[_b];
                for (var _d = 0, _e = subrisk.actionses; _d < _e.length; _d++) {
                    var action = _e[_d];
                    if (action.id == this.actionModalForm.value.id) {
                        action.oldDescription = action.description;
                        action.description = this.actionModalForm.value.description;
                        break OUTERLOOP;
                    }
                }
            }
        }
        this.hideModal(modal);
    };
    /**
     *
     * @param data
     */
    PlanManagementCmp.prototype._setupActionModalForm = function (data) {
        if (data.action) {
            var sub = this._utilityService.copy(data.subrisk);
            data.action.dicRiskSubtypes = sub;
            this.actionModalForm.patchValue(data.action);
        }
        else {
            this.actionModalForm.patchValue(data);
        }
    };
    /**
     * Show modal based on passed modal directive and custom behaviour based on modalName and data
     * @author Nikola Gavric
     */
    PlanManagementCmp.prototype.showModal = function (modal, modalName, data, riskKey, subriskKey) {
        this._utilityService.setAlert(this.componentAlert);
        this.formErrors = new models_1.RestResponse();
        switch (modalName) {
            case 'editAction':
                this._setupActionModalForm(data);
                break;
            case 'deleteAction':
                this.actionToDelete = [riskKey, subriskKey, data];
                break;
        }
        modal.show();
    };
    /**
     * Hide modal based on passed modal directive
     * @author Nikola Gavric
     */
    PlanManagementCmp.prototype.hideModal = function (modal) {
        this.actionModalForm.reset();
        this.actionToDelete = null;
        modal.hide();
    };
    /*--------- NG On Init ---------*/
    PlanManagementCmp.prototype.ngOnInit = function () {
        // Initital method to be executed when page loads
        this._appService.pageLoaded('', this);
        this.componentAlert = new models_1.Alert(null, true);
        this.actionModalForm = this._formBuilder.group({
            id: [null, []],
            name: [null, []],
            description: [null, []],
            dicRiskSubtypes: [null, []]
        });
        // Initial methods
        this.loadData();
        this._appService.languageChangeForComponent(this);
    };
    /*--------- NG On Destroy ---------*/
    PlanManagementCmp.prototype.ngOnDestroy = function () {
        this._appService.refreshEmitters(this.subscriptions);
    };
    PlanManagementCmp = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'kjgri.plan.cmp.html',
            encapsulation: core_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [utility_service_1.UtilityService, kjgri_plan_service_1.PlanManagementService, app_service_1.AppService, ng2_translate_1.TranslateService, forms_1.FormBuilder, core_1.ChangeDetectorRef, kjgri_history_service_1.KJGriHistoryService])
    ], PlanManagementCmp);
    return PlanManagementCmp;
}());
exports.PlanManagementCmp = PlanManagementCmp;
//# sourceMappingURL=kjgri.plan.cmp.js.map