import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { TranslateService } from 'ng2-translate';
import { DataTable, LazyLoadEvent } from 'primeng/primeng';
import { ModalDirective } from 'ng2-bootstrap';

import { CompanyManagementCmp } from "./../../kjcore/company_management/companyManagement.cmp";
import { CompanyManagementService } from "./../../kjcore/company_management/companyManagement.service";

import { KJGriCompanyManagementService } from './kjgri.companyManagement.service';

import { UtilityService } from '../../kjcore/shared/services/utility.service';
import { AppService } from '../../kjcore/shared/services/app.service';
import { ValidationService } from "../../kjcore/shared/services/validation.service";

import { Alert, RestResponse, DataTableConfig } from '../../kjcore/shared/models';

import { KJGriCompany, KJGriCompanyDetails, Package, CompanyLocation, QueryParams } from "./models";

import { CompanyCss, Company, FileInput } from "./../../kjcore/company_management/models";

import { PaginationTableResult } from "./../kjgri_shared/models";

import { PolygonFeature } from "./../kjgri_home/models/polygonFeature.model";
import { Address } from '../kjgri_home/models/address.model';

/**
 * Component for Company Management component
 * @author Mario Petrovic
 */
@Component({
    moduleId: module.id,
    templateUrl: 'kjgri.companyManagement.cmp.html',
    encapsulation: ViewEncapsulation.None,
})
export class KJGriCompanyManagementCmp extends CompanyManagementCmp implements OnInit {
    companiesResults: PaginationTableResult<KJGriCompany>;

    packages: Package[];
    defaultCompany: KJGriCompanyDetails;
    selectedCompanyProfile: KJGriCompanyDetails;
    selectedCompanyLocations: CompanyLocation[];

    locationsMap: ol.Map;
    moveEndEvent: Function;
    inspectMapGeolocations: Function;
    //inspectedGeolocation: { istat: string, sub: string, lsId?: number, fId?: number };
    moveMapTimeout: number;
    minimumZoomLevel: number;
    locationForms: FormGroup[];
    geolocationPolygons: any;

    selectedLocation: CompanyLocation

    mapRendered: boolean;
    locationEditMode: boolean;
    locationOpened: boolean;

    pinVectorLayer: ol.layer.Vector;
    singlePinVectorLayer: ol.layer.Vector;
    singlePinNewVectorLayer: ol.layer.Vector;
    newLocationVectorLayer: ol.layer.Vector;

    clickedCoordinates: [number, number];
    selectedIndex: number;

    navigationAnimationStatus: boolean;
    editLocationMapMode: boolean;

    addLocationForm: FormGroup;

    joinedCompanies: any;
    clientCompany: any;
    insuranceCompany: any;
    companyToAdd: any;
    availableCompanies: any;

    addresses: Address[];
    searchActiveAddress: boolean;
    searchVector: ol.layer.Vector;

    q: any;
    nominatimTimeout: any;

    /*--------- Constructor ---------*/
    constructor(
        private _kjgriCompanyManagementService: KJGriCompanyManagementService,
        public _companyManagementService?: CompanyManagementService,
        public _utilityService?: UtilityService,
        public _appService?: AppService,
        public _translateService?: TranslateService,
        public _formBuilder?: FormBuilder
    ) {
        super();

        this.minimumZoomLevel = 10;
    }


    /*--------- App Logic ---------*/

