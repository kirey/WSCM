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
var companyManagement_service_1 = require('./companyManagement.service');
var utility_service_1 = require('../shared/services/utility.service');
var app_service_1 = require('../shared/services/app.service');
var models_1 = require('../shared/models');
var models_2 = require("./models");
/**
 * Component for Company Management component
 * @author Mario Petrovic
 */
var CompanyManagementCmp = (function () {
    /*--------- Constructor ---------*/
    function CompanyManagementCmp(_utilityService, _companyManagementService, _appService, _translateService, _formBuilder) {
        this._utilityService = _utilityService;
        this._companyManagementService = _companyManagementService;
        this._appService = _appService;
        this._translateService = _translateService;
        this._formBuilder = _formBuilder;
    }
    /*--------- App Logic ---------*/
    /*--------- REST calls ---------*/
    /**
     * Load all companies
     * @author Mario Petrovic
     */
    CompanyManagementCmp.prototype.loadAllCompanies = function () {
        var _this = this;
        this.subscriptions['loadAllCompanies'] = this._companyManagementService.getAllCompaniesRest().subscribe(function (res) {
            _this.companies = res.data;
            for (var _i = 0, _a = _this.companies; _i < _a.length; _i++) {
                var company = _a[_i];
                company.passwordTimeout = _this._utilityService.convertMillisecondsDays(company.passwordTimeout, true);
            }
        }, function (err) {
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode);
        });
    };
    /**
     * Update selected comapny
     * @author Mario Petrovic
     */
    CompanyManagementCmp.prototype.updateCompany = function (data, modal) {
        var _this = this;
        if (data.passwordTimeout) {
            data.passwordTimeout = this._utilityService.convertMillisecondsDays(data.passwordTimeoutForm);
        }
        this.subscriptions['updateCompany'] = this._companyManagementService.updateCompanyRest(data).subscribe(function (res) {
            _this._utilityService.setAlert(_this.componentAlert, res.message, res.statusCode);
            _this.hideModal(modal);
            _this.loadAllCompanies();
        }, function (err) {
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode);
            _this.formErrors = err;
        });
    };
    CompanyManagementCmp.prototype.updateDefaultCompany = function (data, modal) {
        var _this = this;
        this.subscriptions['updateDefaultCompany'] = this._companyManagementService.updateDefaultCompanyRest(data).subscribe(function (res) {
            _this._utilityService.setAlert(_this.componentAlert, res.message, res.statusCode);
            _this.hideModal(modal);
        }, function (err) {
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode);
        });
    };
    /**
     * Load default company profile
     * @author Mario Petrovic
     */
    CompanyManagementCmp.prototype.loadDefaultCompany = function (modal) {
        var _this = this;
        this.subscriptions['loadDefaultComapny'] = this._companyManagementService.getDefaultCompanyRest().subscribe(function (res) {
            _this.defaultCompany = res.data;
            _this.defaultCompanyFileInput.file = null;
            _this.selectedCompanyProfile.defaultCss = _this.defaultCompany.activeCss;
            _this.setCssModel('defaultCss', _this.defaultCompany.activeCss);
            _this.defaultCompanyFileInput.value = 'rest/users/noAuth/logoImage/' + res.data.company.id;
            _this.setEditDefaultCompanyModal(modal, _this.defaultCompany.company);
        }, function (err) {
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode);
        });
    };
    /**
     * Load company profile by id
     * @author Mario Petrovic
     */
    CompanyManagementCmp.prototype.loadCompanyById = function (id, modal) {
        var _this = this;
        this.subscriptions['loadCompanyById'] = this._companyManagementService.getCompanyProfileByIdRest(id).subscribe(function (res) {
            _this.selectedCompanyFileInput = new models_2.FileInput();
            setTimeout(function () {
                _this.setEditCompanyModal(res.data);
                _this.selectedCompanyFileInput.value = 'rest/users/noAuth/logoImage/' + res.data.company.id;
                modal.show();
            });
        }, function (err) {
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode);
        });
    };
    /**
     * Update status of the company
     * @author Mario Petrovic
     */
    CompanyManagementCmp.prototype.updateCompanyStatus = function (data) {
        var _this = this;
        this.subscriptions['updateCompanyStatus'] = this._companyManagementService.updateCompanyStatusRest(data.id, !data.flActive).subscribe(function (res) {
            _this._utilityService.setAlert(_this.componentAlert, res.message, res.statusCode);
            _this.loadAllCompanies();
        }, function (err) {
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode);
            _this.formErrors = err;
        });
    };
    /**
     * Add new company
     * @author Mario Petrovic
     */
    CompanyManagementCmp.prototype.addNewCompany = function (data, modal) {
        var _this = this;
        var newCompany = new FormData();
        newCompany.append('companyDto', new Blob([JSON.stringify(data)], {
            type: "application/json"
        }));
        newCompany.append('logo', this.addCompanyFileInput.file);
        this.subscriptions['addNewCompany'] = this._companyManagementService.saveCompanyRest(newCompany).subscribe(function (res) {
            _this._utilityService.setAlert(_this.componentAlert, res.message, res.statusCode);
            _this.hideModal(modal);
            _this.loadAllCompanies();
        }, function (err) {
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode);
            _this.formErrors = err;
        });
    };
    /**
     * Edit default style
     * @author Mario Petrovic
     */
    CompanyManagementCmp.prototype.editDefaultStyle = function (data, modal) {
        var _this = this;
        var defaultCompanyCss = [];
        for (var _i = 0, _a = Object.keys(data); _i < _a.length; _i++) {
            var rule = _a[_i];
            var ruleTemp = new models_2.CompanyCss();
            ruleTemp.key = data[rule].key;
            ruleTemp.name = data[rule].name;
            ruleTemp.value = data[rule].property + ':' + data[rule].value + ';';
            defaultCompanyCss.push(ruleTemp);
        }
        this.subscriptions['editDefaultStyle'] = this._companyManagementService.updateDefaultCssRest(defaultCompanyCss).subscribe(function (res) {
            _this.hideModal(modal);
            _this._utilityService.setAlert(_this.componentAlert, res.message, res.statusCode);
            _this._appService.setCompanyCSSInit();
        }, function (err) {
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode);
        });
    };
    /**
     * Edit default style
     * @author Mario Petrovic
     */
    CompanyManagementCmp.prototype.editCompanyStyle = function (id, data, modal) {
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
        this.subscriptions['editCompanyStyle'] = this._companyManagementService.updateCompanyCssRest(id, companyCss).subscribe(function (res) {
            _this.hideModal(modal);
            _this._utilityService.setAlert(_this.componentAlert, res.message, res.statusCode);
            _this._appService.setCompanyCSSInit();
        }, function (err) {
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode);
        });
    };
    /**
     * Reset default css to initial
     * @author Mario Petrovic
     */
    CompanyManagementCmp.prototype.resetDefaultCssToInit = function (modal) {
        var _this = this;
        this.subscriptions['resetDefaultCssToInit'] = this._companyManagementService.resetDefaultCssToInitRest().subscribe(function (res) {
            _this.hideModal(modal);
            _this._utilityService.setAlert(_this.componentAlert, res.message, res.statusCode);
            _this._appService.setCompanyCSSInit();
        }, function (err) {
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode);
            _this.formErrors = err;
        });
    };
    /**
     * Reset selected company style to default css
     * @author Mario Petrovic
     */
    CompanyManagementCmp.prototype.resetCompanyStyleToDefault = function (id, modal) {
        var _this = this;
        this.subscriptions['resetCompanyStyleToDefault'] = this._companyManagementService.resetCompanyStyleToDefault(id).subscribe(function (res) {
            _this.hideModal(modal);
            _this._utilityService.setAlert(_this.componentAlert, res.message, res.statusCode);
            _this._appService.setCompanyCSSInit();
        }, function (err) {
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode);
            _this.formErrors = err;
        });
    };
    /**
     * Reset selected company style to previous css
     * @author Mario Petrovic
     */
    CompanyManagementCmp.prototype.resetCompanyStyleToPrevious = function (id, modal) {
        var _this = this;
        this.subscriptions['resetCompanyStyleToPrevious'] = this._companyManagementService.resetCompanyStyleToPreviousRest(id).subscribe(function (res) {
            _this.hideModal(modal);
            _this._utilityService.setAlert(_this.componentAlert, res.message, res.statusCode);
            _this._appService.setCompanyCSSInit();
        }, function (err) {
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode);
            _this.formErrors = err;
        });
    };
    /**
     * Upload company logo
     * @author Mario Petrovic
     */
    CompanyManagementCmp.prototype.uploadCompanyLogo = function (companyLogo, companyId, modal) {
        var _this = this;
        var formData = new FormData();
        formData.append('companyId', new Blob([JSON.stringify(companyId)], {
            type: "text/plain"
        }));
        formData.append('companyLogo', companyLogo);
        this.subscriptions['resetCompanyStyleToPrevious'] = this._companyManagementService.uploadCompanyLogoRest(formData).subscribe(function (res) {
            _this.hideModal(modal);
            _this._utilityService.setAlert(_this.componentAlert, res.message, res.statusCode);
        }, function (err) {
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode);
            _this.formErrors = err;
        });
    };
    /*--------- Other ---------*/
    CompanyManagementCmp.prototype.onFileInputChange = function (event, fileInputName) {
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
    /*--------- Utility ---------*/
    /**
     * Set edit company modal form
     * @author Mario Petrovic
     */
    CompanyManagementCmp.prototype.setEditCompanyModal = function (company) {
        this.selectedCompanyProfile = company;
        this.selectedCompanyProfile.company.passwordTimeout = this._utilityService.convertMillisecondsDays(this.selectedCompanyProfile.company.passwordTimeout, true);
        this.setCssModel('defaultCss', this.selectedCompanyProfile.defaultCss);
        this.setCssModel('previousCss', this.selectedCompanyProfile.previousCss);
        this.setCssModel('activeCss', this.selectedCompanyProfile.activeCss);
        this.editForm = this._formBuilder.group({
            id: new forms_1.FormControl(company.company.id),
            code: new forms_1.FormControl(company.company.code),
            name: new forms_1.FormControl(company.company.name, [forms_1.Validators.required]),
            description: new forms_1.FormControl(company.company.description, [forms_1.Validators.required]),
            flActive: new forms_1.FormControl(company.company.flActive),
            passwordTimeout: new forms_1.FormControl(company.company.passwordTimeout),
            passwordTimeoutForm: new forms_1.FormControl(company.company.passwordTimeout, [])
        });
    };
    /**
     * Set add company modal form
     * @author Mario Petrovic
     */
    CompanyManagementCmp.prototype.setAddCompanyModal = function () {
        this.addCompanyFileInput = new models_2.FileInput();
        this.addCompanyFileInput.value = 'app/kjcore/assets/images/noPhoto.png';
        this.addForm = this._formBuilder.group({
            id: new forms_1.FormControl(),
            code: new forms_1.FormControl('', [forms_1.Validators.required]),
            name: new forms_1.FormControl('', [forms_1.Validators.required]),
            description: new forms_1.FormControl('', [forms_1.Validators.required]),
            flActive: new forms_1.FormControl(false),
            passwordTimeout: new forms_1.FormControl(),
            passwordTimeoutForm: new forms_1.FormControl(null, [])
        });
    };
    CompanyManagementCmp.prototype.setEditDefaultCompanyModal = function (modal, defaultCompany) {
        this.defaultCompanyForm = this._formBuilder.group({
            name: new forms_1.FormControl(defaultCompany.name, [forms_1.Validators.required]),
            description: new forms_1.FormControl(defaultCompany.description)
        });
        modal.show();
    };
    /**
     * Set edit default style form
     * @author Mario Petrovic
     */
    CompanyManagementCmp.prototype.setCssModel = function (cssName, company) {
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
    CompanyManagementCmp.prototype.toggleColorPicker = function (colorPicker) {
        colorPicker.toggle = !colorPicker.toggle;
    };
    /**
     * Select tab method
     * @author Mario Petrovic
     */
    CompanyManagementCmp.prototype.selectTab = function (tabName, sub) {
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
    /**
     * Show modal based on passed modal directive and custom behaviour based on modalName and data
     * @author Mario Petrovic
     */
    CompanyManagementCmp.prototype.showModal = function (modal, modalName, data) {
        this._utilityService.setAlert(this.componentAlert);
        this.formErrors = new models_1.RestResponse();
        switch (modalName) {
            case 'editCompany':
                this.loadCompanyById(data, modal);
                break;
            case 'addCompany':
                this.setAddCompanyModal();
                modal.show();
                break;
            case 'editDefaultCompany':
                this.loadDefaultCompany(modal);
                break;
        }
    };
    /**
     * Hide modal based on passed modal directive
     * @author Mario Petrovic
     */
    CompanyManagementCmp.prototype.hideModal = function (modal) {
        modal.hide();
    };
    /*--------- NG On Init ---------*/
    CompanyManagementCmp.prototype.ngOnInit = function () {
        // Initital method to be executed when page loads
        this._appService.pageLoaded('', this);
        // Variables initialization
        this.subscriptions = {};
        this.componentAlert = new models_1.Alert(null, true);
        this.dataTableConfig = new models_1.DataTableConfig(10, true, 3, [5, 10, 20, 50, 100], true);
        this.selectedCompanyProfile = new models_2.CompanyDetails();
        this.companies = [];
        this.cssBundle = {};
        this.defaultCompanyFileInput = new models_2.FileInput();
        this.selectedCompanyFileInput = new models_2.FileInput();
        this.addCompanyFileInput = new models_2.FileInput();
        this.addCompanyFileInput.value = 'app/kjcore/assets/images/noPhoto.png';
        this.tabsActivity = {
            profile: true,
            editStyle: false,
            defaultStyle: false,
            previousStyle: false,
            currentStyle: true
        };
        // Initial methods
        this.loadAllCompanies();
        this._appService.languageChangeForComponent(this);
    };
    /*--------- NG On Destroy ---------*/
    CompanyManagementCmp.prototype.ngOnDestroy = function () {
        this._appService.refreshEmitters(this.subscriptions);
    };
    CompanyManagementCmp = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'companyManagement.cmp.html',
            encapsulation: core_1.ViewEncapsulation.None,
        }), 
        __metadata('design:paramtypes', [utility_service_1.UtilityService, companyManagement_service_1.CompanyManagementService, app_service_1.AppService, ng2_translate_1.TranslateService, forms_1.FormBuilder])
    ], CompanyManagementCmp);
    return CompanyManagementCmp;
}());
exports.CompanyManagementCmp = CompanyManagementCmp;
//# sourceMappingURL=companyManagement.cmp.js.map