import { Component, OnInit, ViewEncapsulation, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { Footer, DataTable } from 'primeng/primeng';

import { TranslateService } from 'ng2-translate';

import { ModalDirective } from 'ng2-bootstrap';

import { ActionManagementService } from './kjgri.action.service';

import { UtilityService } from '../../kjcore/shared/services/utility.service';
import { AppService } from '../../kjcore/shared/services/app.service';

import { Alert, RestResponse } from '../../kjcore/shared/models';

@Component({
    moduleId: module.id,
    templateUrl: 'kjgri.action.cmp.html'
})
export class ActionManagementCmp implements OnInit {
    subscriptions: Subscription[] = [];
    componentAlert: Alert;
    selectedRisk: any;
    risks: any = [];
    subRisks: any = [];
    selectedRiskSubtype: any;
    actions: any;
    selectedAction: any;
    globalFilter: any;
    formErrors: any;
    riskForm: FormGroup;
    riskSubtypeForm: FormGroup;
    actionForm: FormGroup;

    /*--------- Constructor ---------*/
    constructor(
        private _utilityService: UtilityService,
        private _actionManagementService: ActionManagementService,
        private _appService: AppService,
        private _translateService: TranslateService,
        private _formBuilder: FormBuilder
    ) { }

    private loadRisks(isEdit?: boolean) {
        this.subscriptions['loadRisks'] = this._actionManagementService.getAllRisks().subscribe(
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
            this.subscriptions['loadSubRisks'] = this._actionManagementService.getAllSubRisks(this.selectedRisk.id).subscribe(
                (res: RestResponse<any>) => {
                    this.subRisks = res.data;
                },
                (err: RestResponse<any>) => {
                    console.log(err);
                },
                () => {
                    if (isEdit) this.selectedRiskSubtype = this.findById(this.subRisks, this.riskSubtypeForm.value.id);
                }
            )
        }
    }

    public loadActions() {
        if (this.selectedRiskSubtype) {
            this.subscriptions['loadActions'] = this._actionManagementService.getActionsBySubriskId(this.selectedRiskSubtype.id).subscribe(
                (res: RestResponse<any>) => {
                    this.actions = res.data;
                },
                (err: RestResponse<any>) => {
                    console.log(err);
                }
            )
        }
    }

    // Disabled from 08.01.2018
    // public riskFormSubmit(modal: ModalDirective) {
    //     this.subscriptions['riskFormSubmit'] = this._actionManagementService.createOrUpdateRisk(this.riskForm.value).subscribe(
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
    //     this.subscriptions['riskSubtypeFormSubmit'] = this._actionManagementService.createOrUpdateRiskSubtype(this.riskSubtypeForm.value).subscribe(
    //         (res: RestResponse<any>) => {
    //             this._utilityService.setAlert(this.componentAlert, res.message, res.statusCode);
    //             this.loadSubRisks(true);
    //             this.hideModal(modal);
    //         },
    //         (err: RestResponse<any>) => {
    //             this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode, err.errors);
    //             this.formErrors = err;
    //             console.log(err);
    //         }
    //     )
    // }

    public actionFormSubmit(modal: ModalDirective) {
        this.subscriptions['actionFormSubmit'] = this._actionManagementService.createOrUpdateAction(this.actionForm.value).subscribe(
            (res: RestResponse<any>) => {
                this._utilityService.setAlert(this.componentAlert, res.message, res.statusCode);
                this.loadActions();
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
        this.loadSubRisks(true);
        this.actions = null;
    }

    public onSubRisksChange() {
        this.loadActions();
    }

    private loadData() {
        this.selectedRisk = null;
        this.loadRisks();
    }

    // Disabled from 08.01.2018
    // public removeRisk(modal: ModalDirective) {
    //     this.subscriptions['removeRisk'] = this._actionManagementService.removeRisk(this.selectedRisk).subscribe(
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
    //     this.subscriptions['removeSubRisk'] = this._actionManagementService.removeRiskSubtype(this.selectedRiskSubtype).subscribe(
    //         (res: RestResponse<any>) => {
    //             this._utilityService.setAlert(this.componentAlert, res.message, res.statusCode);
    //             this.selectedRiskSubtype = null;
    //             this.loadSubRisks();
    //             this.loadActions();
    //             this.hideModal(modal);
    //         },
    //         (err: RestResponse<any>) => {
    //             this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode, err.errors);
    //             this.formErrors = err;
    //             console.log(err);
    //         }
    //     )
    // }

    public removeAction(modal: ModalDirective) {
        this.subscriptions['removeAction'] = this._actionManagementService.removeAction(this.selectedAction).subscribe(
            (res: RestResponse<any>) => {
                this._utilityService.setAlert(this.componentAlert, res.message, res.statusCode);
                this.loadActions();
                this.hideModal(modal);
            },
            (err: RestResponse<any>) => {
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode, err.errors);
                this.formErrors = err;
                console.log(err);
            }
        )
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

            case 'editAction':
                if (data) {
                    this.actionForm.patchValue(data);
                    this.actionForm.controls['dicRiskSubtypes'].setValue(this.selectedRiskSubtype);
                }
                break;
            case 'addAction':
                this.actionForm.reset();
                this.actionForm.controls['dicRiskSubtypes'].setValue(this.selectedRiskSubtype);
                break;

            case 'deleteAction':
                this.selectedAction = data;
                break;
        }
        modal.show();
    }

    private findById(arr: any[], id: number) {
        return arr.filter(obj => obj.id === id)[0];
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
        this.actionForm = this._formBuilder.group({
            id: [null, []],
            name: [null, [Validators.required, Validators.maxLength(100)]],
            description: [null, [Validators.required]],
            dicRiskSubtypes: [null, [Validators.required]]
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