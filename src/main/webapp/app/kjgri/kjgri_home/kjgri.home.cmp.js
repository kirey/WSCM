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
var common_1 = require('@angular/common');
var http_1 = require('@angular/http');
var ng2_translate_1 = require('ng2-translate');
var kjgri_constants_1 = require("./../kjgri.constants");
var app_service_1 = require('../../kjcore/shared/services/app.service');
var utility_service_1 = require("./../../kjcore/shared/services/utility.service");
var kjgri_home_service_1 = require("./kjgri.home.service");
var models_1 = require("./../../kjcore/shared/models");
var models_2 = require("./../kjgri_shared/models");
/**
 * Component for Home page
 * @author Mario Petrovic
 */
var KJGriHomeCmp = (function () {
    /*--------- Constructor --------*/
    function KJGriHomeCmp(_appService, _translateService, _http, _utilityService, _kjgriHomeService, _kjgriConstants, _datePipe, _changeDetectionRef) {
        this._appService = _appService;
        this._translateService = _translateService;
        this._http = _http;
        this._utilityService = _utilityService;
        this._kjgriHomeService = _kjgriHomeService;
        this._kjgriConstants = _kjgriConstants;
        this._datePipe = _datePipe;
        this._changeDetectionRef = _changeDetectionRef;
        this.measurementObjectKeys = ['relativeHumidity', 'precipitationProbability', 'rain', 'snow', 'soilMoisture', 'temperature2m', 'temperatureSkin', 'thunderstormIndex', 'windGust', 'windVelocity'];
        this.inspectedGeolocation = {
            istat: '',
            sub: ''
        };
    }
    /*--------- Methods with REST calls --------*/
    /**
     * Loads risky by type for accordion in side bar
     * @author Mario Petrovic
     */
    KJGriHomeCmp.prototype.loadRisksByType = function (type, callback) {
        var _this = this;
        this._utilityService.setAlert(this.componentAlert);
        this.subscriptions['loadRisksByType'] = this._kjgriHomeService.getRisksByType(type).subscribe(function (res) {
            var global;
            if (type == 'R') {
                _this.risks = res.data;
                global = _this.risks.filter(function (item) {
                    return item.code == 'GL';
                })[0];
                _this.selectedSubtype = global.dicRiskSubtypeses[0];
                _this.selectedRFFlag = 'R';
                _this.selectedRFFlagSection = 'R';
                _this.risks.forEach(function (risk, index) {
                    //Cuz of setting global to be first, we need to remove it first
                    if (risk.code == 'GL')
                        _this.risks.splice(index, 1);
                    risk.dicRiskSubtypeses.sort(function (a, b) {
                        return a.name.localeCompare(b.name);
                    });
                });
                //Then push it to the start of the array
                _this.risks.unshift(global);
                !callback || callback();
            }
            else {
                _this.forecasts = res.data;
                var gl = _this.forecasts.filter(function (item) {
                    return item.code == 'GL';
                })[0];
                _this.forecasts.forEach(function (forecast, index) {
                    //Cuz of setting global to be first, we need to remove it first
                    if (forecast.code == 'GL')
                        _this.forecasts.splice(index, 1);
                    forecast.dicRiskSubtypeses.sort(function (a, b) {
                        return a.name.localeCompare(b.name);
                    });
                });
                //Then push it to the start of the array
                _this.forecasts.unshift(gl);
            }
        }, function (err) {
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode);
        });
    };
    /**
     * Load client companies by search name value
     * @author Mario Petrovic
     */
    KJGriHomeCmp.prototype.clientCompaniesSearch = function (companyName) {
        var _this = this;
        this._utilityService.setAlert(this.componentAlert);
        this.subscriptions['clientCompaniesSearch'] = this._kjgriHomeService.getFilteredClientCompanies(companyName).subscribe(function (res) {
            _this.clientCompanies = res.data;
        }, function (err) {
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode);
        });
    };
    /**
     * Load client locations by search criterias
     * @author Mario Petrovic
     */
    KJGriHomeCmp.prototype.loadGeolocations = function (selectedSubtype, rfFlag, coordinates) {
        var _this = this;
        var date = this.selectedDate;
        date.setHours(this.selectedTime);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);
        var searchData = {
            typeId: selectedSubtype,
            rfFlag: rfFlag,
            longitude1: coordinates.center[0],
            latitude1: coordinates.center[1],
            longitude2: coordinates.corner[0],
            latitude2: coordinates.corner[1],
            targetTimestamp: date.getTime()
        };
        !this.subscriptions['loadGeolocations'] || this.subscriptions['loadGeolocations'].unsubscribe();
        this._utilityService.setAlert(this.componentAlert);
        this.subscriptions['loadGeolocations'] = this._kjgriHomeService.getGeolocations(searchData).subscribe(function (res) {
            _this.map.removeLayer(_this.geolocationPolygons);
            var features = [];
            for (var name_1 in res.data) {
                if (name_1 != 'styles') {
                    for (var _i = 0, _a = res.data[name_1].features; _i < _a.length; _i++) {
                        var obj = _a[_i];
                        features.push(obj);
                    }
                }
            }
            _this.riskIndexStyles = res.data['styles'];
            if (_this.riskIndexStyles) {
                _this.riskIndexStyles.sort(function (a, b) {
                    if (a.indexValue > b.indexValue)
                        return 1;
                    if (a.indexValue < b.indexValue)
                        return -1;
                    return 0;
                });
            }
            var geoJsonTemp = {
                type: 'FeatureCollection',
                features: features
            };
            var styleFunction = function (feature, resolution) {
                var properties = feature.getProperties();
                return new ol.style.Style({
                    stroke: new ol.style.Stroke({
                        color: properties['stroke'] ? properties['stroke'] : 'rgba(155,155,155, 0.7)',
                        width: properties['stroke-width'] ? properties['stroke-width'] : 1
                    }),
                    fill: new ol.style.Fill({
                        color: properties['fill'] ? properties['fill'] : 'rgba(255,255,255, 0.24)'
                    })
                });
                ;
            };
            var format = new ol.format.GeoJSON({
                defaultDataProjection: undefined,
                featureProjection: "EPSG:3857"
            });
            var source = new ol.source.Vector({
                features: format.readFeatures(geoJsonTemp)
            });
            _this.geolocationPolygons = new ol.layer.Vector({
                source: source,
                style: styleFunction
            });
            _this.map.addLayer(_this.geolocationPolygons);
            if (_this.mapClicked) {
                _this.map.removeLayer(_this.mapSelectedLocationPoint);
                if (!_this.selectedLocation)
                    !_this.mapSelectedLocationPoint || _this.map.addLayer(_this.mapSelectedLocationPoint);
                if (_this.selectedSubtype.code != "LS" && _this.selectedSubtype.code != "F" && _this.inspectedGeolocation.istat && _this.inspectedGeolocation.sub) {
                    !_this.inspectedCoordinates || _this.loadRiskHistroyForLocation(_this.inspectedGeolocation.istat, _this.inspectedGeolocation.sub, selectedSubtype, rfFlag);
                }
            }
            if (_this.selectedCompany) {
                _this.generateLocationPins();
            }
            //Fix for when you zoom 2 levels above designated
            //And then you zoom down below minimum quicker then the previous call executes
            //This checks if the end zoom whenever the call executes
            //Is below the minimum and removes geolocation layer
            var currentMapZoom = _this.map.getView().getZoom();
            if (_this.selectedSubtype.code == "F") {
                if (currentMapZoom < _this._appService.getFrontendGeneric('floodingZoomLevel', 14)) {
                    _this.map.removeLayer(_this.geolocationPolygons);
                    _this.riskIndexStyles = null;
                }
            }
            else if (_this.selectedSubtype.code == "LS") {
                if (currentMapZoom < _this._appService.getFrontendGeneric('landslideZoomLevel', 12)) {
                    _this.map.removeLayer(_this.geolocationPolygons);
                    _this.riskIndexStyles = null;
                }
            }
            else {
                if (currentMapZoom < _this._appService.getFrontendGeneric('mapZoomLevel', 11)) {
                    _this.map.removeLayer(_this.geolocationPolygons);
                    _this.riskIndexStyles = null;
                }
            }
        }, function (err) {
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode);
        });
    };
    /**
     * Load client locations by search criterias
     * @author Mario Petrovic
     */
    KJGriHomeCmp.prototype.loadLocationsByCompany = function (selectedCompany, selectedSubtype, rfFlag, refresh) {
        var _this = this;
        if (refresh === void 0) { refresh = false; }
        var date = this.selectedDate;
        date.setHours(this.selectedTime);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);
        var searchData = {
            clientCompanyId: selectedCompany.id,
            typeId: selectedSubtype,
            rfFlag: rfFlag,
            targetTimestamp: date.getTime()
        };
        this._utilityService.setAlert(this.componentAlert);
        this.subscriptions['loadLocationsByCompany'] = this._kjgriHomeService.getClientLocations(searchData).subscribe(function (res) {
            _this.companyLocations = res.data;
            _this.generateLocationPins();
            if (refresh && !_this.selectedLocation)
                _this.selectLocation(null);
            if (refresh && _this.selectedLocation)
                _this.closeRiskLegend();
        }, function (err) {
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode);
        });
    };
    /**
     * Load client company locations from context based on selected subtype and rfFlag
     * @author Mario Petrovic
     */
    KJGriHomeCmp.prototype.loadClientLocationsByContext = function (selectedSubtype, rfFlag, location) {
        var _this = this;
        if (location === void 0) { location = null; }
        var date = this.selectedDate;
        date.setHours(this.selectedTime);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);
        var searchData = {
            typeId: selectedSubtype,
            rfFlag: rfFlag,
            targetTimestamp: date.getTime()
        };
        this._utilityService.setAlert(this.componentAlert);
        this.subscriptions['loadClientLocationsByContext'] = this._kjgriHomeService.getClientLocationsByContext(searchData).subscribe(function (res) {
            _this.companyLocations = res.data;
            _this.generateLocationPins();
            _this.map.removeLayer(_this.locationsVectorLayer);
            _this.map.addLayer(_this.locationsVectorLayer);
            if (!location)
                _this.selectLocation(null);
        }, function (err) {
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode);
        });
    };
    /**
     * Loads all risk indxes for selected spot on the map
     * @author Mario Petrovic
     */
    KJGriHomeCmp.prototype.loadAllRiskIndexesForLocation = function (istat, sub, coordinates, toReset) {
        var _this = this;
        if (toReset === void 0) { toReset = false; }
        this._utilityService.setAlert(this.componentAlert);
        var date = this.selectedDate;
        date.setHours(this.selectedTime);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);
        var data = {
            istat: istat,
            sub: sub,
            timestamp: date.getTime(),
            longitude: coordinates[0],
            latitude: coordinates[1],
            typeId: this.selectedSubtype.id,
            rfFlag: this.selectedRFFlag
        };
        this.subscriptions['loadAllRiskIndexesForLocation'] = this._kjgriHomeService.getAllRiskIndexesForLocation(data).subscribe(function (res) {
            _this.mapSelectedRiskIndexes = res.data;
            _this.forecastValueMunicipality.name = res.data.name;
            _this.forecastValueMunicipality.istat = res.data.istat;
            _this.map.removeLayer(_this.mapSelectedLocationPoint);
            if (_this.mapSelectedRiskIndexes) {
                if (!toReset) {
                    _this.mapSelectedLocationPoint = _this.createMapPoint(coordinates, 'inspect');
                    _this.map.addLayer(_this.mapSelectedLocationPoint);
                    _this.mapClicked = true;
                    //Just reset selected location
                    //dont run all the logic from selectLocation function
                    _this.selectedLocation = null;
                }
                if (_this.mapSelectedRiskIndexes.riskIndexValueses) {
                    _this.mapSelectedRiskIndexes.riskIndexValueses.sort(function (a, b) {
                        return a.dicRiskSubtypes.name.localeCompare(b.dicRiskSubtypes.name);
                    });
                    var index = _this.mapSelectedRiskIndexes.riskIndexValueses.findIndex(function (val) { return val.dicRiskSubtypes.code == 'GL'; });
                    var global = _this.mapSelectedRiskIndexes.riskIndexValueses[index];
                    if (global) {
                        global.value = parseInt(_this.mapSelectedRiskIndexes.riskIndexValueses[index].value).toString();
                        _this.mapSelectedRiskIndexes.riskIndexValueses.splice(index, 1);
                        _this.mapSelectedRiskIndexes.riskIndexValueses.unshift(global);
                    }
                }
                if (_this.mapSelectedRiskIndexes.forecastIndexValueses) {
                    _this.mapSelectedRiskIndexes.forecastIndexValueses.sort(function (a, b) {
                        return a.dicRiskSubtypes.name.localeCompare(b.dicRiskSubtypes.name);
                    });
                    var index = _this.mapSelectedRiskIndexes.forecastIndexValueses.findIndex(function (val) { return val.dicRiskSubtypes.code == 'GL'; });
                    var global = _this.mapSelectedRiskIndexes.forecastIndexValueses[index];
                    if (global) {
                        global.value = parseInt(_this.mapSelectedRiskIndexes.forecastIndexValueses[index].value).toString();
                        _this.mapSelectedRiskIndexes.forecastIndexValueses.splice(index, 1);
                        _this.mapSelectedRiskIndexes.forecastIndexValueses.unshift(global);
                    }
                }
            }
            else {
                _this._utilityService.setAlert(_this.componentAlert, res.message, 204);
                _this.mapClicked = false;
                _this.inspectedCoordinates = null;
            }
        }, function (err) {
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode);
        });
    };
    /**
     * Loads all risk indxes for selected spoton the map
     * @author Mario Petrovic
     */
    KJGriHomeCmp.prototype.loadAllRiskIndexesForCompanyLocation = function (companyId) {
        var _this = this;
        this._utilityService.setAlert(this.componentAlert);
        var date = this.selectedDate;
        date.setHours(this.selectedTime);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);
        var data = {
            companyLocationId: companyId,
            targetTimestamp: date.getTime(),
            typeId: this.selectedSubtype.id,
            rfFlag: this.selectedRFFlag
        };
        this.subscriptions['loadAllRiskIndexesForCompanyLocation'] = this._kjgriHomeService.getAllRiskIndexesForCompanyLocation(data).subscribe(function (res) {
            _this.mapSelectedRiskIndexes = res.data;
            var index = _this.mapSelectedRiskIndexes.riskIndexValueses.findIndex(function (val) { return val.dicRiskSubtypes.code == 'GL'; });
            _this.mapSelectedRiskIndexes.riskIndexValueses[index].value = parseInt(_this.mapSelectedRiskIndexes.riskIndexValueses[index].value).toString();
            if (_this.mapSelectedRiskIndexes.riskIndexValueses) {
                _this.mapSelectedRiskIndexes.riskIndexValueses.sort(function (a, b) {
                    return a.dicRiskSubtypes.name.localeCompare(b.dicRiskSubtypes.name);
                });
                var index_1 = _this.mapSelectedRiskIndexes.riskIndexValueses.findIndex(function (val) { return val.dicRiskSubtypes.code == 'GL'; });
                var global = _this.mapSelectedRiskIndexes.riskIndexValueses[index_1];
                if (global) {
                    global.value = parseInt(_this.mapSelectedRiskIndexes.riskIndexValueses[index_1].value).toString();
                    _this.mapSelectedRiskIndexes.riskIndexValueses.splice(index_1, 1);
                    _this.mapSelectedRiskIndexes.riskIndexValueses.unshift(global);
                }
            }
            if (_this.mapSelectedRiskIndexes.forecastIndexValueses) {
                _this.mapSelectedRiskIndexes.forecastIndexValueses.sort(function (a, b) {
                    return a.dicRiskSubtypes.name.localeCompare(b.dicRiskSubtypes.name);
                });
                var index_2 = _this.mapSelectedRiskIndexes.forecastIndexValueses.findIndex(function (val) { return val.dicRiskSubtypes.code == 'GL'; });
                var global = _this.mapSelectedRiskIndexes.forecastIndexValueses[index_2];
                if (global) {
                    global.value = parseInt(_this.mapSelectedRiskIndexes.forecastIndexValueses[index_2].value).toString();
                    _this.mapSelectedRiskIndexes.forecastIndexValueses.splice(index_2, 1);
                    _this.mapSelectedRiskIndexes.forecastIndexValueses.unshift(global);
                }
            }
            _this.forecastValueMunicipality.istat = res.data.istat;
            _this.forecastValueMunicipality.name = res.data.name;
            _this.inspectedGeolocation.istat = res.data.istat;
            _this.inspectedGeolocation.sub = res.data.sub;
            !res.data || (_this.mapClicked = true);
        }, function (err) {
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode);
        });
    };
    /**
     * Loads all risk history for company location
     * @author Mario Petrovic
     */
    KJGriHomeCmp.prototype.loadRiskHistroy = function (locationId, subriskId, rfFlag) {
        var _this = this;
        this._utilityService.setAlert(this.componentAlert);
        this.subscriptions['loadRiskHistroy'] = this._kjgriHomeService.getRiskHistory(locationId, subriskId, rfFlag).last().subscribe(function (res) {
            _this.riskHistory = res.data;
            //Convert decimal indexValue to integer
            if (_this.selectedSubtype.code == 'GL') {
                _this.riskHistory.forEach(function (val, index) {
                    val.indexValue = _this.selectedRFFlag == 'R' ? parseInt(val.indexValue.toString()).toString() : parseInt(val.value.toString()).toString();
                });
            }
        }, function (err) {
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode);
        });
    };
    /**
     * Loads all risk history for selected location from the map
     * @author Mario Petrovic
     */
    KJGriHomeCmp.prototype.loadRiskHistroyForLocation = function (istat, sub, subriskId, rfFlag) {
        var _this = this;
        var sliderDate = this.selectedDate;
        sliderDate.setHours(this.selectedTime);
        sliderDate.setMinutes(0);
        sliderDate.setSeconds(0);
        sliderDate.setMilliseconds(0);
        var searchData = {
            istat: istat,
            sub: sub,
            typeId: subriskId,
            rfFlag: rfFlag,
            longitude: this.inspectedCoordinates[0],
            latitude: this.inspectedCoordinates[1]
        };
        this._utilityService.setAlert(this.componentAlert);
        if ((this._appService.frontendGenerics.riskHistoryHomepage && this.selectedRFFlag == 'R') || (this._appService.frontendGenerics.forecastHistoryHomepage && this.selectedRFFlag == 'F') || (this._appService.frontendGenerics.forecastHistoryHomepage && this.selectedRFFlag == 'M')) {
            this.subscriptions['loadRiskHistroy'] = this._kjgriHomeService.getRiskHistoryForLocation(searchData).subscribe(function (res) {
                _this.riskHistory = res.data;
                !_this.riskHistory || _this.riskHistory.sort(function (a, b) {
                    return _this.selectedRFFlag == 'R' ? a.measurementDate - b.measurementDate : a.targetTimestamp - b.targetTimestamp;
                });
            }, function (err) {
                _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode);
            });
        }
    };
    /**
     * Loads risk index style parameters for legend view
     * @author Mario Petrovic
     */
    // loadRiskIndexStyles(rfFlag: string, typeId: number): void {
    //     this._utilityService.setAlert(this.componentAlert);
    //     var searchData = {
    //         rfFlag: rfFlag,
    //         typeId: typeId
    //     }
    //     this.subscriptions['loadRiskIndexStyles'] = this._kjgriHomeService.getRiskIndexStypes(searchData).subscribe(
    //         (res: RestResponse<Style[]>) => {
    //             this.riskIndexStyles = res.data;
    //         },
    //         (err: RestResponse<null>) => {
    //             this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode);
    //         }
    //     );
    // }
    /**
     * Loads measurement types
     * @author Mario Petrovic
     */
    KJGriHomeCmp.prototype.loadMeasurementTypes = function () {
        var _this = this;
        this._utilityService.setAlert(this.componentAlert);
        this.subscriptions['loadMeasurementTypes'] = this._kjgriHomeService.getMeasurementTypes().subscribe(function (res) {
            _this.measurementTypes = res.data;
            _this.measurementTypes.sort(function (a, b) {
                return a.displayName.localeCompare(b.displayName);
            });
        }, function (err) {
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode);
        });
    };
    /*--------- App logic --------*/
    /**
     * Used to prevent risk history
     * from executing after changing
     * to another category/rest call
     *
     * @author Nikola Gavric
     */
    KJGriHomeCmp.prototype._cancelRiskHistoryCall = function () {
        //Prevent from continuing to load risk history after
        //switching from floods or landslides to something else
        //let subscription = (<Subscription>this.subscriptions['loadRiskHistroy']);
        //if(subscription) subscription.unsubscribe();
    };
    /**
     * On click event method for selecting subrisk
     * @author Mario Petrovic
     */
    KJGriHomeCmp.prototype.selectSubrisk = function (riskSubtype, rfFlag) {
        this.selectedSubtype = riskSubtype;
        this.selectedRFFlag = rfFlag;
        if (this.map.getView().getZoom() < this._appService.getFrontendGeneric('mapZoomLevel', 11)) {
            this.riskIndexStyles = [];
        }
        if (this.selectedLocation) {
            //To trigger the update of everything
            //and to show the right map legend
            this.selectLocation(this.selectedLocation);
        }
        else {
            this.closeRiskLegend();
        }
        //this.loadRiskIndexStyles(rfFlag, riskSubtype.id);
        this.changeMapParameters();
    };
    KJGriHomeCmp.prototype.incrementTime = function () {
        if (+this.selectedTime == 23)
            this.selectedTime = 0;
        else
            this.selectedTime = +this.selectedTime + 1;
        if (+this.selectedTime <= 23 && +this.selectedTime >= 0) {
            var currentMapZoom = this.map.getView().getZoom();
            if ((this.selectedSubtype.code == "F" && currentMapZoom >= this._appService.getFrontendGeneric('floodingZoomLevel', 14)) ||
                (this.selectedSubtype.code == "LS" && currentMapZoom >= this._appService.getFrontendGeneric('landslideZoomLevel', 12)) ||
                (this.selectedSubtype.code != "F" && this.selectedSubtype.code != "LS" && currentMapZoom >= this._appService.getFrontendGeneric('mapZoomLevel', 11)) ||
                ((this.companyLocations && this.companyLocations.length > 0) || (this.inspectedGeolocation && this.inspectedGeolocation.istat && this.inspectedGeolocation.sub))) {
                this.onDateChange();
            }
        }
    };
    KJGriHomeCmp.prototype.decrementTime = function () {
        if (+this.selectedTime == 0)
            this.selectedTime = 23;
        else
            this.selectedTime = +this.selectedTime - 1;
        if (+this.selectedTime <= 23 && +this.selectedTime >= 0) {
            var currentMapZoom = this.map.getView().getZoom();
            if ((this.selectedSubtype.code == "F" && currentMapZoom >= this._appService.getFrontendGeneric('floodingZoomLevel', 14)) ||
                (this.selectedSubtype.code == "LS" && currentMapZoom >= this._appService.getFrontendGeneric('landslideZoomLevel', 12)) ||
                (this.selectedSubtype.code != "F" && this.selectedSubtype.code != "LS" && currentMapZoom >= this._appService.getFrontendGeneric('mapZoomLevel', 11)) ||
                ((this.companyLocations && this.companyLocations.length > 0) || (this.inspectedGeolocation && this.inspectedGeolocation.istat && this.inspectedGeolocation.sub))) {
                this.onDateChange();
            }
        }
    };
    /**
     * On slider change event method
     * @author Nikola Gavric
     */
    KJGriHomeCmp.prototype.onDateChange = function () {
        var _this = this;
        this.selectedDate.setHours(this.selectedTime);
        if (this.selectedDate && this.selectedTime != null && (+this.selectedTime <= 23 && +this.selectedTime >= 0)) {
            clearTimeout(this.dateChangeTimeout);
            this.dateChangeTimeout = setTimeout(function () {
                _this.changeMapParameters();
                if (_this.mapClicked) {
                    if (_this.inspectedElement === 'geolocation' && _this.inspectedGeolocation.istat && _this.inspectedGeolocation.sub) {
                        _this.loadAllRiskIndexesForLocation(_this.inspectedGeolocation.istat, _this.inspectedGeolocation.sub, _this.inspectedCoordinates);
                    }
                    else if (_this.inspectedElement === 'companyLocation') {
                        if (_this.selectedLocation) {
                            _this.loadAllRiskIndexesForCompanyLocation(_this.selectedLocation.companyLocation.id);
                        }
                    }
                }
            }, 800);
        }
    };
    /**
     * Method for loading geolocations when parameters change
     * @author Mario Petrovic
     */
    KJGriHomeCmp.prototype.changeMapParameters = function () {
        if (this._appService.isAuthorised([kjgri_constants_1.KJGriConstants.ROLES.GOLD_A, kjgri_constants_1.KJGriConstants.ROLES.PLATINUM_A, kjgri_constants_1.KJGriConstants.ROLES.SILVER_A, kjgri_constants_1.KJGriConstants.ROLES.SUPER_ADMIN])) {
            var currentMapZoom = this.map.getView().getZoom();
            var extent = ol.proj.transformExtent(this.map.getView().calculateExtent(this.map.getSize()), 'EPSG:3857', 'EPSG:4326');
            var centerCoordinates = ol.proj.toLonLat(this.map.getView().getCenter());
            var coordinates = {
                center: centerCoordinates,
                corner: extent.slice(2, 4)
            };
            if (this.selectedCompany)
                this.loadLocationsByCompany(this.selectedCompany, this.selectedSubtype.id, this.selectedRFFlag);
            if (this.selectedSubtype.code == "F") {
                if (currentMapZoom >= this._appService.getFrontendGeneric('floodingZoomLevel', 14)) {
                    this.loadGeolocations(this.selectedSubtype.id, this.selectedRFFlag, coordinates);
                }
                else {
                    this.map.removeLayer(this.geolocationPolygons);
                }
            }
            else if (this.selectedSubtype.code == "LS") {
                if (currentMapZoom >= this._appService.getFrontendGeneric('landslideZoomLevel', 12)) {
                    this.loadGeolocations(this.selectedSubtype.id, this.selectedRFFlag, coordinates);
                }
                else {
                    this.map.removeLayer(this.geolocationPolygons);
                }
            }
            else {
                if (currentMapZoom >= this._appService.getFrontendGeneric('mapZoomLevel', 11)) {
                    this.loadGeolocations(this.selectedSubtype.id, this.selectedRFFlag, coordinates);
                }
            }
        }
        else {
            this.loadClientLocationsByContext(this.selectedSubtype.id, this.selectedRFFlag, this.selectedLocation);
        }
    };
    /**
     * On click event method for selecting section
     * @author Mario Petrovic
     */
    KJGriHomeCmp.prototype.selectRFSection = function (section, subtype) {
        var _this = this;
        if (this.selectedRFFlagSection == section)
            this.selectedRFFlagSection = null;
        else
            this.selectedRFFlagSection = section;
        setTimeout(function () {
            if (_this.selectedRFFlagSection) {
                if (subtype && (section == 'R' || section == 'F')) {
                    _this.selectSubrisk(subtype.dicRiskSubtypeses[0], _this.selectedRFFlagSection);
                }
                else if (section == 'M') {
                    _this.selectSubrisk(_this.measurementTypes[0], _this.selectedRFFlagSection);
                }
                else {
                    throw new Error('Error on line 624');
                }
            }
        });
    };
    /**
     * Calculate zoom to integer
     *
     * @author Nikola Gavric
     */
    KJGriHomeCmp.prototype.calculateZoom = function () {
        return Math.round(this.map.getView().getZoom());
    };
    /**
     * Calculate zoom to integer
     *
     * @author Nikola Gavric
     */
    KJGriHomeCmp.prototype.calculateAllowedZoom = function () {
        if (this.selectedSubtype) {
            if (this.selectedSubtype.code == 'F') {
                return this._appService.getFrontendGeneric('floodingZoomLevel', 14);
            }
            else if (this.selectedSubtype.code == 'LS') {
                return this._appService.getFrontendGeneric('landslideZoomLevel', 12);
            }
        }
        return this._appService.getFrontendGeneric('mapZoomLevel', 11);
    };
    /**
     * On click event to select location from company location list
     * @author Mario Petrovic
     */
    KJGriHomeCmp.prototype.selectLocation = function (companyLocation, showAll) {
        if (showAll === void 0) { showAll = false; }
        this.selectedLocation = companyLocation;
        if (this._appService.isAuthorised([kjgri_constants_1.KJGriConstants.ROLES.PLATINUM_I, kjgri_constants_1.KJGriConstants.ROLES.GOLD_I, kjgri_constants_1.KJGriConstants.ROLES.SILVER_I])) {
            if (!this.selectedLocation) {
                this.closeRiskLegend();
                this.inspectedGeolocation.istat = null;
                this.inspectedGeolocation.sub = null;
            }
        }
        if (this.selectedLocation || showAll) {
            this.mapClicked = false;
            this.inspectedCoordinates = null;
            this.map.removeLayer(this.mapSelectedLocationPoint);
        }
        //If show all is clicked, dont allow
        //buttons which show history to be clickable
        if (showAll) {
            this.riskHistory = null;
        }
        if (this.companyLocations.length > 0 && this.selectedLocation) {
            this.clearSearchAddress();
            if (!this._appService.isAuthorised([kjgri_constants_1.KJGriConstants.ROLES.PLATINUM_I, kjgri_constants_1.KJGriConstants.ROLES.GOLD_I, kjgri_constants_1.KJGriConstants.ROLES.SILVER_I])) {
                if (!this.mapClicked) {
                    this.map.removeLayer(this.mapSelectedLocationPoint);
                }
                else {
                    this.map.removeLayer(this.mapSelectedLocationPoint);
                    this.map.addLayer(this.mapSelectedLocationPoint);
                }
            }
            var currentMapZoom = this.map.getView().getZoom();
            this.map.getView().setCenter(ol.proj.transform([this.selectedLocation.companyLocation.longitude, this.selectedLocation.companyLocation.latitude], 'EPSG:4326', 'EPSG:3857'));
            if (this.selectedSubtype.code == "F") {
                if (currentMapZoom <= this._appService.getFrontendGeneric('floodingZoomLevel', 14)) {
                    this.map.getView().setZoom(this._appService.getFrontendGeneric('floodingZoomLevel', 14));
                }
            }
            else if (this.selectedSubtype.code == "LS") {
                if (currentMapZoom <= this._appService.getFrontendGeneric('landslideZoomLevel', 12)) {
                    this.map.getView().setZoom(this._appService.getFrontendGeneric('landslideZoomLevel', 12));
                }
            }
            else {
                if (currentMapZoom <= this._appService.getFrontendGeneric('mapZoomLevel', 11)) {
                    this.map.getView().setZoom(this._appService.getFrontendGeneric('mapZoomLevel', 11));
                }
            }
            this.loadAllRiskIndexesForCompanyLocation(this.selectedLocation.companyLocation.id);
            if (this._appService.frontendGenerics.forecastHistoryHomepage) {
                this.loadRiskHistroy(this.selectedLocation.companyLocation.id, this.selectedSubtype.id, this.selectedRFFlag);
            }
            this.inspectedElement = 'companyLocation';
        }
        else {
            if (Array.isArray(this.companyLocations) && this.companyLocations.length > 1) {
                this.map.getView().fit(this.locationsVectorLayer.getSource().getExtent());
                this.map.getView().setZoom(this.getCalculatedZoom(this.map.getView().calculateExtent(this.map.getSize()), this.locationsVectorLayer.getSource().getExtent()));
            }
            else if (!Array.isArray(this.companyLocations) || this.companyLocations.length == 1) {
                var location_1 = this.companyLocations[0];
                this.map.getView().setCenter(ol.proj.transform([location_1.companyLocation.longitude, location_1.companyLocation.latitude], 'EPSG:4326', 'EPSG:3857'));
            }
        }
    };
    /**
     * Calculate zoom level
     * @param map ol.proj.Extent
     * @param point ol.proj.Extent
     * @author Nikola Gavric
     */
    KJGriHomeCmp.prototype.getCalculatedZoom = function (map, point) {
        var mapX = [map[0], map[2]];
        var mapY = [map[1], map[3]];
        var pointX = [point[0], point[2]];
        var pointY = [point[1], point[3]];
        //30600 is the pin height number
        var isOverflow = (pointY[0] - mapY[0]) < 30600;
        return isOverflow ? this.map.getView().getZoom() - 1 : this.map.getView().getZoom();
    };
    /**
     * Method fires on onClick event of lazyloadDropdown
     * @author Mario Petrovic
     */
    KJGriHomeCmp.prototype.onCompanyClear = function () {
        if (this.selectedLocation)
            this.closeRiskLegend();
        this.selectedLocation = null;
        this.selectedCompany = null;
        this.companyLocations = null;
        this.map.removeLayer(this.locationsVectorLayer);
    };
    /**
     * Shows modal with chart for history
     * @author Mario Petrovic
     */
    KJGriHomeCmp.prototype.showChart = function (riskHistory, chartModal) {
        var _this = this;
        this.chartData = null;
        setTimeout(function () {
            _this.chartData = new models_2.ChartData();
            var value = [];
            var dates = [];
            for (var _i = 0, riskHistory_1 = riskHistory; _i < riskHistory_1.length; _i++) {
                var risk = riskHistory_1[_i];
                if (_this.selectedRFFlag == 'R') {
                    _this.chartData.labels.push(_this._datePipe.transform(risk.measurementDate, 'yyyy'));
                    if (risk.dicRiskSubtypes.code == 'GL') {
                        value.push(risk.indexValue);
                    }
                    else {
                        value.push(risk.numericValue);
                    }
                }
                else {
                    dates.push(new Date(risk.targetTimestamp));
                    value.push(risk.value);
                }
            }
            _this.chartData.labels.sort();
            if (_this.selectedRFFlag == 'F' || _this.selectedRFFlag == 'M') {
                dates.sort(function (left, right) { return left < right ? -1 : left > right ? 1 : 0; });
                dates.forEach(function (val) {
                    _this.chartData.labels.push(_this._datePipe.transform(val, 'dd.MM.yyyy HH') + 'h');
                });
            }
            _this.chartData.datasets.push({
                label: _this.selectedSubtype.name,
                data: value,
                fill: false,
                borderColor: '#4bc0c0'
            });
            chartModal.show();
        });
    };
    /**
     * Navigates to history page based on the role
     * @author Mario Petrovic
     */
    KJGriHomeCmp.prototype.goToHistory = function (location, selectedCompany) {
        if (this._appService.isAuthorised([kjgri_constants_1.KJGriConstants.ROLES.SUPER_ADMIN, kjgri_constants_1.KJGriConstants.ROLES.PLATINUM_A])) {
            // AppService.router.navigate(['history', location.companyLocation.id]);
            window.open("#/history/" + location.companyLocation.id + '/' + selectedCompany.id);
        }
        else {
            // AppService.router.navigate(['history', location.companyLocation.id, selectedCompany.id]);
            window.open("#/history/" + location.companyLocation.id);
        }
    };
    // ---------- Utility ------------- //
    /**
     * Hide modal based on passed modal directive
     * @author Mario Petrovic
     */
    KJGriHomeCmp.prototype.hideModal = function (modal) {
        modal.hide();
    };
    // ---------- Map methods ------------- //
    /**
     * Method for generating location pins
     * @author Mario Petrovic
     */
    KJGriHomeCmp.prototype.generateLocationPins = function () {
        this.map.removeLayer(this.locationsVectorLayer);
        // for (let location of this.locationsList) {
        //     this.map.removeLayer(location);
        // }
        var iconFeatures = [];
        // this.locationsList = [];
        for (var _i = 0, _a = this.companyLocations; _i < _a.length; _i++) {
            var companyLocation = _a[_i];
            // this.locationsList[parseInt(index)] = this.createMapPoint([this.companyLocations[parseInt(index)].companyLocation.longitude, this.companyLocations[parseInt(index)].companyLocation.latitude], this.companyLocations[parseInt(index)].indexValue);
            var iconFeature = new ol.Feature({
                geometry: new ol.geom.Point(ol.proj.fromLonLat([companyLocation.companyLocation.longitude, companyLocation.companyLocation.latitude])),
                properties: {
                    index: companyLocation.indexValue != null ? this.selectedSubtype.code == 'GL' ? parseInt(companyLocation.indexValue.toString()).toString() : companyLocation.indexValue.toString() : 'null',
                    companyId: companyLocation.companyLocation.id
                }
            });
            iconFeatures.push(iconFeature);
        }
        var locationsVectorSource = new ol.source.Vector({
            features: iconFeatures //add an array of features
        });
        this.map.removeLayer(this.locationsVectorLayer);
        this.locationsVectorLayer = new ol.layer.Vector({
            source: locationsVectorSource,
            style: function (feature) {
                var style = new ol.style.Style({
                    image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
                        anchor: [0.5, 1],
                        anchorXUnits: 'fraction',
                        anchorYUnits: 'fraction',
                        opacity: 1,
                        src: 'rest/users/noAuth/file?key=frontend.images.pin'
                    })),
                    text: new ol.style.Text({
                        text: feature.getProperties()['properties'].index != 'null' && feature.getProperties()['properties'].index != '-1' ? feature.getProperties()['properties'].index : 'N/A',
                        textAlign: 'center',
                        offsetY: -32,
                        stroke: new ol.style.Stroke({
                            width: 0.3
                        }),
                        fill: new ol.style.Fill({
                            color: '#333'
                        }),
                        font: feature.getProperties()['properties'].index != 'null' && feature.getProperties()['properties'].index != '-1' ? (45 / feature.getProperties()['properties'].index.length) >= 16 ? '16px sans-serif' : (45 / feature.getProperties()['properties'].index.length) + 'px sans-serif' : '16px sans-serif'
                    })
                });
                return style;
            }
        });
        this.map.addLayer(this.locationsVectorLayer);
    };
    /**
     * Navigates to specific location with zoom and animation
     * @author Mario Petrovic
     */
    KJGriHomeCmp.prototype.navigateToLocation = function (coordinates, callback, duration, zoom) {
        var _this = this;
        this.map.getView().animate({
            center: ol.proj.fromLonLat([coordinates[0], coordinates[1]]),
            duration: duration != null && duration != undefined ? duration : 800,
            zoom: zoom ? zoom : this._appService.getFrontendGeneric('mapZoomLevel', 11)
        }, function () {
            !callback || callback.call(_this);
        });
    };
    /**
     * Parse Geo JSON - try out with method for auto parsing with OpeyLayers API
     * @author Mario Petrovic
     */
    KJGriHomeCmp.prototype.parseGeoJson = function (geoJson) {
        var geoJsonObject = {
            type: 'FeatureCollection',
            features: []
        };
        for (var _i = 0, _a = geoJson.features; _i < _a.length; _i++) {
            var item = _a[_i];
            var featureTemp = {
                id: item.id,
                geometry: {
                    type: item.geometry.type,
                    coordinates: []
                },
                type: item.type,
                properties: item.properties
            };
            if (item.geometry.type == 'Point') {
                featureTemp.geometry.coordinates = ol.proj.fromLonLat(item.geometry.coordinates);
            }
            else {
                for (var _b = 0, _c = item.geometry.coordinates; _b < _c.length; _b++) {
                    var coordLoop1 = _c[_b];
                    switch (item.geometry.type) {
                        case 'LineString':
                            var transformatedCoords = ol.proj.fromLonLat(coordLoop1);
                            coordLoop1[0] = transformatedCoords[0];
                            coordLoop1[1] = transformatedCoords[1];
                            break;
                        case 'Polygon':
                            for (var _d = 0, coordLoop1_1 = coordLoop1; _d < coordLoop1_1.length; _d++) {
                                var coordLoop2 = coordLoop1_1[_d];
                                var transformatedCoords = ol.proj.fromLonLat(coordLoop2);
                                coordLoop2[0] = transformatedCoords[0];
                                coordLoop2[1] = transformatedCoords[1];
                            }
                            break;
                        case 'MultiPolygon':
                            for (var _e = 0, coordLoop1_2 = coordLoop1; _e < coordLoop1_2.length; _e++) {
                                var coordLoop2 = coordLoop1_2[_e];
                                for (var _f = 0, coordLoop2_1 = coordLoop2; _f < coordLoop2_1.length; _f++) {
                                    var coordLoop3 = coordLoop2_1[_f];
                                    var transformatedCoords = ol.proj.fromLonLat(coordLoop3);
                                    coordLoop3[0] = transformatedCoords[0];
                                    coordLoop3[1] = transformatedCoords[1];
                                }
                            }
                            break;
                    }
                }
                featureTemp.geometry.coordinates = item.geometry.coordinates;
            }
            geoJsonObject.features.push(featureTemp);
        }
        return geoJsonObject;
    };
    /**
     * Generate style object for purpose of rendering elements on the map
     * @author Mario Petrovic
     */
    KJGriHomeCmp.prototype.generateStyle = function (geoJson, featureType, iconIndexValues) {
        var styles = {};
        // If style is intended for polygons
        if (featureType != 'Pins') {
            for (var i = 0; i < 12; i++) {
                if (geoJson.features[i]) {
                    styles[geoJson.features[i].properties.index.toString()] = new ol.style.Style({
                        stroke: new ol.style.Stroke({
                            color: geoJson.features[i].properties.stroke,
                            width: geoJson.features[i].properties['stroke-width']
                        }),
                        fill: new ol.style.Fill({
                            color: geoJson.features[i].properties.fill
                        })
                    });
                }
                else {
                    break;
                }
            }
        }
        // If style is intended for pins
        if (featureType == 'Pins') {
            for (var i = 0; i <= 10; i++) {
                styles[i.toString()] = new ol.style.Style({
                    image: new ol.style.Icon(({
                        anchor: [0.5, 1],
                        anchorXUnits: 'fraction',
                        anchorYUnits: 'fraction',
                        // size: [30, 30],
                        opacity: 0.85,
                        src: 'rest/admin/home/pin/' + i
                    }))
                });
            }
            styles['defaultIcon'] = new ol.style.Style({
                image: new ol.style.Icon(({
                    anchor: [0.5, 1],
                    anchorXUnits: 'fraction',
                    anchorYUnits: 'fraction',
                    // size: [30, 30],
                    opacity: 0.85,
                    src: 'rest/admin/home/pin/-1'
                }))
            });
        }
        return styles;
    };
    /**
     * Creates layer vector for map
     * @author Mario Petrovic
     */
    KJGriHomeCmp.prototype.createLayer = function (geoLocation, featureType) {
        var geoJson = this.parseGeoJson(geoLocation);
        var style = this.generateStyle(geoLocation, featureType);
        var styleFunction = function (feature) {
            return style[feature.getProperties().index.toString()];
        };
        var vectorSource = new ol.source.Vector({
            features: (new ol.format.GeoJSON()).readFeatures(geoJson)
        });
        return new ol.layer.Vector({
            source: vectorSource,
            style: styleFunction,
        });
    };
    /**
     * Creates Vector layer with point for map
     * @author Mario Petrovic
     */
    KJGriHomeCmp.prototype.createMapPoint = function (coordinates, suffix) {
        var iconFeature = new ol.Feature({
            geometry: new ol.geom.Point(ol.proj.fromLonLat([coordinates[0], coordinates[1]]))
        });
        var vectorSource = new ol.source.Vector({
            features: [iconFeature] //add an array of features
        });
        var srcUrl = suffix == 'inspect' ? 'app/kjgri/assets/images/marker_pointer_new.png' : 'rest/admin/home/pin/' + suffix;
        var iconStyle = new ol.style.Style({
            image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
                anchor: [0.5, 1],
                anchorXUnits: 'fraction',
                anchorYUnits: 'fraction',
                opacity: 0.85,
                src: srcUrl
            }))
        });
        return new ol.layer.Vector({
            source: vectorSource,
            style: iconStyle
        });
    };
    /**
     * Closes risk legend on the map
     * @author Nikola Gavric
     */
    KJGriHomeCmp.prototype.closeRiskLegend = function () {
        this.mapSelectedRiskIndexes = null;
        this.riskHistory = null;
        this.mapClicked = false;
        this.inspectedCoordinates = null;
        if (this.selectedLocation)
            this.selectLocation(null);
        this.map.removeLayer(this.mapSelectedLocationPoint);
    };
    /**
     * Gets minimum and maximum dates for date picker
     * under the map.
     *
     * @author Nikola Gavric
     */
    KJGriHomeCmp.prototype.loadMinAndMaxDates = function () {
        var _this = this;
        this.subscriptions['loadMinAndMaxDates'] = this._kjgriHomeService.getMinAndMaxDates().subscribe(function (res) {
            _this.maxDate = new Date(res.data.maxDate);
            _this.minDate = new Date(res.data.minDate);
        }, function (err) {
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode);
        });
    };
    KJGriHomeCmp.prototype.loadData = function () {
        var _this = this;
        // Init methods
        this.loadMinAndMaxDates();
        this.loadRisksByType('R', function () {
            var roles = [kjgri_constants_1.KJGriConstants.ROLES.PLATINUM_I, kjgri_constants_1.KJGriConstants.ROLES.GOLD_I, kjgri_constants_1.KJGriConstants.ROLES.SILVER_I];
            if (_this._appService.isAuthorised(roles)) {
                _this.loadClientLocationsByContext(_this.selectedSubtype.id, _this.selectedRFFlag);
                _this.inspectMapGeolocations = function (event) {
                    //Clear search list if clicked on map
                    if (!_this.addresses) {
                        var properties_1 = [];
                        _this.map.forEachFeatureAtPixel(event.pixel, function (feature, layer) {
                            properties_1.push(feature.getProperties());
                        });
                        for (var _i = 0, properties_2 = properties_1; _i < properties_2.length; _i++) {
                            var featureProperty = properties_2[_i];
                            if (featureProperty.properties && featureProperty.properties.companyId != undefined) {
                                _this.map.removeLayer(_this.mapSelectedLocationPoint);
                                //If company is found select location
                                //prevents multiple same calls
                                var isFound = false;
                                var index = null;
                                _this.loadAllRiskIndexesForCompanyLocation(featureProperty.properties.companyId);
                                if (_this._appService.frontendGenerics.riskHistoryHomepage) {
                                    _this.loadRiskHistroy(featureProperty.properties.companyId, _this.selectedSubtype.id, _this.selectedRFFlag);
                                }
                                for (var locationIndex in _this.companyLocations) {
                                    if (_this.companyLocations[locationIndex].companyLocation.id == featureProperty.properties.companyId) {
                                        isFound = true;
                                        index = locationIndex;
                                    }
                                }
                                if (isFound) {
                                    _this.selectLocation(_this.companyLocations[index]);
                                    _this.navigateToLocation([_this.selectedLocation.companyLocation.longitude, _this.selectedLocation.companyLocation.latitude]);
                                }
                                else {
                                    _this.loadAllRiskIndexesForCompanyLocation(featureProperty.properties.companyId);
                                    if (_this._appService.frontendGenerics.riskHistoryHomepage) {
                                        _this.loadRiskHistroy(featureProperty.properties.companyId, _this.selectedSubtype.id, _this.selectedRFFlag);
                                    }
                                }
                                _this.inspectedElement = 'companyLocation';
                                break;
                            }
                        }
                    }
                    else {
                        _this.clearSearchAddress();
                    }
                };
                _this.map.on('click', _this.inspectMapGeolocations);
            }
            else {
                //this.loadRiskIndexStyles(this.selectedRFFlag, this.selectedSubtype.id);
                if (_this._appService.isAuthorised([kjgri_constants_1.KJGriConstants.ROLES.GOLD_A, kjgri_constants_1.KJGriConstants.ROLES.PLATINUM_A, kjgri_constants_1.KJGriConstants.ROLES.SILVER_A, kjgri_constants_1.KJGriConstants.ROLES.SUPER_ADMIN])) {
                    _this.clientCompaniesSearch('');
                    _this.moveEndEvent = function (data) {
                        var currentMapZoom = _this.map.getView().getZoom();
                        var extent = ol.proj.transformExtent(_this.map.getView().calculateExtent(_this.map.getSize()), 'EPSG:3857', 'EPSG:4326');
                        var centerCoordinates = ol.proj.toLonLat(_this.map.getView().getCenter());
                        var coordinates = {
                            center: centerCoordinates,
                            corner: extent.slice(2, 4)
                        };
                        clearTimeout(_this.moveMapTimeout);
                        // this.moveMapTimeout = setTimeout(() => {
                        if (_this.selectedSubtype.code == "F") {
                            if (currentMapZoom >= _this._appService.getFrontendGeneric('floodingZoomLevel', 14)) {
                                _this.loadGeolocations(_this.selectedSubtype.id, _this.selectedRFFlag, coordinates);
                            }
                            else {
                                _this.map.removeLayer(_this.geolocationPolygons);
                            }
                        }
                        else if (_this.selectedSubtype.code == "LS") {
                            if (currentMapZoom >= _this._appService.getFrontendGeneric('landslideZoomLevel', 12)) {
                                _this.loadGeolocations(_this.selectedSubtype.id, _this.selectedRFFlag, coordinates);
                            }
                            else {
                                _this.map.removeLayer(_this.geolocationPolygons);
                            }
                        }
                        else {
                            if (currentMapZoom >= _this._appService.getFrontendGeneric('mapZoomLevel', 11)) {
                                _this.loadGeolocations(_this.selectedSubtype.id, _this.selectedRFFlag, coordinates);
                            }
                        }
                        // }, 1000);
                        if (currentMapZoom < _this._appService.getFrontendGeneric('mapZoomLevel', 11)) {
                            _this.riskIndexStyles = null;
                            _this.map.removeLayer(_this.geolocationPolygons);
                        }
                    };
                    _this.map.on('moveend', _this.moveEndEvent);
                    _this.inspectMapGeolocations = function (event) {
                        //Clear search list if clicked on map
                        if (!_this.addresses) {
                            var currentMapZoom = _this.map.getView().getZoom();
                            var properties = [];
                            var isCompanyLocation_1 = false;
                            _this.map.forEachFeatureAtPixel(event.pixel, function (feature, layer) {
                                var property = feature.getProperties();
                                properties.push(property);
                            });
                            properties.some(function (value, index) {
                                isCompanyLocation_1 = value.hasOwnProperty('properties') ? value.properties.hasOwnProperty('companyId') : false;
                                return isCompanyLocation_1;
                            });
                            for (var _i = 0, properties_3 = properties; _i < properties_3.length; _i++) {
                                var featureProperty = properties_3[_i];
                                _this.inspectedGeolocation.istat = featureProperty.istat; // || this.inspectedGeolocation.istat;
                                _this.inspectedGeolocation.sub = featureProperty.sub; // || this.inspectedGeolocation.sub;
                                if (featureProperty.properties && featureProperty.properties.companyId != undefined) {
                                    _this.map.removeLayer(_this.mapSelectedLocationPoint);
                                    //If company is found select location
                                    //prevents multiple same calls
                                    var isFound = false;
                                    var index = null;
                                    for (var locationIndex in _this.companyLocations) {
                                        if (_this.companyLocations[locationIndex].companyLocation.id == featureProperty.properties.companyId) {
                                            isFound = true;
                                            index = locationIndex;
                                        }
                                    }
                                    if (isFound) {
                                        _this.selectLocation(_this.companyLocations[index]);
                                    }
                                    else {
                                        _this.loadAllRiskIndexesForCompanyLocation(featureProperty.properties.companyId);
                                        if (_this._appService.frontendGenerics.riskHistoryHomepage) {
                                            _this.loadRiskHistroy(featureProperty.properties.companyId, _this.selectedSubtype.id, _this.selectedRFFlag);
                                        }
                                    }
                                    _this.inspectedElement = 'companyLocation';
                                }
                            }
                            if (!_this.selectedLocation) {
                                if (_this.selectedSubtype.code == "F") {
                                    if (currentMapZoom < _this._appService.getFrontendGeneric('floodingZoomLevel', 14)) {
                                        _this.map.getView().setZoom(_this._appService.getFrontendGeneric('floodingZoomLevel', 14));
                                        _this.map.getView().centerOn(event.coordinate, [50, 50], [0, 0]);
                                    }
                                    else {
                                        if (properties.length == 0) {
                                            _this.inspectedGeolocation.istat = null;
                                            _this.inspectedGeolocation.sub = null;
                                            _this.closeRiskLegend();
                                        }
                                        _this.loadRiskHistoryAndGeneratePin(event, isCompanyLocation_1);
                                    }
                                }
                                else if (_this.selectedSubtype.code == "LS") {
                                    if (currentMapZoom < _this._appService.getFrontendGeneric('landslideZoomLevel', 12)) {
                                        _this.map.getView().setZoom(_this._appService.getFrontendGeneric('landslideZoomLevel', 12));
                                        _this.map.getView().centerOn(event.coordinate, [50, 50], [0, 0]);
                                    }
                                    else {
                                        if (properties.length == 0) {
                                            _this.inspectedGeolocation.istat = null;
                                            _this.inspectedGeolocation.sub = null;
                                            _this.closeRiskLegend();
                                        }
                                        _this.loadRiskHistoryAndGeneratePin(event, isCompanyLocation_1);
                                    }
                                }
                                else {
                                    if (currentMapZoom < _this._appService.getFrontendGeneric('mapZoomLevel', 11)) {
                                        _this.map.getView().setZoom(_this._appService.getFrontendGeneric('mapZoomLevel', 11));
                                        _this.map.getView().centerOn(event.coordinate, [50, 50], [0, 0]);
                                    }
                                    else {
                                        if (properties.length == 0) {
                                            _this.inspectedGeolocation.istat = null;
                                            _this.inspectedGeolocation.sub = null;
                                            _this.closeRiskLegend();
                                        }
                                        _this.loadRiskHistoryAndGeneratePin(event, isCompanyLocation_1);
                                    }
                                }
                            }
                            else {
                                if (properties.length == 0) {
                                    _this.inspectedGeolocation.istat = null;
                                    _this.inspectedGeolocation.sub = null;
                                }
                                if (!isCompanyLocation_1) {
                                    if (_this.selectedSubtype.code == "F") {
                                        if (currentMapZoom < _this._appService.getFrontendGeneric('floodingZoomLevel', 14)) {
                                            _this.map.getView().setZoom(_this._appService.getFrontendGeneric('floodingZoomLevel', 14));
                                            _this.map.getView().centerOn(event.coordinate, [50, 50], [0, 0]);
                                        }
                                    }
                                    else if (_this.selectedSubtype.code == "LS") {
                                        if (currentMapZoom < _this._appService.getFrontendGeneric('landslideZoomLevel', 12)) {
                                            _this.map.getView().setZoom(_this._appService.getFrontendGeneric('landslideZoomLevel', 12));
                                            _this.map.getView().centerOn(event.coordinate, [50, 50], [0, 0]);
                                        }
                                    }
                                    else {
                                        if (currentMapZoom < _this._appService.getFrontendGeneric('mapZoomLevel', 11)) {
                                            _this.map.getView().setZoom(_this._appService.getFrontendGeneric('mapZoomLevel', 11));
                                            _this.map.getView().centerOn(event.coordinate, [50, 50], [0, 0]);
                                        }
                                    }
                                }
                                _this.loadRiskHistoryAndGeneratePin(event, isCompanyLocation_1);
                            }
                        }
                        else {
                            _this.clearSearchAddress();
                        }
                    };
                    _this.map.on('click', _this.inspectMapGeolocations);
                }
            }
        });
        // Load initial values for side bar and index legend
        this.loadRisksByType('F');
        if (!this._appService.isAuthorised(kjgri_constants_1.KJGriConstants.ROLES.SILVER_A)) {
            this.loadMeasurementTypes();
        }
    };
    KJGriHomeCmp.prototype.loadRiskHistoryAndGeneratePin = function (event, isCompanyLocation) {
        if (this.inspectedGeolocation.istat && this.inspectedGeolocation.sub && !isCompanyLocation) {
            this.inspectedCoordinates = ol.proj.toLonLat(event.coordinate);
            this.loadAllRiskIndexesForLocation(this.inspectedGeolocation.istat, this.inspectedGeolocation.sub, this.inspectedCoordinates, isCompanyLocation);
            if (this.selectedSubtype.code != "LS" && this.selectedSubtype.code != "F") {
                this.loadRiskHistroyForLocation(this.inspectedGeolocation.istat, this.inspectedGeolocation.sub, this.selectedSubtype.id, this.selectedRFFlag);
            }
            this.inspectedElement = 'geolocation';
        }
    };
    /**
     * Calls Nominatim service and fetches the data
     * @param data string
     */
    KJGriHomeCmp.prototype.searchAddress = function () {
        var _this = this;
        clearTimeout(this.nominatimTimeout);
        if (this.q) {
            this.nominatimTimeout = setTimeout(function () {
                _this.subscriptions['searchAddress'] = _this._kjgriHomeService.searchAddress(_this.q).subscribe(function (res) {
                    _this.addresses = res;
                    _this.searchActiveAddress = true;
                }, function (err) {
                    console.log(err);
                });
            }, 1000);
        }
    };
    /**
     * Drawing and manipulating map
     * after selecting an address
     * from a dropdown.
     *
     * @param address Address
     * @param q any
     */
    KJGriHomeCmp.prototype.selectAddress = function (address) {
        //ol.geom.Point
        //ol.geom.Polygon
        //ol.geom.LineString
        //ol.geom.MultiPolygon
        var feature = null;
        //ol.StyleFunction
        var styleFunction = null;
        var coordinates = [+address.lon, +address.lat];
        this.map.removeLayer(this.searchVector);
        this.map.removeLayer(this.mapSelectedLocationPoint);
        feature = new ol.Feature({
            geometry: new ol.geom.Point(coordinates)
        });
        if (address.geojson.type == 'Point') {
        }
        else if (address.geojson.type == 'Polygon') {
        }
        else if (address.geojson.type == 'LineString') {
        }
        else if (address.geojson.type == 'MultiPolygon') {
        }
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
            this.map.addLayer(this.searchVector);
            this.map.getView().centerOn(ol.proj.fromLonLat(coordinates), this.map.getSize(), [0, 0]);
            this.map.getView().fit(feature.getGeometry());
        }
        this.q = address.display_name;
        this.searchActiveAddress = false;
    };
    /**
     * Clear search
     * @param q input
     */
    KJGriHomeCmp.prototype.clearSearchAddress = function (toClear) {
        if (toClear === void 0) { toClear = false; }
        if (toClear)
            this.q = null;
        this.map.removeLayer(this.searchVector);
        this.searchVector = null;
        this.searchActiveAddress = false;
        this.addresses = null;
        //Zoom out and center map
        //this.map.getView().animate({center: ol.proj.fromLonLat([21.907078, 43.317980]), zoom: 4, duration: 1500});
    };
    /*--------- NG On Init ---------*/
    KJGriHomeCmp.prototype.ngOnInit = function () {
        var _this = this;
        // Initital method to be executed when page loads
        this._appService.pageLoaded('', this);
        this._appService.languageChangeForComponent(this, this.loadData.bind(this));
        // Variable initialization
        this.subscriptions = {};
        this.componentAlert = new models_1.Alert(null, true);
        this.locationsList = [];
        this.selectedDate = new Date();
        this.selectedTime = this.selectedDate.getHours();
        this.forecastValueMunicipality = {
            name: '',
            istat: ''
        };
        this.searchActiveAddress = false;
        this.loadData();
        this.companyLocationsPinStyles = this.generateStyle(null, 'Pins', true);
        /*************************/
        // Try automatical geoJson parsing with OpenLayers API like on http://openlayers.org/en/latest/examples/box-selection.html?q=coordinates
        // var vectorSource = new ol.source.Vector({
        //     url: 'https://openlayers.org/en/v4.2.0/examples/data/geojson/countries.geojson',
        //     format: new ol.format.GeoJSON()
        // });
        /*************************/
        this.map = new ol.Map({
            layers: [
                new ol.layer.Tile({
                    source: new ol.source.OSM()
                })
            ],
            target: 'map',
            controls: ol.control.defaults({
                attributionOptions: /** @type {olx.control.AttributionOptions} */ ({
                    collapsible: false
                })
            }),
            view: new ol.View({
                center: ol.proj.fromLonLat([21.907078, 43.317980]),
                zoom: 4,
            })
        });
        this.map.getView().setMaxZoom(20);
        //This resolves issue with wrong
        //Pin placement
        this.mapChangeInterval = setInterval(function () {
            _this.map.updateSize();
        }, 5000);
        // } else {
        //     this._appService.getRouter().navigate(['admin/users']);
        // }
    };
    /*--------- NG On Destroy ---------*/
    KJGriHomeCmp.prototype.ngOnDestroy = function () {
        this._appService.refreshEmitters(null);
        clearInterval(this.mapChangeInterval);
    };
    KJGriHomeCmp = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'kjgri.home.cmp.html',
            encapsulation: core_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [app_service_1.AppService, ng2_translate_1.TranslateService, http_1.Http, utility_service_1.UtilityService, kjgri_home_service_1.KJGriHomeService, kjgri_constants_1.KJGriConstants, common_1.DatePipe, core_1.ChangeDetectorRef])
    ], KJGriHomeCmp);
    return KJGriHomeCmp;
}());
exports.KJGriHomeCmp = KJGriHomeCmp;
//# sourceMappingURL=kjgri.home.cmp.js.map