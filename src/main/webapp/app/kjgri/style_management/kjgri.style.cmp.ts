import { Component, OnInit, ViewEncapsulation, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs/Subscription';

import { Footer, DataTable } from 'primeng/primeng';

import { TranslateService } from 'ng2-translate';

import { ModalDirective, TabsetComponent } from 'ng2-bootstrap';

import { StyleManagementService } from './kjgri.style.service';

import { UtilityService } from '../../kjcore/shared/services/utility.service';
import { AppService } from '../../kjcore/shared/services/app.service';

import { Alert, RestResponse } from '../../kjcore/shared/models';
import { ValidationService } from '../../kjcore/shared/services/validation.service';

@Component({
    moduleId: module.id,
    templateUrl: 'kjgri.style.cmp.html',
    encapsulation: ViewEncapsulation.None
})
export class StyleManagementCmp implements OnInit {
    subscriptions: Subscription[] = [];
    componentAlert: Alert;
    globalFilter: any;
    formErrors: any;
    styles: any;
    selectedStyle: any = [];
    styleForm: FormGroup;
    toggles: any;
    styleFormCopy: any;

    mapPinIcon: string;
    mapPinIconBlob: any;
    @ViewChild('tabs')
    tabs: TabsetComponent; //tabs.tabs[0] = Risk tab, tabs.tabs[1] = Forecast tab

    /*--------- Constructor ---------*/
    constructor(
        private _utilityService: UtilityService,
        private _styleManagement: StyleManagementService,
        private _appService: AppService,
        private _translateService: TranslateService,
        private _formBuilder: FormBuilder,
        private _changeDetector: ChangeDetectorRef,
        private _domSanitizer: DomSanitizer
    ) { }

    public returnFalse($event) {
        return false;
    }

    public toggleColorPicker(formControlName: string) {
        this.toggles[formControlName] = !this.toggles[formControlName];
    }

    public removeStyle(modal: ModalDirective) {
        this.subscriptions['removeAction'] = this._styleManagement.removeStyle(this.selectedStyle).subscribe(
            (res: RestResponse<any>) => {
                this._utilityService.setAlert(this.componentAlert, res.message, res.statusCode);
                this._loadStyles();
                this.hideModal(modal);
            },
            (err: RestResponse<any>) => {
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode);
                this.formErrors = err;
                console.log(err);
            }
        )
    }

    public styleFormSubmit(modal: ModalDirective) {
        this.styleForm.get('stroke').setValue(this.styleFormCopy.stroke);
        this.styleForm.get('fill').setValue(this.styleFormCopy.fill);

        if(this.styleForm.get('isForecastUndefined').value) {
            this.styleForm.get('riskIndexMin').setValue(-1);
            this.styleForm.get('riskIndexMax').setValue(0);
            this.styleForm.get('indexValue').setValue(null);
            this.styleForm.get('numericIndexValue').setValue(null);
        } else if(this.styleForm.get('minAndMax').value != [] && this.styleForm.get('indexValue').value == null && this.styleForm.get('numericIndexValue').value == null && !this.styleForm.get('isRiskUndefined').value) {
            this.styleForm.get('riskIndexMin').setValue(this.styleForm.get('minAndMax').value[0]);
            this.styleForm.get('riskIndexMax').setValue(this.styleForm.get('minAndMax').value[1]);
            this.styleForm.get('indexValue').setValue(null);
            this.styleForm.get('numericIndexValue').setValue(null);
        } else if(this.styleForm.get('isRiskUndefined').value != null || this.styleForm.get('indexValue').value != null || this.styleForm.get('numericIndexValue').value != null) {
            this.styleForm.get('riskIndexMin').setValue(null);
            this.styleForm.get('riskIndexMax').setValue(null);
        }

        if(this.styleForm.get('indexValue').value == "") {
            this.styleForm.get('indexValue').setValue(null);
        }
        if(this.styleForm.get('numericIndexValue').value == "") {
            this.styleForm.get('numericIndexValue').setValue(null);
        }

        let data = this.styleForm.value;

        if(data.isRiskUndefined) {
            data.indexValue = -1;
            data.numericIndexValue = -1;
        }

        this.subscriptions['styleFormSubmit'] = this._styleManagement.createOrUpdateStyle(data).subscribe(
            (res: RestResponse<any>) => {
                this._utilityService.setAlert(this.componentAlert, res.message, res.statusCode);
                this._loadStyles();
                this.hideModal(modal);
            },
            (err: RestResponse<any>) => {
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode, err.errors);
                this.formErrors = err;
                console.log(err);
            }
        )
    }

    private _loadStyles() {
        this.subscriptions['loadStyles'] = this._styleManagement.getAllStyles().subscribe(
            (res: RestResponse<any>) => {
                this.styles = res.data;
            },
            (err: RestResponse<any>) => {
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode);
                this.formErrors = err;
                console.log(err);
            }
        )
    }

    /**
     * Load map pin image to show it in the modal for editing map pin
     * @author Mario Petrovic
     */
    loadMapPinImage(modal: ModalDirective): void {
        this._utilityService.setAlert(this.componentAlert);

        this.subscriptions['loadMapPinImage'] = this._styleManagement.getMapPinImage().subscribe(
            (res: RestResponse<string>) => {
                this.mapPinIcon = res.data;

                modal.show();
            },
            (err: RestResponse<null>) => {
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode);
            }
        )
    }

    /**
     * Change map pin image
     * @author Mario Petrovic
     */
    changeMapPinImage(imageBlob: any, modal: ModalDirective): void {
        this._utilityService.setAlert(this.componentAlert);

        var formData = new FormData();
        formData.append('pinImage', imageBlob)

        this.subscriptions['loadMapPinImage'] = this._styleManagement.changeMapPin(formData).subscribe(
            (res: RestResponse<string>) => {
                this.mapPinIcon = res.data;

                modal.hide();
            },
            (err: RestResponse<null>) => {
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode);
            }
        )
    }

    /**
     * Fire this method when file input changes
     * @author Mario Petrovic
     */
    onMapPinImageChange(event: any): void {
        if (event.target.files[0]) {
            this.mapPinIconBlob = event.target.files[0];
        }
    }

    /**
     * 
     */
    private _loadData() {
        this._loadStyles();
    }

    public isEnabled(event: any, changed: string) {
        if (changed == 'indexValue' || changed == 'isRiskUndefined' || changed == 'numericIndexValue') {
            this.styleForm.get('riskIndexMin').setValue(0);
            this.styleForm.get('riskIndexMax').setValue(0);
            this.styleForm.get('minAndMax').setValue([1, 4]);
            this.styleForm.get('minAndMax').enable();
            this.styleForm.get('isForecastUndefined').setValue(false);
            

            if(changed == 'isRiskUndefined') {
                if(event) {
                    this.styleForm.get('indexValue').reset();
                    this.styleForm.get('numericIndexValue').reset();
                    this.styleForm.get('indexValue').disable();
                    this.styleForm.get('numericIndexValue').disable();
                } else {
                    this.styleForm.get('indexValue').enable();
                    this.styleForm.get('numericIndexValue').enable();
                }
            } else {
                this.styleForm.get('isRiskUndefined').setValue(false);
            }
        } else if (changed == 'minAndMax' || changed == 'isForecastUndefined') {
            this.styleForm.get('indexValue').reset();
            this.styleForm.get('numericIndexValue').reset();
            this.styleForm.get('indexValue').enable();
            this.styleForm.get('numericIndexValue').enable();
            this.styleForm.get('isRiskUndefined').setValue(false);

            if(changed == 'isForecastUndefined') {
                if(event) {
                    this.styleForm.get('riskIndexMin').setValue(-1);
                    this.styleForm.get('riskIndexMax').setValue(0);
                    this.styleForm.get('minAndMax').setValue([-1, 0]);
                    this.styleForm.get('minAndMax').disable();
                } else {
                    this.styleForm.get('riskIndexMin').setValue(0);
                    this.styleForm.get('riskIndexMax').setValue(0);
                    this.styleForm.get('minAndMax').setValue([1, 4]);
                    this.styleForm.get('minAndMax').enable();
                }
            } else {
                this.styleForm.get('isForecastUndefined').setValue(false);
            }
        }
    }

    /**
     * Show modal based on passed modal directive and custom behaviour based on modalName and data
     * @author Nikola Gavric
     */
    public showModal(modal: ModalDirective, modalName: string, data: any): void {
        this._utilityService.setAlert(this.componentAlert);
        this.formErrors = new RestResponse<any>();
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
                if(this.styleForm.get('riskIndexMin').value != null && this.styleForm.get('riskIndexMax').value != null) {
                    this.styleForm.get('minAndMax').setValue([data.riskIndexMin, data.riskIndexMax]);
                    this.styleForm.get('minAndMax').enable();
                    //tabs[1] is Forecast tab
                    this.tabs.tabs[1].active = true;
                } else {
                    this.styleForm.get('minAndMax').setValue([1, 4]);
                    this.styleForm.get('minAndMax').enable();
                    //tabs[0] is Risk tab
                    this.tabs.tabs[0].active = true;
                }

                //if riskIndexMin and riskIndexMax are -1 and 0, trigger checkbox
                if(this.styleForm.get('riskIndexMin').value == -1 && this.styleForm.get('riskIndexMax').value == 0) {
                    this.styleForm.get('isForecastUndefined').setValue(true);
                    this.styleForm.get('minAndMax').disable();
                    //tabs[1] is Forecast tab
                    this.tabs.tabs[1].active = true;
                }

                //if indexValue is -1, trigger checkbox and reset them
                if(this.styleForm.get('indexValue').value == -1) {
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
    }

    /**
     * Hide modal based on passed modal directive
     * @author Nikola Gavric
     */
    public hideModal(modal: ModalDirective) {
        modal.hide();
        this.styleForm.reset();
        this.styleForm.get('minAndMax').patchValue([1, 4]);
        this.styleFormCopy.fill = '#4392e2';
        this.styleFormCopy.stroke = '#049f3c';
        this.selectedStyle = null;
    }

    /*--------- NG On Init ---------*/
    ngOnInit() {
        // Initital method to be executed when page loads
        this._appService.pageLoaded('', this);

        this.componentAlert = new Alert(null, true);
        this.styleForm = this._formBuilder.group({
            id: [null, []],
            riskIndexMin: [null, []],
            riskIndexMax: [null, []],
            indexValue: [null, [Validators.maxLength(10)]],
            numericIndexValue: [null, [ValidationService.validateRange(-999.99, 999.99)]],
            description: [null, [Validators.maxLength(200)]],
            minAndMax: [[1, 4], []],
            fill: ['', []],
            isRiskUndefined: [false, []],
            isForecastUndefined: [false, []],
            stroke: ['', []],
            strokeWidth: [null, [Validators.required, Validators.maxLength(9), Validators.minLength(1)]],
            utInsert: [null, []],
            tsInsert: [null, []],
            utUpdate: [null, []],
            tsUpdate: [null, []],
        });
        this.styleFormCopy = {
            fill: '#4392e2',
            stroke: '#049f3c',
        }
        this.toggles = {
            fill: false,
            stroke: false,
        };
        // Initial methods
        this._loadData();

        this._appService.languageChangeForComponent(this);
    }

    /*--------- NG On Destroy ---------*/
    ngOnDestroy(): void {
        this._appService.refreshEmitters(this.subscriptions);
    }
}