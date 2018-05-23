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
var geolocationManagement_service_1 = require('./geolocationManagement.service');
var utility_service_1 = require('../../kjcore/shared/services/utility.service');
var app_service_1 = require('../../kjcore/shared/services/app.service');
var models_1 = require('../../kjcore/shared/models');
/**
 * Component for geolocation management page
 * @author Nikola Gavric
 */
var GeolocationManagementCmp = (function () {
    /*--------- Constructor ---------*/
    function GeolocationManagementCmp(_utilityService, _geolocationManagementService, _appService, _translateService, _formBuilder) {
        this._utilityService = _utilityService;
        this._geolocationManagementService = _geolocationManagementService;
        this._appService = _appService;
        this._translateService = _translateService;
        this._formBuilder = _formBuilder;
        this.inspectedGeolocation = {
            istat: '',
            sub: ''
        };
    }
    /*--------- REST calls ---------*/
    /**
     * Loads geolocations based on pagination and query parameters
     * @author Mario Petrovic
     */
    GeolocationManagementCmp.prototype.loadGeolocations = function (istat, selectedGeolocaion) {
        var _this = this;
        this._utilityService.setAlert(this.componentAlert);
        this.subscriptions['loadGeolocations'] = this._geolocationManagementService.getAllGeolocations(istat).subscribe(function (res) {
            _this.geolocations = res.data;
            if (selectedGeolocaion) {
                for (var _i = 0, _a = _this.geolocations; _i < _a.length; _i++) {
                    var geolocation = _a[_i];
                    if (geolocation.id == selectedGeolocaion.id) {
                        var coorinates = [selectedGeolocaion.longitude, selectedGeolocaion.latitude];
                        _this.selectedGeolocation = geolocation;
                        _this.selectedGeolocation.longitude = coorinates[0];
                        _this.selectedGeolocation.latitude = coorinates[1];
                        break;
                    }
                }
            }
            else {
                _this.selectedGeolocation = null;
                _this.map.removeLayer(_this.inspectPin);
            }
        }, function (err) {
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode);
        });
    };
    /**
     * Loads geolocations for map polygon rendering
     * @author Mario Petrovic
     */
    GeolocationManagementCmp.prototype.loadMapGeolocations = function (coordinates) {
        var _this = this;
        this._utilityService.setAlert(this.componentAlert);
        var searchData = {
            longitude1: coordinates.center[0],
            latitude1: coordinates.center[1],
            longitude2: coordinates.corner[0],
            latitude2: coordinates.corner[1],
        };
        !this.subscriptions['loadMapGeolocations'] || this.subscriptions['loadMapGeolocations'].unsubscribe();
        this.subscriptions['loadMapGeolocations'] = this._geolocationManagementService.getMapGeolocations(searchData).subscribe(function (res) {
            // this.map.removeLayer(this.geolocationPolygons);
            // this.geolocationPolygons = this.createLayer(res.data, 'Geolocations');
            // this.map.addLayer(this.geolocationPolygons);
            var geoJsonTemp = {
                type: 'FeatureCollection',
                features: res.data.features
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
        }, function (err) {
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode);
        });
    };
    /**
     * Searches for geolocation by coordinates
     * @author Mario Petrovic
     */
    GeolocationManagementCmp.prototype.findGeolocationByCoordinates = function (geolocationInfo, coordinates) {
        var _this = this;
        this._utilityService.setAlert(this.componentAlert);
        this.subscriptions['findGeolocationByCoordinates'] = this._geolocationManagementService.getGeolocationByCoordinates(geolocationInfo).subscribe(function (res) {
            if (res.data) {
                _this.selectGeolocation(res.data, coordinates);
            }
            else {
                _this.geolocations = null;
                _this.map.removeLayer(_this.inspectPin);
                _this.selectedGeolocation = {
                    name: 'N/A',
                    longitude: parseFloat(coordinates.longitude.toFixed(6)),
                    latitude: parseFloat(coordinates.latitude.toFixed(6)),
                    istat: 'N/A',
                    sub: 'N/A'
                };
                _this.inspectPin = _this.createMapPoint([coordinates.longitude, coordinates.latitude], 'inspect');
                _this.map.addLayer(_this.inspectPin);
            }
        }, function (err) {
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode);
        });
    };
    /*--------- App logic ---------*/
    /**
     * Click method for selecing geolocation from the table
     * @author Mario Petrovic
     */
    GeolocationManagementCmp.prototype.selectGeolocation = function (geolocation, coordinates) {
        this.map.removeLayer(this.inspectPin);
        this.selectedGeolocation = geolocation;
        if (coordinates) {
            this.selectedGeolocation.longitude = parseFloat(coordinates.longitude.toFixed(6));
            this.selectedGeolocation.latitude = parseFloat(coordinates.latitude.toFixed(6));
        }
        else {
            this.map.getView().setCenter(ol.proj.fromLonLat([this.selectedGeolocation.longitude, this.selectedGeolocation.latitude]));
        }
        this.inspectPin = this.createMapPoint([this.selectedGeolocation.longitude, this.selectedGeolocation.latitude], 'inspect');
        this.map.addLayer(this.inspectPin);
        // this.navigateToLocation([this.selectedGeolocation.longitude, this.selectedGeolocation.latitude]);
    };
    /**
     * Clears inspected geolocation info bellow the map
     * @author Mario Petrovic
     */
    GeolocationManagementCmp.prototype.clearInspectedGeolocation = function () {
        this.map.removeLayer(this.inspectPin);
        this.selectedGeolocation = null;
    };
    /*--------- Map functionalities ---------*/
    /**
     * Creates Vector layer with point for map
     * @author Mario Petrovic
     */
    GeolocationManagementCmp.prototype.createMapPoint = function (coordinates, suffix) {
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
                src: 'app/kjgri/assets/images/marker_pointer-small' + (suffix ? '-' + suffix : '') + '.png'
            }))
        });
        return new ol.layer.Vector({
            source: vectorSource,
            style: iconStyle
        });
    };
    /**
     * Creates Vector layer with polygon
     * @author Mario Petrovic
     */
    GeolocationManagementCmp.prototype.createGeolocationsPolygons = function (geolocations) {
        var polygonFeatures = [];
        for (var _i = 0, geolocations_1 = geolocations; _i < geolocations_1.length; _i++) {
            var geolocation = geolocations_1[_i];
            var projectedCoordinates = [];
            for (var _a = 0, _b = geolocation.geolocationPointses; _a < _b.length; _a++) {
                var featurePoint = _b[_a];
                projectedCoordinates.push(ol.proj.fromLonLat([featurePoint.longitude, featurePoint.latitude]));
            }
            var polygonFeature = new ol.Feature({
                geometry: new ol.geom.Polygon([projectedCoordinates])
            });
            polygonFeatures.push(polygonFeature);
        }
        var vectorSource = new ol.source.Vector({
            features: polygonFeatures //add an array of features
        });
        var polygonStyle = new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: '#0267bf',
                width: 2
            }),
            fill: new ol.style.Fill({
                color: 'rgba(2, 117, 216, 0.6)'
            })
        });
        return new ol.layer.Vector({
            source: vectorSource,
            style: polygonStyle
        });
    };
    /**
     * Navigates to specific location with zoom and animation
     * @author Mario Petrovic
     */
    GeolocationManagementCmp.prototype.navigateToLocation = function (coordinates, callback, duration, zoom) {
        var _this = this;
        this.map.getView().animate({
            center: ol.proj.fromLonLat([coordinates[0], coordinates[1]]),
            duration: duration != null && duration != undefined ? duration : 800,
            zoom: zoom ? zoom : 9
        }, function () {
            !callback || callback.call(_this);
        });
    };
    /**
     * Creates layer vector for map
     * @author Mario Petrovic
     */
    GeolocationManagementCmp.prototype.createLayer = function (geoLocation, featureType) {
        var geoJson = this.parseGeoJson(geoLocation);
        var styles = new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: geoLocation.features[0].properties.stroke,
                width: 1
            }),
            fill: new ol.style.Fill({
                color: geoLocation.features[0].properties.fill
            })
        });
        var vectorSource = new ol.source.Vector({
            features: (new ol.format.GeoJSON()).readFeatures(geoJson)
        });
        return new ol.layer.Vector({
            source: vectorSource,
            style: styles,
        });
    };
    /**
     * Parse Geo JSON - try out with method for auto parsing with OpeyLayers API
     * @author Mario Petrovic
     */
    GeolocationManagementCmp.prototype.parseGeoJson = function (geoJson) {
        var geoJsonObject = {
            type: 'FeatureCollection',
            features: []
        };
        var featureTemp = {
            geometry: {
                type: geoJson.features[0].geometry.type,
                coordinates: []
            },
            type: geoJson.features[0].type,
            properties: geoJson.features[0].properties
        };
        for (var _i = 0, _a = geoJson.features[0].geometry.coordinates; _i < _a.length; _i++) {
            var coordLoop1 = _a[_i];
            for (var _b = 0, coordLoop1_1 = coordLoop1; _b < coordLoop1_1.length; _b++) {
                var coordLoop2 = coordLoop1_1[_b];
                for (var _c = 0, coordLoop2_1 = coordLoop2; _c < coordLoop2_1.length; _c++) {
                    var coordLoop3 = coordLoop2_1[_c];
                    var transformatedCoords = ol.proj.fromLonLat(coordLoop3);
                    coordLoop3[0] = transformatedCoords[0];
                    coordLoop3[1] = transformatedCoords[1];
                }
            }
        }
        featureTemp.geometry.coordinates = geoJson.features[0].geometry.coordinates;
        geoJsonObject.features.push(featureTemp);
        return geoJsonObject;
    };
    /*--------- NG On Init ---------*/
    GeolocationManagementCmp.prototype.ngOnInit = function () {
        var _this = this;
        // Initital method to be executed when page loads
        this._appService.pageLoaded('', this);
        this._appService.languageChangeForComponent(this);
        // Varibales initialization
        this.componentAlert = new models_1.Alert(null, true);
        this.subscriptions = {};
        this.formErrors = new models_1.RestResponse();
        this.dataTableConfig = new models_1.DataTableConfig(10, true, 3, [5, 10, 20, 50, 100], true);
        // Initial methods
        // Generate map
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
                zoom: 4
            })
        });
        // this.loadMapGeolocations();
        this.moveEndEvent = function (data) {
            var currentMapZoom = _this.map.getView().getZoom();
            if (currentMapZoom >= _this._appService.getFrontendGeneric('mapZoomLevel', 11)) {
                var extent = ol.proj.transformExtent(_this.map.getView().calculateExtent(_this.map.getSize()), 'EPSG:3857', 'EPSG:4326');
                var centerCoordinates = ol.proj.toLonLat(_this.map.getView().getCenter());
                var coordinates = {
                    center: centerCoordinates,
                    corner: extent.slice(2, 4)
                };
            }
            if (currentMapZoom < _this._appService.getFrontendGeneric('mapZoomLevel', 11)) {
                _this.map.removeLayer(_this.geolocationPolygons);
            }
        };
        this.map.on('moveend', this.moveEndEvent);
        // Bind click event for inspecing the map
        // this.inspectMapGeolocations = (event: ol.MapBrowserEvent) => {
        //     var projectedCoordinates = ol.proj.toLonLat(event.coordinate);
        //     var queryCoordinates = {
        //         longitude: projectedCoordinates[0],
        //         latitude: projectedCoordinates[1]
        //     }
        //     this.findGeolocationByCoordinates(queryCoordinates);
        // }
        // this.map.on('click', this.inspectMapGeolocations);
        this.inspectMapGeolocations = function (event) {
            var properties = [];
            _this.map.forEachFeatureAtPixel(event.pixel, function (feature, layer) {
                properties.push(feature.getProperties());
            });
            for (var _i = 0, properties_1 = properties; _i < properties_1.length; _i++) {
                var featureProperty = properties_1[_i];
                if (featureProperty.istat || featureProperty.sub) {
                    _this.inspectedGeolocation.istat = featureProperty.istat || '';
                    _this.inspectedGeolocation.sub = featureProperty.sub || '';
                    var projectedCoordinates = ol.proj.toLonLat(event.coordinate);
                    var queryCoordinates = {
                        longitude: projectedCoordinates[0],
                        latitude: projectedCoordinates[1]
                    };
                    _this.findGeolocationByCoordinates(_this.inspectedGeolocation, queryCoordinates);
                    break;
                }
            }
        };
        this.map.on('click', this.inspectMapGeolocations);
    };
    /*--------- NG On Destroy ---------*/
    GeolocationManagementCmp.prototype.ngOnDestroy = function () {
        this._appService.refreshEmitters(this.subscriptions);
    };
    GeolocationManagementCmp = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'geolocationManagement.cmp.html',
            encapsulation: core_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [utility_service_1.UtilityService, geolocationManagement_service_1.GeolocationManagementService, app_service_1.AppService, ng2_translate_1.TranslateService, forms_1.FormBuilder])
    ], GeolocationManagementCmp);
    return GeolocationManagementCmp;
}());
exports.GeolocationManagementCmp = GeolocationManagementCmp;
//# sourceMappingURL=geolocationManagement.cmp.js.map