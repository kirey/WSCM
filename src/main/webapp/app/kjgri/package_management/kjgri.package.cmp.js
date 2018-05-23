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
var app_service_1 = require('../../kjcore/shared/services/app.service');
var utility_service_1 = require('../../kjcore/shared/services/utility.service');
var models_1 = require('../../kjcore/shared/models');
var kjgri_package_service_1 = require('./kjgri.package.service');
var kjgri_constants_1 = require("../kjgri.constants");
var PackageManagementCmp = (function () {
    /*--------- Constructor --------*/
    function PackageManagementCmp(_utilityService, _changeDetectionRef, _appService, _translateService, _formBuilder, _packageManagementService, _constants) {
        this._utilityService = _utilityService;
        this._changeDetectionRef = _changeDetectionRef;
        this._appService = _appService;
        this._translateService = _translateService;
        this._formBuilder = _formBuilder;
        this._packageManagementService = _packageManagementService;
        this._constants = _constants;
        this.subscriptions = [];
    }
    /**
     * Loading all packages.
     * @author Nikola Gavric
     */
    PackageManagementCmp.prototype._loadPackages = function () {
        var _this = this;
        this.subscriptions['_loadPackages'] = this._packageManagementService.getAllPackages().subscribe(function (res) {
            _this.packages = res.data;
        }, function (err) {
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode);
        });
    };
    /**
     * Saving a package.
     * @param modal ModalDirective
     * @author Nikola Gavric
     */
    PackageManagementCmp.prototype.packageFormSubmit = function (modal) {
        var _this = this;
        this.subscriptions['packageFormSubmit'] = this._packageManagementService.updatePackage(this.packageForm.value).subscribe(function (res) {
            _this._utilityService.setAlert(_this.componentAlert, res.message, res.statusCode);
            _this._loadData();
            _this.hideModal(modal);
        }, function (err) {
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode);
        });
    };
    /**
     * Loading all necessary stuff
     * @author Nikola Gavric
     */
    PackageManagementCmp.prototype._loadData = function () {
        this._loadPackages();
    };
    /**
     * Show modal based on passed modal directive and custom behaviour based on modalName and data
     * @author Nikola Gavric
     */
    PackageManagementCmp.prototype.showModal = function (modal, modalName, data) {
        this._utilityService.setAlert(this.componentAlert);
        this.formErrors = new models_1.RestResponse();
        switch (modalName) {
            case 'editPackage':
                this.packageForm.patchValue(data);
                if (this.isAsicurativo())
                    this.packageForm.get('numberOfLocations').disable();
                else
                    this.packageForm.get('numberOfLocations').enable();
                break;
        }
        modal.show();
    };
    /**
     * Hide modal based on passed modal directive
     * @author Nikola Gavric
     */
    PackageManagementCmp.prototype.hideModal = function (modal) {
        this.packageForm.reset();
        modal.hide();
    };
    /**
     * Check if package is for asicurativo.
     * @author Nikola Gavric
     */
    PackageManagementCmp.prototype.isAsicurativo = function () {
        return this.packageForm.get('clientCompanyType').value == 'A';
    };
    /*--------- NG On Init ---------*/
    //@hasAny()
    PackageManagementCmp.prototype.ngOnInit = function () {
        // Initital method to be executed when page loads
        this._appService.pageLoaded('', this);
        //Setting initial submit value
        this.componentAlert = new models_1.Alert(null, true);
        this.packageForm = this._formBuilder.group({
            id: [null, []],
            code: [null, []],
            name: [null, []],
            clientCompanyType: [null, []],
            numberOfAccounts: [null, [forms_1.Validators.required]],
            numberOfLocations: [null, []],
            duration: [null, [forms_1.Validators.required]]
        });
        //Loading view data
        this._loadData();
        this._appService.languageChangeForComponent(this);
    };
    PackageManagementCmp.prototype.ngOnDestroy = function () {
        this._appService.refreshEmitters(this.subscriptions);
    };
    PackageManagementCmp = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'kjgri.package.cmp.html',
            encapsulation: core_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [utility_service_1.UtilityService, core_1.ChangeDetectorRef, app_service_1.AppService, ng2_translate_1.TranslateService, forms_1.FormBuilder, kjgri_package_service_1.PackageManagementService, kjgri_constants_1.KJGriConstants])
    ], PackageManagementCmp);
    return PackageManagementCmp;
}());
exports.PackageManagementCmp = PackageManagementCmp;
//# sourceMappingURL=kjgri.package.cmp.js.map