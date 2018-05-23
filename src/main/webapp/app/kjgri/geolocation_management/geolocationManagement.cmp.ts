import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { Subscription } from 'rxjs/Subscription';
import { TranslateService } from 'ng2-translate';
import { ModalDirective } from 'ng2-bootstrap';
import { DataTable } from 'primeng/primeng';

import { GeolocationManagementService } from './geolocationManagement.service';

import { UtilityService } from '../../kjcore/shared/services/utility.service';
import { AppService } from '../../kjcore/shared/services/app.service';
import { PaginationTableResult } from "./../kjgri_shared/models";

import { Alert, RestResponse, DataTableConfig } from '../../kjcore/shared/models';

import { Geolocation, SearchQueryParams } from './models';

/**
 * Component for geolocation management page
 * @author Nikola Gavric
 */
@Component({
    moduleId: module.id,
    templateUrl: 'geolocationManagement.cmp.html',
    encapsulation: ViewEncapsulation.None
})
export class GeolocationManagementCmp implements OnInit {
    subscriptions: { [key: string]: Subscription };
    componentAlert: Alert;
    formErrors: RestResponse<any>;

    dataTableConfig: DataTableConfig;

    globalFilter: any;
    geolocations: Geolocation[];
    selectedGeolocation: Geolocation;
    inspectMapGeolocations: Function;

    map: ol.Map;
    inspectPin: ol.layer.Vector;
    geolocationsLayer: ol.layer.Vector;
    geolocationPolygons: ol.layer.Vector;

    moveEndEvent: Function;
    inspectedGeolocation: { istat: string, sub: string };

    /*--------- Constructor ---------*/
    constructor(
        private _utilityService: UtilityService,
        private _geolocationManagementService: GeolocationManagementService,
        private _appService: AppService,
        private _translateService: TranslateService,
        private _formBuilder: FormBuilder
    ) {
        this.inspectedGeolocation = {
            istat: '',
            sub: ''
        }
    }

    /*--------- REST calls ---------*/

