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
var kjgri_action_service_1 = require('./kjgri.action.service');
var utility_service_1 = require('../../kjcore/shared/services/utility.service');
var app_service_1 = require('../../kjcore/shared/services/app.service');
var models_1 = require('../../kjcore/shared/models');
var ActionManagementCmp = (function () {
    /*--------- Constructor ---------*/
    function ActionManagementCmp(_utilityService, _actionManagementService, _appService, _translateService, _formBuilder) {
        this._utilityService = _utilityService;
        this._actionManagementService = _actionManagementService;
        this._appService = _appService;
        this._translateService = _translateService;
        this._formBuilder = _formBuilder;
        this.subscriptions = [];
        this.risks = [];
        this.subRisks = [];
    }
    ActionManagementCmp.prototype.loadRisks = function (isEdit) {
        var _this = this;
        this.subscriptions['loadRisks'] = this._actionManagementService.getAllRisks().subscribe(function (res) {
            _this.risks = res.data;
        }, function (err) {
            console.log(err);
        }, function () {
            if (isEdit)
                _this.selectedRisk = _this.findById(_this.risks, _this.riskForm.value.id);
        });
    };
    ActionManagementCmp.prototype.loadSubRisks = function (isEdit) {
        var _this = this;
        if (this.selectedRisk) {
            this.subscriptions['loadSubRisks'] = this._actionManagementService.getAllSubRisks(this.selectedRisk.id).subscribe(function (res) {
                _this.subRisks = res.data;
            }, function (err) {
                console.log(err);
            }, function () {
                if (isEdit)
                    _this.selectedRiskSubtype = _this.findById(_this.subRisks, _this.riskSubtypeForm.value.id);
            });
        }
    };
    ActionManagementCmp.prototype.loadActions = function () {
        var _this = this;
        if (this.selectedRiskSubtype) {
            this.subscriptions['loadActions'] = this._actionManagementService.getActionsBySubriskId(this.selectedRiskSubtype.id).subscribe(function (res) {
                _this.actions = res.data;
            }, function (err) {
                console.log(err);
            });
        }
    };
    // Disabled from 08.01.2018
    // public riskFormSubmit(modal: ModalDirective) {
    //     this.subscriptions['riskFormSubmit'] = this._actionManagementService.createOrUpdateRisk(this.riskForm.value).subscribe(
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
    //     this.subscriptions['riskSubtypeFormSubmit'] = this._actionManagementService.createOrUpdateRiskSubtype(this.riskSubtypeForm.value).subscribe(
    //         (res: RestResponse<any>) => {
    //             this._utilityService.setAlert(this.componentAlert, res.message, res.statusCode);
    //             this.loadSubRisks(true);
    //             this.hideModal(modal);
    //         },
    //         (err: RestResponse<any>) => {
    //             this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode, err.errors);
    //             this.formErrors = err;
    //             console.log(err);
    //         }
    //     )
    // }
    ActionManagementCmp.prototype.actionFormSubmit = function (modal) {
        var _this = this;
        this.subscriptions['actionFormSubmit'] = this._actionManagementService.createOrUpdateAction(this.actionForm.value).subscribe(function (res) {
            _this._utilityService.setAlert(_this.componentAlert, res.message, res.statusCode);
            _this.loadActions();
            _this.hideModal(modal);
        }, function (err) {
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode, err.errors);
            _this.formErrors = err;
            console.log(err);
        });
    };
    ActionManagementCmp.prototype.onRisksChange = function () {
        this.selectedRiskSubtype = null;
        this.loadSubRisks(true);
        this.actions = null;
    };
    ActionManagementCmp.prototype.onSubRisksChange = function () {
        this.loadActions();
    };
    ActionManagementCmp.prototype.loadData = function () {
        this.selectedRisk = null;
        this.loadRisks();
    };
    // Disabled from 08.01.2018
    // public removeRisk(modal: ModalDirective) {
    //     this.subscriptions['removeRisk'] = this._actionManagementService.removeRisk(this.selectedRisk).subscribe(
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
    //     this.subscriptions['removeSubRisk'] = this._actionManagementService.removeRiskSubtype(this.selectedRiskSubtype).subscribe(
    //         (res: RestResponse<any>) => {
    //             this._utilityService.setAlert(this.componentAlert, res.message, res.statusCode);
    //             this.selectedRiskSubtype = null;
    //             this.loadSubRisks();
    //             this.loadActions();
    //             this.hideModal(modal);
    //         },
    //         (err: RestResponse<any>) => {
    //             this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode, err.errors);
    //             this.formErrors = err;
    //             console.log(err);
    //         }
    //     )
    // }
    ActionManagementCmp.prototype.removeAction = function (modal) {
        var _this = this;
        this.subscriptions['removeAction'] = this._actionManagementService.removeAction(this.selectedAction).subscribe(function (res) {
            _this._utilityService.setAlert(_this.componentAlert, res.message, res.statusCode);
            _this.loadActions();
            _this.hideModal(modal);
        }, function (err) {
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode, err.errors);
            _this.formErrors = err;
            console.log(err);
        });
    };
    /**
     * Show modal based on passed modal directive and custom behaviour based on modalName and data
     * @author Nikola Gavric
     */
    ActionManagementCmp.prototype.showModal = function (modal, modalName, data) {
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
            case 'editAction':
                if (data) {
                    this.actionForm.patchValue(data);
                    this.actionForm.controls['dicRiskSubtypes'].setValue(this.selectedRiskSubtype);
                }
                break;
            case 'addAction':
                this.actionForm.reset();
                this.actionForm.controls['dicRiskSubtypes'].setValue(this.selectedRiskSubtype);
                break;
            case 'deleteAction':
                this.selectedAction = data;
                break;
        }
        modal.show();
    };
    ActionManagementCmp.prototype.findById = function (arr, id) {
        return arr.filter(function (obj) { return obj.id === id; })[0];
    };
    /**
     * Hide modal based on passed modal directive
     * @author Nikola Gavric
     */
    ActionManagementCmp.prototype.hideModal = function (modal) {
        modal.hide();
    };
    /*--------- NG On Init ---------*/
    ActionManagementCmp.prototype.ngOnInit = function () {
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
        this.actionForm = this._formBuilder.group({
            id: [null, []],
            name: [null, [forms_1.Validators.required, forms_1.Validators.maxLength(100)]],
            description: [null, [forms_1.Validators.required]],
            dicRiskSubtypes: [null, [forms_1.Validators.required]]
        });
        // Initial methods
        this.loadData();
        this._appService.languageChangeForComponent(this, this.loadData.bind(this));
    };
    /*--------- NG On Destroy ---------*/
    ActionManagementCmp.prototype.ngOnDestroy = function () {
        this._appService.refreshEmitters(this.subscriptions);
    };
    ActionManagementCmp = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'kjgri.action.cmp.html'
        }), 
        __metadata('design:paramtypes', [utility_service_1.UtilityService, kjgri_action_service_1.ActionManagementService, app_service_1.AppService, ng2_translate_1.TranslateService, forms_1.FormBuilder])
    ], ActionManagementCmp);
    return ActionManagementCmp;
}());
exports.ActionManagementCmp = ActionManagementCmp;
//# sourceMappingURL=kjgri.action.cmp.js.map