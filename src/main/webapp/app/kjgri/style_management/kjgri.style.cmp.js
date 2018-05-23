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
var ng2_bootstrap_1 = require('ng2-bootstrap');
var kjgri_style_service_1 = require('./kjgri.style.service');
var utility_service_1 = require('../../kjcore/shared/services/utility.service');
var app_service_1 = require('../../kjcore/shared/services/app.service');
var models_1 = require('../../kjcore/shared/models');
var validation_service_1 = require('../../kjcore/shared/services/validation.service');
var StyleManagementCmp = (function () {
    /*--------- Constructor ---------*/
    function StyleManagementCmp(_utilityService, _styleManagement, _appService, _translateService, _formBuilder, _changeDetector, _domSanitizer) {
        this._utilityService = _utilityService;
        this._styleManagement = _styleManagement;
        this._appService = _appService;
        this._translateService = _translateService;
        this._formBuilder = _formBuilder;
        this._changeDetector = _changeDetector;
        this._domSanitizer = _domSanitizer;
        this.subscriptions = [];
        this.selectedStyle = [];
    }
    StyleManagementCmp.prototype.returnFalse = function ($event) {
        return false;
    };
    StyleManagementCmp.prototype.toggleColorPicker = function (formControlName) {
        this.toggles[formControlName] = !this.toggles[formControlName];
    };
    StyleManagementCmp.prototype.removeStyle = function (modal) {
        var _this = this;
        this.subscriptions['removeAction'] = this._styleManagement.removeStyle(this.selectedStyle).subscribe(function (res) {
            _this._utilityService.setAlert(_this.componentAlert, res.message, res.statusCode);
            _this._loadStyles();
            _this.hideModal(modal);
        }, function (err) {
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode);
            _this.formErrors = err;
            console.log(err);
        });
    };
    StyleManagementCmp.prototype.styleFormSubmit = function (modal) {
        var _this = this;
        this.styleForm.get('stroke').setValue(this.styleFormCopy.stroke);
        this.styleForm.get('fill').setValue(this.styleFormCopy.fill);
        if (this.styleForm.get('isForecastUndefined').value) {
            this.styleForm.get('riskIndexMin').setValue(-1);
            this.styleForm.get('riskIndexMax').setValue(0);
            this.styleForm.get('indexValue').setValue(null);
            this.styleForm.get('numericIndexValue').setValue(null);
        }
        else if (this.styleForm.get('minAndMax').value != [] && this.styleForm.get('indexValue').value == null && this.styleForm.get('numericIndexValue').value == null && !this.styleForm.get('isRiskUndefined').value) {
            this.styleForm.get('riskIndexMin').setValue(this.styleForm.get('minAndMax').value[0]);
            this.styleForm.get('riskIndexMax').setValue(this.styleForm.get('minAndMax').value[1]);
            this.styleForm.get('indexValue').setValue(null);
            this.styleForm.get('numericIndexValue').setValue(null);
        }
        else if (this.styleForm.get('isRiskUndefined').value != null || this.styleForm.get('indexValue').value != null || this.styleForm.get('numericIndexValue').value != null) {
            this.styleForm.get('riskIndexMin').setValue(null);
            this.styleForm.get('riskIndexMax').setValue(null);
        }
        if (this.styleForm.get('indexValue').value == "") {
            this.styleForm.get('indexValue').setValue(null);
        }
        if (this.styleForm.get('numericIndexValue').value == "") {
            this.styleForm.get('numericIndexValue').setValue(null);
        }
        var data = this.styleForm.value;
        if (data.isRiskUndefined) {
            data.indexValue = -1;
            data.numericIndexValue = -1;
        }
        this.subscriptions['styleFormSubmit'] = this._styleManagement.createOrUpdateStyle(data).subscribe(function (res) {
            _this._utilityService.setAlert(_this.componentAlert, res.message, res.statusCode);
            _this._loadStyles();
            _this.hideModal(modal);
        }, function (err) {
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode, err.errors);
            _this.formErrors = err;
            console.log(err);
        });
    };
    StyleManagementCmp.prototype._loadStyles = function () {
        var _this = this;
        this.subscriptions['loadStyles'] = this._styleManagement.getAllStyles().subscribe(function (res) {
            _this.styles = res.data;
        }, function (err) {
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode);
            _this.formErrors = err;
            console.log(err);
        });
    };
    /**
     * Load map pin image to show it in the modal for editing map pin
     * @author Mario Petrovic
     */
    StyleManagementCmp.prototype.loadMapPinImage = function (modal) {
        var _this = this;
        this._utilityService.setAlert(this.componentAlert);
        this.subscriptions['loadMapPinImage'] = this._styleManagement.getMapPinImage().subscribe(function (res) {
            _this.mapPinIcon = res.data;
            modal.show();
        }, function (err) {
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode);
        });
    };
    /**
     * Change map pin image
     * @author Mario Petrovic
     */
    StyleManagementCmp.prototype.changeMapPinImage = function (imageBlob, modal) {
        var _this = this;
        this._utilityService.setAlert(this.componentAlert);
        var formData = new FormData();
        formData.append('pinImage', imageBlob);
        this.subscriptions['loadMapPinImage'] = this._styleManagement.changeMapPin(formData).subscribe(function (res) {
            _this.mapPinIcon = res.data;
            modal.hide();
        }, function (err) {
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode);
        });
    };
    /**
     * Fire this method when file input changes
     * @author Mario Petrovic
     */
    StyleManagementCmp.prototype.onMapPinImageChange = function (event) {
        if (event.target.files[0]) {
            this.mapPinIconBlob = event.target.files[0];
        }
    };
    /**
     *
     */
    StyleManagementCmp.prototype._loadData = function () {
        this._loadStyles();
    };
    StyleManagementCmp.prototype.isEnabled = function (event, changed) {
        if (changed == 'indexValue' || changed == 'isRiskUndefined' || changed == 'numericIndexValue') {
            this.styleForm.get('riskIndexMin').setValue(0);
            this.styleForm.get('riskIndexMax').setValue(0);
            this.styleForm.get('minAndMax').setValue([1, 4]);
            this.styleForm.get('minAndMax').enable();
            this.styleForm.get('isForecastUndefined').setValue(false);
            if (changed == 'isRiskUndefined') {
                if (event) {
                    this.styleForm.get('indexValue').reset();
                    this.styleForm.get('numericIndexValue').reset();
                    this.styleForm.get('indexValue').disable();
                    this.styleForm.get('numericIndexValue').disable();
                }
                else {
                    this.styleForm.get('indexValue').enable();
                    this.styleForm.get('numericIndexValue').enable();
                }
            }
            else {
                this.styleForm.get('isRiskUndefined').setValue(false);
            }
        }
        else if (changed == 'minAndMax' || changed == 'isForecastUndefined') {
            this.styleForm.get('indexValue').reset();
            this.styleForm.get('numericIndexValue').reset();
            this.styleForm.get('indexValue').enable();
            this.styleForm.get('numericIndexValue').enable();
            this.styleForm.get('isRiskUndefined').setValue(false);
            if (changed == 'isForecastUndefined') {
                if (event) {
                    this.styleForm.get('riskIndexMin').setValue(-1);
                    this.styleForm.get('riskIndexMax').setValue(0);
                    this.styleForm.get('minAndMax').setValue([-1, 0]);
                    this.styleForm.get('minAndMax').disable();
                }
                else {
                    this.styleForm.get('riskIndexMin').setValue(0);
                    this.styleForm.get('riskIndexMax').setValue(0);
                    this.styleForm.get('minAndMax').setValue([1, 4]);
                    this.styleForm.get('minAndMax').enable();
                }
            }
            else {
                this.styleForm.get('isForecastUndefined').setValue(false);
            }
        }
    };
    /**
     * Show modal based on passed modal directive and custom behaviour based on modalName and data
     * @author Nikola Gavric
     */
    StyleManagementCmp.prototype.showModal = function (modal, modalName, data) {
        this._utilityService.setAlert(this.componentAlert);
        this.formErrors = new models_1.RestResponse();
        switch (modalName) {
            case 'addStyle':
                this.styleForm.reset();
                this.styleFormCopy.fill = '#4392e2';
                this.styleFormCopy.stroke = '#049f3c';
                this.styleForm.get('minAndMax').patchValue([1, 4]);
                modal.show();
                break;
            case 'editStyle':
                this.styleFormCopy.stroke = data.stroke;
                this.styleFormCopy.fill = data.fill;
                this.styleForm.patchValue(data);
                //If risk indexes are set
                if (this.styleForm.get('riskIndexMin').value != null && this.styleForm.get('riskIndexMax').value != null) {
                    this.styleForm.get('minAndMax').setValue([data.riskIndexMin, data.riskIndexMax]);
                    this.styleForm.get('minAndMax').enable();
                    //tabs[1] is Forecast tab
                    this.tabs.tabs[1].active = true;
                }
                else {
                    this.styleForm.get('minAndMax').setValue([1, 4]);
                    this.styleForm.get('minAndMax').enable();
                    //tabs[0] is Risk tab
                    this.tabs.tabs[0].active = true;
                }
                //if riskIndexMin and riskIndexMax are -1 and 0, trigger checkbox
                if (this.styleForm.get('riskIndexMin').value == -1 && this.styleForm.get('riskIndexMax').value == 0) {
                    this.styleForm.get('isForecastUndefined').setValue(true);
                    this.styleForm.get('minAndMax').disable();
                    //tabs[1] is Forecast tab
                    this.tabs.tabs[1].active = true;
                }
                //if indexValue is -1, trigger checkbox and reset them
                if (this.styleForm.get('indexValue').value == -1) {
                    this.styleForm.get('isRiskUndefined').setValue(true);
                    this.styleForm.get('indexValue').reset();
                    this.styleForm.get('numericIndexValue').reset();
                    this.styleForm.get('indexValue').disable();
                    this.styleForm.get('numericIndexValue').disable();
                    //tabs[0] is Risk tab
                    this.tabs.tabs[0].active = true;
                }
                modal.show();
                break;
            case 'deleteStyle':
                this.selectedStyle = data;
                modal.show();
                break;
            case 'editMapPin':
                this.loadMapPinImage(modal);
                break;
        }
    };
    /**
     * Hide modal based on passed modal directive
     * @author Nikola Gavric
     */
    StyleManagementCmp.prototype.hideModal = function (modal) {
        modal.hide();
        this.styleForm.reset();
        this.styleForm.get('minAndMax').patchValue([1, 4]);
        this.styleFormCopy.fill = '#4392e2';
        this.styleFormCopy.stroke = '#049f3c';
        this.selectedStyle = null;
    };
    /*--------- NG On Init ---------*/
    StyleManagementCmp.prototype.ngOnInit = function () {
        // Initital method to be executed when page loads
        this._appService.pageLoaded('', this);
        this.componentAlert = new models_1.Alert(null, true);
        this.styleForm = this._formBuilder.group({
            id: [null, []],
            riskIndexMin: [null, []],
            riskIndexMax: [null, []],
            indexValue: [null, [forms_1.Validators.maxLength(10)]],
            numericIndexValue: [null, [validation_service_1.ValidationService.validateRange(-999.99, 999.99)]],
            description: [null, [forms_1.Validators.maxLength(200)]],
            minAndMax: [[1, 4], []],
            fill: ['', []],
            isRiskUndefined: [false, []],
            isForecastUndefined: [false, []],
            stroke: ['', []],
            strokeWidth: [null, [forms_1.Validators.required, forms_1.Validators.maxLength(9), forms_1.Validators.minLength(1)]],
            utInsert: [null, []],
            tsInsert: [null, []],
            utUpdate: [null, []],
            tsUpdate: [null, []],
        });
        this.styleFormCopy = {
            fill: '#4392e2',
            stroke: '#049f3c',
        };
        this.toggles = {
            fill: false,
            stroke: false,
        };
        // Initial methods
        this._loadData();
        this._appService.languageChangeForComponent(this);
    };
    /*--------- NG On Destroy ---------*/
    StyleManagementCmp.prototype.ngOnDestroy = function () {
        this._appService.refreshEmitters(this.subscriptions);
    };
    __decorate([
        core_1.ViewChild('tabs'), 
        __metadata('design:type', ng2_bootstrap_1.TabsetComponent)
    ], StyleManagementCmp.prototype, "tabs", void 0);
    StyleManagementCmp = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'kjgri.style.cmp.html',
            encapsulation: core_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [utility_service_1.UtilityService, kjgri_style_service_1.StyleManagementService, app_service_1.AppService, ng2_translate_1.TranslateService, forms_1.FormBuilder, core_1.ChangeDetectorRef, platform_browser_1.DomSanitizer])
    ], StyleManagementCmp);
    return StyleManagementCmp;
}());
exports.StyleManagementCmp = StyleManagementCmp;
//# sourceMappingURL=kjgri.style.cmp.js.map