    /**
     * Loads geolocations based on pagination and query parameters
     * @author Mario Petrovic
     */
    loadGeolocations(istat: string, selectedGeolocaion?: Geolocation): void {
        this._utilityService.setAlert(this.componentAlert);

        this.subscriptions['loadGeolocations'] = this._geolocationManagementService.getAllGeolocations(istat).subscribe(
            (res: RestResponse<Geolocation[]>) => {
                this.geolocations = res.data;

                if (selectedGeolocaion) {
                    for (let geolocation of this.geolocations) {
                        if (geolocation.id == selectedGeolocaion.id) {
                            var coorinates = [selectedGeolocaion.longitude, selectedGeolocaion.latitude];
                            this.selectedGeolocation = geolocation;
                            this.selectedGeolocation.longitude = coorinates[0];
                            this.selectedGeolocation.latitude = coorinates[1];
                            break;
                        }
                    }
                } else {
                    this.selectedGeolocation = null;
                    this.map.removeLayer(this.inspectPin);
                }
            },
            (err: RestResponse<null>) => {
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode);
            }
        )
    }

    /**
     * Loads geolocations for map polygon rendering
     * @author Mario Petrovic
     */
    loadMapGeolocations(coordinates: { center: [number, number], corner: number[] }): void {
        this._utilityService.setAlert(this.componentAlert);

        var searchData = {
            longitude1: coordinates.center[0],
            latitude1: coordinates.center[1],
            longitude2: coordinates.corner[0],
            latitude2: coordinates.corner[1],
        };

        !this.subscriptions['loadMapGeolocations'] || this.subscriptions['loadMapGeolocations'].unsubscribe();

        this.subscriptions['loadMapGeolocations'] = this._geolocationManagementService.getMapGeolocations(searchData).subscribe(
            (res: RestResponse<any>) => {

                // this.map.removeLayer(this.geolocationPolygons);

                // this.geolocationPolygons = this.createLayer(res.data, 'Geolocations');

                // this.map.addLayer(this.geolocationPolygons);


                var geoJsonTemp = {
                    type: 'FeatureCollection',
                    features: res.data.features
                };

                var styleFunction: ol.StyleFunction = (feature: (ol.Feature | ol.render.Feature), resolution: number): ol.style.Style => {
                    var properties = feature.getProperties();

                    return new ol.style.Style({
                        stroke: new ol.style.Stroke({
                            color: properties['stroke'] ? properties['stroke'] : 'rgba(155,155,155, 0.7)',
                            width: properties['stroke-width'] ? properties['stroke-width'] : 1
                        }),
                        fill: new ol.style.Fill({
                            color: properties['fill'] ? properties['fill'] : 'rgba(255,255,255, 0.24)'
                        })
                    });;
                };

                var format = new ol.format.GeoJSON({
                    defaultDataProjection: undefined,
                    featureProjection: "EPSG:3857"
                });

                var source = new ol.source.Vector({
                    features: format.readFeatures(geoJsonTemp)
                });

                this.geolocationPolygons = new ol.layer.Vector({
                    source: source,
                    style: styleFunction
                });


                this.map.addLayer(this.geolocationPolygons);
            },
            (err: RestResponse<null>) => {
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode);
            }
        )
    }

    /**
     * Searches for geolocation by coordinates
     * @author Mario Petrovic
     */
    findGeolocationByCoordinates(geolocationInfo: { istat: string, sub: string }, coordinates: { longitude: number, latitude: number }): void {
        this._utilityService.setAlert(this.componentAlert);

        this.subscriptions['findGeolocationByCoordinates'] = this._geolocationManagementService.getGeolocationByCoordinates(geolocationInfo).subscribe(
            (res: RestResponse<Geolocation>) => {
                if (res.data) {
                    this.selectGeolocation(res.data, coordinates);
                } else {
                    this.geolocations = null;
                    this.map.removeLayer(this.inspectPin);
                    this.selectedGeolocation = {
                        name: 'N/A',
                        longitude: parseFloat(coordinates.longitude.toFixed(6)),
                        latitude: parseFloat(coordinates.latitude.toFixed(6)),
                        istat: 'N/A',
                        sub: 'N/A'
                    };
                    this.inspectPin = this.createMapPoint([coordinates.longitude, coordinates.latitude], 'inspect');
                    this.map.addLayer(this.inspectPin);
                }
            },
            (err: RestResponse<null>) => {
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode);
            }
        )
    }

    /*--------- App logic ---------*/

    /**
     * Click method for selecing geolocation from the table
     * @author Mario Petrovic
     */
    selectGeolocation(geolocation: Geolocation, coordinates?: { longitude: number, latitude: number }): void {
        this.map.removeLayer(this.inspectPin);
        this.selectedGeolocation = geolocation;

        if (coordinates) {
            this.selectedGeolocation.longitude = parseFloat(coordinates.longitude.toFixed(6));
            this.selectedGeolocation.latitude = parseFloat(coordinates.latitude.toFixed(6));
            //this.loadGeolocations(this.selectedGeolocation.istat, this.selectedGeolocation);
        } else {
            this.map.getView().setCenter(ol.proj.fromLonLat([this.selectedGeolocation.longitude, this.selectedGeolocation.latitude]))
        }

        this.inspectPin = this.createMapPoint([this.selectedGeolocation.longitude, this.selectedGeolocation.latitude], 'inspect');
        this.map.addLayer(this.inspectPin);

        // this.navigateToLocation([this.selectedGeolocation.longitude, this.selectedGeolocation.latitude]);
    }

    /**
     * Clears inspected geolocation info bellow the map
     * @author Mario Petrovic
     */
    clearInspectedGeolocation(): void {
        this.map.removeLayer(this.inspectPin);
        this.selectedGeolocation = null;
    }


    /*--------- Map functionalities ---------*/

    /**
     * Creates Vector layer with point for map 
     * @author Mario Petrovic
     */
    createMapPoint(coordinates: [number, number], suffix: number | string): ol.layer.Vector {
        var iconFeature = new ol.Feature({
            geometry: new ol.geom.Point(ol.proj.fromLonLat([coordinates[0], coordinates[1]]))
        });

        var vectorSource = new ol.source.Vector({
            features: [iconFeature] //add an array of features
        });

        var iconStyle = new ol.style.Style({
            image: new ol.style.Icon(/** @type {olx.style.IconOptions} */({
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
    }

    /**
     * Creates Vector layer with polygon
     * @author Mario Petrovic
     */
    createGeolocationsPolygons(geolocations: Geolocation[]): ol.layer.Vector {
        var polygonFeatures = [];

        for (let geolocation of geolocations) {
            var projectedCoordinates = [];

            for (let featurePoint of geolocation.geolocationPointses) {
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
    }

    /**
     * Navigates to specific location with zoom and animation
     * @author Mario Petrovic
     */
    navigateToLocation(coordinates: [number, number], callback?: Function, duration?: number, zoom?: number): void {
        this.map.getView().animate({
            center: ol.proj.fromLonLat([coordinates[0], coordinates[1]]),
            duration: duration != null && duration != undefined ? duration : 800,
            zoom: zoom ? zoom : 9
        }, () => {
            !callback || callback.call(this);
        });
    }



    /**
     * Creates layer vector for map
     * @author Mario Petrovic
     */
    createLayer(geoLocation: any, featureType: string): ol.layer.Vector {
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
    }

    /**
     * Parse Geo JSON - try out with method for auto parsing with OpeyLayers API
     * @author Mario Petrovic
     */
    parseGeoJson(geoJson: any) {
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
        }

        for (let coordLoop1 of geoJson.features[0].geometry.coordinates) {
            for (let coordLoop2 of coordLoop1) {
                for (let coordLoop3 of coordLoop2) {
                    var transformatedCoords = ol.proj.fromLonLat(<[number, number]>coordLoop3);
                    coordLoop3[0] = transformatedCoords[0];
                    coordLoop3[1] = transformatedCoords[1];
                }
            }
        }

        featureTemp.geometry.coordinates = geoJson.features[0].geometry.coordinates;

        geoJsonObject.features.push(featureTemp);

        return geoJsonObject;
    }

    /*--------- NG On Init ---------*/
    ngOnInit() {
        // Initital method to be executed when page loads
        this._appService.pageLoaded('', this);
        this._appService.languageChangeForComponent(this);

        // Varibales initialization
        this.componentAlert = new Alert(null, true);
        this.subscriptions = {};
        this.formErrors = new RestResponse();
        this.dataTableConfig = new DataTableConfig(10, true, 3, [5, 10, 20, 50, 100], true);

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

        this.moveEndEvent = (data) => {
            var currentMapZoom = this.map.getView().getZoom();

            if (currentMapZoom >= this._appService.getFrontendGeneric('mapZoomLevel', 11)) {
                var extent = ol.proj.transformExtent(this.map.getView().calculateExtent(this.map.getSize()), 'EPSG:3857', 'EPSG:4326');
                var centerCoordinates = ol.proj.toLonLat(this.map.getView().getCenter());

                var coordinates = {
                    center: centerCoordinates,
                    corner: extent.slice(2, 4)
                }

                //this.loadMapGeolocations(coordinates);
            }

            if (currentMapZoom < this._appService.getFrontendGeneric('mapZoomLevel', 11)) {
                this.map.removeLayer(this.geolocationPolygons);
            }
        }

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

        this.inspectMapGeolocations = (event: ol.MapBrowserEvent) => {
            var properties = [];
            this.map.forEachFeatureAtPixel(event.pixel, (feature: (ol.Feature | ol.render.Feature), layer: ol.layer.Layer) => {
                properties.push(feature.getProperties());
            })

            for (let featureProperty of properties) {
                if (featureProperty.istat || featureProperty.sub) {
                    this.inspectedGeolocation.istat = featureProperty.istat || '';
                    this.inspectedGeolocation.sub = featureProperty.sub || '';

                    var projectedCoordinates = ol.proj.toLonLat(event.coordinate);

                    var queryCoordinates = {
                        longitude: projectedCoordinates[0],
                        latitude: projectedCoordinates[1]
                    }

                    this.findGeolocationByCoordinates(this.inspectedGeolocation, queryCoordinates);
                    break;
                }

            }



        }
        this.map.on('click', this.inspectMapGeolocations);
    }

    /*--------- NG On Destroy ---------*/
    ngOnDestroy(): void {
        this._appService.refreshEmitters(this.subscriptions);
    }
}