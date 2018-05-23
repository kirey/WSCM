import { Component, OnInit, ViewEncapsulation, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs/Subscription';

import { Footer, DataTable } from 'primeng/primeng';

import { TranslateService } from 'ng2-translate';

import { ModalDirective } from 'ng2-bootstrap';

import { MeasuredStyleService } from './kjgri.measured_style.service';

import { UtilityService } from '../../kjcore/shared/services/utility.service';
import { AppService } from '../../kjcore/shared/services/app.service';

import { Alert, RestResponse } from '../../kjcore/shared/models';

@Component({
    moduleId: module.id,
    templateUrl: 'kjgri.measured_style.cmp.html',
    encapsulation: ViewEncapsulation.None
})
export class MeasuredStyleCmp implements OnInit {
    subscriptions: Subscription[];
    componentAlert: Alert;
    globalFilter: any;
    formErrors: any;

    styles: any;
    toggles: any;
    
    measuredStyleForm: FormGroup;
    measuredStyleFormCopy: any;
    selectedMeasuredStyle: any;
    
    dicStyles: any;
    selectedDicStyle: any;

    /*--------- Constructor ---------*/
    constructor(
        private _utilityService: UtilityService,
        private _measuredStyleManagement: MeasuredStyleService,
        private _appService: AppService,
        private _translateService: TranslateService,
        private _formBuilder: FormBuilder,
        private _changeDetector: ChangeDetectorRef,
        private _domSanitizer: DomSanitizer
    ) {}

    public returnFalse($event) {
        return false;
    }

    public toggleColorPicker(formControlName: string) {
        this.toggles[formControlName] = !this.toggles[formControlName];
    }

    public removeMeasuredStyle(modal: ModalDirective) {
        this.subscriptions['removeMeasuredStyle'] = this._measuredStyleManagement.removeMeasuredStyle(this.selectedMeasuredStyle).subscribe(
            (res: RestResponse<any>) => {
                this._utilityService.setAlert(this.componentAlert, res.message, res.statusCode);
                this._loadMeasuredStyles();
                this.hideModal(modal);
            },
            (err: RestResponse<any>) => {
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode);
                this.formErrors = err;
                console.log(err);
            }
        )
    }

    public measuredStyleFormSubmit(modal: ModalDirective) {
        this.measuredStyleForm.get('stroke').setValue(this.measuredStyleFormCopy.stroke);
        this.measuredStyleForm.get('fill').setValue(this.measuredStyleFormCopy.fill);

        this.subscriptions['measuredStyleFormSubmit'] = this._measuredStyleManagement.createOrUpdateMeasuredStyle(this.measuredStyleForm.value, this.selectedDicStyle).subscribe(
            (res: RestResponse<any>) => {
                this._utilityService.setAlert(this.componentAlert, res.message, res.statusCode);
                this._loadMeasuredStyles();
                this.hideModal(modal);
            },
            (err: RestResponse<any>) => {
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode, err.errors);
                this.formErrors = err;
                console.log(err);
            }
        )
    }

    public onDicStyleChange(event: any) {
        if(event) {
            this._loadMeasuredStyles();
        }
    }

    private _loadMeasuredStyles() {
        this.subscriptions['_loadMeasuredStyles'] = this._measuredStyleManagement.getAllMeasuredStyles(this.selectedDicStyle.id).subscribe(
            (res: RestResponse<any>) => {
                this.styles = res.data;
            },
            (err: RestResponse<any>) => {
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode, err.errors);
                this.formErrors = err;
                console.log(err);
            }
        )
    }

    private _loadDicStyles() {
        this.subscriptions['_loadDicStyles'] = this._measuredStyleManagement.getAllDicStyles().subscribe(
            (res: RestResponse<any>) => {
                this.dicStyles = res.data;
            },
            (err: RestResponse<any>) => {
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode, err.errors);
                this.formErrors = err;
                console.log(err);
            }
        )
    }

    /**
     * 
     */
    private _loadData() {
        this._loadDicStyles();
    }

    /**
     * Show modal based on passed modal directive and custom behaviour based on modalName and data
     * @author Nikola Gavric
     */
    public showModal(modal: ModalDirective, modalName: string, data: any): void {
        this._utilityService.setAlert(this.componentAlert);
        this.formErrors = new RestResponse<any>();
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
    }

    /**
     * Hide modal based on passed modal directive
     * @author Nikola Gavric
     */
    public hideModal(modal: ModalDirective) {
        modal.hide();
        this.measuredStyleForm.reset();
        this.measuredStyleFormCopy.fill = '#4392e2';
        this.measuredStyleFormCopy.stroke = '#049f3c';
        this.selectedMeasuredStyle = null;
    }

    /*--------- NG On Init ---------*/
    ngOnInit() {
        // Initital method to be executed when page loads
        this._appService.pageLoaded('', this);

        this.componentAlert = new Alert(null, true);
        this.measuredStyleForm = this._formBuilder.group({
            id: [null, []],
            valueMin: [null, Validators.required],
            valueMax: [null, Validators.required],
            description: [null, []],
            fill: ['', []],
            stroke: ['', []],
            strokeWidth: [null, Validators.required],
            utInsert: [null, []],
            tsInsert: [null, []],
            utUpdate: [null, []],
            tsUpdate: [null, []],
        });
        this.measuredStyleFormCopy = {
            fill: '#4392e2',
            stroke: '#049f3c',
        }
        this.toggles = {
            fill: false,
            stroke: false,
        };
        //
        this.subscriptions = [];
        // Initial methods
        this._loadData();

        this._appService.languageChangeForComponent(this);
    }

    /*--------- NG On Destroy ---------*/
    ngOnDestroy(): void {
        this._appService.refreshEmitters(this.subscriptions);
    }
}