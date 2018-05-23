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
var insuranceCompanies_service_1 = require('./insuranceCompanies.service');
var utility_service_1 = require('../../kjcore/shared/services/utility.service');
var app_service_1 = require('../../kjcore/shared/services/app.service');
var models_1 = require('../../kjcore/shared/models');
/**
 * Component for insurace companies management
 * @author Mario Petrovic
 */
var InsuranceCompaniesCmp = (function () {
    /*--------- Constructor ---------*/
    function InsuranceCompaniesCmp(_insuranceCompaniesService, _utilityService, _appService, _translateService, _formBuilder) {
        this._insuranceCompaniesService = _insuranceCompaniesService;
        this._utilityService = _utilityService;
        this._appService = _appService;
        this._translateService = _translateService;
        this._formBuilder = _formBuilder;
    }
    /*--------- REST calls ---------*/
    /**
     * Loads insurance companies
     * @author Mario Petrovic
     */
    InsuranceCompaniesCmp.prototype.loadInsuranceCompanies = function () {
        var _this = this;
        this.subscriptions['loadInsuranceCompanies'] = this._insuranceCompaniesService.getInsuranceCompanies().subscribe(function (res) {
            _this._utilityService.setAlert(_this.componentAlert, res.message, res.statusCode);
            _this.insuranceCompanies = res.data;
            _this.insuranceCompanies.sort(function (a, b) {
                if (a.name > b.name)
                    return 1;
                if (a.name < b.name)
                    return -1;
                return 0;
            });
        }, function (err) {
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode, err.errors);
        });
    };
    /**
     * Update company's info view priviledge for selected insurance company
     * @author Mario Petrovic
     */
    InsuranceCompaniesCmp.prototype.updateInfoConsent = function (insuranceCompanyId, flag) {
        var _this = this;
        this.subscriptions['attachToInsuranceCompany'] = this._insuranceCompaniesService.updateInfoConsent(insuranceCompanyId, !flag).subscribe(function (res) {
            _this.loadInsuranceCompanies();
            _this._utilityService.setAlert(_this.componentAlert, res.message, res.statusCode);
        }, function (err) {
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode, err.errors);
            _this.formErrors = err;
        });
    };
    /**
     * Attaches loaded users's company to choosen insurance company
     * @author Mario Petrovic
     */
    InsuranceCompaniesCmp.prototype.attachToInsuranceCompany = function (attachForm, modal) {
        var _this = this;
        this.subscriptions['attachToInsuranceCompany'] = this._insuranceCompaniesService.attachToInsuranceCompany(attachForm).subscribe(function (res) {
            modal.hide();
            _this.loadInsuranceCompanies();
            setTimeout(function () {
                _this._utilityService.setAlert(_this.componentAlert, res.message, res.statusCode);
            }, 500);
        }, function (err) {
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode, err.errors);
            _this.formErrors = err;
            _this.getCaptcha();
        });
    };
    /**
     * Detach loaded users's company from choosen insurance company
     * @author Mario Petrovic
     */
    InsuranceCompaniesCmp.prototype.detachFromInsuranceCompany = function (insuranceCompanyId, modal) {
        var _this = this;
        this.subscriptions['attachToInsuranceCompany'] = this._insuranceCompaniesService.detachFromInsuranceCompany(insuranceCompanyId).subscribe(function (res) {
            modal.hide();
            _this.loadInsuranceCompanies();
            setTimeout(function () {
                _this._utilityService.setAlert(_this.componentAlert, res.message, res.statusCode);
            }, 500);
        }, function (err) {
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode, err.errors);
        });
    };
    /*--------- App logic ---------*/
    /**
     * Set attach form in modal
     * @author Mario Petrovic
     */
    InsuranceCompaniesCmp.prototype.setAttachForm = function (modal) {
        var _this = this;
        this.getCaptcha(function (res, modal) {
            _this.attachForm = _this._formBuilder.group({
                insuranceCompanyCode: new forms_1.FormControl(null, [forms_1.Validators.required]),
                captchaHashCode: new forms_1.FormControl(res.data.hashedCode),
                captchaCode: new forms_1.FormControl(null, [forms_1.Validators.required])
            });
            _this.captchaImage = res.data.imageBase64;
            modal.show();
        }, modal);
    };
    /**
     * Get captcha code and image
     * @author Mario Petrovic
     */
    InsuranceCompaniesCmp.prototype.getCaptcha = function (callback, modal) {
        var _this = this;
        this._utilityService.getCaptchaRest().subscribe(function (res) {
            if (callback) {
                callback.call(_this, res, modal);
            }
            else {
                _this.captchaImage = res.data.imageBase64;
                _this.attachForm.controls['captchaHashCode'].setValue(res.data.hashedCode);
                _this.attachForm.controls['captchaCode'].setValue(null);
            }
        }, function (err) {
            _this.formErrors = err;
        });
    };
    /**
     * Show modal based on passed modal directive and custom behaviour based on modalName and data
     * @author Mario Petrovic
     */
    InsuranceCompaniesCmp.prototype.showModal = function (modal, modalName, data) {
        this._utilityService.setAlert(this.componentAlert);
        this.formErrors = new models_1.RestResponse();
        switch (modalName) {
            case 'attach':
                this.setAttachForm(modal);
                break;
            case 'detach':
                this.detachingCompany = data;
                modal.show();
                break;
        }
    };
    /**
     * Hide modal based on passed modal directive
     * @author Mario Petrovic
     */
    InsuranceCompaniesCmp.prototype.hideModal = function (modal) {
        modal.hide();
    };
    /*--------- NG On Init ---------*/
    InsuranceCompaniesCmp.prototype.ngOnInit = function () {
        // Initital method to be executed when page loads
        this._appService.pageLoaded('', this);
        this._appService.languageChangeForComponent(this);
        // Variables initialization
        this.subscriptions = {};
        this.componentAlert = new models_1.Alert(null, true);
        this.dataTableConfig = new models_1.DataTableConfig(10, true, 3, [5, 10, 20, 50, 100], true);
        this.formErrors = new models_1.RestResponse();
        this.captchaImage = '';
        // Initial methods
        // this.setAttachForm();
        this.loadInsuranceCompanies();
    };
    /*--------- NG On Destroy ---------*/
    InsuranceCompaniesCmp.prototype.ngOnDestroy = function () {
        this._appService.refreshEmitters(this.subscriptions);
    };
    InsuranceCompaniesCmp = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'insuranceCompanies.cmp.html',
            encapsulation: core_1.ViewEncapsulation.None,
        }), 
        __metadata('design:paramtypes', [insuranceCompanies_service_1.InsuranceCompaniesService, utility_service_1.UtilityService, app_service_1.AppService, ng2_translate_1.TranslateService, forms_1.FormBuilder])
    ], InsuranceCompaniesCmp);
    return InsuranceCompaniesCmp;
}());
exports.InsuranceCompaniesCmp = InsuranceCompaniesCmp;
//# sourceMappingURL=insuranceCompanies.cmp.js.map