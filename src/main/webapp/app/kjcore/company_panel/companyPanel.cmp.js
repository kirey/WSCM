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
var companyPanel_service_1 = require('./companyPanel.service');
var utility_service_1 = require('../shared/services/utility.service');
var app_service_1 = require('../shared/services/app.service');
var models_1 = require('../shared/models');
var models_2 = require("./models");
/**
 * Component for Company Management component
 * @author Roxana
 */
var CompanyPanelCmp = (function () {
    /*--------- Constructor ---------*/
    function CompanyPanelCmp(_utilityService, _companyPanelService, _appService, _translateService, _formBuilder) {
        this._utilityService = _utilityService;
        this._companyPanelService = _companyPanelService;
        this._appService = _appService;
        this._translateService = _translateService;
        this._formBuilder = _formBuilder;
    }
    /*--------- App Logic ---------*/
    /*--------- REST calls ---------*/
    /**
     * Load company details
     * @author Mario Petrovic
     */
    CompanyPanelCmp.prototype.loadCompany = function () {
        var _this = this;
        this.subscriptions['loadCompany'] = this._companyPanelService.getCompanyRest().subscribe(function (res) {
            _this.company = res.data;
            _this.company.company.passwordTimeout = _this._utilityService.convertMillisecondsDays(_this.company.company.passwordTimeout, true);
            _this.setCompanyForm(_this.company.company);
            _this.setCssModel('activeCss', _this.company.activeCss);
            _this.setCssModel('previousCss', _this.company.previousCss);
            _this.setCssModel('defaultCss', _this.company.defaultCss);
        }, function (err) {
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode);
        });
    };
    /**
     * Edit company details
     * @author Mario Petrovic
     */
    CompanyPanelCmp.prototype.updateCompany = function (companyData) {
        var _this = this;
        companyData.passwordTimeout = this._utilityService.convertMillisecondsDays(companyData.passwordTimeout);
        this.subscriptions['updateCompany'] = this._companyPanelService.updateCompanyRest(companyData).subscribe(function (res) {
            _this._utilityService.setAlert(_this.componentAlert, res.message, res.statusCode);
        }, function (err) {
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode);
        });
    };
    /**
     * Edit default style
     * @author Mario Petrovic
     */
    CompanyPanelCmp.prototype.editCompanyStyle = function (data) {
        var _this = this;
        var companyCss = [];
        for (var _i = 0, _a = Object.keys(data); _i < _a.length; _i++) {
            var rule = _a[_i];
            var ruleTemp = new models_2.CompanyCss();
            ruleTemp.key = data[rule].key;
            ruleTemp.name = data[rule].name;
            ruleTemp.value = data[rule].property + ':' + data[rule].value + ';';
            companyCss.push(ruleTemp);
        }
        this.subscriptions['editCompanyStyle'] = this._companyPanelService.updateCompanyCssRest(companyCss).subscribe(function (res) {
            _this._utilityService.setAlert(_this.componentAlert, res.message, res.statusCode);
            _this._appService.setCompanyCSSInit();
            _this.loadCompany();
        }, function (err) {
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode);
        });
    };
    /**
     * Reset company style to previous css
     * @author Mario Petrovic
     */
    CompanyPanelCmp.prototype.resetCompanyStyleToPrevious = function (id) {
        var _this = this;
        this.subscriptions['resetCompanyStyleToPrevious'] = this._companyPanelService.resetCompanyStyleToPreviousRest(id).subscribe(function (res) {
            _this._utilityService.setAlert(_this.componentAlert, res.message, res.statusCode);
            _this._appService.setCompanyCSSInit();
            _this.loadCompany();
        }, function (err) {
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode);
            _this.formErrors = err;
        });
    };
    /**
     * Reset company style to default css
     * @author Mario Petrovic
     */
    CompanyPanelCmp.prototype.resetCompanyStyleToDefault = function () {
        var _this = this;
        this.subscriptions['resetCompanyStyleToDefault'] = this._companyPanelService.resetCompanyStyleToDefault().subscribe(function (res) {
            _this._utilityService.setAlert(_this.componentAlert, res.message, res.statusCode);
            _this._appService.setCompanyCSSInit();
            _this.loadCompany();
        }, function (err) {
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode);
            _this.formErrors = err;
        });
    };
    /*--------- Other ---------*/
    CompanyPanelCmp.prototype.onFileInputChange = function (event, fileInputName) {
        var _this = this;
        if (event.target.files.length > 0) {
            this[fileInputName].value = '';
            this[fileInputName].file = event.target.files[0];
            var fileReaderTemp = new FileReader();
            fileReaderTemp.onload = function (res) {
                _this[fileInputName].value = res.target.result;
            };
            fileReaderTemp.readAsDataURL(event.target.files[0]);
        }
    };
    CompanyPanelCmp.prototype.setCompanyForm = function (data) {
        var tempData = new models_2.Company();
        if (data) {
            tempData = data;
        }
        this.companyForm = this._formBuilder.group({
            id: new forms_1.FormControl(tempData.id, [forms_1.Validators.required]),
            code: new forms_1.FormControl(tempData.code, [forms_1.Validators.required]),
            name: new forms_1.FormControl(tempData.name, [forms_1.Validators.required]),
            description: new forms_1.FormControl(tempData.description, [forms_1.Validators.required]),
            passwordTimeout: new forms_1.FormControl(tempData.passwordTimeout)
        });
    };
    /*--------- Utility ---------*/
    /**
     * Set edit default style form
     * @author Mario Petrovic
     */
    CompanyPanelCmp.prototype.setCssModel = function (cssName, company) {
        this.cssBundle[cssName] = {};
        if (company) {
            for (var _i = 0, company_1 = company; _i < company_1.length; _i++) {
                var rule = company_1[_i];
                this.cssBundle[cssName][rule.key] = {};
                this.cssBundle[cssName][rule.key].value = this._utilityService.convertToCssValue(rule.value);
                this.cssBundle[cssName][rule.key].toggle = false;
                this.cssBundle[cssName][rule.key].name = rule.name;
                this.cssBundle[cssName][rule.key].key = rule.key;
                this.cssBundle[cssName][rule.key].property = this._utilityService.extractPropertyName(rule.value);
            }
        }
        else {
            this.cssBundle[cssName] = null;
        }
    };
    /**
     * Toggle color picker
     * @author Mario Petrovic
     */
    CompanyPanelCmp.prototype.toggleColorPicker = function (colorPicker) {
        colorPicker.toggle = !colorPicker.toggle;
    };
    CompanyPanelCmp.prototype.selectTab = function (tabName, sub) {
        if (sub) {
            this.tabsActivity.defaultStyle = false;
            this.tabsActivity.previousStyle = false;
            this.tabsActivity.currentStyle = false;
        }
        else {
            this.tabsActivity.profile = false;
            this.tabsActivity.editStyle = false;
        }
        this.tabsActivity[tabName] = true;
    };
    /*--------- NG On Init ---------*/
    CompanyPanelCmp.prototype.ngOnInit = function () {
        // Initital method to be executed when page loads
        this._appService.pageLoaded('', this);
        // Variables initialization
        this.subscriptions = {};
        this.componentAlert = new models_1.Alert(null, true);
        this.company = new models_2.CompanyDetails();
        this.cssBundle = {};
        this.tabsActivity = {
            profile: true,
            editStyle: false,
            defaultStyle: false,
            previousStyle: false,
            currentStyle: true
        };
        // Initial methods
        this.setCompanyForm();
        this.loadCompany();
        this._appService.languageChangeForComponent(this);
    };
    /*--------- NG On Destroy ---------*/
    CompanyPanelCmp.prototype.ngOnDestroy = function () {
        this._appService.refreshEmitters(this.subscriptions);
    };
    CompanyPanelCmp = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'companyPanel.cmp.html',
            encapsulation: core_1.ViewEncapsulation.None,
        }), 
        __metadata('design:paramtypes', [utility_service_1.UtilityService, companyPanel_service_1.CompanyPanelService, app_service_1.AppService, ng2_translate_1.TranslateService, forms_1.FormBuilder])
    ], CompanyPanelCmp);
    return CompanyPanelCmp;
}());
exports.CompanyPanelCmp = CompanyPanelCmp;
//# sourceMappingURL=companyPanel.cmp.js.map