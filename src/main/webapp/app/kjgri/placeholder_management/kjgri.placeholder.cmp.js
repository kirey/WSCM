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
var kjgri_placeholder_service_1 = require('./kjgri.placeholder.service');
var utility_service_1 = require('../../kjcore/shared/services/utility.service');
var app_service_1 = require('../../kjcore/shared/services/app.service');
var models_1 = require('../../kjcore/shared/models');
var PlaceholderManagementCmp = (function () {
    /*--------- Constructor ---------*/
    function PlaceholderManagementCmp(_utilityService, _placeholderManagementService, _appService, _translateService, _formBuilder) {
        this._utilityService = _utilityService;
        this._placeholderManagementService = _placeholderManagementService;
        this._appService = _appService;
        this._translateService = _translateService;
        this._formBuilder = _formBuilder;
        this.subscriptions = [];
    }
    PlaceholderManagementCmp.prototype.loadPlaceholders = function () {
        var _this = this;
        this.subscriptions['loadPlaceholders'] = this._placeholderManagementService.getAllPlaceholders().subscribe(function (res) {
            _this.placeholders = res.data;
        }, function (err) {
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode);
            _this.formErrors = err;
        });
    };
    PlaceholderManagementCmp.prototype.placeholderFormSubmit = function (modal) {
        var _this = this;
        this.subscriptions['placeholderFormSubmit'] = this._placeholderManagementService.createOrUpdatePlaceholder(this.placeholderForm.value).subscribe(function (res) {
            _this._utilityService.setAlert(_this.componentAlert, res.message, res.statusCode);
            _this.hideModal(modal);
            _this.loadPlaceholders();
        }, function (err) {
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode);
            _this.formErrors = err;
        });
    };
    PlaceholderManagementCmp.prototype.removePlaceholder = function (modal) {
        var _this = this;
        this.subscriptions['removePlaceholder'] = this._placeholderManagementService.removePlaceholder(this.selectedPlaceholder).subscribe(function (res) {
            _this._utilityService.setAlert(_this.componentAlert, res.message, res.statusCode);
            _this.hideModal(modal);
            _this.loadPlaceholders();
        }, function (err) {
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode);
            _this.formErrors = err;
        });
    };
    PlaceholderManagementCmp.prototype.loadData = function () {
        this.loadPlaceholders();
    };
    PlaceholderManagementCmp.prototype.findById = function (arr, id) {
        return arr.filter(function (obj) { return obj.id === id; })[0];
    };
    /**
     * Show modal based on passed modal directive and custom behaviour based on modalName and data
     * @author Nikola Gavric
     */
    PlaceholderManagementCmp.prototype.showModal = function (modal, modalName, data) {
        this._utilityService.setAlert(this.componentAlert);
        this.formErrors = new models_1.RestResponse();
        switch (modalName) {
            case 'editPlaceholder':
                if (data)
                    this.placeholderForm.patchValue(data);
                break;
            case 'addPlaceholder':
                this.placeholderForm.reset();
                break;
            case 'deletePlaceholder':
                this.selectedPlaceholder = data;
                break;
        }
        modal.show();
    };
    /**
     * Hide modal based on passed modal directive
     * @author Nikola Gavric
     */
    PlaceholderManagementCmp.prototype.hideModal = function (modal) {
        modal.hide();
    };
    /*--------- NG On Init ---------*/
    PlaceholderManagementCmp.prototype.ngOnInit = function () {
        // Initital method to be executed when page loads
        this._appService.pageLoaded('', this);
        this.componentAlert = new models_1.Alert(null, true);
        this.placeholderForm = this._formBuilder.group({
            id: [null, []],
            name: [null, [forms_1.Validators.required]],
            placeholderCode: [null, [forms_1.Validators.required]],
            templateText: [null, [forms_1.Validators.required]]
        });
        // Initial methods
        this.loadData();
        this._appService.languageChangeForComponent(this, this.loadData.bind(this));
    };
    /*--------- NG On Destroy ---------*/
    PlaceholderManagementCmp.prototype.ngOnDestroy = function () {
        this._appService.refreshEmitters(this.subscriptions);
    };
    PlaceholderManagementCmp = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'kjgri.placeholder.cmp.html'
        }), 
        __metadata('design:paramtypes', [utility_service_1.UtilityService, kjgri_placeholder_service_1.PlaceholderManagementService, app_service_1.AppService, ng2_translate_1.TranslateService, forms_1.FormBuilder])
    ], PlaceholderManagementCmp);
    return PlaceholderManagementCmp;
}());
exports.PlaceholderManagementCmp = PlaceholderManagementCmp;
//# sourceMappingURL=kjgri.placeholder.cmp.js.map