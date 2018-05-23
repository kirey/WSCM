import { Component, OnInit, ViewEncapsulation, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { Footer, DataTable } from 'primeng/primeng';

import { TranslateService } from 'ng2-translate';

import { ModalDirective } from 'ng2-bootstrap';

import { AlertManagementService } from './kjgri.alert.service';

import { UtilityService } from '../../kjcore/shared/services/utility.service';
import { AppService } from '../../kjcore/shared/services/app.service';

import { Alert, RestResponse } from '../../kjcore/shared/models';

@Component({
    moduleId: module.id,
    templateUrl: 'kjgri.alert.cmp.html'
})
export class AlertManagementCmp implements OnInit {
    subscriptions: Subscription[] = [];
    componentAlert: Alert;
    selectedRisk: any;
    risks: any = [];
    selectedRiskSubtype: any;
    selectedAlert: any;
    alerts: any;
    subRisks: any;
    globalFilter: any;
    formErrors: any;
    riskForm: FormGroup;
    riskSubtypeForm: FormGroup;
    alertForm: FormGroup;

    /*--------- Constructor ---------*/
    constructor(
        private _utilityService: UtilityService,
        private _alertManagementService: AlertManagementService,
        private _appService: AppService,
        private _translateService: TranslateService,
        private _formBuilder: FormBuilder
    ) { }

    private loadRisks(isEdit?: boolean) {
        this.subscriptions['loadRisks'] = this._alertManagementService.getAllRisks().subscribe(
            (res: RestResponse<any>) => {
                this.risks = res.data;
            },
            (err: RestResponse<any>) => {
                console.log(err);
            },
            () => {
                if (isEdit) this.selectedRisk = this.findById(this.risks, this.riskForm.value.id);
            }
        )
    }

    private loadSubRisks(isEdit?: boolean) {
        if (this.selectedRisk) {
            this.subscriptions['loadSubRisks'] = this._alertManagementService.getAllSubRisks(this.selectedRisk.id).subscribe(
                (res: RestResponse<any>) => {
                    this.selectedRisk.dicRiskSubtypeses = res.data;
                },
                (err: RestResponse<any>) => {
                    console.log(err);
                },
                () => {
                    if (isEdit) this.selectedRiskSubtype = this.findById(this.selectedRisk.dicRiskSubtypeses, this.riskSubtypeForm.value.id);
                }
            )
        }
    }

    public loadAlerts() {
        if (this.selectedRiskSubtype) {
            this.subscriptions['loadAlerts'] = this._alertManagementService.getAlertsBySubriskId(this.selectedRiskSubtype.id).subscribe(
                (res: RestResponse<any>) => {
                    this.alerts = res.data;
                },
                (err: RestResponse<any>) => {
                    console.log(err);
                }
            )
        }
    }

    // Disabled from 08.01.2018
    // public riskFormSubmit(modal: ModalDirective) {
    //     this.subscriptions['riskFormSubmit'] = this._alertManagementService.createOrUpdateRisk(this.riskForm.value).subscribe(
    //         (res: RestResponse<any>) => {
    //             this._utilityService.setAlert(this.componentAlert, res.message, res.statusCode);
    //             this.loadRisks(true);
    //             this.hideModal(modal);
    //         },
    //         (err: RestResponse<any>) => {
    //             this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode, err.errors);
    //             this.formErrors = err;
    //             console.log(err);
    //         }
    //     )
    // }

    // public riskSubtypeFormSubmit(modal: ModalDirective) {
    //     this.subscriptions['riskSubtypeFormSubmit'] = this._alertManagementService.createOrUpdateRiskSubtype(this.riskSubtypeForm.value).subscribe(
    //         (res: RestResponse<any>) => {
    //             this._utilityService.setAlert(this.componentAlert, res.message, res.statusCode);
    //             this.loadSubRisks();
    //             this.hideModal(modal);
    //         },
    //         (err: RestResponse<any>) => {
    //             this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode, err.errors);
    //             this.formErrors = err;
    //             console.log(err);
    //         }
    //     )
    // }

    public alertFormSubmit(modal: ModalDirective) {
        this.alertForm.controls['valueMin'].setValue(this.alertForm.controls['minAndMax'].value[0]);
        this.alertForm.controls['valueMax'].setValue(this.alertForm.controls['minAndMax'].value[1]);
        this.subscriptions['alertFormSubmit'] = this._alertManagementService.createOrUpdateAlert(this.alertForm.value).subscribe(
            (res: RestResponse<any>) => {
                this._utilityService.setAlert(this.componentAlert, res.message, res.statusCode);
                this.loadAlerts();
                this.hideModal(modal);
            },
            (err: RestResponse<any>) => {
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode, err.errors);
                this.formErrors = err;
                console.log(err);
            }
        )
    }

    // Disabled from 08.01.2018
    // public removeRisk(modal: ModalDirective) {
    //     this.subscriptions['removeRisk'] = this._alertManagementService.removeRisk(this.selectedRisk).subscribe(
    //         (res: RestResponse<any>) => {
    //             this._utilityService.setAlert(this.componentAlert, res.message, res.statusCode);
    //             this.selectedRisk = null;
    //             this.loadRisks();
    //             this.hideModal(modal);
    //         },
    //         (err: RestResponse<any>) => {
    //             this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode, err.errors);
    //             this.formErrors = err;
    //             console.log(err);
    //         }
    //     )
    // }

    // public removeSubRisk(modal: ModalDirective) {
    //     this.subscriptions['removeSubRisk'] = this._alertManagementService.removeRiskSubtype(this.selectedRiskSubtype).subscribe(
    //         (res: RestResponse<any>) => {
    //             this._utilityService.setAlert(this.componentAlert, res.message, res.statusCode);
    //             this.selectedRiskSubtype = null;
    //             this.loadAlerts();
    //             this.loadSubRisks();
    //             this.hideModal(modal);
    //         },
    //         (err: RestResponse<any>) => {
    //             this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode, err.errors);
    //             this.formErrors = err;
    //             console.log(err);
    //         }
    //     )
    // }

    public removeAlert(modal: ModalDirective) {
        this.subscriptions['removeAction'] = this._alertManagementService.removeAlert(this.selectedAlert).subscribe(
            (res: RestResponse<any>) => {
                this._utilityService.setAlert(this.componentAlert, res.message, res.statusCode);
                this.loadAlerts();
                this.hideModal(modal);
            },
            (err: RestResponse<any>) => {
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode, err.errors);
                this.formErrors = err;
                console.log(err);
            }
        )
    }

    public onRisksChange() {
        this.selectedRiskSubtype = null;
        this.loadSubRisks();
        this.alerts = null;
    }

    public onSubRisksChange() {
        this.loadAlerts();
    }

    private loadData() {
        this.selectedRisk = null;
        this.loadRisks();
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
            // Disabled from 08.01.2018
            // case 'editRisk':
            //     if (this.selectedRisk) this.riskForm.patchValue(this.selectedRisk);
            //     break;
            // case 'addRisk':
            //     this.riskForm.reset();
            //     break;

            // case 'editSubtypeRisk':
            //     if (this.selectedRiskSubtype) this.riskSubtypeForm.patchValue(this.selectedRiskSubtype);
            //     this.riskSubtypeForm.controls['dicRiskTypes'].setValue(this.selectedRisk);
            //     break;
            // case 'addSubtypeRisk':
            //     this.riskSubtypeForm.reset();
            //     this.riskSubtypeForm.controls['dicRiskTypes'].setValue(this.selectedRisk);
            //     break;

            case 'editAlert':
                if (data) {
                    this.alertForm.patchValue(data);
                    this.alertForm.controls['minAndMax'].patchValue([data.valueMin, data.valueMax]);
                    this.alertForm.controls['dicRiskSubtypes'].setValue(this.selectedRiskSubtype);
                }
                break;
            case 'addAlert':
                this.alertForm.reset();
                this.alertForm.controls['minAndMax'].patchValue([1, 4]);
                this.alertForm.controls['valueMin'].patchValue(0);
                this.alertForm.controls['valueMax'].patchValue(0);
                this.alertForm.controls['dicRiskSubtypes'].setValue(this.selectedRiskSubtype);
                this.alertForm.controls['notificationIconName'].patchValue('default');
                this.alertForm.controls['level'].patchValue(0);
                this.alertForm.controls['flEnabled'].patchValue(false);
                break;

            case 'deleteAlert':
                this.selectedAlert = data;
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

    public returnFalse($event) {
        return false;
    }

    /*--------- NG On Init ---------*/
    ngOnInit() {
        // Initital method to be executed when page loads
        this._appService.pageLoaded('', this);

        this.componentAlert = new Alert(null, true);
        this.riskForm = this._formBuilder.group({
            id: [null, []],
            name: [null, [Validators.required]],
            code: [null, [Validators.required, Validators.maxLength(2)]]
        });
        this.riskSubtypeForm = this._formBuilder.group({
            id: [null, []],
            name: [null, [Validators.required]],
            code: [null, [Validators.required, Validators.maxLength(3)]],
            usage: [null, [Validators.required]],
            dicRiskTypes: [null, [Validators.required]]
        });
        this.alertForm = this._formBuilder.group({
            id: [null, []],
            name: [null, [Validators.required, Validators.maxLength(100)]],
            messageTitle: [null, [Validators.required, Validators.maxLength(100)]],
            messageBody: [null, [Validators.required, Validators.maxLength(100)]],
            messageText: [null, [Validators.required]],
            minAndMax: [[0, 1], [Validators.required]],
            valueMin: [0, []],
            valueMax: [0, []],
            dicRiskSubtypes: [null, [Validators.required]],
            notificationIconName: ['default', [Validators.required]],
            level: [null, [Validators.required]],
            flEnabled: [true, []]
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