import { Component, OnInit, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Http, Response } from '@angular/http';
import { Subscription } from 'rxjs'

import { TranslateService } from 'ng2-translate';
import { ModalDirective } from 'ng2-bootstrap';
import { MenuItem } from 'primeng/primeng';

import { KJGriConstants } from "./../kjgri.constants";
import { RestResponse } from "./../../kjcore/shared/models/restResponse.model";

import { AppService } from '../../kjcore/shared/services/app.service';
import { UtilityService } from "./../../kjcore/shared/services/utility.service";

import { KJGriHomeService } from "./kjgri.home.service";

import { GeoJsonServer, Risk, RiskSubtype, CompanyLocationGeo, RiskIndexes, RiskIndex, GeolocationSearchData, MeasurementType, PolygonFeature } from "./models";

import { CompanyLocation, KJGriCompany } from "./../kjgri_company_management/models";
import { Style } from "./../style_management/models";

import { Alert } from "./../../kjcore/shared/models";

import { ChartData } from "./../kjgri_shared/models";

import { Observable } from 'rxjs/Observable';

import { Address } from './models/address.model';

/**
 * Component for Home page
 * @author Mario Petrovic
 */
@Component({
    moduleId: module.id,
    templateUrl: 'kjgri.home.cmp.html',
    encapsulation: ViewEncapsulation.None
})
export class KJGriHomeCmp implements OnInit {
    // Common component variables
    subscriptions: { [key: string]: Subscription };
    componentAlert: Alert;

    // App variables
    risks: Risk[];
    forecasts: Risk[];
    measurementTypes: MeasurementType[];

    map: ol.Map;

    selectedRFFlag: string;
    selectedRFFlagSection: string;

    clientCompanies: KJGriCompany[];

    selectedSubtype: RiskSubtype | MeasurementType;
    selectedMeasureType: MeasurementType;

    companyLocations: CompanyLocationGeo[];
    selectedLocation: CompanyLocationGeo;
    selectedCompany: KJGriCompany;

    locationsList: ol.layer.Vector[];
    locationsVectorLayer: ol.layer.Vector;

    geolocationPoints: ol.layer.Vector;
    geolocationPolygons: any;

    companyLocationsPinStyles: { [id: string]: ol.style.Style };

    pinZoomState: boolean;
    moveEndEvent: Function;
    inspectMapGeolocations: Function;
    inspectedCoordinates: [number, number];
    inspectedGeolocation: { istat: string, sub: string, fId?: string, lsId?: string };

    navigationAnimationStatus: boolean;

    mapSelectedRiskIndexes: RiskIndexes;
    measurementObjectKeys: string[];
    mapSelectedLocationPoint: ol.layer.Vector;

    riskHistory: RiskIndex[];
    chartData: ChartData;

    mapClicked: boolean;

    riskIndexStyles: Style[];

    currentViewCoordinates: {
        center: [number, number],
        corner: [number, number]
    };
    moveMapTimeout: number;

    inspectedElement: 'companyLocation' | 'geolocation';
    mapChangeInterval: any;
    forecastValueMunicipality: any;

    maxDate: Date;
    minDate: Date;
    selectedDate: Date;
    selectedTime: number;
    dateChangeTimeout: number;

    addresses: Address[];
    searchActiveAddress: boolean;
    searchVector: ol.layer.Vector;

    q: any;
    nominatimTimeout: any;


    /*--------- Constructor --------*/
    constructor(
        private _appService: AppService,
        private _translateService: TranslateService,
        private _http: Http,
        private _utilityService: UtilityService,
        private _kjgriHomeService: KJGriHomeService,
        private _kjgriConstants: KJGriConstants,
        private _datePipe: DatePipe,
        private _changeDetectionRef: ChangeDetectorRef
    ) {
        this.measurementObjectKeys = ['relativeHumidity', 'precipitationProbability', 'rain', 'snow', 'soilMoisture', 'temperature2m', 'temperatureSkin', 'thunderstormIndex', 'windGust', 'windVelocity'];

        this.inspectedGeolocation = {
            istat: '',
            sub: ''
        }
    }

    /*--------- Methods with REST calls --------*/