    /*--------- REST calls ---------*/
    /**
     * Load all companies
     * @author Mario Petrovic
     */
    loadAllCompanies(queryParams?: QueryParams): void {
        this._utilityService.setAlert(this.componentAlert);
        this.subscriptions['loadAllCompanies'] = this._kjgriCompanyManagementService.getAllCompaniesRest(queryParams).subscribe(
            (res: RestResponse<PaginationTableResult<KJGriCompany>>) => {
                this.companiesResults = res.data;

                for (let company of this.companiesResults.results) {
                    company.passwordTimeout = this._utilityService.convertMillisecondsDays(company.passwordTimeout, true);
                }
            }, (err: RestResponse<null>) => {
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode);
            });
    }

    /**
     * Update selected comapny
     * @author Mario Petrovic
     */
    updateCompany(data: any, modal: ModalDirective, filterForm?: { value: { companyName: string, companyType: string } }, companyDataTable?: DataTable): void {
        var dataCopy = this._utilityService.copy(data);
        if (dataCopy.passwordTimeoutForm) {
            dataCopy.passwordTimeout = this._utilityService.convertMillisecondsDays(dataCopy.passwordTimeoutForm);
        }

        dataCopy.packageExpiryDate = new Date(dataCopy.packageExpiryDate).getTime();

        this.subscriptions['updateCompany'] = this._kjgriCompanyManagementService.updateCompanyRest(dataCopy).subscribe(
            (res: RestResponse<null>) => {
                setTimeout(() => {
                    this._utilityService.setAlert(this.componentAlert, res.message, res.statusCode);
                }, 500);
                this.hideModal(modal);
                this.filterCompanies(filterForm, companyDataTable);
            }, (err: RestResponse<null>) => {
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode, err.errors);
                this.formErrors = err;
            });
    }

    /**
     * Update default company
     * @author Mario Petrovic
     */
    updateDefaultCompany(data: KJGriCompany, modal: ModalDirective, filterForm?: { value: { companyName: string, companyType: string } }, companyDataTable?: DataTable): void {
        this.subscriptions['updateDefaultCompany'] = this._kjgriCompanyManagementService.updateDefaultCompanyRest(data).subscribe(
            (res: RestResponse<null>) => {
                setTimeout(() => {
                    this._utilityService.setAlert(this.componentAlert, res.message, res.statusCode);
                }, 500);

                this.hideModal(modal);

                this.filterCompanies(filterForm, companyDataTable);
            }, (err: RestResponse<null>) => {
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode);
            }
        )
    }

    /**
     * Load default company profile
     * @author Mario Petrovic
     */
    loadDefaultCompany(modal: ModalDirective): void {
        this._utilityService.setAlert(this.componentAlert);
        this.subscriptions['loadDefaultComapny'] = this._kjgriCompanyManagementService.getDefaultCompanyRest().subscribe(
            (res: RestResponse<KJGriCompanyDetails>) => {
                this.defaultCompany = res.data;

                this.defaultCompanyFileInput.file = null;
                this.selectedCompanyProfile.defaultCss = this.defaultCompany.activeCss;
                this.setCssModel('defaultCss', this.defaultCompany.activeCss);
                this.defaultCompanyFileInput.value = 'rest/users/noAuth/logoImage/' + res.data.company.id;

                this.setEditDefaultCompanyModal(modal, this.defaultCompany.company);
            }, (err: RestResponse<null>) => {
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode);
            });
    }


    /**
     * Load company profile by id
     * @author Mario Petrovic
     */
    loadCompanyById(id: number, modal: ModalDirective): void {
        this._utilityService.setAlert(this.componentAlert);
        this.subscriptions['loadCompanyById'] = this._kjgriCompanyManagementService.getCompanyProfileByIdRest(id).subscribe(
            (res: RestResponse<KJGriCompanyDetails>) => {
                this.selectedCompanyFileInput = new FileInput();

                setTimeout(() => {
                    this.setEditCompanyModal(res.data);
                    this.selectedCompanyFileInput.value = 'rest/users/noAuth/logoImage/' + res.data.company.id;
                    !this.locationsMap || this.locationsMap.setTarget(null);
                    this.mapRendered = false;
                    this.tabsActivity = {
                        profile: true,
                        editStyle: false,
                        defaultStyle: false,
                        previousStyle: false,
                        currentStyle: true,
                        locations: false
                    }
                    this.loadPackages(this.editForm.controls['companyType'].value, 'editForm', () => {
                        modal.show();
                    })
                });
            }, (err: RestResponse<null>) => {
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode);
            });
    }

    /**
     * Update status of the company
     * @author Mario Petrovic
     */
    updateCompanyStatus(data: KJGriCompany, filterForm?: { value: { companyName: string, companyType: string } }, companyDataTable?: DataTable): void {
        this.subscriptions['updateCompanyStatus'] = this._kjgriCompanyManagementService.updateCompanyStatusRest(data.id, !data.flActive).subscribe(
            (res: RestResponse<null>) => {
                setTimeout(() => {
                    this._utilityService.setAlert(this.componentAlert, res.message, res.statusCode);
                }, 500);
                this.filterCompanies(filterForm, companyDataTable);
            }, (err: RestResponse<null>) => {
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode, err.errors);
                this.formErrors = err;
            });
    }

    /**
     * Add new company
     * @author Mario Petrovic
     */
    addNewCompany(data: any, modal: ModalDirective, filterForm?: { value: { companyName: string, companyType: string } }, companyDataTable?: DataTable): void {
        if (data.passwordTimeoutForm) {
            data.passwordTimeout = this._utilityService.convertMillisecondsDays(data.passwordTimeoutForm);
        }
        let newCompany = new FormData();

        newCompany.append('companyDto',
            new Blob(
                [JSON.stringify(data)],
                {
                    type: "application/json"
                }
            )
        );
        newCompany.append('logo', this.addCompanyFileInput.file);

        this.subscriptions['addNewCompany'] = this._kjgriCompanyManagementService.saveCompanyRest(newCompany).subscribe(
            (res: RestResponse<null>) => {
                setTimeout(() => {
                    this._utilityService.setAlert(this.componentAlert, res.message, res.statusCode);
                }, 500);
                this.hideModal(modal);

                this.filterCompanies(filterForm, companyDataTable);
            }, (err: RestResponse<null>) => {
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode, err.errors);
                this.formErrors = err;
            })
    }

    /**
     * Edit default style
     * @author Mario Petrovic
     */
    editDefaultStyle(data: any, modal: ModalDirective): void {
        let defaultCompanyCss: CompanyCss[] = [];
        for (let rule of Object.keys(data)) {
            let ruleTemp = new CompanyCss();
            ruleTemp.key = data[rule].key;
            ruleTemp.name = data[rule].name;
            ruleTemp.value = data[rule].property + ':' + data[rule].value + ';';
            defaultCompanyCss.push(ruleTemp);
        }

        this.subscriptions['editDefaultStyle'] = this._kjgriCompanyManagementService.updateDefaultCssRest(defaultCompanyCss).subscribe(
            (res: RestResponse<null>) => {
                this.hideModal(modal);
                this._utilityService.setAlert(this.componentAlert, res.message, res.statusCode);
                this._appService.setCompanyCSSInit();
            }, (err: RestResponse<null>) => {
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode);
            });
    }

    /**
     * Edit default style
     * @author Mario Petrovic
     */
    editCompanyStyle(id: number, data: any, modal: ModalDirective, filterForm?: { value: { companyName: string, companyType: string } }, companyDataTable?: DataTable): void {
        let companyCss: CompanyCss[] = [];
        for (let rule of Object.keys(data)) {
            let ruleTemp = new CompanyCss();
            ruleTemp.key = data[rule].key;
            ruleTemp.name = data[rule].name;
            ruleTemp.value = data[rule].property + ':' + data[rule].value + ';';
            companyCss.push(ruleTemp);
        }

        this.subscriptions['editCompanyStyle'] = this._kjgriCompanyManagementService.updateCompanyCssRest(id, companyCss).subscribe(
            (res: RestResponse<null>) => {
                this.hideModal(modal)
                setTimeout(() => {
                    this._utilityService.setAlert(this.componentAlert, res.message, res.statusCode);
                }, 500);
                this._appService.setCompanyCSSInit();

                this.filterCompanies(filterForm, companyDataTable);
            }, (err: RestResponse<null>) => {
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode, err.errors);
            });
    }

    /**
     * Reset default css to initial
     * @author Mario Petrovic
     */
    resetDefaultCssToInit(modal: ModalDirective, filterForm?: { value: { companyName: string, companyType: string } }, companyDataTable?: DataTable): void {
        this.subscriptions['resetDefaultCssToInit'] = this._kjgriCompanyManagementService.resetDefaultCssToInitRest().subscribe(
            (res: RestResponse<null>) => {
                this.hideModal(modal);
                setTimeout(() => {
                    this._utilityService.setAlert(this.componentAlert, res.message, res.statusCode);
                }, 500);
                this._appService.setCompanyCSSInit();

                this.filterCompanies(filterForm, companyDataTable);
            }, (err: RestResponse<null>) => {
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode, err.errors);
                this.formErrors = err;
            }
        );
    }

    /**
     * Reset selected company style to default css
     * @author Mario Petrovic
     */
    resetCompanyStyleToDefault(id: number, modal: ModalDirective, filterForm?: { value: { companyName: string, companyType: string } }, companyDataTable?: DataTable): void {
        this.subscriptions['resetCompanyStyleToDefault'] = this._kjgriCompanyManagementService.resetCompanyStyleToDefault(id).subscribe(
            (res: RestResponse<null>) => {
                this.hideModal(modal);
                setTimeout(() => {
                    this._utilityService.setAlert(this.componentAlert, res.message, res.statusCode);
                }, 500);
                this._appService.setCompanyCSSInit();

                this.filterCompanies(filterForm, companyDataTable);
            }, (err: RestResponse<null>) => {
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode, err.errors);
                this.formErrors = err;
            }
        );
    }

    /**
     * Reset selected company style to previous css
     * @author Mario Petrovic
     */
    resetCompanyStyleToPrevious(id: number, modal: ModalDirective, filterForm?: { value: { companyName: string, companyType: string } }, companyDataTable?: DataTable): void {
        this.subscriptions['resetCompanyStyleToPrevious'] = this._kjgriCompanyManagementService.resetCompanyStyleToPreviousRest(id).subscribe(
            (res: RestResponse<null>) => {
                this.hideModal(modal);
                setTimeout(() => {
                    this._utilityService.setAlert(this.componentAlert, res.message, res.statusCode);
                }, 500);
                this._appService.setCompanyCSSInit();

                this.filterCompanies(filterForm, companyDataTable);
            }, (err: RestResponse<null>) => {
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode, err.errors);
                this.formErrors = err;
            }
        );
    }

    /**
     * Upload company logo
     * @author Mario Petrovic
     */
    uploadCompanyLogo(companyLogo: any, companyId: number, modal: ModalDirective, filterForm?: { value: { companyName: string, companyType: string } }, companyDataTable?: DataTable): void {
        let formData: FormData = new FormData();

        formData.append('companyId', new Blob([JSON.stringify(companyId)],
            {
                type: "text/plain"
            }));
        formData.append('companyLogo', companyLogo);

        this.subscriptions['resetCompanyStyleToPrevious'] = this._kjgriCompanyManagementService.uploadCompanyLogoRest(formData).subscribe(
            (res: RestResponse<null>) => {
                this.hideModal(modal);
                setTimeout(() => {
                    this._utilityService.setAlert(this.componentAlert, res.message, res.statusCode);
                }, 500);

                this.filterCompanies(filterForm, companyDataTable);
            }, (err: RestResponse<null>) => {
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode, err.errors);
                this.formErrors = err;
            }
        );
    }

    /**
     * Load packages based on selected company type
     * @author Mario Petrovic
     */
    loadPackages(companyType: string, form: string, callback?: Function): void {
        this._utilityService.setAlert(this.componentAlert);
        this.subscriptions['selectCompanyType'] = this._kjgriCompanyManagementService.getPackages(companyType).subscribe(
            (res: RestResponse<Package[]>) => {
                if (form == 'addForm') {
                    this[form].controls['packageCode'].setValue(null);
                }
                this.packages = res.data;

                if (callback) {
                    callback.call(null);
                }
            }, (err: RestResponse<null>) => {
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode);
            }
        )
    }

    /**
     * Loads locations based on selected company
     * @author Mario Petrovic
     */
    loadCompanyLocationById(companyId: number): void {
        this._utilityService.setAlert(this.componentAlert);
        this.subscriptions['loadCompanyLocationById'] = this._kjgriCompanyManagementService.getCompanyLocationsById(companyId).subscribe(
            (res: RestResponse<CompanyLocation[]>) => {
                this.selectedCompanyLocations = res.data;
                this.selectedLocation = null;
                this.locationEditMode = false;
                !this.locationsMap || this.locationsMap.setTarget(null)
                this.locationsMap = null;
                this.navigationAnimationStatus = false;
                this.locationOpened = false;
                this.selectedIndex = null;

                this.initialMapGeneration();
            },
            (err: RestResponse<null>) => {
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode);
            }
        )
    }

    /**
     * Updates company location
     * @author Mario Petrovic
     */
    updateLocation(companyLocation: CompanyLocation, companyId: number): void {
        companyLocation.latitude = parseFloat(companyLocation.latitude.toString());
        companyLocation.longitude = parseFloat(companyLocation.longitude.toString());

        this.subscriptions['updateLocation'] = this._kjgriCompanyManagementService.updateCompanyLocation(companyLocation, companyId).subscribe(
            (res: RestResponse<null>) => {
                setTimeout(() => {
                    this._utilityService.setAlert(this.componentAlert, res.message, res.statusCode);
                }, 500);
                this.locationEditMode = false;
                this.loadCompanyLocationById(this.selectedCompanyProfile.company.id);
            },
            (err: RestResponse<null>) => {
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode, err.errors);
            }
        )
    }

    /**
     * Adds new location
     * @author Mario Petrovic
     */
    addNewLocation(newLocation: CompanyLocation): void {
        newLocation.latitude = parseFloat(newLocation.latitude.toString());
        newLocation.longitude = parseFloat(newLocation.longitude.toString());
        newLocation.zipCode = newLocation.zipCode.toString();

        this.subscriptions['addNewLocation'] = this._kjgriCompanyManagementService.saveCompanyLocation(newLocation, this.selectedCompanyProfile.company.id).subscribe(
            (res: RestResponse<null>) => {
                setTimeout(() => {
                    this._utilityService.setAlert(this.componentAlert, res.message, res.statusCode);
                }, 500);
                this.locationsMap.removeLayer(this.newLocationVectorLayer);
                this.addLocationForm = null;
                this.openLocationTab(true);
            },
            (err: RestResponse<null>) => {
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode, err.errors);
            }
        )
    }

    /**
     * Load assicurativo for impresa and vice versa.
     * @author Nikola Gavric
     */
    loadJoinedCompanies(companyId: number): void {
        this.subscriptions['loadJoinedCompanies'] = this._kjgriCompanyManagementService.getJoinedCompanies(companyId).subscribe(
            (res: RestResponse<any>) => {
                this.joinedCompanies = res.data;
            },
            (err: RestResponse<any>) => {
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode, err.errors);
            }
        )
    }


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
    setEditCompanyModal(company: KJGriCompanyDetails): void {
        this.selectedCompanyProfile = company;
        this.selectedCompanyProfile.company.passwordTimeout = this._utilityService.convertMillisecondsDays(this.selectedCompanyProfile.company.passwordTimeout, true);
        this.setCssModel('defaultCss', this.selectedCompanyProfile.defaultCss);
        this.setCssModel('previousCss', this.selectedCompanyProfile.previousCss);
        this.setCssModel('activeCss', this.selectedCompanyProfile.activeCss);

        var minDate = company.company.packageExpiryDate < new Date().getTime() ? new Date(new Date().getTime() + 86400000) : new Date(company.company.packageExpiryDate);

        this.editForm = this._formBuilder.group({
            id: new FormControl(company.company.id),
            code: new FormControl(company.company.code, [Validators.required, Validators.maxLength(50)]),
            name: new FormControl(company.company.name, [Validators.required, Validators.maxLength(255)]),
            description: new FormControl(company.company.description, [Validators.required, Validators.maxLength(255)]),
            flActive: new FormControl(company.company.flActive),
            passwordTimeout: new FormControl(company.company.passwordTimeout, []),
            passwordTimeoutForm: new FormControl(company.company.passwordTimeout, [Validators.required, Validators.maxLength(5)]),
            packageCode: new FormControl(company.company.packageCode, [Validators.required]),
            companyType: new FormControl({ value: company.company.companyType, disabled: true }, [Validators.required]),
            packageExpiryDate: new FormControl(new Date(company.company.packageExpiryDate)),
            _packageExpiryDateOriginal: new FormControl(new Date(company.company.packageExpiryDate)),
            _packageExpiryDateMin: new FormControl(minDate)
        });
    }

    /**
     * Set add company modal form
     * @author Mario Petrovic
     */
    setAddCompanyModal(): void {
        this.addCompanyFileInput = new FileInput();
        this.addCompanyFileInput.value = 'app/kjcore/assets/images/noPhoto.png';
        this.packages = [];
        this.addForm = this._formBuilder.group({
            id: new FormControl(),
            code: new FormControl('', [Validators.required, Validators.maxLength(50)]),
            name: new FormControl('', [Validators.required, Validators.maxLength(255)]),
            description: new FormControl('', [Validators.required, Validators.maxLength(255)]),
            flActive: new FormControl(false),
            passwordTimeout: new FormControl(null),
            passwordTimeoutForm: new FormControl(null, [Validators.required, Validators.maxLength(5)]),
            packageCode: new FormControl(null, [Validators.required]),
            companyType: new FormControl(null, [Validators.required]),
            email: new FormControl(null, [ValidationService.emailValidator(), Validators.required]),
            packageExpiryDate: new FormControl(new Date()),
            _packageExpiryDateOriginal: new FormControl(new Date()),
            _packageExpiryDateMin: new FormControl(new Date())
        })
    }

    /**
     * Initial map generation when location tab is opened
     * @author Mario Petrovic
     */
    initialMapGeneration(): void {
        setTimeout(() => {
            var iconFeatures = [];

            var iterator = 0;
            for (let location of this.selectedCompanyLocations) {
                // if (location.flEnabled) {
                var iconFeature = new ol.Feature({
                    geometry: new ol.geom.Point(ol.proj.fromLonLat([location.longitude, location.latitude]))
                });
                iconFeatures.push(iconFeature);

                this.locationForms[iterator] = this._formBuilder.group({
                    id: new FormControl(null),
                    name: new FormControl(null, [Validators.required]),
                    city: new FormControl(null, [Validators.required]),
                    address: new FormControl(null, [Validators.required]),
                    zipCode: new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(5)]),
                    flEnabled: new FormControl(null),
                    flHeadquarter: new FormControl(null),
                    longitude: new FormControl(null, [Validators.required]),
                    latitude: new FormControl(null, [Validators.required])
                })

                iterator++;
                // }
            }

            var vectorSource = new ol.source.Vector({
                features: iconFeatures //add an array of features
            });

            var iconStyle = new ol.style.Style({
                image: new ol.style.Icon(/** @type {olx.style.IconOptions} */({
                    anchor: [0.5, 1],
                    anchorXUnits: 'fraction',
                    anchorYUnits: 'fraction',
                    opacity: 0.75,
                    src: 'app/kjgri/assets/images/marker_pointer-small.png'
                }))
            });

            this.pinVectorLayer = new ol.layer.Vector({
                source: vectorSource,
                style: iconStyle
            });


            var viewObject: any = {
                center: ol.proj.fromLonLat([21.907078, 43.317980]),
                zoom: 4,
                maxZoom: 20
            };

            if (this.selectedCompanyLocations && this.selectedCompanyLocations.length == 1) {
                viewObject = {
                    center: ol.proj.fromLonLat([this.selectedCompanyLocations[0].longitude, this.selectedCompanyLocations[0].latitude]),
                    zoom: 4,
                    maxZoom: 20
                };
            }

            this.locationsMap = new ol.Map({
                layers: [
                    new ol.layer.Tile({
                        source: new ol.source.OSM()
                    }),
                    this.pinVectorLayer
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
                this.locationsMap.getView().fit(this.pinVectorLayer.getSource().getExtent());
            }

        })
    }

    /**
     * Open location tab
     * @author Mario Petrovic
     */
    openLocationTab(refresh?: boolean) {
        if (!this.mapRendered || refresh) {
            this.locationEditMode = false;
            this.mapRendered = true;
            this.loadCompanyLocationById(this.selectedCompanyProfile.company.id);
        }
    }

    /**
     * Creates Vector layer with point for map 
     * @author Mario Petrovic
     */
    createMapPoint(coordinates: [number, number], addIcon?: boolean): ol.layer.Vector {
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
                src: 'app/kjgri/assets/images/marker_pointer-small' + (addIcon ? '-add' : '') + '.png'
            }))
        });

        return new ol.layer.Vector({
            source: vectorSource,
            style: iconStyle
        });
    }

    /**
     * Opens accordion panel for selected location
     * @author Mario Petrovic
     */
    openLocation(selectedLocation: CompanyLocation, index: number, isOpen: boolean): void {
        if (!this.navigationAnimationStatus) {
            if (isOpen && !this.locationOpened || this.selectedLocation.id != selectedLocation.id) {
                this.navigationAnimationStatus = true;
                this.selectedLocation = selectedLocation;
                this.locationOpened = true;
                this.selectedIndex = index;

                this.locationsMap.removeLayer(this.singlePinVectorLayer);

                this.singlePinVectorLayer = this.createMapPoint([this.selectedLocation.longitude, this.selectedLocation.latitude]);

                this.navigateToLocation([this.selectedLocation.longitude, this.selectedLocation.latitude], () => {
                    this.locationsMap.removeLayer(this.pinVectorLayer);
                    this.locationsMap.addLayer(this.singlePinVectorLayer);
                    this.navigationAnimationStatus = false;
                });

            } else if (!isOpen) {
                this.locationOpened = false;
                this.selectedLocation = null;
                this.locationsMap.removeLayer(this.singlePinNewVectorLayer)
                this.locationsMap.removeLayer(this.singlePinVectorLayer)
                this.locationsMap.addLayer(this.pinVectorLayer);

                if (this.selectedCompanyLocations.length > 1) {
                    this.locationsMap.getView().fit(this.pinVectorLayer.getSource().getExtent());
                }
            }
        }
    }

    /**
     * Activates location edit mode
     * @author Mario Petrovic
     */
    locationActivateEdit(selectedLocation: CompanyLocation, form: FormGroup) {
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
    }

    /**
     * Deactivates location edit mode
     * @author Mario Petrovic
     */
    locationDeactivateEdit() {
        this.locationEditMode = false;

        this.locationsMap.removeLayer(this.singlePinVectorLayer);
        this.locationsMap.removeLayer(this.singlePinNewVectorLayer);

        this.locationsMap.addLayer(this.singlePinVectorLayer);

        this.navigationAnimationStatus = true;

        this.navigateToLocation([this.selectedLocation.longitude, this.selectedLocation.latitude], () => {
            this.navigationAnimationStatus = false;
        });
    }

    /**
     * Turns on edit mode for map change location
     * @author Mario Petrovic
     */
    changeLocation(): void {
        this.editLocationMapMode = true;

        this.inspectMapGeolocations = (event: ol.MapBrowserEvent) => {
            this.locationsMap.removeLayer(this.singlePinVectorLayer);
            this.locationsMap.removeLayer(this.singlePinNewVectorLayer);
            this.clickedCoordinates = ol.proj.toLonLat(event.coordinate);
            this.singlePinNewVectorLayer = this.createMapPoint(this.clickedCoordinates, true);
            this.locationsMap.addLayer(this.singlePinNewVectorLayer);
        }
        this.locationsMap.on('click', this.inspectMapGeolocations);
    }

    /**
     * Updates form with newly selected locations
     * @author Mario Petrovic
     */
    saveNewLocation(): void {
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
    }

    /**
     * Turns off edit mode for map change location
     * @author Mario Petrovic
     */
    cancelLocationChange(): void {
        this.editLocationMapMode = false;
        this.clickedCoordinates = null;

        this.locationsMap.removeLayer(this.singlePinVectorLayer);
        this.locationsMap.removeLayer(this.singlePinNewVectorLayer);
        this.locationsMap.addLayer(this.singlePinVectorLayer);

        // this.locationsMap.getViewport().removeEventListener('click');
        this.locationsMap.un('click', this.inspectMapGeolocations);


        this.navigationAnimationStatus = true;

        this.navigateToLocation([this.selectedLocation.longitude, this.selectedLocation.latitude], () => {
            this.navigationAnimationStatus = false;
        });
    }

    /**
     * Navigates to specific location with zoom and animation
     * @author Mario Petrovic
     */
    navigateToLocation(coordinates: [number, number], callback?: Function, duration?: number, zoom?: number): void {
        this.locationsMap.getView().animate({
            center: ol.proj.fromLonLat([coordinates[0], coordinates[1]]),
            duration: duration != null && duration != undefined ? duration : 800,
            zoom: zoom ? zoom : 9
        }, () => {
            !callback || callback.call(this);
        });
    }

    /**
     * Event method fired when modal is hidden
     * @author Mario Petrovic
     */
    onCompanyModalHide(): void {
        this.tabsActivity = {
            profile: true,
            editStyle: false,
            defaultStyle: false,
            previousStyle: false,
            currentStyle: true,
            locations: false
        }
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

    /**
     * Opens form for adding new location
     * @author Mario Petrovic
     */
    openAddLocationForm(): void {
        this.addLocationForm = this._formBuilder.group({
            name: new FormControl(null, [Validators.required]),
            city: new FormControl(null, [Validators.required]),
            address: new FormControl(null, [Validators.required]),
            zipCode: new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(5)]),
            flEnabled: new FormControl(false),
            flHeadquarter: new FormControl(false),
            longitude: new FormControl(null, [Validators.required]),
            latitude: new FormControl(null, [Validators.required])
        });

        this.locationsMap.removeLayer(this.pinVectorLayer);

        this.locationsMap.getView().setZoom(9);
        this.locationsMap.getView().setCenter(ol.proj.fromLonLat([12.495210, 41.895197]));

        this.inspectMapGeolocations = (event: ol.MapBrowserEvent) => {
            var clickedCoordinates = ol.proj.toLonLat(event.coordinate);
            this.addLocationForm.controls['longitude'].setValue(clickedCoordinates[0].toFixed(6));
            this.addLocationForm.controls['latitude'].setValue(clickedCoordinates[1].toFixed(6));
            this.locationsMap.removeLayer(this.newLocationVectorLayer);
            this.newLocationVectorLayer = this.createMapPoint(clickedCoordinates, true);
            this.locationsMap.addLayer(this.newLocationVectorLayer);
        }
        this.locationsMap.on('click', this.inspectMapGeolocations);
    }

    /**
     * Cancels form for adding new location
     * @author Mario Petrovic
     */
    cancelAddLocation(): void {
        this.addLocationForm = null;
        this.locationsMap.un('click', this.inspectMapGeolocations);

        this.openLocationTab(true)
    }

    /**
     * Select tab method
     * @author Mario Petrovic
     */
    selectTab(tabName: string, sub?: boolean): void {
        if (!this.tabsActivity[tabName]) {
            if (sub) {
                this.tabsActivity.defaultStyle = false;
                this.tabsActivity.previousStyle = false;
                this.tabsActivity.currentStyle = false;
            } else {
                this.tabsActivity.profile = false;
                this.tabsActivity.editStyle = false;
                this.tabsActivity.locations = false;
            }
            this.tabsActivity[tabName] = true;

            if (tabName == 'locations' && !this.mapRendered) {
                this.openLocationTab();
            } else {
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
    }

    /**
     * Event method that fires when filter/page parameters change
     * @author Mario Petrovic
     */
    onLazyLoad(event: LazyLoadEvent, filterForm: { value: { companyName: string, companyType: string } }): void {
        var queryParams = new QueryParams(event.rows, (event.first / event.rows + 1));

        queryParams.sortType = event.sortOrder == 1 ? 'asc' : 'desc';

        queryParams.companyName = filterForm.value.companyName || '';
        queryParams.companyType = filterForm.value.companyType || '';

        this.loadAllCompanies(queryParams);
    }

    /**
     * Methid for filtering companies with filter form
     * @author Mario Petrovic
     */
    filterCompanies(filterForm: { value: { companyName: string, companyType: string } }, dataTable: DataTable) {
        var queryParams = new QueryParams(dataTable.rows, (dataTable.first / dataTable.rows + 1));

        queryParams.sortType = dataTable.sortOrder == 1 ? 'asc' : 'desc';

        queryParams.companyName = filterForm.value.companyName || '';
        queryParams.companyType = filterForm.value.companyType || '';

        this.loadAllCompanies(queryParams);
    }

    /**
     * Renews package for count that user defines by packageCount
     * @author Mario Petrovic
     */
    renewPackage(form: FormGroup, packageCount: number): void {
        var packageExpiryDateControl = form.controls['packageExpiryDate'];

        var renewedData;

        var baseDate = (<Date>form.value._packageExpiryDateOriginal).getTime() < new Date().getTime() ? new Date().getTime() + 86400000 : (<Date>form.value._packageExpiryDateOriginal).getTime();

        for (let packageItem of this.packages) {
            if (packageItem.code == form.value.packageCode) {
                renewedData = baseDate + (packageItem.duration * 86400000 * packageCount);
            }
        }

        packageExpiryDateControl.setValue(new Date(renewedData));
    }

    /**
     * Clears renew input and returns date to original expiration value
     * @author Mario Petrovic
     */
    clearRenew(form: FormGroup, countInput: any): void {
        var packageExpiryDateControl = form.controls['packageExpiryDate'];

        packageExpiryDateControl.setValue(form.value._packageExpiryDateOriginal);
        countInput.value = null;
    }

    /**
     * Show modal for joined companies.
     * @author Nikola Gavric
     */
    showJoinedCompanyModal(modal: ModalDirective, modalName: string, data: any): void {
        this._utilityService.setAlert(this.componentAlert);
        this.formErrors = new RestResponse();

        switch (modalName) {
            case 'previewCompany':
                this.companyToAdd = null;
                this.insuranceCompany = data;
                this.loadCompaniesToAdd();
                this.loadJoinedCompanies(data.id);
                break;
        }
        modal.show();
    }

    /**
     * 
     */
    connectCompany(clientId: number) {
        if (this.insuranceCompany.companyType == 'insuranceCompany') {
            this.subscriptions['connectCompany'] = this._kjgriCompanyManagementService.connectCompany(clientId, this.insuranceCompany.id, false).subscribe(
                (res: RestResponse<null>) => {
                    setTimeout(() => {
                        this._utilityService.setAlert(this.componentAlert, res.message, res.statusCode);
                    }, 500);
                    this.loadJoinedCompanies(this.insuranceCompany.id);
                },
                (err: RestResponse<null>) => {
                    this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode, err.errors);
                    this.formErrors = err;
                }
            )
        } else {
            this.subscriptions['connectCompany'] = this._kjgriCompanyManagementService.connectCompany(this.insuranceCompany.id, clientId, false).subscribe(
                (res: RestResponse<null>) => {
                    setTimeout(() => {
                        this._utilityService.setAlert(this.componentAlert, res.message, res.statusCode);
                    }, 500);
                    this.loadJoinedCompanies(this.insuranceCompany.id);
                },
                (err: RestResponse<null>) => {
                    this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode, err.errors);
                    this.formErrors = err;
                }
            )
        }
    }

    /**
     * 
     */
    loadCompaniesToAdd() {
        if (this.insuranceCompany.companyType == 'insuranceCompany') {
            this.subscriptions['loadCompaniesToAdd'] = this._kjgriCompanyManagementService.getClientCompanies().subscribe(
                (res: RestResponse<null>) => {
                    setTimeout(() => {
                        this._utilityService.setAlert(this.componentAlert, res.message, res.statusCode);
                    }, 500);
                    this.availableCompanies = res.data;
                },
                (err: RestResponse<null>) => {
                    this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode, err.errors);
                    this.formErrors = err;
                }
            )
        } else {
            this.subscriptions['loadCompaniesToAdd'] = this._kjgriCompanyManagementService.getInsuranceCompanies().subscribe(
                (res: RestResponse<null>) => {
                    this._utilityService.setAlert(this.componentAlert, res.message, res.statusCode);
                    this.availableCompanies = res.data;
                },
                (err: RestResponse<null>) => {
                    this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode, err.errors);
                    this.formErrors = err;
                }
            )
        }
    }

    /**
     * Open the detaching modal.
     * 
     * @param modalToHide 
     * @param modalToShow 
     * @param data 
     */
    detachJoinedCompany(modalToHide: ModalDirective, modalToShow: ModalDirective, clientCompanyData: any, isClient: boolean = false) {
        modalToHide.hide();
        if (isClient) {
            this.clientCompany = clientCompanyData;
        } else {
            this.clientCompany = this.insuranceCompany;
            this.insuranceCompany = clientCompanyData;
        }
        modalToShow.show();
    }

    /**
     * Detaching the company.
     * 
     * @param modal 
     */
    detachCompany(modal: ModalDirective) {
        this.subscriptions['detachCompany'] = this._kjgriCompanyManagementService.detachCompany(this.clientCompany.id, this.insuranceCompany.id).subscribe(
            (res: RestResponse<null>) => {
                setTimeout(() => {
                    this._utilityService.setAlert(this.componentAlert, res.message, res.statusCode);
                }, 500);
                this.loadJoinedCompanies(this.insuranceCompany.id);
                modal.hide();
            },
            (err: RestResponse<null>) => {
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode, err.errors);
                this.formErrors = err;
            }
        )
    }

    /**
     * Update company's info view priviledge for selected insurance company
     * @author Nikola Gavric
     */
    updateInfoConsent(clientId: number, flag: boolean): void {
        if (this.insuranceCompany.companyType == 'insuranceCompany') {
            this.subscriptions['updateInfoConsent'] = this._kjgriCompanyManagementService.updateInfoConsent(clientId, this.insuranceCompany.id, !flag).subscribe(
                (res: RestResponse<null>) => {
                    setTimeout(() => {
                        this._utilityService.setAlert(this.componentAlert, res.message, res.statusCode);
                    }, 500);
                    this.loadJoinedCompanies(this.insuranceCompany.id);
                },
                (err: RestResponse<null>) => {
                    this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode, err.errors);
                    this.formErrors = err;
                }
            )
        } else {
            this.subscriptions['updateInfoConsent'] = this._kjgriCompanyManagementService.updateInfoConsent(this.insuranceCompany.id, clientId, !flag).subscribe(
                (res: RestResponse<null>) => {
                    setTimeout(() => {
                        this._utilityService.setAlert(this.componentAlert, res.message, res.statusCode);
                    }, 500);
                    this.loadJoinedCompanies(this.insuranceCompany.id);
                },
                (err: RestResponse<null>) => {
                    this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode, err.errors);
                    this.formErrors = err;
                }
            )
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
                this.subscriptions['searchAddress'] = this._kjgriCompanyManagementService.searchAddress(this.q).subscribe(
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

    public selectAddress(address: Address) {
        //ol.geom.Point
        //ol.geom.Polygon
        //ol.geom.LineString
        //ol.geom.MultiPolygon
        let feature: ol.Feature = null;
        //ol.StyleFunction
        let styleFunction: ol.StyleFunction = null;
        let coordinates: [number, number] = [+address.lon, +address.lat];
        this.locationsMap.removeLayer(this.searchVector);
        
        feature = new ol.Feature({
            geometry: new ol.geom.Point(coordinates)
        });

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

            this.locationsMap.addLayer(this.searchVector);
            this.locationsMap.getView().centerOn(ol.proj.fromLonLat(coordinates), this.locationsMap.getSize(), [0, 0]);
            this.locationsMap.getView().fit(<ol.geom.SimpleGeometry>feature.getGeometry());
            
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
        this.locationsMap.removeLayer(this.searchVector);
        this.searchVector = null;
        this.searchActiveAddress = false;
        this.addresses = null;
        //Zoom out and center map
        //this.map.getView().animate({center: ol.proj.fromLonLat([21.907078, 43.317980]), zoom: 4, duration: 1500});
    }

    /*--------- NG On Init ---------*/
    ngOnInit() {
        // Initital method to be executed when page loads
        this._appService.pageLoaded('', this);
        this._appService.languageChangeForComponent(this);

        // Variables initialization
        this.subscriptions = {};
        this.componentAlert = new Alert(null, true);

        this.dataTableConfig = new DataTableConfig(10, true, 3, [5, 10, 20, 50, 100], true);
        this.selectedCompanyProfile = new KJGriCompanyDetails();
        this.companiesResults = new PaginationTableResult<KJGriCompany>();
        this.cssBundle = {};
        this.defaultCompanyFileInput = new FileInput();
        this.selectedCompanyFileInput = new FileInput();
        this.addCompanyFileInput = new FileInput();
        this.addCompanyFileInput.value = 'app/kjcore/assets/images/noPhoto.png';

        this.tabsActivity = {
            profile: true,
            editStyle: false,
            defaultStyle: false,
            previousStyle: false,
            currentStyle: true,
            locations: false
        }

        this.locationForms = [];
    }

    /*--------- NG On Destroy ---------*/
    ngOnDestroy(): void {
        this._appService.refreshEmitters(this.subscriptions);
    }
}
