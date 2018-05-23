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
var platform_browser_1 = require('@angular/platform-browser');
var ng2_translate_1 = require('ng2-translate');
var kjgri_measured_style_service_1 = require('./kjgri.measured_style.service');
var utility_service_1 = require('../../kjcore/shared/services/utility.service');
var app_service_1 = require('../../kjcore/shared/services/app.service');
var models_1 = require('../../kjcore/shared/models');
var MeasuredStyleCmp = (function () {
    /*--------- Constructor ---------*/
    function MeasuredStyleCmp(_utilityService, _measuredStyleManagement, _appService, _translateService, _formBuilder, _changeDetector, _domSanitizer) {
        this._utilityService = _utilityService;
        this._measuredStyleManagement = _measuredStyleManagement;
        this._appService = _appService;
        this._translateService = _translateService;
        this._formBuilder = _formBuilder;
        this._changeDetector = _changeDetector;
        this._domSanitizer = _domSanitizer;
    }
    MeasuredStyleCmp.prototype.returnFalse = function ($event) {
        return false;
    };
    MeasuredStyleCmp.prototype.toggleColorPicker = function (formControlName) {
        this.toggles[formControlName] = !this.toggles[formControlName];
    };
    MeasuredStyleCmp.prototype.removeMeasuredStyle = function (modal) {
        var _this = this;
        this.subscriptions['removeMeasuredStyle'] = this._measuredStyleManagement.removeMeasuredStyle(this.selectedMeasuredStyle).subscribe(function (res) {
            _this._utilityService.setAlert(_this.componentAlert, res.message, res.statusCode);
            _this._loadMeasuredStyles();
            _this.hideModal(modal);
        }, function (err) {
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode);
            _this.formErrors = err;
            console.log(err);
        });
    };
    MeasuredStyleCmp.prototype.measuredStyleFormSubmit = function (modal) {
        var _this = this;
        this.measuredStyleForm.get('stroke').setValue(this.measuredStyleFormCopy.stroke);
        this.measuredStyleForm.get('fill').setValue(this.measuredStyleFormCopy.fill);
        this.subscriptions['measuredStyleFormSubmit'] = this._measuredStyleManagement.createOrUpdateMeasuredStyle(this.measuredStyleForm.value, this.selectedDicStyle).subscribe(function (res) {
            _this._utilityService.setAlert(_this.componentAlert, res.message, res.statusCode);
            _this._loadMeasuredStyles();
            _this.hideModal(modal);
        }, function (err) {
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode, err.errors);
            _this.formErrors = err;
            console.log(err);
        });
    };
    MeasuredStyleCmp.prototype.onDicStyleChange = function (event) {
        if (event) {
            this._loadMeasuredStyles();
        }
    };
    MeasuredStyleCmp.prototype._loadMeasuredStyles = function () {
        var _this = this;
        this.subscriptions['_loadMeasuredStyles'] = this._measuredStyleManagement.getAllMeasuredStyles(this.selectedDicStyle.id).subscribe(function (res) {
            _this.styles = res.data;
        }, function (err) {
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode, err.errors);
            _this.formErrors = err;
            console.log(err);
        });
    };
    MeasuredStyleCmp.prototype._loadDicStyles = function () {
        var _this = this;
        this.subscriptions['_loadDicStyles'] = this._measuredStyleManagement.getAllDicStyles().subscribe(function (res) {
            _this.dicStyles = res.data;
        }, function (err) {
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode, err.errors);
            _this.formErrors = err;
            console.log(err);
        });
    };
    /**
     *
     */
    MeasuredStyleCmp.prototype._loadData = function () {
        this._loadDicStyles();
    };
    /**
     * Show modal based on passed modal directive and custom behaviour based on modalName and data
     * @author Nikola Gavric
     */
    MeasuredStyleCmp.prototype.showModal = function (modal, modalName, data) {
        this._utilityService.setAlert(this.componentAlert);
        this.formErrors = new models_1.RestResponse();
        switch (modalName) {
            case 'addMeasuredStyle':
                this.measuredStyleForm.reset();
                this.measuredStyleFormCopy.fill = '#4392e2';
                this.measuredStyleFormCopy.stroke = '#049f3c';
                break;
            case 'editMeasuredStyle':
                this.measuredStyleFormCopy.stroke = data.stroke;
                this.measuredStyleFormCopy.fill = data.fill;
                this.measuredStyleForm.patchValue(data);
                break;
            case 'deleteMeasuredStyle':
                this.selectedMeasuredStyle = data;
                break;
        }
        modal.show();
    };
    /**
     * Hide modal based on passed modal directive
     * @author Nikola Gavric
     */
    MeasuredStyleCmp.prototype.hideModal = function (modal) {
        modal.hide();
        this.measuredStyleForm.reset();
        this.measuredStyleFormCopy.fill = '#4392e2';
        this.measuredStyleFormCopy.stroke = '#049f3c';
        this.selectedMeasuredStyle = null;
    };
    /*--------- NG On Init ---------*/
    MeasuredStyleCmp.prototype.ngOnInit = function () {
        // Initital method to be executed when page loads
        this._appService.pageLoaded('', this);
        this.componentAlert = new models_1.Alert(null, true);
        this.measuredStyleForm = this._formBuilder.group({
            id: [null, []],
            valueMin: [null, forms_1.Validators.required],
            valueMax: [null, forms_1.Validators.required],
            description: [null, []],
            fill: ['', []],
            stroke: ['', []],
            strokeWidth: [null, forms_1.Validators.required],
            utInsert: [null, []],
            tsInsert: [null, []],
            utUpdate: [null, []],
            tsUpdate: [null, []],
        });
        this.measuredStyleFormCopy = {
            fill: '#4392e2',
            stroke: '#049f3c',
        };
        this.toggles = {
            fill: false,
            stroke: false,
        };
        //
        this.subscriptions = [];
        // Initial methods
        this._loadData();
        this._appService.languageChangeForComponent(this);
    };
    /*--------- NG On Destroy ---------*/
    MeasuredStyleCmp.prototype.ngOnDestroy = function () {
        this._appService.refreshEmitters(this.subscriptions);
    };
    MeasuredStyleCmp = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'kjgri.measured_style.cmp.html',
            encapsulation: core_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [utility_service_1.UtilityService, kjgri_measured_style_service_1.MeasuredStyleService, app_service_1.AppService, ng2_translate_1.TranslateService, forms_1.FormBuilder, core_1.ChangeDetectorRef, platform_browser_1.DomSanitizer])
    ], MeasuredStyleCmp);
    return MeasuredStyleCmp;
}());
exports.MeasuredStyleCmp = MeasuredStyleCmp;
//# sourceMappingURL=kjgri.measured_style.cmp.js.map