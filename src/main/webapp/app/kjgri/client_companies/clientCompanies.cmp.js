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
var primeng_1 = require('primeng/primeng');
var clientCompanies_service_1 = require('./clientCompanies.service');
var utility_service_1 = require('../../kjcore/shared/services/utility.service');
var app_service_1 = require('../../kjcore/shared/services/app.service');
var models_1 = require("./models");
var models_2 = require("./../kjgri_shared/models");
var models_3 = require('../../kjcore/shared/models');
/**
 * Component for insurace companies management
 * @author Mario Petrovic
 */
var ClientCompaniesCmp = (function () {
    /*--------- Constructor ---------*/
    function ClientCompaniesCmp(_clientCompaniesService, _utilityService, _appService, _translateService) {
        this._clientCompaniesService = _clientCompaniesService;
        this._utilityService = _utilityService;
        this._appService = _appService;
        this._translateService = _translateService;
    }
    /*--------- REST calls ---------*/
    /**
     * Loads filtered client companies
     * @author Mario Petrovic
     */
    ClientCompaniesCmp.prototype.filterCompanies = function (filterForm, dataTable) {
        var _this = this;
        this._utilityService.setAlert(this.componentAlert);
        var queryParams = new models_1.CompanyQueryParams(dataTable.rows, (dataTable.first / dataTable.rows + 1));
        queryParams.sortType = dataTable.sortOrder == 1 ? 'asc' : 'desc';
        queryParams.companyName = filterForm.value.companyName || '';
        this.subscriptions['filterCompanies'] = this._clientCompaniesService.getInsuranceCompanies(queryParams).subscribe(function (res) {
            _this.clientCompaniesResult = res.data;
        }, function (err) {
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode);
        });
    };
    /**
     *
     */
    ClientCompaniesCmp.prototype.clearFilters = function () {
        this.filterForm.reset();
        this.filterCompanies({ value: { companyName: '' } }, this.clientCompanyDataTable);
    };
    /**
     * Detaches insurance company of logged in user from selected client company
     * @author Mario Petrovic
     */
    ClientCompaniesCmp.prototype.detachFromClientCompany = function (clientCompany, modal) {
        var _this = this;
        this._utilityService.setAlert(this.componentAlert);
        this.subscriptions['detachFromClientCompany'] = this._clientCompaniesService.detachFromClientCompany(clientCompany.id).subscribe(function (res) {
            _this._utilityService.setAlert(_this.componentAlert, res.message);
            _this.filterCompanies({ value: { companyName: '' } }, _this.clientCompanyDataTable);
            modal.hide();
        }, function (err) {
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode);
        });
    };
    /*--------- App logic ---------*/
    /**
     * Show modal based on passed modal directive and custom behaviour based on modalName and data
     * @author Mario Petrovic
     */
    ClientCompaniesCmp.prototype.showModal = function (modal, modalName, data) {
        this._utilityService.setAlert(this.componentAlert);
        this.detachingCompany = data;
        modal.show();
    };
    /**
     * Hide modal based on passed modal directive
     * @author Mario Petrovic
     */
    ClientCompaniesCmp.prototype.hideModal = function (modal) {
        modal.hide();
    };
    /*--------- NG On Init ---------*/
    ClientCompaniesCmp.prototype.ngOnInit = function () {
        // Initital method to be executed when page loads
        this._appService.pageLoaded('', this);
        this._appService.languageChangeForComponent(this);
        // Variables initialization
        this.subscriptions = {};
        this.componentAlert = new models_3.Alert(null, true);
        this.dataTableConfig = new models_3.DataTableConfig(10, true, 3, [5, 10, 20, 50, 100], true);
        this.formErrors = new models_3.RestResponse();
        this.clientCompaniesResult = new models_2.PaginationTableResult();
        // Initial methods
    };
    /*--------- NG On Destroy ---------*/
    ClientCompaniesCmp.prototype.ngOnDestroy = function () {
        this._appService.refreshEmitters(this.subscriptions);
    };
    __decorate([
        core_1.ViewChild('clientCompanyDataTable'), 
        __metadata('design:type', primeng_1.DataTable)
    ], ClientCompaniesCmp.prototype, "clientCompanyDataTable", void 0);
    __decorate([
        core_1.ViewChild('filterForm'), 
        __metadata('design:type', forms_1.FormGroup)
    ], ClientCompaniesCmp.prototype, "filterForm", void 0);
    ClientCompaniesCmp = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'clientCompanies.cmp.html',
            encapsulation: core_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [clientCompanies_service_1.ClientCompaniesService, utility_service_1.UtilityService, app_service_1.AppService, ng2_translate_1.TranslateService])
    ], ClientCompaniesCmp);
    return ClientCompaniesCmp;
}());
exports.ClientCompaniesCmp = ClientCompaniesCmp;
//# sourceMappingURL=clientCompanies.cmp.js.map