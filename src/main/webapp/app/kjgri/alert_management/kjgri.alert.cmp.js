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
var kjgri_alert_service_1 = require('./kjgri.alert.service');
var utility_service_1 = require('../../kjcore/shared/services/utility.service');
var app_service_1 = require('../../kjcore/shared/services/app.service');
var models_1 = require('../../kjcore/shared/models');
var AlertManagementCmp = (function () {
    /*--------- Constructor ---------*/
    function AlertManagementCmp(_utilityService, _alertManagementService, _appService, _translateService, _formBuilder) {
        this._utilityService = _utilityService;
        this._alertManagementService = _alertManagementService;
        this._appService = _appService;
        this._translateService = _translateService;
        this._formBuilder = _formBuilder;
        this.subscriptions = [];
        this.risks = [];
    }
    AlertManagementCmp.prototype.loadRisks = function (isEdit) {
        var _this = this;
        this.subscriptions['loadRisks'] = this._alertManagementService.getAllRisks().subscribe(function (res) {
            _this.risks = res.data;
        }, function (err) {
            console.log(err);
        }, function () {
            if (isEdit)
                _this.selectedRisk = _this.findById(_this.risks, _this.riskForm.value.id);
        });
    };
    AlertManagementCmp.prototype.loadSubRisks = function (isEdit) {
        var _this = this;
        if (this.selectedRisk) {
            this.subscriptions['loadSubRisks'] = this._alertManagementService.getAllSubRisks(this.selectedRisk.id).subscribe(function (res) {
                _this.selectedRisk.dicRiskSubtypeses = res.data;
            }, function (err) {
                console.log(err);
            }, function () {
                if (isEdit)
                    _this.selectedRiskSubtype = _this.findById(_this.selectedRisk.dicRiskSubtypeses, _this.riskSubtypeForm.value.id);
            });
        }
    };
    AlertManagementCmp.prototype.loadAlerts = function () {
        var _this = this;
        if (this.selectedRiskSubtype) {
            this.subscriptions['loadAlerts'] = this._alertManagementService.getAlertsBySubriskId(this.selectedRiskSubtype.id).subscribe(function (res) {
                _this.alerts = res.data;
            }, function (err) {
                console.log(err);
            });
        }
    };
    // Disabled from 08.01.2018
    // public riskFormSubmit(modal: ModalDirective) {
    //     this.subscriptions['riskFormSubmit'] = this._alertManagementService.createOrUpdateRisk(this.riskForm.value).subscribe(
    //         (res: RestResponse<any>) => {
    //             this._utilityService.setAlert(this.componentAlert, res.message, res.statusCode);
    //             this.loadRisks(true);
    //             this.hideModal(modal);
    //         },
    //         (err: RestResponse<any>) => {
    //             this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode, err.errors);
    //             this.formErrors = err;
    //             console.log(err);
    //         }
    //     )
    // }
    // public riskSubtypeFormSubmit(modal: ModalDirective) {
    //     this.subscriptions['riskSubtypeFormSubmit'] = this._alertManagementService.createOrUpdateRiskSubtype(this.riskSubtypeForm.value).subscribe(
    //         (res: RestResponse<any>) => {
    //             this._utilityService.setAlert(this.componentAlert, res.message, res.statusCode);
    //             this.loadSubRisks();
    //             this.hideModal(modal);
    //         },
    //         (err: RestResponse<any>) => {
    //             this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode, err.errors);
    //             this.formErrors = err;
    //             console.log(err);
    //         }
    //     )
    // }
    AlertManagementCmp.prototype.alertFormSubmit = function (modal) {
        var _this = this;
        this.alertForm.controls['valueMin'].setValue(this.alertForm.controls['minAndMax'].value[0]);
        this.alertForm.controls['valueMax'].setValue(this.alertForm.controls['minAndMax'].value[1]);
        this.subscriptions['alertFormSubmit'] = this._alertManagementService.createOrUpdateAlert(this.alertForm.value).subscribe(function (res) {
            _this._utilityService.setAlert(_this.componentAlert, res.message, res.statusCode);
            _this.loadAlerts();
            _this.hideModal(modal);
        }, function (err) {
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode, err.errors);
            _this.formErrors = err;
            console.log(err);
        });
    };
    // Disabled from 08.01.2018
    // public removeRisk(modal: ModalDirective) {
    //     this.subscriptions['removeRisk'] = this._alertManagementService.removeRisk(this.selectedRisk).subscribe(
    //         (res: RestResponse<any>) => {
    //             this._utilityService.setAlert(this.componentAlert, res.message, res.statusCode);
    //             this.selectedRisk = null;
    //             this.loadRisks();
    //             this.hideModal(modal);
    //         },
    //         (err: RestResponse<any>) => {
    //             this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode, err.errors);
    //             this.formErrors = err;
    //             console.log(err);
    //         }
    //     )
    // }
    // public removeSubRisk(modal: ModalDirective) {
    //     this.subscriptions['removeSubRisk'] = this._alertManagementService.removeRiskSubtype(this.selectedRiskSubtype).subscribe(
    //         (res: RestResponse<any>) => {
    //             this._utilityService.setAlert(this.componentAlert, res.message, res.statusCode);
    //             this.selectedRiskSubtype = null;
    //             this.loadAlerts();
    //             this.loadSubRisks();
    //             this.hideModal(modal);
    //         },
    //         (err: RestResponse<any>) => {
    //             this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode, err.errors);
    //             this.formErrors = err;
    //             console.log(err);
    //         }
    //     )
    // }
    AlertManagementCmp.prototype.removeAlert = function (modal) {
        var _this = this;
        this.subscriptions['removeAction'] = this._alertManagementService.removeAlert(this.selectedAlert).subscribe(function (res) {
            _this._utilityService.setAlert(_this.componentAlert, res.message, res.statusCode);
            _this.loadAlerts();
            _this.hideModal(modal);
        }, function (err) {
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode, err.errors);
            _this.formErrors = err;
            console.log(err);
        });
    };
    AlertManagementCmp.prototype.onRisksChange = function () {
        this.selectedRiskSubtype = null;
        this.loadSubRisks();
        this.alerts = null;
    };
    AlertManagementCmp.prototype.onSubRisksChange = function () {
        this.loadAlerts();
    };
    AlertManagementCmp.prototype.loadData = function () {
        this.selectedRisk = null;
        this.loadRisks();
    };
    AlertManagementCmp.prototype.findById = function (arr, id) {
        return arr.filter(function (obj) { return obj.id === id; })[0];
    };
    /**
     * Show modal based on passed modal directive and custom behaviour based on modalName and data
     * @author Nikola Gavric
     */
    AlertManagementCmp.prototype.showModal = function (modal, modalName, data) {
        this._utilityService.setAlert(this.componentAlert);
        this.formErrors = new models_1.RestResponse();
        switch (modalName) {
            // Disabled from 08.01.2018
            // case 'editRisk':
            //     if (this.selectedRisk) this.riskForm.patchValue(this.selectedRisk);
            //     break;
            // case 'addRisk':
            //     this.riskForm.reset();
            //     break;
            // case 'editSubtypeRisk':
            //     if (this.selectedRiskSubtype) this.riskSubtypeForm.patchValue(this.selectedRiskSubtype);
            //     this.riskSubtypeForm.controls['dicRiskTypes'].setValue(this.selectedRisk);
            //     break;
            // case 'addSubtypeRisk':
            //     this.riskSubtypeForm.reset();
            //     this.riskSubtypeForm.controls['dicRiskTypes'].setValue(this.selectedRisk);
            //     break;
            case 'editAlert':
                if (data) {
                    this.alertForm.patchValue(data);
                    this.alertForm.controls['minAndMax'].patchValue([data.valueMin, data.valueMax]);
                    this.alertForm.controls['dicRiskSubtypes'].setValue(this.selectedRiskSubtype);
                }
                break;
            case 'addAlert':
                this.alertForm.reset();
                this.alertForm.controls['minAndMax'].patchValue([1, 4]);
                this.alertForm.controls['valueMin'].patchValue(0);
                this.alertForm.controls['valueMax'].patchValue(0);
                this.alertForm.controls['dicRiskSubtypes'].setValue(this.selectedRiskSubtype);
                this.alertForm.controls['notificationIconName'].patchValue('default');
                this.alertForm.controls['level'].patchValue(0);
                this.alertForm.controls['flEnabled'].patchValue(false);
                break;
            case 'deleteAlert':
                this.selectedAlert = data;
                break;
        }
        modal.show();
    };
    /**
     * Hide modal based on passed modal directive
     * @author Nikola Gavric
     */
    AlertManagementCmp.prototype.hideModal = function (modal) {
        modal.hide();
    };
    AlertManagementCmp.prototype.returnFalse = function ($event) {
        return false;
    };
    /*--------- NG On Init ---------*/
    AlertManagementCmp.prototype.ngOnInit = function () {
        // Initital method to be executed when page loads
        this._appService.pageLoaded('', this);
        this.componentAlert = new models_1.Alert(null, true);
        this.riskForm = this._formBuilder.group({
            id: [null, []],
            name: [null, [forms_1.Validators.required]],
            code: [null, [forms_1.Validators.required, forms_1.Validators.maxLength(2)]]
        });
        this.riskSubtypeForm = this._formBuilder.group({
            id: [null, []],
            name: [null, [forms_1.Validators.required]],
            code: [null, [forms_1.Validators.required, forms_1.Validators.maxLength(3)]],
            usage: [null, [forms_1.Validators.required]],
            dicRiskTypes: [null, [forms_1.Validators.required]]
        });
        this.alertForm = this._formBuilder.group({
            id: [null, []],
            name: [null, [forms_1.Validators.required, forms_1.Validators.maxLength(100)]],
            messageTitle: [null, [forms_1.Validators.required, forms_1.Validators.maxLength(100)]],
            messageBody: [null, [forms_1.Validators.required, forms_1.Validators.maxLength(100)]],
            messageText: [null, [forms_1.Validators.required]],
            minAndMax: [[0, 1], [forms_1.Validators.required]],
            valueMin: [0, []],
            valueMax: [0, []],
            dicRiskSubtypes: [null, [forms_1.Validators.required]],
            notificationIconName: ['default', [forms_1.Validators.required]],
            level: [null, [forms_1.Validators.required]],
            flEnabled: [true, []]
        });
        // Initial methods
        this.loadData();
        this._appService.languageChangeForComponent(this, this.loadData.bind(this));
    };
    /*--------- NG On Destroy ---------*/
    AlertManagementCmp.prototype.ngOnDestroy = function () {
        this._appService.refreshEmitters(this.subscriptions);
    };
    AlertManagementCmp = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'kjgri.alert.cmp.html'
        }), 
        __metadata('design:paramtypes', [utility_service_1.UtilityService, kjgri_alert_service_1.AlertManagementService, app_service_1.AppService, ng2_translate_1.TranslateService, forms_1.FormBuilder])
    ], AlertManagementCmp);
    return AlertManagementCmp;
}());
exports.AlertManagementCmp = AlertManagementCmp;
//# sourceMappingURL=kjgri.alert.cmp.js.map