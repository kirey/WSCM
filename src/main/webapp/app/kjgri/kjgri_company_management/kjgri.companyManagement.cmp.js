"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var companyManagement_cmp_1 = require("./../../kjcore/company_management/companyManagement.cmp");
var companyManagement_service_1 = require("./../../kjcore/company_management/companyManagement.service");
var kjgri_companyManagement_service_1 = require('./kjgri.companyManagement.service');
var utility_service_1 = require('../../kjcore/shared/services/utility.service');
var app_service_1 = require('../../kjcore/shared/services/app.service');
var validation_service_1 = require("../../kjcore/shared/services/validation.service");
var models_1 = require('../../kjcore/shared/models');
var models_2 = require("./models");
var models_3 = require("./../../kjcore/company_management/models");
var models_4 = require("./../kjgri_shared/models");
/**
 * Component for Company Management component
 * @author Mario Petrovic
 */
var KJGriCompanyManagementCmp = (function (_super) {
    __extends(KJGriCompanyManagementCmp, _super);
    /*--------- Constructor ---------*/
    function KJGriCompanyManagementCmp(_kjgriCompanyManagementService, _companyManagementService, _utilityService, _appService, _translateService, _formBuilder) {
        _super.call(this);
        this._kjgriCompanyManagementService = _kjgriCompanyManagementService;
        this._companyManagementService = _companyManagementService;
        this._utilityService = _utilityService;
        this._appService = _appService;
        this._translateService = _translateService;
        this._formBuilder = _formBuilder;
        this.minimumZoomLevel = 10;
    }
    /*--------- App Logic ---------*/
    /*--------- REST calls ---------*/
    /**
     * Load all companies
     * @author Mario Petrovic
     */
    KJGriCompanyManagementCmp.prototype.loadAllCompanies = function (queryParams) {
        var _this = this;
        this._utilityService.setAlert(this.componentAlert);
        this.subscriptions['loadAllCompanies'] = this._kjgriCompanyManagementService.getAllCompaniesRest(queryParams).subscribe(function (res) {
            _this.companiesResults = res.data;
            for (var _i = 0, _a = _this.companiesResults.results; _i < _a.length; _i++) {
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
    KJGriCompanyManagementCmp.prototype.updateCompany = function (data, modal, filterForm, companyDataTable) {
        var _this = this;
        var dataCopy = this._utilityService.copy(data);
        if (dataCopy.passwordTimeoutForm) {
            dataCopy.passwordTimeout = this._utilityService.convertMillisecondsDays(dataCopy.passwordTimeoutForm);
        }
        dataCopy.packageExpiryDate = new Date(dataCopy.packageExpiryDate).getTime();
        this.subscriptions['updateCompany'] = this._kjgriCompanyManagementService.updateCompanyRest(dataCopy).subscribe(function (res) {
            setTimeout(function () {
                _this._utilityService.setAlert(_this.componentAlert, res.message, res.statusCode);
            }, 500);
            _this.hideModal(modal);
            _this.filterCompanies(filterForm, companyDataTable);
        }, function (err) {
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode, err.errors);
            _this.formErrors = err;
        });
    };
    /**
     * Update default company
     * @author Mario Petrovic
     */
    KJGriCompanyManagementCmp.prototype.updateDefaultCompany = function (data, modal, filterForm, companyDataTable) {
        var _this = this;
        this.subscriptions['updateDefaultCompany'] = this._kjgriCompanyManagementService.updateDefaultCompanyRest(data).subscribe(function (res) {
            setTimeout(function () {
                _this._utilityService.setAlert(_this.componentAlert, res.message, res.statusCode);
            }, 500);
            _this.hideModal(modal);
            _this.filterCompanies(filterForm, companyDataTable);
        }, function (err) {
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode);
        });
    };
    /**
     * Load default company profile
     * @author Mario Petrovic
     */
    KJGriCompanyManagementCmp.prototype.loadDefaultCompany = function (modal) {
        var _this = this;
        this._utilityService.setAlert(this.componentAlert);
        this.subscriptions['loadDefaultComapny'] = this._kjgriCompanyManagementService.getDefaultCompanyRest().subscribe(function (res) {
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
    KJGriCompanyManagementCmp.prototype.loadCompanyById = function (id, modal) {
        var _this = this;
        this._utilityService.setAlert(this.componentAlert);
        this.subscriptions['loadCompanyById'] = this._kjgriCompanyManagementService.getCompanyProfileByIdRest(id).subscribe(function (res) {
            _this.selectedCompanyFileInput = new models_3.FileInput();
            setTimeout(function () {
                _this.setEditCompanyModal(res.data);
                _this.selectedCompanyFileInput.value = 'rest/users/noAuth/logoImage/' + res.data.company.id;
                !_this.locationsMap || _this.locationsMap.setTarget(null);
                _this.mapRendered = false;
                _this.tabsActivity = {
                    profile: true,
                    editStyle: false,
                    defaultStyle: false,
                    previousStyle: false,
                    currentStyle: true,
                    locations: false
                };
                _this.loadPackages(_this.editForm.controls['companyType'].value, 'editForm', function () {
                    modal.show();
                });
            });
        }, function (err) {
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode);
        });
    };
    /**
     * Update status of the company
     * @author Mario Petrovic
     */
    KJGriCompanyManagementCmp.prototype.updateCompanyStatus = function (data, filterForm, companyDataTable) {
        var _this = this;
        this.subscriptions['updateCompanyStatus'] = this._kjgriCompanyManagementService.updateCompanyStatusRest(data.id, !data.flActive).subscribe(function (res) {
            setTimeout(function () {
                _this._utilityService.setAlert(_this.componentAlert, res.message, res.statusCode);
            }, 500);
            _this.filterCompanies(filterForm, companyDataTable);
        }, function (err) {
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode, err.errors);
            _this.formErrors = err;
        });
    };
    /**
     * Add new company
     * @author Mario Petrovic
     */
    KJGriCompanyManagementCmp.prototype.addNewCompany = function (data, modal, filterForm, companyDataTable) {
        var _this = this;
        if (data.passwordTimeoutForm) {
            data.passwordTimeout = this._utilityService.convertMillisecondsDays(data.passwordTimeoutForm);
        }
        var newCompany = new FormData();
        newCompany.append('companyDto', new Blob([JSON.stringify(data)], {
            type: "application/json"
        }));
        newCompany.append('logo', this.addCompanyFileInput.file);
        this.subscriptions['addNewCompany'] = this._kjgriCompanyManagementService.saveCompanyRest(newCompany).subscribe(function (res) {
            setTimeout(function () {
                _this._utilityService.setAlert(_this.componentAlert, res.message, res.statusCode);
            }, 500);
            _this.hideModal(modal);
            _this.filterCompanies(filterForm, companyDataTable);
        }, function (err) {
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode, err.errors);
            _this.formErrors = err;
        });
    };
    /**
     * Edit default style
     * @author Mario Petrovic
     */
    KJGriCompanyManagementCmp.prototype.editDefaultStyle = function (data, modal) {
        var _this = this;
        var defaultCompanyCss = [];
        for (var _i = 0, _a = Object.keys(data); _i < _a.length; _i++) {
            var rule = _a[_i];
            var ruleTemp = new models_3.CompanyCss();
            ruleTemp.key = data[rule].key;
            ruleTemp.name = data[rule].name;
            ruleTemp.value = data[rule].property + ':' + data[rule].value + ';';
            defaultCompanyCss.push(ruleTemp);
        }
        this.subscriptions['editDefaultStyle'] = this._kjgriCompanyManagementService.updateDefaultCssRest(defaultCompanyCss).subscribe(function (res) {
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
    KJGriCompanyManagementCmp.prototype.editCompanyStyle = function (id, data, modal, filterForm, companyDataTable) {
        var _this = this;
        var companyCss = [];
        for (var _i = 0, _a = Object.keys(data); _i < _a.length; _i++) {
            var rule = _a[_i];
            var ruleTemp = new models_3.CompanyCss();
            ruleTemp.key = data[rule].key;
            ruleTemp.name = data[rule].name;
            ruleTemp.value = data[rule].property + ':' + data[rule].value + ';';
            companyCss.push(ruleTemp);
        }
        this.subscriptions['editCompanyStyle'] = this._kjgriCompanyManagementService.updateCompanyCssRest(id, companyCss).subscribe(function (res) {
            _this.hideModal(modal);
            setTimeout(function () {
                _this._utilityService.setAlert(_this.componentAlert, res.message, res.statusCode);
            }, 500);
            _this._appService.setCompanyCSSInit();
            _this.filterCompanies(filterForm, companyDataTable);
        }, function (err) {
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode, err.errors);
        });
    };
    /**
     * Reset default css to initial
     * @author Mario Petrovic
     */
    KJGriCompanyManagementCmp.prototype.resetDefaultCssToInit = function (modal, filterForm, companyDataTable) {
        var _this = this;
        this.subscriptions['resetDefaultCssToInit'] = this._kjgriCompanyManagementService.resetDefaultCssToInitRest().subscribe(function (res) {
            _this.hideModal(modal);
            setTimeout(function () {
                _this._utilityService.setAlert(_this.componentAlert, res.message, res.statusCode);
            }, 500);
            _this._appService.setCompanyCSSInit();
            _this.filterCompanies(filterForm, companyDataTable);
        }, function (err) {
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode, err.errors);
            _this.formErrors = err;
        });
    };
    /**
     * Reset selected company style to default css
     * @author Mario Petrovic
     */
    KJGriCompanyManagementCmp.prototype.resetCompanyStyleToDefault = function (id, modal, filterForm, companyDataTable) {
        var _this = this;
        this.subscriptions['resetCompanyStyleToDefault'] = this._kjgriCompanyManagementService.resetCompanyStyleToDefault(id).subscribe(function (res) {
            _this.hideModal(modal);
            setTimeout(function () {
                _this._utilityService.setAlert(_this.componentAlert, res.message, res.statusCode);
            }, 500);
            _this._appService.setCompanyCSSInit();
            _this.filterCompanies(filterForm, companyDataTable);
        }, function (err) {
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode, err.errors);
            _this.formErrors = err;
        });
    };
    /**
     * Reset selected company style to previous css
     * @author Mario Petrovic
     */
    KJGriCompanyManagementCmp.prototype.resetCompanyStyleToPrevious = function (id, modal, filterForm, companyDataTable) {
        var _this = this;
        this.subscriptions['resetCompanyStyleToPrevious'] = this._kjgriCompanyManagementService.resetCompanyStyleToPreviousRest(id).subscribe(function (res) {
            _this.hideModal(modal);
            setTimeout(function () {
                _this._utilityService.setAlert(_this.componentAlert, res.message, res.statusCode);
            }, 500);
            _this._appService.setCompanyCSSInit();
            _this.filterCompanies(filterForm, companyDataTable);
        }, function (err) {
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode, err.errors);
            _this.formErrors = err;
        });
    };
    /**
     * Upload company logo
     * @author Mario Petrovic
     */
    KJGriCompanyManagementCmp.prototype.uploadCompanyLogo = function (companyLogo, companyId, modal, filterForm, companyDataTable) {
        var _this = this;
        var formData = new FormData();
        formData.append('companyId', new Blob([JSON.stringify(companyId)], {
            type: "text/plain"
        }));
        formData.append('companyLogo', companyLogo);
        this.subscriptions['resetCompanyStyleToPrevious'] = this._kjgriCompanyManagementService.uploadCompanyLogoRest(formData).subscribe(function (res) {
            _this.hideModal(modal);
            setTimeout(function () {
                _this._utilityService.setAlert(_this.componentAlert, res.message, res.statusCode);
            }, 500);
            _this.filterCompanies(filterForm, companyDataTable);
        }, function (err) {
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode, err.errors);
            _this.formErrors = err;
        });
    };
    /**
     * Load packages based on selected company type
     * @author Mario Petrovic
     */
    KJGriCompanyManagementCmp.prototype.loadPackages = function (companyType, form, callback) {
        var _this = this;
        this._utilityService.setAlert(this.componentAlert);
        this.subscriptions['selectCompanyType'] = this._kjgriCompanyManagementService.getPackages(companyType).subscribe(function (res) {
            if (form == 'addForm') {
                _this[form].controls['packageCode'].setValue(null);
            }
            _this.packages = res.data;
            if (callback) {
                callback.call(null);
            }
        }, function (err) {
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode);
        });
    };
    /**
     * Loads locations based on selected company
     * @author Mario Petrovic
     */
    KJGriCompanyManagementCmp.prototype.loadCompanyLocationById = function (companyId) {
        var _this = this;
        this._utilityService.setAlert(this.componentAlert);
        this.subscriptions['loadCompanyLocationById'] = this._kjgriCompanyManagementService.getCompanyLocationsById(companyId).subscribe(function (res) {
            _this.selectedCompanyLocations = res.data;
            _this.selectedLocation = null;
            _this.locationEditMode = false;
            !_this.locationsMap || _this.locationsMap.setTarget(null);
            _this.locationsMap = null;
            _this.navigationAnimationStatus = false;
            _this.locationOpened = false;
            _this.selectedIndex = null;
            _this.initialMapGeneration();
        }, function (err) {
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode);
        });
    };
    /**
     * Updates company location
     * @author Mario Petrovic
     */
    KJGriCompanyManagementCmp.prototype.updateLocation = function (companyLocation, companyId) {
        var _this = this;
        companyLocation.latitude = parseFloat(companyLocation.latitude.toString());
        companyLocation.longitude = parseFloat(companyLocation.longitude.toString());
        this.subscriptions['updateLocation'] = this._kjgriCompanyManagementService.updateCompanyLocation(companyLocation, companyId).subscribe(function (res) {
            setTimeout(function () {
                _this._utilityService.setAlert(_this.componentAlert, res.message, res.statusCode);
            }, 500);
            _this.locationEditMode = false;
            _this.loadCompanyLocationById(_this.selectedCompanyProfile.company.id);
        }, function (err) {
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode, err.errors);
        });
    };
    /**
     * Adds new location
     * @author Mario Petrovic
     */
    KJGriCompanyManagementCmp.prototype.addNewLocation = function (newLocation) {
        var _this = this;
        newLocation.latitude = parseFloat(newLocation.latitude.toString());
        newLocation.longitude = parseFloat(newLocation.longitude.toString());
        newLocation.zipCode = newLocation.zipCode.toString();
        this.subscriptions['addNewLocation'] = this._kjgriCompanyManagementService.saveCompanyLocation(newLocation, this.selectedCompanyProfile.company.id).subscribe(function (res) {
            setTimeout(function () {
                _this._utilityService.setAlert(_this.componentAlert, res.message, res.statusCode);
            }, 500);
            _this.locationsMap.removeLayer(_this.newLocationVectorLayer);
            _this.addLocationForm = null;
            _this.openLocationTab(true);
        }, function (err) {
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode, err.errors);
        });
    };
    /**
     * Load assicurativo for impresa and vice versa.
     * @author Nikola Gavric
     */
    KJGriCompanyManagementCmp.prototype.loadJoinedCompanies = function (companyId) {
        var _this = this;
        this.subscriptions['loadJoinedCompanies'] = this._kjgriCompanyManagementService.getJoinedCompanies(companyId).subscribe(function (res) {
            _this.joinedCompanies = res.data;
        }, function (err) {
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode, err.errors);
        });
    };
    /**
     * Load client locations by search criterias
     * @author Mario Petrovic
     */
    // loadGeolocations(coordinates: { center: [number, number], corner: number[] }): void {
    //     var searchData = {
    //         longitude1: coordinates.center[0],
    //         latitude1: coordinates.center[1],
    //         longitude2: coordinates.corner[0],
    //         latitude2: coordinates.corner[1],
    //     }
    //     this._utilityService.setAlert(this.componentAlert);
    //     this.subscriptions['loadGeolocations'] = this._kjgriCompanyManagementService.getGeolocations(searchData).subscribe(
    //         (res: RestResponse<any>) => {
    //             this.locationsMap.removeLayer(this.geolocationPolygons);
    //             let features = [];
    //             for(let obj in res.data) {
    //                 for(let feature of res.data[obj].features) {
    //                     features.push(feature);
    //                 }
    //             }
    //             var geoJsonTemp = {
    //                 type: 'FeatureCollection',
    //                 features: features
    //             };
    //             var styleFunction: ol.StyleFunction = (feature: (ol.Feature | ol.render.Feature), resolution: number): ol.style.Style => {
    //                 var properties = feature.getProperties();
    //                 return new ol.style.Style({
    //                     stroke: new ol.style.Stroke({
    //                         color: properties['stroke'] ? properties['stroke'] : 'rgba(155,155,155, 0.7)',
    //                         width: properties['stroke-width'] ? properties['stroke-width'] : 1
    //                     }),
    //                     fill: new ol.style.Fill({
    //                         color: properties['fill'] ? properties['fill'] : 'rgba(255,255,255, 0.24)'
    //                     })
    //                 });;
    //             };
    //             var format = new ol.format.GeoJSON({
    //                 defaultDataProjection: undefined,
    //                 featureProjection: "EPSG:3857"
    //             });
    //             var source = new ol.source.Vector({
    //                 features: format.readFeatures(geoJsonTemp)
    //             });
    //             this.geolocationPolygons = new ol.layer.Vector({
    //                 source: source,
    //                 style: styleFunction
    //             });
    //             this.locationsMap.addLayer(this.geolocationPolygons);
    //         },
    //         (err: RestResponse<null>) => {
    //             this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode);
    //         }
    //     )
    // }
    /*--------- App logic ---------*/
    /**
     * Set edit company modal form
     * @author Mario Petrovic
     */
    KJGriCompanyManagementCmp.prototype.setEditCompanyModal = function (company) {
        this.selectedCompanyProfile = company;
        this.selectedCompanyProfile.company.passwordTimeout = this._utilityService.convertMillisecondsDays(this.selectedCompanyProfile.company.passwordTimeout, true);
        this.setCssModel('defaultCss', this.selectedCompanyProfile.defaultCss);
        this.setCssModel('previousCss', this.selectedCompanyProfile.previousCss);
        this.setCssModel('activeCss', this.selectedCompanyProfile.activeCss);
        var minDate = company.company.packageExpiryDate < new Date().getTime() ? new Date(new Date().getTime() + 86400000) : new Date(company.company.packageExpiryDate);
        this.editForm = this._formBuilder.group({
            id: new forms_1.FormControl(company.company.id),
            code: new forms_1.FormControl(company.company.code, [forms_1.Validators.required, forms_1.Validators.maxLength(50)]),
            name: new forms_1.FormControl(company.company.name, [forms_1.Validators.required, forms_1.Validators.maxLength(255)]),
            description: new forms_1.FormControl(company.company.description, [forms_1.Validators.required, forms_1.Validators.maxLength(255)]),
            flActive: new forms_1.FormControl(company.company.flActive),
            passwordTimeout: new forms_1.FormControl(company.company.passwordTimeout, []),
            passwordTimeoutForm: new forms_1.FormControl(company.company.passwordTimeout, [forms_1.Validators.required, forms_1.Validators.maxLength(5)]),
            packageCode: new forms_1.FormControl(company.company.packageCode, [forms_1.Validators.required]),
            companyType: new forms_1.FormControl({ value: company.company.companyType, disabled: true }, [forms_1.Validators.required]),
            packageExpiryDate: new forms_1.FormControl(new Date(company.company.packageExpiryDate)),
            _packageExpiryDateOriginal: new forms_1.FormControl(new Date(company.company.packageExpiryDate)),
            _packageExpiryDateMin: new forms_1.FormControl(minDate)
        });
    };
    /**
     * Set add company modal form
     * @author Mario Petrovic
     */
    KJGriCompanyManagementCmp.prototype.setAddCompanyModal = function () {
        this.addCompanyFileInput = new models_3.FileInput();
        this.addCompanyFileInput.value = 'app/kjcore/assets/images/noPhoto.png';
        this.packages = [];
        this.addForm = this._formBuilder.group({
            id: new forms_1.FormControl(),
            code: new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.maxLength(50)]),
            name: new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.maxLength(255)]),
            description: new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.maxLength(255)]),
            flActive: new forms_1.FormControl(false),
            passwordTimeout: new forms_1.FormControl(null),
            passwordTimeoutForm: new forms_1.FormControl(null, [forms_1.Validators.required, forms_1.Validators.maxLength(5)]),
            packageCode: new forms_1.FormControl(null, [forms_1.Validators.required]),
            companyType: new forms_1.FormControl(null, [forms_1.Validators.required]),
            email: new forms_1.FormControl(null, [validation_service_1.ValidationService.emailValidator(), forms_1.Validators.required]),
            packageExpiryDate: new forms_1.FormControl(new Date()),
            _packageExpiryDateOriginal: new forms_1.FormControl(new Date()),
            _packageExpiryDateMin: new forms_1.FormControl(new Date())
        });
    };
    /**
     * Initial map generation when location tab is opened
     * @author Mario Petrovic
     */
    KJGriCompanyManagementCmp.prototype.initialMapGeneration = function () {
        var _this = this;
        setTimeout(function () {
            var iconFeatures = [];
            var iterator = 0;
            for (var _i = 0, _a = _this.selectedCompanyLocations; _i < _a.length; _i++) {
                var location_1 = _a[_i];
                // if (location.flEnabled) {
                var iconFeature = new ol.Feature({
                    geometry: new ol.geom.Point(ol.proj.fromLonLat([location_1.longitude, location_1.latitude]))
                });
                iconFeatures.push(iconFeature);
                _this.locationForms[iterator] = _this._formBuilder.group({
                    id: new forms_1.FormControl(null),
                    name: new forms_1.FormControl(null, [forms_1.Validators.required]),
                    city: new forms_1.FormControl(null, [forms_1.Validators.required]),
                    address: new forms_1.FormControl(null, [forms_1.Validators.required]),
                    zipCode: new forms_1.FormControl(null, [forms_1.Validators.required, forms_1.Validators.minLength(5), forms_1.Validators.maxLength(5)]),
                    flEnabled: new forms_1.FormControl(null),
                    flHeadquarter: new forms_1.FormControl(null),
                    longitude: new forms_1.FormControl(null, [forms_1.Validators.required]),
                    latitude: new forms_1.FormControl(null, [forms_1.Validators.required])
                });
                iterator++;
            }
            var vectorSource = new ol.source.Vector({
                features: iconFeatures //add an array of features
            });
            var iconStyle = new ol.style.Style({
                image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
                    anchor: [0.5, 1],
                    anchorXUnits: 'fraction',
                    anchorYUnits: 'fraction',
                    opacity: 0.75,
                    src: 'app/kjgri/assets/images/marker_pointer-small.png'
                }))
            });
            _this.pinVectorLayer = new ol.layer.Vector({
                source: vectorSource,
                style: iconStyle
            });
            var viewObject = {
                center: ol.proj.fromLonLat([21.907078, 43.317980]),
                zoom: 4,
                maxZoom: 20
            };
            if (_this.selectedCompanyLocations && _this.selectedCompanyLocations.length == 1) {
                viewObject = {
                    center: ol.proj.fromLonLat([_this.selectedCompanyLocations[0].longitude, _this.selectedCompanyLocations[0].latitude]),
                    zoom: 4,
                    maxZoom: 20
                };
            }
            _this.locationsMap = new ol.Map({
                layers: [
                    new ol.layer.Tile({
                        source: new ol.source.OSM()
                    }),
                    _this.pinVectorLayer
                ],
                target: 'map',
                controls: ol.control.defaults({
                    attributionOptions: /** @type {olx.control.AttributionOptions} */ ({
                        collapsible: false
                    })
                }),
                view: new ol.View(viewObject)
            });
            //this.locationsMap.getView().setMaxZoom(20);
            if (iconFeatures.length > 1) {
                _this.locationsMap.getView().fit(_this.pinVectorLayer.getSource().getExtent());
            }
        });
    };
    /**
     * Open location tab
     * @author Mario Petrovic
     */
    KJGriCompanyManagementCmp.prototype.openLocationTab = function (refresh) {
        if (!this.mapRendered || refresh) {
            this.locationEditMode = false;
            this.mapRendered = true;
            this.loadCompanyLocationById(this.selectedCompanyProfile.company.id);
        }
    };
    /**
     * Creates Vector layer with point for map
     * @author Mario Petrovic
     */
    KJGriCompanyManagementCmp.prototype.createMapPoint = function (coordinates, addIcon) {
        var iconFeature = new ol.Feature({
            geometry: new ol.geom.Point(ol.proj.fromLonLat([coordinates[0], coordinates[1]]))
        });
        var vectorSource = new ol.source.Vector({
            features: [iconFeature] //add an array of features
        });
        var iconStyle = new ol.style.Style({
            image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
                anchor: [0.5, 1],
                anchorXUnits: 'fraction',
                anchorYUnits: 'fraction',
                opacity: 0.85,
                src: 'app/kjgri/assets/images/marker_pointer-small' + (addIcon ? '-add' : '') + '.png'
            }))
        });
        return new ol.layer.Vector({
            source: vectorSource,
            style: iconStyle
        });
    };
    /**
     * Opens accordion panel for selected location
     * @author Mario Petrovic
     */
    KJGriCompanyManagementCmp.prototype.openLocation = function (selectedLocation, index, isOpen) {
        var _this = this;
        if (!this.navigationAnimationStatus) {
            if (isOpen && !this.locationOpened || this.selectedLocation.id != selectedLocation.id) {
                this.navigationAnimationStatus = true;
                this.selectedLocation = selectedLocation;
                this.locationOpened = true;
                this.selectedIndex = index;
                this.locationsMap.removeLayer(this.singlePinVectorLayer);
                this.singlePinVectorLayer = this.createMapPoint([this.selectedLocation.longitude, this.selectedLocation.latitude]);
                this.navigateToLocation([this.selectedLocation.longitude, this.selectedLocation.latitude], function () {
                    _this.locationsMap.removeLayer(_this.pinVectorLayer);
                    _this.locationsMap.addLayer(_this.singlePinVectorLayer);
                    _this.navigationAnimationStatus = false;
                });
            }
            else if (!isOpen) {
                this.locationOpened = false;
                this.selectedLocation = null;
                this.locationsMap.removeLayer(this.singlePinNewVectorLayer);
                this.locationsMap.removeLayer(this.singlePinVectorLayer);
                this.locationsMap.addLayer(this.pinVectorLayer);
                if (this.selectedCompanyLocations.length > 1) {
                    this.locationsMap.getView().fit(this.pinVectorLayer.getSource().getExtent());
                }
            }
        }
    };
    /**
     * Activates location edit mode
     * @author Mario Petrovic
     */
    KJGriCompanyManagementCmp.prototype.locationActivateEdit = function (selectedLocation, form) {
        this.locationEditMode = true;
        form.controls['id'].setValue(selectedLocation.id);
        form.controls['name'].setValue(selectedLocation.name);
        form.controls['city'].setValue(selectedLocation.city);
        form.controls['address'].setValue(selectedLocation.address);
        form.controls['zipCode'].setValue(selectedLocation.zipCode);
        form.controls['flEnabled'].setValue(selectedLocation.flEnabled);
        form.controls['flHeadquarter'].setValue(selectedLocation.flHeadquarter);
        form.controls['longitude'].setValue(selectedLocation.longitude);
        form.controls['latitude'].setValue(selectedLocation.latitude);
    };
    /**
     * Deactivates location edit mode
     * @author Mario Petrovic
     */
    KJGriCompanyManagementCmp.prototype.locationDeactivateEdit = function () {
        var _this = this;
        this.locationEditMode = false;
        this.locationsMap.removeLayer(this.singlePinVectorLayer);
        this.locationsMap.removeLayer(this.singlePinNewVectorLayer);
        this.locationsMap.addLayer(this.singlePinVectorLayer);
        this.navigationAnimationStatus = true;
        this.navigateToLocation([this.selectedLocation.longitude, this.selectedLocation.latitude], function () {
            _this.navigationAnimationStatus = false;
        });
    };
    /**
     * Turns on edit mode for map change location
     * @author Mario Petrovic
     */
    KJGriCompanyManagementCmp.prototype.changeLocation = function () {
        var _this = this;
        this.editLocationMapMode = true;
        this.inspectMapGeolocations = function (event) {
            _this.locationsMap.removeLayer(_this.singlePinVectorLayer);
            _this.locationsMap.removeLayer(_this.singlePinNewVectorLayer);
            _this.clickedCoordinates = ol.proj.toLonLat(event.coordinate);
            _this.singlePinNewVectorLayer = _this.createMapPoint(_this.clickedCoordinates, true);
            _this.locationsMap.addLayer(_this.singlePinNewVectorLayer);
        };
        this.locationsMap.on('click', this.inspectMapGeolocations);
    };
    /**
     * Updates form with newly selected locations
     * @author Mario Petrovic
     */
    KJGriCompanyManagementCmp.prototype.saveNewLocation = function () {
        // this.locationsMap.getViewport().removeEventListener('click');
        this.locationsMap.un('click', this.inspectMapGeolocations);
        this.editLocationMapMode = false;
        this.locationsMap.removeLayer(this.singlePinNewVectorLayer);
        this.singlePinNewVectorLayer = this.createMapPoint(this.clickedCoordinates, true);
        this.locationsMap.addLayer(this.singlePinNewVectorLayer);
        this.locationsMap.removeLayer(this.singlePinVectorLayer);
        this.locationForms[this.selectedIndex].controls['longitude'].setValue(this.clickedCoordinates[0].toFixed(6));
        this.locationForms[this.selectedIndex].controls['latitude'].setValue(this.clickedCoordinates[1].toFixed(6));
        this.clickedCoordinates = null;
    };
    /**
     * Turns off edit mode for map change location
     * @author Mario Petrovic
     */
    KJGriCompanyManagementCmp.prototype.cancelLocationChange = function () {
        var _this = this;
        this.editLocationMapMode = false;
        this.clickedCoordinates = null;
        this.locationsMap.removeLayer(this.singlePinVectorLayer);
        this.locationsMap.removeLayer(this.singlePinNewVectorLayer);
        this.locationsMap.addLayer(this.singlePinVectorLayer);
        // this.locationsMap.getViewport().removeEventListener('click');
        this.locationsMap.un('click', this.inspectMapGeolocations);
        this.navigationAnimationStatus = true;
        this.navigateToLocation([this.selectedLocation.longitude, this.selectedLocation.latitude], function () {
            _this.navigationAnimationStatus = false;
        });
    };
    /**
     * Navigates to specific location with zoom and animation
     * @author Mario Petrovic
     */
    KJGriCompanyManagementCmp.prototype.navigateToLocation = function (coordinates, callback, duration, zoom) {
        var _this = this;
        this.locationsMap.getView().animate({
            center: ol.proj.fromLonLat([coordinates[0], coordinates[1]]),
            duration: duration != null && duration != undefined ? duration : 800,
            zoom: zoom ? zoom : 9
        }, function () {
            !callback || callback.call(_this);
        });
    };
    /**
     * Event method fired when modal is hidden
     * @author Mario Petrovic
     */
    KJGriCompanyManagementCmp.prototype.onCompanyModalHide = function () {
        this.tabsActivity = {
            profile: true,
            editStyle: false,
            defaultStyle: false,
            previousStyle: false,
            currentStyle: true,
            locations: false
        };
        this.mapRendered = false;
        !this.locationsMap || this.locationsMap.un('moveend', this.moveEndEvent);
        !this.locationsMap || this.locationsMap.un('click', this.inspectMapGeolocations);
        !this.locationsMap || this.locationsMap.setTarget(null);
        this.locationsMap = null;
        this.locationEditMode = false;
        this.selectedCompanyLocations = [];
        this.pinVectorLayer = null;
        this.singlePinVectorLayer = null;
        this.singlePinNewVectorLayer = null;
        this.newLocationVectorLayer = null;
        this.navigationAnimationStatus = false;
        this.selectedLocation = null;
        this.locationOpened = false;
        this.selectedIndex = null;
        this.editLocationMapMode = false;
        this.clickedCoordinates = null;
        this.addLocationForm = null;
    };
    /**
     * Opens form for adding new location
     * @author Mario Petrovic
     */
    KJGriCompanyManagementCmp.prototype.openAddLocationForm = function () {
        var _this = this;
        this.addLocationForm = this._formBuilder.group({
            name: new forms_1.FormControl(null, [forms_1.Validators.required]),
            city: new forms_1.FormControl(null, [forms_1.Validators.required]),
            address: new forms_1.FormControl(null, [forms_1.Validators.required]),
            zipCode: new forms_1.FormControl(null, [forms_1.Validators.required, forms_1.Validators.minLength(5), forms_1.Validators.maxLength(5)]),
            flEnabled: new forms_1.FormControl(false),
            flHeadquarter: new forms_1.FormControl(false),
            longitude: new forms_1.FormControl(null, [forms_1.Validators.required]),
            latitude: new forms_1.FormControl(null, [forms_1.Validators.required])
        });
        this.locationsMap.removeLayer(this.pinVectorLayer);
        this.locationsMap.getView().setZoom(9);
        this.locationsMap.getView().setCenter(ol.proj.fromLonLat([12.495210, 41.895197]));
        this.inspectMapGeolocations = function (event) {
            var clickedCoordinates = ol.proj.toLonLat(event.coordinate);
            _this.addLocationForm.controls['longitude'].setValue(clickedCoordinates[0].toFixed(6));
            _this.addLocationForm.controls['latitude'].setValue(clickedCoordinates[1].toFixed(6));
            _this.locationsMap.removeLayer(_this.newLocationVectorLayer);
            _this.newLocationVectorLayer = _this.createMapPoint(clickedCoordinates, true);
            _this.locationsMap.addLayer(_this.newLocationVectorLayer);
        };
        this.locationsMap.on('click', this.inspectMapGeolocations);
    };
    /**
     * Cancels form for adding new location
     * @author Mario Petrovic
     */
    KJGriCompanyManagementCmp.prototype.cancelAddLocation = function () {
        this.addLocationForm = null;
        this.locationsMap.un('click', this.inspectMapGeolocations);
        this.openLocationTab(true);
    };
    /**
     * Select tab method
     * @author Mario Petrovic
     */
    KJGriCompanyManagementCmp.prototype.selectTab = function (tabName, sub) {
        if (!this.tabsActivity[tabName]) {
            if (sub) {
                this.tabsActivity.defaultStyle = false;
                this.tabsActivity.previousStyle = false;
                this.tabsActivity.currentStyle = false;
            }
            else {
                this.tabsActivity.profile = false;
                this.tabsActivity.editStyle = false;
                this.tabsActivity.locations = false;
            }
            this.tabsActivity[tabName] = true;
            if (tabName == 'locations' && !this.mapRendered) {
                this.openLocationTab();
            }
            else {
                this.mapRendered = false;
                !this.locationsMap || this.locationsMap.un('moveend', this.moveEndEvent);
                !this.locationsMap || this.locationsMap.un('click', this.inspectMapGeolocations);
                !this.locationsMap || this.locationsMap.setTarget(null);
                this.locationsMap = null;
                this.locationEditMode = false;
                this.selectedCompanyLocations = [];
                this.pinVectorLayer = null;
                this.singlePinVectorLayer = null;
                this.singlePinNewVectorLayer = null;
                this.newLocationVectorLayer = null;
                this.navigationAnimationStatus = false;
                this.selectedLocation = null;
                this.locationOpened = false;
                this.selectedIndex = null;
                this.editLocationMapMode = false;
                this.clickedCoordinates = null;
                this.addLocationForm = null;
            }
        }
    };
    /**
     * Event method that fires when filter/page parameters change
     * @author Mario Petrovic
     */
    KJGriCompanyManagementCmp.prototype.onLazyLoad = function (event, filterForm) {
        var queryParams = new models_2.QueryParams(event.rows, (event.first / event.rows + 1));
        queryParams.sortType = event.sortOrder == 1 ? 'asc' : 'desc';
        queryParams.companyName = filterForm.value.companyName || '';
        queryParams.companyType = filterForm.value.companyType || '';
        this.loadAllCompanies(queryParams);
    };
    /**
     * Methid for filtering companies with filter form
     * @author Mario Petrovic
     */
    KJGriCompanyManagementCmp.prototype.filterCompanies = function (filterForm, dataTable) {
        var queryParams = new models_2.QueryParams(dataTable.rows, (dataTable.first / dataTable.rows + 1));
        queryParams.sortType = dataTable.sortOrder == 1 ? 'asc' : 'desc';
        queryParams.companyName = filterForm.value.companyName || '';
        queryParams.companyType = filterForm.value.companyType || '';
        this.loadAllCompanies(queryParams);
    };
    /**
     * Renews package for count that user defines by packageCount
     * @author Mario Petrovic
     */
    KJGriCompanyManagementCmp.prototype.renewPackage = function (form, packageCount) {
        var packageExpiryDateControl = form.controls['packageExpiryDate'];
        var renewedData;
        var baseDate = form.value._packageExpiryDateOriginal.getTime() < new Date().getTime() ? new Date().getTime() + 86400000 : form.value._packageExpiryDateOriginal.getTime();
        for (var _i = 0, _a = this.packages; _i < _a.length; _i++) {
            var packageItem = _a[_i];
            if (packageItem.code == form.value.packageCode) {
                renewedData = baseDate + (packageItem.duration * 86400000 * packageCount);
            }
        }
        packageExpiryDateControl.setValue(new Date(renewedData));
    };
    /**
     * Clears renew input and returns date to original expiration value
     * @author Mario Petrovic
     */
    KJGriCompanyManagementCmp.prototype.clearRenew = function (form, countInput) {
        var packageExpiryDateControl = form.controls['packageExpiryDate'];
        packageExpiryDateControl.setValue(form.value._packageExpiryDateOriginal);
        countInput.value = null;
    };
    /**
     * Show modal for joined companies.
     * @author Nikola Gavric
     */
    KJGriCompanyManagementCmp.prototype.showJoinedCompanyModal = function (modal, modalName, data) {
        this._utilityService.setAlert(this.componentAlert);
        this.formErrors = new models_1.RestResponse();
        switch (modalName) {
            case 'previewCompany':
                this.companyToAdd = null;
                this.insuranceCompany = data;
                this.loadCompaniesToAdd();
                this.loadJoinedCompanies(data.id);
                break;
        }
        modal.show();
    };
    /**
     *
     */
    KJGriCompanyManagementCmp.prototype.connectCompany = function (clientId) {
        var _this = this;
        if (this.insuranceCompany.companyType == 'insuranceCompany') {
            this.subscriptions['connectCompany'] = this._kjgriCompanyManagementService.connectCompany(clientId, this.insuranceCompany.id, false).subscribe(function (res) {
                setTimeout(function () {
                    _this._utilityService.setAlert(_this.componentAlert, res.message, res.statusCode);
                }, 500);
                _this.loadJoinedCompanies(_this.insuranceCompany.id);
            }, function (err) {
                _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode, err.errors);
                _this.formErrors = err;
            });
        }
        else {
            this.subscriptions['connectCompany'] = this._kjgriCompanyManagementService.connectCompany(this.insuranceCompany.id, clientId, false).subscribe(function (res) {
                setTimeout(function () {
                    _this._utilityService.setAlert(_this.componentAlert, res.message, res.statusCode);
                }, 500);
                _this.loadJoinedCompanies(_this.insuranceCompany.id);
            }, function (err) {
                _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode, err.errors);
                _this.formErrors = err;
            });
        }
    };
    /**
     *
     */
    KJGriCompanyManagementCmp.prototype.loadCompaniesToAdd = function () {
        var _this = this;
        if (this.insuranceCompany.companyType == 'insuranceCompany') {
            this.subscriptions['loadCompaniesToAdd'] = this._kjgriCompanyManagementService.getClientCompanies().subscribe(function (res) {
                setTimeout(function () {
                    _this._utilityService.setAlert(_this.componentAlert, res.message, res.statusCode);
                }, 500);
                _this.availableCompanies = res.data;
            }, function (err) {
                _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode, err.errors);
                _this.formErrors = err;
            });
        }
        else {
            this.subscriptions['loadCompaniesToAdd'] = this._kjgriCompanyManagementService.getInsuranceCompanies().subscribe(function (res) {
                _this._utilityService.setAlert(_this.componentAlert, res.message, res.statusCode);
                _this.availableCompanies = res.data;
            }, function (err) {
                _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode, err.errors);
                _this.formErrors = err;
            });
        }
    };
    /**
     * Open the detaching modal.
     *
     * @param modalToHide
     * @param modalToShow
     * @param data
     */
    KJGriCompanyManagementCmp.prototype.detachJoinedCompany = function (modalToHide, modalToShow, clientCompanyData, isClient) {
        if (isClient === void 0) { isClient = false; }
        modalToHide.hide();
        if (isClient) {
            this.clientCompany = clientCompanyData;
        }
        else {
            this.clientCompany = this.insuranceCompany;
            this.insuranceCompany = clientCompanyData;
        }
        modalToShow.show();
    };
    /**
     * Detaching the company.
     *
     * @param modal
     */
    KJGriCompanyManagementCmp.prototype.detachCompany = function (modal) {
        var _this = this;
        this.subscriptions['detachCompany'] = this._kjgriCompanyManagementService.detachCompany(this.clientCompany.id, this.insuranceCompany.id).subscribe(function (res) {
            setTimeout(function () {
                _this._utilityService.setAlert(_this.componentAlert, res.message, res.statusCode);
            }, 500);
            _this.loadJoinedCompanies(_this.insuranceCompany.id);
            modal.hide();
        }, function (err) {
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode, err.errors);
            _this.formErrors = err;
        });
    };
    /**
     * Update company's info view priviledge for selected insurance company
     * @author Nikola Gavric
     */
    KJGriCompanyManagementCmp.prototype.updateInfoConsent = function (clientId, flag) {
        var _this = this;
        if (this.insuranceCompany.companyType == 'insuranceCompany') {
            this.subscriptions['updateInfoConsent'] = this._kjgriCompanyManagementService.updateInfoConsent(clientId, this.insuranceCompany.id, !flag).subscribe(function (res) {
                setTimeout(function () {
                    _this._utilityService.setAlert(_this.componentAlert, res.message, res.statusCode);
                }, 500);
                _this.loadJoinedCompanies(_this.insuranceCompany.id);
            }, function (err) {
                _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode, err.errors);
                _this.formErrors = err;
            });
        }
        else {
            this.subscriptions['updateInfoConsent'] = this._kjgriCompanyManagementService.updateInfoConsent(this.insuranceCompany.id, clientId, !flag).subscribe(function (res) {
                setTimeout(function () {
                    _this._utilityService.setAlert(_this.componentAlert, res.message, res.statusCode);
                }, 500);
                _this.loadJoinedCompanies(_this.insuranceCompany.id);
            }, function (err) {
                _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode, err.errors);
                _this.formErrors = err;
            });
        }
    };
    /**
    * Calls Nominatim service and fetches the data
    * @param data string
    */
    KJGriCompanyManagementCmp.prototype.searchAddress = function () {
        var _this = this;
        clearTimeout(this.nominatimTimeout);
        if (this.q) {
            this.nominatimTimeout = setTimeout(function () {
                _this.subscriptions['searchAddress'] = _this._kjgriCompanyManagementService.searchAddress(_this.q).subscribe(function (res) {
                    _this.addresses = res;
                    _this.searchActiveAddress = true;
                }, function (err) {
                    console.log(err);
                });
            }, 1000);
        }
    };
    KJGriCompanyManagementCmp.prototype.selectAddress = function (address) {
        //ol.geom.Point
        //ol.geom.Polygon
        //ol.geom.LineString
        //ol.geom.MultiPolygon
        var feature = null;
        //ol.StyleFunction
        var styleFunction = null;
        var coordinates = [+address.lon, +address.lat];
        this.locationsMap.removeLayer(this.searchVector);
        feature = new ol.Feature({
            geometry: new ol.geom.Point(coordinates)
        });
        if (feature) {
            styleFunction = function (feature, resolution) {
                return new ol.style.Style({
                    image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
                        anchor: [0.5, 1],
                        anchorXUnits: 'fraction',
                        anchorYUnits: 'fraction',
                        opacity: 0.85,
                        src: 'app/kjgri/assets/images/search_map_marker.png'
                    }))
                });
            };
            feature.getGeometry().transform('EPSG:4326', 'EPSG:3857');
            var source = new ol.source.Vector({
                features: [feature]
            });
            this.searchVector = new ol.layer.Vector({
                source: source,
                style: styleFunction
            });
            this.locationsMap.addLayer(this.searchVector);
            this.locationsMap.getView().centerOn(ol.proj.fromLonLat(coordinates), this.locationsMap.getSize(), [0, 0]);
            this.locationsMap.getView().fit(feature.getGeometry());
        }
        this.q = address.display_name;
        this.searchActiveAddress = false;
    };
    /**
     * Clear search
     * @param q input
     */
    KJGriCompanyManagementCmp.prototype.clearSearchAddress = function (toClear) {
        if (toClear === void 0) { toClear = false; }
        if (toClear)
            this.q = null;
        this.locationsMap.removeLayer(this.searchVector);
        this.searchVector = null;
        this.searchActiveAddress = false;
        this.addresses = null;
        //Zoom out and center map
        //this.map.getView().animate({center: ol.proj.fromLonLat([21.907078, 43.317980]), zoom: 4, duration: 1500});
    };
    /*--------- NG On Init ---------*/
    KJGriCompanyManagementCmp.prototype.ngOnInit = function () {
        // Initital method to be executed when page loads
        this._appService.pageLoaded('', this);
        this._appService.languageChangeForComponent(this);
        // Variables initialization
        this.subscriptions = {};
        this.componentAlert = new models_1.Alert(null, true);
        this.dataTableConfig = new models_1.DataTableConfig(10, true, 3, [5, 10, 20, 50, 100], true);
        this.selectedCompanyProfile = new models_2.KJGriCompanyDetails();
        this.companiesResults = new models_4.PaginationTableResult();
        this.cssBundle = {};
        this.defaultCompanyFileInput = new models_3.FileInput();
        this.selectedCompanyFileInput = new models_3.FileInput();
        this.addCompanyFileInput = new models_3.FileInput();
        this.addCompanyFileInput.value = 'app/kjcore/assets/images/noPhoto.png';
        this.tabsActivity = {
            profile: true,
            editStyle: false,
            defaultStyle: false,
            previousStyle: false,
            currentStyle: true,
            locations: false
        };
        this.locationForms = [];
    };
    /*--------- NG On Destroy ---------*/
    KJGriCompanyManagementCmp.prototype.ngOnDestroy = function () {
        this._appService.refreshEmitters(this.subscriptions);
    };
    KJGriCompanyManagementCmp = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'kjgri.companyManagement.cmp.html',
            encapsulation: core_1.ViewEncapsulation.None,
        }), 
        __metadata('design:paramtypes', [kjgri_companyManagement_service_1.KJGriCompanyManagementService, companyManagement_service_1.CompanyManagementService, utility_service_1.UtilityService, app_service_1.AppService, ng2_translate_1.TranslateService, forms_1.FormBuilder])
    ], KJGriCompanyManagementCmp);
    return KJGriCompanyManagementCmp;
}(companyManagement_cmp_1.CompanyManagementCmp));
exports.KJGriCompanyManagementCmp = KJGriCompanyManagementCmp;
//# sourceMappingURL=kjgri.companyManagement.cmp.js.map