    /**
     * Loads risky by type for accordion in side bar
     * @author Mario Petrovic
     */
    loadRisksByType(type: string, callback?: Function): void {
        this._utilityService.setAlert(this.componentAlert);

        this.subscriptions['loadRisksByType'] = this._kjgriHomeService.getRisksByType(type).subscribe(
            (res: RestResponse<Risk[]>) => {

                var global: Risk;
                if (type == 'R') {
                    this.risks = res.data;

                    global = this.risks.filter((item: Risk) => {
                        return item.code == 'GL';
                    })[0];
                    this.selectedSubtype = global.dicRiskSubtypeses[0];
                    this.selectedRFFlag = 'R';
                    this.selectedRFFlagSection = 'R';

                    this.risks.forEach((risk: Risk, index: number) => {
                        //Cuz of setting global to be first, we need to remove it first
                        if(risk.code == 'GL') this.risks.splice(index, 1);
                        risk.dicRiskSubtypeses.sort((a, b) => {
                            return a.name.localeCompare(b.name);
                        });
                    });
                    //Then push it to the start of the array
                    this.risks.unshift(global);

                    !callback || callback();
                } else {
                    this.forecasts = res.data;
                    let gl = this.forecasts.filter((item) => {
                        return item.code == 'GL';
                    })[0];
                    this.forecasts.forEach((forecast, index) => {
                        //Cuz of setting global to be first, we need to remove it first
                        if(forecast.code == 'GL') this.forecasts.splice(index, 1);
                        forecast.dicRiskSubtypeses.sort((a, b) => {
                            return a.name.localeCompare(b.name);
                        });
                    });
                    //Then push it to the start of the array
                    this.forecasts.unshift(gl);
                }


            },
            (err: RestResponse<null>) => {
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode);
            });
    }

    /**
     * Load client companies by search name value
     * @author Mario Petrovic
     */
    clientCompaniesSearch(companyName: string): void {
        this._utilityService.setAlert(this.componentAlert);
        this.subscriptions['clientCompaniesSearch'] = this._kjgriHomeService.getFilteredClientCompanies(companyName).subscribe(
            (res: RestResponse<KJGriCompany[]>) => {
                this.clientCompanies = res.data;
            },
            (err: RestResponse<null>) => {
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode);
            });
    }

    /**
     * Load client locations by search criterias
     * @author Mario Petrovic
     */
    loadGeolocations(selectedSubtype: number, rfFlag: string, coordinates: { center: [number, number], corner: number[] }): void {
        let date = this.selectedDate;
        date.setHours(this.selectedTime);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);

        var searchData: GeolocationSearchData = {
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
        this.subscriptions['loadGeolocations'] = this._kjgriHomeService.getGeolocations(searchData).subscribe(
            (res: RestResponse<any>) => {
                this.map.removeLayer(this.geolocationPolygons);
                let features = [];

                for(let name in res.data) {
                    if(name!='styles') {
                        for(let obj of res.data[name].features) {
                            features.push(obj);
                        }
                    }
                }

                this.riskIndexStyles = res.data['styles'];
                if(this.riskIndexStyles) {
                    this.riskIndexStyles.sort((a, b) => {
                        if(a.indexValue > b.indexValue) return 1;
                        if(a.indexValue < b.indexValue) return -1;
                        return 0;
                    });
                }

                var geoJsonTemp = {
                    type: 'FeatureCollection',
                    features: features
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

                if (this.mapClicked) {
                    this.map.removeLayer(this.mapSelectedLocationPoint);

                    if(!this.selectedLocation) !this.mapSelectedLocationPoint || this.map.addLayer(this.mapSelectedLocationPoint);

                    if(this.selectedSubtype.code != "LS" && this.selectedSubtype.code != "F" && this.inspectedGeolocation.istat && this.inspectedGeolocation.sub) {
                        !this.inspectedCoordinates || this.loadRiskHistroyForLocation(this.inspectedGeolocation.istat, this.inspectedGeolocation.sub, selectedSubtype, rfFlag);
                    }
                }

                if (this.selectedCompany) {
                    this.generateLocationPins();
                }

                
                //Fix for when you zoom 2 levels above designated
                //And then you zoom down below minimum quicker then the previous call executes
                //This checks if the end zoom whenever the call executes
                //Is below the minimum and removes geolocation layer
                let currentMapZoom = this.map.getView().getZoom();

                if(this.selectedSubtype.code == "F") {
                    if(currentMapZoom < this._appService.getFrontendGeneric('floodingZoomLevel', 14)) {
                        this.map.removeLayer(this.geolocationPolygons);
                        this.riskIndexStyles = null;
                    }
                } else if(this.selectedSubtype.code == "LS") {
                    if(currentMapZoom < this._appService.getFrontendGeneric('landslideZoomLevel', 12)) {
                        this.map.removeLayer(this.geolocationPolygons);
                        this.riskIndexStyles = null;
                    }
                } else {
                    if(currentMapZoom < this._appService.getFrontendGeneric('mapZoomLevel', 11)) {
                        this.map.removeLayer(this.geolocationPolygons);
                        this.riskIndexStyles = null;
                    }
                }

            },
            (err: RestResponse<null>) => {
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode);
            }
        )
    }

    /**
     * Load client locations by search criterias
     * @author Mario Petrovic
     */
    loadLocationsByCompany(selectedCompany: KJGriCompany, selectedSubtype: number, rfFlag: string, refresh: boolean = false): void {
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
        }

        this._utilityService.setAlert(this.componentAlert);
        this.subscriptions['loadLocationsByCompany'] = this._kjgriHomeService.getClientLocations(searchData).subscribe(
            (res: RestResponse<CompanyLocationGeo[]>) => {
                this.companyLocations = res.data;

                this.generateLocationPins();

                if(refresh && !this.selectedLocation) this.selectLocation(null);
                if(refresh && this.selectedLocation) this.closeRiskLegend();
            },
            (err: RestResponse<null>) => {
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode);
            }
        )
    }

    /**
     * Load client company locations from context based on selected subtype and rfFlag
     * @author Mario Petrovic
     */
    loadClientLocationsByContext(selectedSubtype: number, rfFlag: string, location: any = null) {
        var date = this.selectedDate;
        date.setHours(this.selectedTime);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);

        var searchData = {
            typeId: selectedSubtype,
            rfFlag: rfFlag,
            targetTimestamp: date.getTime()
        }

        this._utilityService.setAlert(this.componentAlert);
        this.subscriptions['loadClientLocationsByContext'] = this._kjgriHomeService.getClientLocationsByContext(searchData).subscribe(
            (res: RestResponse<CompanyLocationGeo[]>) => {
                this.companyLocations = res.data;

                this.generateLocationPins();

                this.map.removeLayer(this.locationsVectorLayer);
                this.map.addLayer(this.locationsVectorLayer);

                if(!location) this.selectLocation(null);
            },
            (err: RestResponse<null>) => {
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode);
            }
        )
    }

    /**
     * Loads all risk indxes for selected spot on the map
     * @author Mario Petrovic
     */
    loadAllRiskIndexesForLocation(istat: string, sub: string, coordinates: [number, number], toReset: boolean = false): void {
        this._utilityService.setAlert(this.componentAlert);

        var date = this.selectedDate;
        date.setHours(this.selectedTime);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);

        let data = {
            istat: istat,
            sub: sub,
            timestamp: date.getTime(),
            longitude: coordinates[0],
            latitude: coordinates[1],
            typeId: this.selectedSubtype.id,
            rfFlag: this.selectedRFFlag
        }
        
        this.subscriptions['loadAllRiskIndexesForLocation'] = this._kjgriHomeService.getAllRiskIndexesForLocation(data).subscribe(
            (res: RestResponse<RiskIndexes>) => {
                this.mapSelectedRiskIndexes = res.data;

                this.forecastValueMunicipality.name = res.data.name;
                this.forecastValueMunicipality.istat = res.data.istat;

                this.map.removeLayer(this.mapSelectedLocationPoint);

                if (this.mapSelectedRiskIndexes) {
                    if(!toReset) {
                        this.mapSelectedLocationPoint = this.createMapPoint(coordinates, 'inspect');
                        this.map.addLayer(this.mapSelectedLocationPoint);
                        this.mapClicked = true;
                        //Just reset selected location
                        //dont run all the logic from selectLocation function
                        this.selectedLocation = null;
                    }
                    if(this.mapSelectedRiskIndexes.riskIndexValueses) {
                        this.mapSelectedRiskIndexes.riskIndexValueses.sort((a, b) => {
                            return a.dicRiskSubtypes.name.localeCompare(b.dicRiskSubtypes.name);
                        });

                        let index = this.mapSelectedRiskIndexes.riskIndexValueses.findIndex((val) => val.dicRiskSubtypes.code == 'GL');
                        let global = this.mapSelectedRiskIndexes.riskIndexValueses[index];
                        if(global) {
                            global.value = parseInt(this.mapSelectedRiskIndexes.riskIndexValueses[index].value).toString();
                            this.mapSelectedRiskIndexes.riskIndexValueses.splice(index, 1);
                            this.mapSelectedRiskIndexes.riskIndexValueses.unshift(global);
                        }
                    }

                    if(this.mapSelectedRiskIndexes.forecastIndexValueses) {
                        this.mapSelectedRiskIndexes.forecastIndexValueses.sort((a, b) => {
                            return a.dicRiskSubtypes.name.localeCompare(b.dicRiskSubtypes.name);
                        });

                        let index = this.mapSelectedRiskIndexes.forecastIndexValueses.findIndex((val) => val.dicRiskSubtypes.code == 'GL');
                        let global = this.mapSelectedRiskIndexes.forecastIndexValueses[index];
                        if(global) {
                            global.value = parseInt(this.mapSelectedRiskIndexes.forecastIndexValueses[index].value).toString();
                            this.mapSelectedRiskIndexes.forecastIndexValueses.splice(index, 1);
                            this.mapSelectedRiskIndexes.forecastIndexValueses.unshift(global);
                        }
                    }

                } else {
                    this._utilityService.setAlert(this.componentAlert, res.message, 204);
                    this.mapClicked = false;
                    this.inspectedCoordinates = null;
                }

            },
            (err: RestResponse<null>) => {
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode);
            }
        );
    }

    /**
     * Loads all risk indxes for selected spoton the map
     * @author Mario Petrovic
     */
    loadAllRiskIndexesForCompanyLocation(companyId: number): void {
        this._utilityService.setAlert(this.componentAlert);

        var date = this.selectedDate;
        date.setHours(this.selectedTime);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);

        let data = {
            companyLocationId: companyId,
            targetTimestamp: date.getTime(),
            typeId: this.selectedSubtype.id,
            rfFlag: this.selectedRFFlag
        }

        this.subscriptions['loadAllRiskIndexesForCompanyLocation'] = this._kjgriHomeService.getAllRiskIndexesForCompanyLocation(data).subscribe(
            (res: RestResponse<RiskIndexes>) => {
                this.mapSelectedRiskIndexes = res.data;

                let index = this.mapSelectedRiskIndexes.riskIndexValueses.findIndex((val) => val.dicRiskSubtypes.code == 'GL');
                this.mapSelectedRiskIndexes.riskIndexValueses[index].value = parseInt(this.mapSelectedRiskIndexes.riskIndexValueses[index].value).toString();

                if(this.mapSelectedRiskIndexes.riskIndexValueses) {
                    this.mapSelectedRiskIndexes.riskIndexValueses.sort((a, b) => {
                        return a.dicRiskSubtypes.name.localeCompare(b.dicRiskSubtypes.name);
                    });

                    let index = this.mapSelectedRiskIndexes.riskIndexValueses.findIndex((val) => val.dicRiskSubtypes.code == 'GL');
                    let global = this.mapSelectedRiskIndexes.riskIndexValueses[index];
                    if(global) {
                        global.value = parseInt(this.mapSelectedRiskIndexes.riskIndexValueses[index].value).toString();
                        this.mapSelectedRiskIndexes.riskIndexValueses.splice(index, 1);
                        this.mapSelectedRiskIndexes.riskIndexValueses.unshift(global);
                    }
                }

                if(this.mapSelectedRiskIndexes.forecastIndexValueses) {
                    this.mapSelectedRiskIndexes.forecastIndexValueses.sort((a, b) => {
                        return a.dicRiskSubtypes.name.localeCompare(b.dicRiskSubtypes.name);
                    });

                    let index = this.mapSelectedRiskIndexes.forecastIndexValueses.findIndex((val) => val.dicRiskSubtypes.code == 'GL');
                    let global = this.mapSelectedRiskIndexes.forecastIndexValueses[index];
                    if(global) {
                        global.value = parseInt(this.mapSelectedRiskIndexes.forecastIndexValueses[index].value).toString();
                        this.mapSelectedRiskIndexes.forecastIndexValueses.splice(index, 1);
                        this.mapSelectedRiskIndexes.forecastIndexValueses.unshift(global);
                    }
                }

                this.forecastValueMunicipality.istat = res.data.istat;
                this.forecastValueMunicipality.name = res.data.name;
                this.inspectedGeolocation.istat = res.data.istat;
                this.inspectedGeolocation.sub = res.data.sub;

                !res.data || (this.mapClicked = true);
            },
            (err: RestResponse<null>) => {
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode);
            }
        );
    }

    /**
     * Loads all risk history for company location
     * @author Mario Petrovic
     */
    loadRiskHistroy(locationId: number, subriskId: number, rfFlag: string): void {
        this._utilityService.setAlert(this.componentAlert);

        this.subscriptions['loadRiskHistroy'] = this._kjgriHomeService.getRiskHistory(locationId, subriskId, rfFlag).last().subscribe(
            (res: RestResponse<RiskIndex[]>) => {
                this.riskHistory = res.data;

                //Convert decimal indexValue to integer
                if(this.selectedSubtype.code == 'GL') {
                    this.riskHistory.forEach((val, index) => {
                        val.indexValue = this.selectedRFFlag == 'R' ? parseInt(val.indexValue.toString()).toString() : parseInt(val.value.toString()).toString();
                    });
                }
            },
            (err: RestResponse<null>) => {
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode);
            }
        );
    }

    /**
     * Loads all risk history for selected location from the map
     * @author Mario Petrovic
     */
    loadRiskHistroyForLocation(istat: string, sub: string, subriskId: number, rfFlag: string): void {
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
        }

        this._utilityService.setAlert(this.componentAlert);

        if ((this._appService.frontendGenerics.riskHistoryHomepage && this.selectedRFFlag == 'R') || (this._appService.frontendGenerics.forecastHistoryHomepage && this.selectedRFFlag == 'F') || (this._appService.frontendGenerics.forecastHistoryHomepage && this.selectedRFFlag == 'M')) {
            this.subscriptions['loadRiskHistroy'] = this._kjgriHomeService.getRiskHistoryForLocation(searchData).subscribe(
                (res: RestResponse<RiskIndex[]>) => {
                    this.riskHistory = res.data;

                    !this.riskHistory || this.riskHistory.sort((a: any, b: any) => {
                        return this.selectedRFFlag == 'R' ? a.measurementDate - b.measurementDate : a.targetTimestamp - b.targetTimestamp;
                    })
                },
                (err: RestResponse<null>) => {
                    this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode);
                }
            );
        }
    }

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
    loadMeasurementTypes(): void {
        this._utilityService.setAlert(this.componentAlert);
        this.subscriptions['loadMeasurementTypes'] = this._kjgriHomeService.getMeasurementTypes().subscribe(
            (res: RestResponse<MeasurementType[]>) => {
                this.measurementTypes = res.data;
                this.measurementTypes.sort((a, b) => {
                    return a.displayName.localeCompare(b.displayName);
                });
            },
            (err: RestResponse<null>) => {
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode);
            }
        );
    }


    /*--------- App logic --------*/

    /**
     * Used to prevent risk history
     * from executing after changing
     * to another category/rest call
     * 
     * @author Nikola Gavric
     */
    private _cancelRiskHistoryCall(): void {
        //Prevent from continuing to load risk history after
        //switching from floods or landslides to something else
        //let subscription = (<Subscription>this.subscriptions['loadRiskHistroy']);
        //if(subscription) subscription.unsubscribe();
    }

    /**
     * On click event method for selecting subrisk
     * @author Mario Petrovic
     */
    selectSubrisk(riskSubtype: RiskSubtype | MeasurementType, rfFlag: string): void {
        this.selectedSubtype = riskSubtype;
        this.selectedRFFlag = rfFlag;

        if(this.map.getView().getZoom() < this._appService.getFrontendGeneric('mapZoomLevel', 11)) {
            this.riskIndexStyles = [];
        }
        if(this.selectedLocation) {
            //To trigger the update of everything
            //and to show the right map legend
            this.selectLocation(this.selectedLocation);
        } else {
            this.closeRiskLegend();
        }

        //this.loadRiskIndexStyles(rfFlag, riskSubtype.id);

        this.changeMapParameters();
    }

    incrementTime(): void {
        if(+this.selectedTime == 23) this.selectedTime = 0;
        else this.selectedTime = +this.selectedTime + 1;

        if(+this.selectedTime <= 23 && +this.selectedTime >= 0) {
            let currentMapZoom = this.map.getView().getZoom();

            if((this.selectedSubtype.code == "F" && currentMapZoom >= this._appService.getFrontendGeneric('floodingZoomLevel', 14)) ||
            (this.selectedSubtype.code == "LS" && currentMapZoom >= this._appService.getFrontendGeneric('landslideZoomLevel', 12)) ||
            (this.selectedSubtype.code != "F" && this.selectedSubtype.code != "LS" && currentMapZoom >= this._appService.getFrontendGeneric('mapZoomLevel', 11)) ||
            ((this.companyLocations && this.companyLocations.length > 0) || (this.inspectedGeolocation && this.inspectedGeolocation.istat && this.inspectedGeolocation.sub))) {
                this.onDateChange();
            }
        }
    }

    decrementTime(): void {
        if(+this.selectedTime == 0) this.selectedTime = 23;
        else this.selectedTime = +this.selectedTime - 1;

        if(+this.selectedTime <= 23 && +this.selectedTime >= 0) {
            let currentMapZoom = this.map.getView().getZoom();

            if((this.selectedSubtype.code == "F" && currentMapZoom >= this._appService.getFrontendGeneric('floodingZoomLevel', 14)) ||
            (this.selectedSubtype.code == "LS" && currentMapZoom >= this._appService.getFrontendGeneric('landslideZoomLevel', 12)) ||
            (this.selectedSubtype.code != "F" && this.selectedSubtype.code != "LS" && currentMapZoom >= this._appService.getFrontendGeneric('mapZoomLevel', 11)) ||
            ((this.companyLocations && this.companyLocations.length > 0) || (this.inspectedGeolocation && this.inspectedGeolocation.istat && this.inspectedGeolocation.sub))) {
                this.onDateChange();
            }
        }
    }

    /**
     * On slider change event method
     * @author Nikola Gavric
     */
    onDateChange(): void {
        this.selectedDate.setHours(this.selectedTime);
        if(this.selectedDate && this.selectedTime!=null && (+this.selectedTime <= 23 && +this.selectedTime >= 0)) {
            clearTimeout(this.dateChangeTimeout);
            this.dateChangeTimeout = setTimeout(() => {
                this.changeMapParameters();

                if (this.mapClicked) {
                    if (this.inspectedElement === 'geolocation' && this.inspectedGeolocation.istat && this.inspectedGeolocation.sub) {
                        this.loadAllRiskIndexesForLocation(this.inspectedGeolocation.istat, this.inspectedGeolocation.sub, this.inspectedCoordinates);
                    } else if (this.inspectedElement === 'companyLocation') {
                        if (this.selectedLocation) {
                            this.loadAllRiskIndexesForCompanyLocation(this.selectedLocation.companyLocation.id);
                        }
                    }
                }
            }, 800);
        }
    }

    /**
     * Method for loading geolocations when parameters change
     * @author Mario Petrovic
     */
    changeMapParameters(): void {
        if (this._appService.isAuthorised([KJGriConstants.ROLES.GOLD_A, KJGriConstants.ROLES.PLATINUM_A, KJGriConstants.ROLES.SILVER_A, KJGriConstants.ROLES.SUPER_ADMIN])) {
            var currentMapZoom = this.map.getView().getZoom();
            var extent = ol.proj.transformExtent(this.map.getView().calculateExtent(this.map.getSize()), 'EPSG:3857', 'EPSG:4326');
            var centerCoordinates = ol.proj.toLonLat(this.map.getView().getCenter());

            var coordinates = {
                center: centerCoordinates,
                corner: extent.slice(2, 4)
            }

            if(this.selectedCompany) this.loadLocationsByCompany(this.selectedCompany, this.selectedSubtype.id, this.selectedRFFlag);

            if(this.selectedSubtype.code == "F") {
                if(currentMapZoom >= this._appService.getFrontendGeneric('floodingZoomLevel', 14)) {
                    this.loadGeolocations(this.selectedSubtype.id, this.selectedRFFlag, coordinates);
                } else {
                    this.map.removeLayer(this.geolocationPolygons);
                }
            } else if(this.selectedSubtype.code == "LS") {
                if(currentMapZoom >= this._appService.getFrontendGeneric('landslideZoomLevel', 12)) {
                    this.loadGeolocations(this.selectedSubtype.id, this.selectedRFFlag, coordinates);
                } else {
                    this.map.removeLayer(this.geolocationPolygons);
                }
            } else {
                if(currentMapZoom >= this._appService.getFrontendGeneric('mapZoomLevel', 11)) {
                    this.loadGeolocations(this.selectedSubtype.id, this.selectedRFFlag, coordinates);
                }
            }
        } else {
            this.loadClientLocationsByContext(this.selectedSubtype.id, this.selectedRFFlag, this.selectedLocation);
        }
    }

    /**
     * On click event method for selecting section
     * @author Mario Petrovic
     */
    selectRFSection(section: string, subtype: any): void {
        if(this.selectedRFFlagSection == section)
            this.selectedRFFlagSection = null;
        else
            this.selectedRFFlagSection = section;

        setTimeout(() => {
            if(this.selectedRFFlagSection) {
                if(subtype && (section == 'R' || section == 'F')) {
                    this.selectSubrisk(subtype.dicRiskSubtypeses[0], this.selectedRFFlagSection);
                } else if(section == 'M') {
                    this.selectSubrisk(this.measurementTypes[0], this.selectedRFFlagSection);
                } else {
                    throw new Error('Error on line 624');
                }
            }
        });
    }

    /**
     * Calculate zoom to integer
     * 
     * @author Nikola Gavric
     */
    calculateZoom(): number {
        return Math.round(this.map.getView().getZoom());
    }

    /**
     * Calculate zoom to integer
     * 
     * @author Nikola Gavric
     */
    calculateAllowedZoom(): number {
        if(this.selectedSubtype) {
            if(this.selectedSubtype.code == 'F') {
                return this._appService.getFrontendGeneric('floodingZoomLevel', 14);
            } else if(this.selectedSubtype.code == 'LS') {
                return this._appService.getFrontendGeneric('landslideZoomLevel', 12);
            }
        }

        return this._appService.getFrontendGeneric('mapZoomLevel', 11);
    }

    /**
     * On click event to select location from company location list
     * @author Mario Petrovic
     */
    selectLocation(companyLocation: CompanyLocationGeo, showAll: boolean = false): void {
        this.selectedLocation = companyLocation;
        
        if(this._appService.isAuthorised([KJGriConstants.ROLES.PLATINUM_I, KJGriConstants.ROLES.GOLD_I, KJGriConstants.ROLES.SILVER_I])) {
            if(!this.selectedLocation) {
                this.closeRiskLegend();
                this.inspectedGeolocation.istat = null;
                this.inspectedGeolocation.sub = null;
            }
        }

        if(this.selectedLocation || showAll) {
            this.mapClicked = false;
            this.inspectedCoordinates = null;
            this.map.removeLayer(this.mapSelectedLocationPoint);
        }

        //If show all is clicked, dont allow
        //buttons which show history to be clickable
        if(showAll) {
            this.riskHistory = null;
        }

        if (this.companyLocations.length > 0 && this.selectedLocation) {
            this.clearSearchAddress();
            
            if(!this._appService.isAuthorised([KJGriConstants.ROLES.PLATINUM_I, KJGriConstants.ROLES.GOLD_I, KJGriConstants.ROLES.SILVER_I])) {
                if (!this.mapClicked) {
                    this.map.removeLayer(this.mapSelectedLocationPoint);
                } else {
                    this.map.removeLayer(this.mapSelectedLocationPoint);
                    this.map.addLayer(this.mapSelectedLocationPoint);
                }
            }

            let currentMapZoom = this.map.getView().getZoom();
            this.map.getView().setCenter(ol.proj.transform([this.selectedLocation.companyLocation.longitude, this.selectedLocation.companyLocation.latitude], 'EPSG:4326', 'EPSG:3857'));
            
            if(this.selectedSubtype.code == "F") {
                if(currentMapZoom <= this._appService.getFrontendGeneric('floodingZoomLevel', 14)) {
                    this.map.getView().setZoom(this._appService.getFrontendGeneric('floodingZoomLevel', 14));
                }
            } else if(this.selectedSubtype.code == "LS") {
                if(currentMapZoom <= this._appService.getFrontendGeneric('landslideZoomLevel', 12)) {
                    this.map.getView().setZoom(this._appService.getFrontendGeneric('landslideZoomLevel', 12));
                }
            } else {
                if(currentMapZoom <= this._appService.getFrontendGeneric('mapZoomLevel', 11)) {
                    this.map.getView().setZoom(this._appService.getFrontendGeneric('mapZoomLevel', 11));
                }
            }
            
            this.loadAllRiskIndexesForCompanyLocation(this.selectedLocation.companyLocation.id);
            if (this._appService.frontendGenerics.forecastHistoryHomepage) {
                this.loadRiskHistroy(this.selectedLocation.companyLocation.id, this.selectedSubtype.id, this.selectedRFFlag);
            }
            this.inspectedElement = 'companyLocation';
        } else {
            if (Array.isArray(this.companyLocations) && this.companyLocations.length > 1) {
                this.map.getView().fit(this.locationsVectorLayer.getSource().getExtent());
                this.map.getView().setZoom(this.getCalculatedZoom(this.map.getView().calculateExtent(this.map.getSize()), this.locationsVectorLayer.getSource().getExtent()));
            } else if (!Array.isArray(this.companyLocations) || this.companyLocations.length == 1) {
                let location = this.companyLocations[0];
                this.map.getView().setCenter(ol.proj.transform([location.companyLocation.longitude, location.companyLocation.latitude], 'EPSG:4326', 'EPSG:3857'));
            }
        }
    }

    /**
     * Calculate zoom level
     * @param map ol.proj.Extent
     * @param point ol.proj.Extent
     * @author Nikola Gavric
     */
    getCalculatedZoom(map: [number, number, number, number], point: [number, number, number, number]): number {
        let mapX = [map[0], map[2]];
        let mapY = [map[1], map[3]];
        let pointX = [point[0], point[2]];
        let pointY = [point[1], point[3]];
        //30600 is the pin height number
        let isOverflow = (pointY[0] - mapY[0]) < 30600;
        return isOverflow ? this.map.getView().getZoom()-1 : this.map.getView().getZoom();
    }

    /**
     * Method fires on onClick event of lazyloadDropdown
     * @author Mario Petrovic
     */
    onCompanyClear(): void {
        if(this.selectedLocation) this.closeRiskLegend();

        this.selectedLocation = null;
        this.selectedCompany = null;
        this.companyLocations = null;

        this.map.removeLayer(this.locationsVectorLayer);
    }

    /**
     * Shows modal with chart for history
     * @author Mario Petrovic
     */
    showChart(riskHistory: any[], chartModal: ModalDirective): void {
        this.chartData = null;

        setTimeout(() => {
            this.chartData = new ChartData();

            let value = [];
            let dates = [];
            for (let risk of riskHistory) {
                if (this.selectedRFFlag == 'R') {
                    this.chartData.labels.push(this._datePipe.transform(risk.measurementDate, 'yyyy'));
                    if(risk.dicRiskSubtypes.code == 'GL') {
                        value.push(risk.indexValue);
                    } else {
                        value.push(risk.numericValue);
                    }
                } else {
                    dates.push(new Date(risk.targetTimestamp));
                    value.push(risk.value);
                }
            }

            this.chartData.labels.sort();

            if(this.selectedRFFlag == 'F' || this.selectedRFFlag == 'M') {
                dates.sort((left,right) => left < right ? -1 : left > right ? 1 : 0);
                dates.forEach((val) => {
                    this.chartData.labels.push(this._datePipe.transform(val, 'dd.MM.yyyy HH') + 'h');
                });
            }

            this.chartData.datasets.push({
                label: this.selectedSubtype.name,
                data: value,
                fill: false,
                borderColor: '#4bc0c0'
            })


            chartModal.show();
        });
    }

    /**
     * Navigates to history page based on the role
     * @author Mario Petrovic
     */
    goToHistory(location: CompanyLocationGeo, selectedCompany: KJGriCompany): void {
        if (this._appService.isAuthorised([KJGriConstants.ROLES.SUPER_ADMIN, KJGriConstants.ROLES.PLATINUM_A])) {
            // AppService.router.navigate(['history', location.companyLocation.id]);

            window.open("#/history/" + location.companyLocation.id + '/' + selectedCompany.id);
        } else {
            // AppService.router.navigate(['history', location.companyLocation.id, selectedCompany.id]);

            window.open("#/history/" + location.companyLocation.id);
        }
    }

    // ---------- Utility ------------- //

    /**
     * Hide modal based on passed modal directive
     * @author Mario Petrovic
     */
    public hideModal(modal: ModalDirective) {
        modal.hide();
    }

    // ---------- Map methods ------------- //

    /**
     * Method for generating location pins
     * @author Mario Petrovic
     */
    generateLocationPins(): void {
        this.map.removeLayer(this.locationsVectorLayer);
        // for (let location of this.locationsList) {
        //     this.map.removeLayer(location);
        // }

        var iconFeatures = [];

        // this.locationsList = [];

        for (let companyLocation of this.companyLocations) {
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
            style: (feature) => {
                var style = new ol.style.Style({
                    image: new ol.style.Icon(/** @type {olx.style.IconOptions} */({
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
                        font: feature.getProperties()['properties'].index != 'null' && feature.getProperties()['properties'].index != '-1'?(45/feature.getProperties()['properties'].index.length) >= 16 ? '16px sans-serif' : (45/feature.getProperties()['properties'].index.length)+'px sans-serif':'16px sans-serif'
                    })
                });

                return style;
            }
        });

        this.map.addLayer(this.locationsVectorLayer);
    }

    /**
     * Navigates to specific location with zoom and animation
     * @author Mario Petrovic
     */
    navigateToLocation(coordinates: [number, number], callback?: Function, duration?: number, zoom?: number): void {
        this.map.getView().animate({
            center: ol.proj.fromLonLat([coordinates[0], coordinates[1]]),
            duration: duration != null && duration != undefined ? duration : 800,
            zoom: zoom ? zoom : this._appService.getFrontendGeneric('mapZoomLevel', 11)
        }, () => {
            !callback || callback.call(this);
        });
    }

    /**
     * Parse Geo JSON - try out with method for auto parsing with OpeyLayers API
     * @author Mario Petrovic
     */
    parseGeoJson(geoJson: GeoJsonServer) {
        var geoJsonObject = {
            type: 'FeatureCollection',
            features: []
        };

        for (let item of geoJson.features) {
            var featureTemp = {
                id: item.id,
                geometry: {
                    type: item.geometry.type,
                    coordinates: []
                },
                type: item.type,
                properties: item.properties
            }

            if (item.geometry.type == 'Point') {
                featureTemp.geometry.coordinates = ol.proj.fromLonLat(<[number, number]>item.geometry.coordinates);
            } else {
                for (let coordLoop1 of item.geometry.coordinates) {
                    switch (item.geometry.type) {
                        case 'LineString':
                            var transformatedCoords = ol.proj.fromLonLat(<[number, number]>coordLoop1);
                            coordLoop1[0] = transformatedCoords[0];
                            coordLoop1[1] = transformatedCoords[1];
                            break;

                        case 'Polygon':
                            for (let coordLoop2 of coordLoop1) {
                                var transformatedCoords = ol.proj.fromLonLat(<[number, number]>coordLoop2);
                                coordLoop2[0] = transformatedCoords[0];
                                coordLoop2[1] = transformatedCoords[1];
                            }
                            break;

                        case 'MultiPolygon':
                            for (let coordLoop2 of coordLoop1) {
                                for (let coordLoop3 of coordLoop2) {
                                    var transformatedCoords = ol.proj.fromLonLat(<[number, number]>coordLoop3);
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
    }

    /**
     * Generate style object for purpose of rendering elements on the map
     * @author Mario Petrovic
     */
    generateStyle(geoJson: any, featureType: string, iconIndexValues?: boolean): { [id: string]: ol.style.Style } {
        var styles: { [id: string]: ol.style.Style } = {}

        // If style is intended for polygons
        if (featureType != 'Pins') {
            for (let i = 0; i < 12; i++) {
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
                } else {
                    break;
                }
            }
        }

        // If style is intended for pins
        if (featureType == 'Pins') {
            for (let i = 0; i <= 10; i++) {
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
    }

    /**
     * Creates layer vector for map
     * @author Mario Petrovic
     */
    createLayer(geoLocation: any, featureType: string): ol.layer.Vector {
        var geoJson = this.parseGeoJson(geoLocation);

        var style = this.generateStyle(geoLocation, featureType);

        var styleFunction = (feature) => {
            return style[feature.getProperties().index.toString()];
        };

        var vectorSource = new ol.source.Vector({
            features: (new ol.format.GeoJSON()).readFeatures(geoJson)
        });

        return new ol.layer.Vector({
            source: vectorSource,
            style: styleFunction,
        });
    }

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

        var srcUrl = suffix == 'inspect' ? 'app/kjgri/assets/images/marker_pointer_new.png' : 'rest/admin/home/pin/' + suffix;

        var iconStyle = new ol.style.Style({
            image: new ol.style.Icon(/** @type {olx.style.IconOptions} */({
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
    }

    /**
     * Closes risk legend on the map 
     * @author Nikola Gavric
     */
    closeRiskLegend(): void {
        this.mapSelectedRiskIndexes = null;
        this.riskHistory = null;
        this.mapClicked = false;
        this.inspectedCoordinates = null;
        if(this.selectedLocation) this.selectLocation(null);
        this.map.removeLayer(this.mapSelectedLocationPoint);
    }

    /**
     * Gets minimum and maximum dates for date picker
     * under the map.
     * 
     * @author Nikola Gavric
     */
    public loadMinAndMaxDates(): void {
        this.subscriptions['loadMinAndMaxDates'] = this._kjgriHomeService.getMinAndMaxDates().subscribe(
            (res: RestResponse<any>) => {
                this.maxDate = new Date(res.data.maxDate);
                this.minDate = new Date(res.data.minDate);
            },
            (err: RestResponse<null>) => {
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode);
            }
        )
    }

    public loadData(): void {
        // Init methods
        this.loadMinAndMaxDates();
        this.loadRisksByType('R', () => {
            var roles = [KJGriConstants.ROLES.PLATINUM_I, KJGriConstants.ROLES.GOLD_I, KJGriConstants.ROLES.SILVER_I]
            if (this._appService.isAuthorised(roles)) {
                this.loadClientLocationsByContext(this.selectedSubtype.id, this.selectedRFFlag);

                this.inspectMapGeolocations = (event: ol.MapBrowserEvent) => {
                    //Clear search list if clicked on map
                    if(!this.addresses) {
                        let properties = [];
                        this.map.forEachFeatureAtPixel(event.pixel, (feature: (ol.Feature | ol.render.Feature), layer: ol.layer.Layer) => {
                            properties.push(feature.getProperties());
                        });

                        for (let featureProperty of properties) {
                            if (featureProperty.properties && featureProperty.properties.companyId != undefined) {
                                this.map.removeLayer(this.mapSelectedLocationPoint);
                                //If company is found select location
                                //prevents multiple same calls
                                let isFound: boolean = false;
                                let index: string = null;

                                this.loadAllRiskIndexesForCompanyLocation(featureProperty.properties.companyId);
                                if (this._appService.frontendGenerics.riskHistoryHomepage) {
                                    this.loadRiskHistroy(featureProperty.properties.companyId, this.selectedSubtype.id, this.selectedRFFlag);
                                }

                                for (let locationIndex in this.companyLocations) {
                                    if (this.companyLocations[locationIndex].companyLocation.id == featureProperty.properties.companyId) {
                                        isFound = true;
                                        index = locationIndex;
                                    }
                                }

                                if(isFound) {
                                    this.selectLocation(this.companyLocations[index]);
                                    this.navigateToLocation([this.selectedLocation.companyLocation.longitude, this.selectedLocation.companyLocation.latitude]);
                                } else {
                                    this.loadAllRiskIndexesForCompanyLocation(featureProperty.properties.companyId);

                                    if (this._appService.frontendGenerics.riskHistoryHomepage) {
                                        this.loadRiskHistroy(featureProperty.properties.companyId, this.selectedSubtype.id, this.selectedRFFlag);
                                    }
                                }

                                this.inspectedElement = 'companyLocation';
                                break;
                            }
                        }
                    } else {
                        this.clearSearchAddress();
                    }

                }
                this.map.on('click', this.inspectMapGeolocations);
            } else {
                //this.loadRiskIndexStyles(this.selectedRFFlag, this.selectedSubtype.id);
                if (this._appService.isAuthorised([KJGriConstants.ROLES.GOLD_A, KJGriConstants.ROLES.PLATINUM_A, KJGriConstants.ROLES.SILVER_A, KJGriConstants.ROLES.SUPER_ADMIN])) {
                    this.clientCompaniesSearch('');

                    this.moveEndEvent = (data) => {
                        var currentMapZoom = this.map.getView().getZoom();
                        var extent = ol.proj.transformExtent(this.map.getView().calculateExtent(this.map.getSize()), 'EPSG:3857', 'EPSG:4326');
                        var centerCoordinates = ol.proj.toLonLat(this.map.getView().getCenter());

                        var coordinates = {
                            center: centerCoordinates,
                            corner: extent.slice(2, 4)
                        }

                        clearTimeout(this.moveMapTimeout);
                        
                        // this.moveMapTimeout = setTimeout(() => {
                        if(this.selectedSubtype.code == "F") {
                            if(currentMapZoom >= this._appService.getFrontendGeneric('floodingZoomLevel', 14)) {
                                this.loadGeolocations(this.selectedSubtype.id, this.selectedRFFlag, coordinates);
                            } else {
                                this.map.removeLayer(this.geolocationPolygons);
                            }
                        } else if(this.selectedSubtype.code == "LS") {
                            if(currentMapZoom >= this._appService.getFrontendGeneric('landslideZoomLevel', 12)) {
                                this.loadGeolocations(this.selectedSubtype.id, this.selectedRFFlag, coordinates);
                            } else {
                                this.map.removeLayer(this.geolocationPolygons);
                            }
                        } else {
                            if(currentMapZoom >= this._appService.getFrontendGeneric('mapZoomLevel', 11)) {
                                this.loadGeolocations(this.selectedSubtype.id, this.selectedRFFlag, coordinates);
                            }
                        }
                        // }, 1000);

                        if (currentMapZoom < this._appService.getFrontendGeneric('mapZoomLevel', 11)) {
                            this.riskIndexStyles = null;
                            this.map.removeLayer(this.geolocationPolygons);
                        }
                    }

                    this.map.on('moveend', this.moveEndEvent);

                    this.inspectMapGeolocations = (event: ol.MapBrowserEvent) => {
                        //Clear search list if clicked on map
                        if(!this.addresses) {
                            let currentMapZoom = this.map.getView().getZoom();

                            var properties = [];
                            let isCompanyLocation = false;
                            this.map.forEachFeatureAtPixel(event.pixel, (feature: (ol.Feature | ol.render.Feature), layer: ol.layer.Layer) => {
                                let property = feature.getProperties();
                                properties.push(property);
                            });

                            properties.some((value, index) => {
                                isCompanyLocation = value.hasOwnProperty('properties')?value.properties.hasOwnProperty('companyId'):false;
                                return isCompanyLocation;
                            });

                            for (let featureProperty of properties) {
                                this.inspectedGeolocation.istat = featureProperty.istat;// || this.inspectedGeolocation.istat;
                                this.inspectedGeolocation.sub = featureProperty.sub;// || this.inspectedGeolocation.sub;

                                if (featureProperty.properties && featureProperty.properties.companyId != undefined) {
                                    this.map.removeLayer(this.mapSelectedLocationPoint);
                                    //If company is found select location
                                    //prevents multiple same calls
                                    let isFound: boolean = false;
                                    let index: string = null;

                                    for (let locationIndex in this.companyLocations) {
                                        if (this.companyLocations[locationIndex].companyLocation.id == featureProperty.properties.companyId) {
                                            isFound = true;
                                            index = locationIndex;
                                        }
                                    }

                                    if(isFound) {
                                        this.selectLocation(this.companyLocations[index]);
                                        //this.navigateToLocation([this.selectedLocation.companyLocation.longitude, this.selectedLocation.companyLocation.latitude]);
                                    } else {
                                        this.loadAllRiskIndexesForCompanyLocation(featureProperty.properties.companyId);

                                        if (this._appService.frontendGenerics.riskHistoryHomepage) {
                                            this.loadRiskHistroy(featureProperty.properties.companyId, this.selectedSubtype.id, this.selectedRFFlag);
                                        }
                                    }

                                    this.inspectedElement = 'companyLocation';
                                }
                            }

                            if(!this.selectedLocation) {
                                if(this.selectedSubtype.code == "F") {
                                    if(currentMapZoom < this._appService.getFrontendGeneric('floodingZoomLevel', 14)) {
                                        this.map.getView().setZoom(this._appService.getFrontendGeneric('floodingZoomLevel', 14));
                                        this.map.getView().centerOn(event.coordinate, [50, 50], [0, 0]);
                                    } else {
                                        if(properties.length == 0) {
                                            this.inspectedGeolocation.istat = null;
                                            this.inspectedGeolocation.sub = null;
                                            this.closeRiskLegend();
                                        }
                                        this.loadRiskHistoryAndGeneratePin(event, isCompanyLocation);
                                    }
                                } else if(this.selectedSubtype.code == "LS") {
                                    if(currentMapZoom < this._appService.getFrontendGeneric('landslideZoomLevel', 12)) {
                                        this.map.getView().setZoom(this._appService.getFrontendGeneric('landslideZoomLevel', 12));
                                        this.map.getView().centerOn(event.coordinate, [50, 50], [0, 0]);
                                    } else {
                                        if(properties.length == 0) {
                                            this.inspectedGeolocation.istat = null;
                                            this.inspectedGeolocation.sub = null;
                                            this.closeRiskLegend();
                                        }
                                        this.loadRiskHistoryAndGeneratePin(event, isCompanyLocation);
                                    }
                                } else {
                                    if(currentMapZoom < this._appService.getFrontendGeneric('mapZoomLevel', 11)) {
                                        this.map.getView().setZoom(this._appService.getFrontendGeneric('mapZoomLevel', 11));
                                        this.map.getView().centerOn(event.coordinate, [50, 50], [0, 0]);
                                    } else {
                                        if(properties.length == 0) {
                                            this.inspectedGeolocation.istat = null;
                                            this.inspectedGeolocation.sub = null;
                                            this.closeRiskLegend();
                                        }
                                        this.loadRiskHistoryAndGeneratePin(event, isCompanyLocation);
                                    }
                                }
                            } else {
                                if(properties.length == 0) {
                                    this.inspectedGeolocation.istat = null;
                                    this.inspectedGeolocation.sub = null;
                                }
                                if(!isCompanyLocation) {
                                    if(this.selectedSubtype.code == "F") {
                                        if(currentMapZoom < this._appService.getFrontendGeneric('floodingZoomLevel', 14)) {
                                            this.map.getView().setZoom(this._appService.getFrontendGeneric('floodingZoomLevel', 14));
                                            this.map.getView().centerOn(event.coordinate, [50, 50], [0, 0]);
                                        }
                                    } else if(this.selectedSubtype.code == "LS") {
                                        if(currentMapZoom < this._appService.getFrontendGeneric('landslideZoomLevel', 12)) {
                                            this.map.getView().setZoom(this._appService.getFrontendGeneric('landslideZoomLevel', 12));
                                            this.map.getView().centerOn(event.coordinate, [50, 50], [0, 0]);
                                        }
                                    } else {
                                        if(currentMapZoom < this._appService.getFrontendGeneric('mapZoomLevel', 11)) {
                                            this.map.getView().setZoom(this._appService.getFrontendGeneric('mapZoomLevel', 11));
                                            this.map.getView().centerOn(event.coordinate, [50, 50], [0, 0]);
                                        }
                                    }
                                }
                                this.loadRiskHistoryAndGeneratePin(event, isCompanyLocation);
                            }
                        } else {
                            this.clearSearchAddress();
                        }
                    }

                    this.map.on('click', this.inspectMapGeolocations);
                }
            }
        });


        // Load initial values for side bar and index legend
        this.loadRisksByType('F');

        if (!this._appService.isAuthorised(KJGriConstants.ROLES.SILVER_A)) {
            this.loadMeasurementTypes();
        }
    }

    public loadRiskHistoryAndGeneratePin(event: any, isCompanyLocation: boolean) {
        if (this.inspectedGeolocation.istat && this.inspectedGeolocation.sub && !isCompanyLocation) {
            this.inspectedCoordinates = ol.proj.toLonLat(event.coordinate);
            
            this.loadAllRiskIndexesForLocation(this.inspectedGeolocation.istat, this.inspectedGeolocation.sub, this.inspectedCoordinates, isCompanyLocation);
            if(this.selectedSubtype.code != "LS" && this.selectedSubtype.code != "F") {
                this.loadRiskHistroyForLocation(this.inspectedGeolocation.istat, this.inspectedGeolocation.sub, this.selectedSubtype.id, this.selectedRFFlag);
            }
            this.inspectedElement = 'geolocation';
        }
    }

    /**
     * Calls Nominatim service and fetches the data
     * @param data string
     */
    public searchAddress() {
        clearTimeout(this.nominatimTimeout);
        if(this.q) {
            this.nominatimTimeout = setTimeout(() => {
                this.subscriptions['searchAddress'] = this._kjgriHomeService.searchAddress(this.q).subscribe(
                    (res: Address[]) => {
                        this.addresses = res;
                        this.searchActiveAddress = true;
                    },
                    (err) => {
                        console.log(err);
                    }
                );
            }, 1000);
        }
    }

    /**
     * Drawing and manipulating map
     * after selecting an address
     * from a dropdown.
     * 
     * @param address Address
     * @param q any
     */
    public selectAddress(address: Address) {
        //ol.geom.Point
        //ol.geom.Polygon
        //ol.geom.LineString
        //ol.geom.MultiPolygon
        let feature: ol.Feature = null;
        //ol.StyleFunction
        let styleFunction: ol.StyleFunction = null;
        let coordinates: [number, number] = [+address.lon, +address.lat];
        this.map.removeLayer(this.searchVector);
        this.map.removeLayer(this.mapSelectedLocationPoint);
        
        feature = new ol.Feature({
            geometry: new ol.geom.Point(coordinates)
        });

        if(address.geojson.type == 'Point') {
            // feature = new ol.Feature({
            //     geometry: new ol.geom.Point(coordinates)
            // });

            // styleFunction = (feature: (ol.Feature | ol.render.Feature), resolution: number): ol.style.Style => {
            //     return new ol.style.Style({
            //         image: new ol.style.Icon(/** @type {olx.style.IconOptions} */({
            //             anchor: [0.5, 1],
            //             anchorXUnits: 'fraction',
            //             anchorYUnits: 'fraction',
            //             opacity: 0.85,
            //             src: 'app/kjgri/assets/images/search_map_marker.png'
            //         }))
            //     });
            // };
        } else if(address.geojson.type == 'Polygon') {
            // feature = new ol.Feature({
            //     geometry: new ol.geom.Polygon(address.geojson.coordinates)
            // });

            // styleFunction = (feature: (ol.Feature | ol.render.Feature), resolution: number): ol.style.Style => {
            //     return new ol.style.Style({
            //         stroke: new ol.style.Stroke({
            //             color: 'rgb(66, 134, 244)',
            //             width: 5
            //         }),
            //         fill: new ol.style.Fill({
            //             color: 'rgba(66, 134, 244, .3)'
            //         })
            //     });
            // };
        } else if(address.geojson.type == 'LineString') {
            // feature = new ol.Feature({
            //     geometry: new ol.geom.LineString(address.geojson.coordinates)
            // });

            // styleFunction = (feature: (ol.Feature | ol.render.Feature), resolution: number): ol.style.Style => {
            //     return new ol.style.Style({
            //         stroke: new ol.style.Stroke({
            //             color: 'rgb(66, 134, 244)',
            //             width: 5
            //         }),
            //         fill: new ol.style.Fill({
            //             color: 'rgba(66, 134, 244)'
            //         })
            //     });
            // };
        } else if(address.geojson.type == 'MultiPolygon') {
            // feature = new ol.Feature({
            //     geometry: new ol.geom.MultiPolygon(address.geojson.coordinates)
            // });

            // styleFunction = (feature: (ol.Feature | ol.render.Feature), resolution: number): ol.style.Style => {
            //     return new ol.style.Style({
            //         stroke: new ol.style.Stroke({
            //             color: 'rgb(66, 134, 244)',
            //             width: 5
            //         }),
            //         fill: new ol.style.Fill({
            //             color: 'rgba(66, 134, 244, .3)'
            //         })
            //     });
            // };
        }

        if(feature) {
            styleFunction = (feature: (ol.Feature | ol.render.Feature), resolution: number): ol.style.Style => {
                return new ol.style.Style({
                    image: new ol.style.Icon(/** @type {olx.style.IconOptions} */({
                        anchor: [0.5, 1],
                        anchorXUnits: 'fraction',
                        anchorYUnits: 'fraction',
                        opacity: 0.85,
                        src: 'app/kjgri/assets/images/search_map_marker.png'
                    }))
                });
            };

            feature.getGeometry().transform('EPSG:4326', 'EPSG:3857');

            let source = new ol.source.Vector({
                features: [feature]
            });

            this.searchVector = new ol.layer.Vector({
                source: source,
                style: styleFunction
            });

            this.map.addLayer(this.searchVector);
            this.map.getView().centerOn(ol.proj.fromLonLat(coordinates), this.map.getSize(), [0, 0]);
            this.map.getView().fit(<ol.geom.SimpleGeometry>feature.getGeometry());
        }
        
        this.q = address.display_name;
        this.searchActiveAddress = false;
    }

    /**
     * Clear search
     * @param q input
     */
    clearSearchAddress(toClear: boolean = false) {
        if(toClear) this.q = null;
        this.map.removeLayer(this.searchVector);
        this.searchVector = null;
        this.searchActiveAddress = false;
        this.addresses = null;
        //Zoom out and center map
        //this.map.getView().animate({center: ol.proj.fromLonLat([21.907078, 43.317980]), zoom: 4, duration: 1500});
    }


    /*--------- NG On Init ---------*/
    public ngOnInit(): void {
        // Initital method to be executed when page loads
        this._appService.pageLoaded('', this);
        this._appService.languageChangeForComponent(this, this.loadData.bind(this));
        // Variable initialization
        this.subscriptions = {};
        this.componentAlert = new Alert(null, true);
        this.locationsList = [];

        this.selectedDate = new Date();
        this.selectedTime = this.selectedDate.getHours();
        this.forecastValueMunicipality = {
            name: '',
            istat: ''
        }

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
        this.mapChangeInterval = setInterval(() => {
            this.map.updateSize();
        }, 5000);

        // } else {
        //     this._appService.getRouter().navigate(['admin/users']);
        // }
    }

    /*--------- NG On Destroy ---------*/
    ngOnDestroy(): void {
        this._appService.refreshEmitters(null);
        clearInterval(this.mapChangeInterval);
    }
}