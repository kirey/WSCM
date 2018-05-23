import { Component, OnInit, ViewEncapsulation, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { Footer, DataTable } from 'primeng/primeng';

import { TranslateService } from 'ng2-translate';

import { ModalDirective } from 'ng2-bootstrap';

import { PlaceholderManagementService } from './kjgri.placeholder.service';

import { UtilityService } from '../../kjcore/shared/services/utility.service';
import { AppService } from '../../kjcore/shared/services/app.service';

import { Alert, RestResponse } from '../../kjcore/shared/models';

@Component({
    moduleId: module.id,
    templateUrl: 'kjgri.placeholder.cmp.html'
})
export class PlaceholderManagementCmp implements OnInit {
    subscriptions: Subscription[] = [];
    componentAlert: Alert;
    placeholders: any;
    selectedPlaceholder: any;
    globalFilter: any;
    formErrors: any;
    placeholderForm: FormGroup;

    /*--------- Constructor ---------*/
    constructor(
        private _utilityService: UtilityService,
        private _placeholderManagementService: PlaceholderManagementService,
        private _appService: AppService,
        private _translateService: TranslateService,
        private _formBuilder: FormBuilder
    ) { }

    private loadPlaceholders() {
        this.subscriptions['loadPlaceholders'] = this._placeholderManagementService.getAllPlaceholders().subscribe(
            (res: RestResponse<any>) => {
                this.placeholders = res.data;
            },
            (err: RestResponse<any>) => {
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode);
                this.formErrors = err;
            }
        )
    }

    public placeholderFormSubmit(modal: ModalDirective) {
        this.subscriptions['placeholderFormSubmit'] = this._placeholderManagementService.createOrUpdatePlaceholder(this.placeholderForm.value).subscribe(
            (res: RestResponse<any>) => {
                this._utilityService.setAlert(this.componentAlert, res.message, res.statusCode);
                this.hideModal(modal);
                this.loadPlaceholders();
            },
            (err: RestResponse<any>) => {
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode);
                this.formErrors = err;
            }
        )
    }

    public removePlaceholder(modal: ModalDirective) {
        this.subscriptions['removePlaceholder'] = this._placeholderManagementService.removePlaceholder(this.selectedPlaceholder).subscribe(
            (res: RestResponse<any>) => {
                this._utilityService.setAlert(this.componentAlert, res.message, res.statusCode);
                this.hideModal(modal);
                this.loadPlaceholders();
            },
            (err: RestResponse<any>) => {
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode);
                this.formErrors = err;
            }
        )
    }

    private loadData() {
        this.loadPlaceholders();
    }

    private findById(arr: any[], id: number) {
        return arr.filter(obj => obj.id === id)[0];
    }

    /**
     * Show modal based on passed modal directive and custom behaviour based on modalName and data
     * @author Nikola Gavric
     */
    showModal(modal: ModalDirective, modalName?: string, data?: any): void {
        this._utilityService.setAlert(this.componentAlert);
        this.formErrors = new RestResponse();
        switch (modalName) {
            case 'editPlaceholder':
                if (data) this.placeholderForm.patchValue(data);
                break;

            case 'addPlaceholder':
                this.placeholderForm.reset();
                break;

            case 'deletePlaceholder':
                this.selectedPlaceholder = data;
                break;
        }
        modal.show();
    }

    /**
     * Hide modal based on passed modal directive
     * @author Nikola Gavric
     */
    hideModal(modal: ModalDirective) {
        modal.hide();
    }

    /*--------- NG On Init ---------*/
    ngOnInit() {
        // Initital method to be executed when page loads
        this._appService.pageLoaded('', this);

        this.componentAlert = new Alert(null, true);
        this.placeholderForm = this._formBuilder.group({
            id: [null, []],
            name: [null, [Validators.required]],
            placeholderCode: [null, [Validators.required]],
            templateText: [null, [Validators.required]]
        });
        // Initial methods
        this.loadData();

        this._appService.languageChangeForComponent(this, this.loadData.bind(this));
    }

    /*--------- NG On Destroy ---------*/
    ngOnDestroy(): void {
        this._appService.refreshEmitters(this.subscriptions);
    }
}