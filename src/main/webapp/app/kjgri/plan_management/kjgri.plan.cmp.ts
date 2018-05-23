import { Component, OnInit, ViewEncapsulation, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { Footer, DataTable } from 'primeng/primeng';

import { TranslateService } from 'ng2-translate';

import { ModalDirective } from 'ng2-bootstrap';

import { PlanManagementService } from './kjgri.plan.service';

import { UtilityService } from '../../kjcore/shared/services/utility.service';
import { AppService } from '../../kjcore/shared/services/app.service';

import { Alert, RestResponse } from '../../kjcore/shared/models';

import { KJGriHistoryService } from './../history/kjgri.history.service';

@Component({
    moduleId: module.id,
    templateUrl: 'kjgri.plan.cmp.html',
    encapsulation: ViewEncapsulation.None
})
export class PlanManagementCmp implements OnInit {
    subscriptions: Subscription[] = [];
    componentAlert: Alert;
    formErrors: any;
    risks: any;
    riskList: any = [];
    riskListCopy: any = [];
    actionModalForm: FormGroup;
    locations: any[];
    selectedLocation: any;
    placeholders: any;
    actionToDelete: any;
    styles: any;

    /*--------- Constructor ---------*/
    constructor(
        private _utilityService: UtilityService,
        private _planManagement: PlanManagementService,
        private _appService: AppService,
        private _translateService: TranslateService,
        private _formBuilder: FormBuilder,
        private _changeDetector: ChangeDetectorRef,
        private _historyService: KJGriHistoryService
    ) { }

    /**
     * 
     */
    private loadData() {
        this._loadLocations();
    }

    /**
     * 
     */
    public onLocationChange() {
        this.loadPlaceholders();
        this._loadRisks();
        this._loadStyles();
    }

    /**
     * 
     * @param $event Boolean
     * @param action json
     */
    public addOrRemoveAction($event, action, riskKey, subriskKey) {
        let elem = this.riskListCopy[riskKey].dicRiskSubtypeses[subriskKey].actionses.filter(singleAction => {
            return action.name == singleAction.name;
        })[0];
        let index = -1;
        if (elem) index = this.riskListCopy[riskKey].dicRiskSubtypeses[subriskKey].actionses.indexOf(elem);
        if ($event && index == -1) {
            this.riskListCopy[riskKey].dicRiskSubtypeses[subriskKey].actionses.push(action);
        } else {
            this.riskListCopy[riskKey].dicRiskSubtypeses[subriskKey].actionses.splice(index, 1);
        }
    }

    /**
     * 
     */
    get isRiskListEmpty(): boolean {
        let isEmpty = true;
        OUTERLOOP: for (let risk of this.riskListCopy) {
            for (let subrisk of risk.dicRiskSubtypeses) {
                isEmpty = !(subrisk.actionses && subrisk.actionses.length > 0);
                if (!isEmpty) break OUTERLOOP;
            }
        }
        return isEmpty;
    }

    /**
     * 
     * @param riskKey 
     * @param subriskKey 
     * @param subrisk 
     */
    public drawSubriskAlert(riskKey: any, subriskKey: any, subrisk: any): string {

        let indexValue = (subrisk.riskIndexValueses && subrisk.riskIndexValueses.length > 0) ? subrisk.riskIndexValueses[0].value : null;
        let initialLength = this.risks[riskKey].dicRiskSubtypeses[subriskKey].actionses.length;
        let actualLength = this.riskListCopy[riskKey].dicRiskSubtypeses[subriskKey].actionses.length;

        let style = null;
        let riskIndexIcon = '';
        if(indexValue && this.styles) {
            style = this.styles.filter((curr) => curr.indexValue == indexValue)[0];
            //-1 ili null primeni stil N/A i primeni still od -1
            if(style) {
                let tempIndex;
                let splitStr = style.fill.split(',');
                splitStr[splitStr.length-1] = "1)";
                style.fill = splitStr.join(',');
                if(style.indexValue == -1) {
                    tempIndex = 'N/A';
                } else {
                    tempIndex = style.indexValue;
                }
                riskIndexIcon = "<span class='badge' style='background-color: "+style.fill+"'>"+tempIndex+"</span>";
                //Read index number from style 09.11
                indexValue = style.numericIndexValue;
            }
        }
        let missingAlert = riskIndexIcon + ' ' + subrisk.name + ' (' + subrisk.actionses.length + ' actions) <i style="left: initial;top: initial;margin-top: auto;position: relative;" class="fa fa-question-circle text-warning" aria-hidden="true"></i>';
        let dangerAlert = riskIndexIcon + ' ' + subrisk.name + ' (' + subrisk.actionses.length + ' actions) <i style="left: initial;top: initial;margin-top: auto;position: relative;" class="fa fa-exclamation-triangle text-danger" aria-hidden="true"></i>';
        let infoAlert = riskIndexIcon + ' ' + subrisk.name + ' (' + subrisk.actionses.length + ' actions) <i style="left: initial;top: initial;margin-top: auto;position: relative;" class="fa fa-exclamation-triangle text-info" aria-hidden="true"></i>';
        let noAlert = riskIndexIcon + ' ' + subrisk.name + ' (' + subrisk.actionses.length + ' actions)';

        if(indexValue == -1) {
            this.riskListCopy[riskKey]['missingAlert'] = '<i style="left: initial;top: initial;margin-top: auto;position: relative;" class="fa fa-question-circle text-warning" aria-hidden="true"></i>';
            return missingAlert;
        } else if(indexValue == 0) {
            if(actualLength > 0) {
                this.riskListCopy[riskKey]['infoAlert'] = '<i style="left: initial;top: initial;margin-top: auto;position: relative;" class="fa fa-exclamation-triangle text-info" aria-hidden="true"></i>';
                return infoAlert;
            }
        } else if(indexValue > 0) {
            if(actualLength == 0 || actualLength < initialLength) {
                this.riskListCopy[riskKey]['dangerAlert'] = '<i style="left: initial;top: initial;margin-top: auto;position: relative;" class="fa fa-exclamation-triangle text-danger" aria-hidden="true"></i>';
                return dangerAlert;
            }
        }

        return noAlert;
    }

    // /**
    //  * 
    //  * @param riskKey 
    //  * @param subriskKey 
    //  * @param subrisk 
    //  */
    // public drawRiskAlert(riskKey: any, risk: any): string {
    //     let name = '<h5>' + risk.name;
    //     let actualRisk = this.riskListCopy[riskKey];

    //     if (actualRisk.hasOwnProperty('missingAlert'))
    //         name += ' ' + actualRisk['missingAlert'];
    //     if (actualRisk.hasOwnProperty('dangerAlert'))
    //         name += ' ' + actualRisk['dangerAlert'];
    //     if (actualRisk.hasOwnProperty('infoAlert'))
    //         name += ' ' + actualRisk['infoAlert'];

    //     name += '</h5>';

    //     return name;
    // }

    private _loadStyles() {
        if(this.selectedLocation) {
            this.subscriptions['_loadStyles'] = this._historyService.getAllStyles("R").subscribe(
                (res: RestResponse<any>) => {
                    this.styles = res.data;
                },
                (err: RestResponse<any>) => {
                    console.log(err);
                }
            );
        }
    }

    /**
     * 
     */
    private _loadRisks() {
        if (this.selectedLocation) {
            this.subscriptions['loadRisks'] = this._planManagement.getAllActionsByLocation(this.selectedLocation.id).subscribe(
                (res: RestResponse<any>) => {
                    this.risks = res.data;
                    //Sorting
                    this.risks.forEach((risk) => {
                        risk.dicRiskSubtypeses.forEach((subrisk) => {
                            //Sort actions
                            subrisk.actionses.sort((a, b) => {
                                return a.name.localeCompare(b.name);
                            });
                        });
                        //Sort subrisks
                        risk.dicRiskSubtypeses.sort((a, b) => {
                            return a.name.localeCompare(b.name);
                        });
                    });
                    //Sort risks
                    this.risks.sort((a, b) => {
                        return a.name.localeCompare(b.name);
                    });
                    //Sorting END
                    
                    this.risks.forEach((risk, riskIndex) => {
                        this.riskList[riskIndex] = this._utilityService.copy(risk);
                        this.riskListCopy[riskIndex] = this._utilityService.copy(risk);
                        risk.dicRiskSubtypeses.forEach((subrisk, subriskIndex) => {
                            this.riskList[riskIndex].dicRiskSubtypeses[subriskIndex] = this._utilityService.copy(subrisk);
                            this.riskListCopy[riskIndex].dicRiskSubtypeses[subriskIndex] = this._utilityService.copy(subrisk);

                            this.riskList[riskIndex].dicRiskSubtypeses[subriskIndex].actionses = [];
                            this.riskListCopy[riskIndex].dicRiskSubtypeses[subriskIndex].actionses = [];

                            subrisk.actionses.forEach((action, actionIndex) => {
                                if (action.clientCompanyActionses.length > 0) {
                                    action.description = action.clientCompanyActionses[0].actionDescription;
                                    //Ovde je problem jer ne moze da ubaci kopiranu akciju nego mora original
                                    //Da bi bila oznacena u modalu i da bi se updateovala
                                    //this._utilityService.copy();
                                    this.riskList[riskIndex].dicRiskSubtypeses[subriskIndex].actionses.push(action);
                                    this.riskListCopy[riskIndex].dicRiskSubtypeses[subriskIndex].actionses.push(action);
                                }
                            });
                        });
                        
                    });
                },
                (err: RestResponse<any>) => {
                    console.log(err);
                }
            )
        }
    }

    /**
     * 
     */
    public savePlan() {
        this._savePlaceholders(
            this.saveActions
        );
    }

    /**
     * 
     */
    public previewPlan() {
        this._savePlaceholders(
            this.saveActions.bind(this,
                this._previewPlan
            )
        );
    }

    /**
     * 
     */
    public archivePlan() {
        this._savePlaceholders(
            this.saveActions.bind(this,
                this._archivePlan
            )
        );
    }

    /**
     * 
     */
    private _previewPlan() {
        this.subscriptions['previewPlan'] = this._planManagement.previewPlan(this.selectedLocation.id, this.placeholders).subscribe(
            (res: RestResponse<any>) => {
                let blob = this._appService.convertBase64ToBlob(res.data, 'application/pdf');
                let fileURL = URL.createObjectURL(blob);
                // If site settings has popups blocked, this variable will be null, thus try/catch is required
                let newWindowState = window.open(fileURL);

                setTimeout(() => {
                    try {
                        if (newWindowState.closed) {
                            this._utilityService.setAlert(this.componentAlert, 'fe.placeholderManagement.popupBlockerPresent', 400);
                        } else {
                            this._utilityService.setAlert(this.componentAlert, 'fe.placeholderManagement.planPrinted', 200);
                        }
                    } catch (e) {
                        this._utilityService.setAlert(this.componentAlert, 'fe.placeholderManagement.popupBlockerPresent', 400);
                    }
                }, 700);

                this.formErrors = null;

            }, (err: RestResponse<any>) => {
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode, err.errors);
                this.formErrors = err;
            }
        );
    }

    /**
     * 
     */
    private _archivePlan() {
        this.subscriptions['archivePlan'] = this._planManagement.archivePlan(this.selectedLocation.id, this.placeholders).subscribe(
            (res: RestResponse<any>) => {
                this._utilityService.setAlert(this.componentAlert, res.message, res.statusCode);
            }, (err: RestResponse<any>) => {
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode, err.errors);
                this.formErrors = err;
            }
        )
    }

    /**
     * 
     */
    public loadPlaceholders() {
        if (this.selectedLocation) {
            this.subscriptions['loadPlaceholders'] = this._planManagement.getPlaceholders(this.selectedLocation.id).subscribe(
                (res: RestResponse<any>) => {
                    this.placeholders = res.data;
                },
                (err: RestResponse<any>) => {
                    console.log(err);
                }
            )
        }
    }

    /**
     * 
     */
    private _loadLocations() {
        this.subscriptions['loadLocations'] = this._planManagement.getAllLocations().subscribe(
            (res: RestResponse<any>) => {
                this.locations = res.data;
            },
            (err: RestResponse<any>) => {
                console.log(err);
            }
        )
    }

    /**
     * 
     */
    public saveActions(callback?: Function): void {
        let actions = [];
        for (let risk of this.riskListCopy)
            for (let subrisk of risk.dicRiskSubtypeses)
                for (let action of subrisk.actionses)
                    actions.push(action);
        this.subscriptions['saveActions'] = this._planManagement.saveActions(this.selectedLocation.id, actions).subscribe(
            (res: RestResponse<any>) => {
                this._utilityService.setAlert(this.componentAlert, res.message, res.statusCode);
                if (callback) callback.call(this);
            },
            (err: RestResponse<any>) => {
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode);
                this.formErrors = err;
                console.log(err);
            }
        );
    }

    /**
     * 
     */
    private _savePlaceholders(callback?: Function) {
        this.subscriptions['savePlaceholders'] = this._planManagement.savePlaceholders(this.selectedLocation.id, this.placeholders).subscribe(
            (res: RestResponse<any>) => {
                this._utilityService.setAlert(this.componentAlert, res.message, res.statusCode);
                if (callback) callback.call(this);
            },
            (err: RestResponse<any>) => {
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode);
                this.formErrors = err;
                console.log(err);
            }
        );
    }

    /**
     * 
     * @param arr 
     * @param id 
     */
    private _findById(arr: any[], id: number) {
        return arr.filter(obj => obj.id === id)[0];
    }

    /**
     * 
     * @param arr 
     * @param id 
     */
    private _findIndex(arr: any[], id: number) {
        return arr.indexOf(this._findById(arr, id));
    }

    /**
     * 
     * @param riskKey 
     * @param id 
     */
    public removeAction(modal?: ModalDirective) {
        if (this.actionToDelete) {
            let riskKey = this.actionToDelete[0];
            let subriskKey = this.actionToDelete[1];
            let action = this.actionToDelete[2];

            this.risks[riskKey].dicRiskSubtypeses[subriskKey].actionses.some((currAction) => {
                if(action.id == currAction.id) {
                    action.description = action.oldDescription;
                    return true;
                }
                return false;
            });
            this.riskList[riskKey].dicRiskSubtypeses[subriskKey].actionses = this.riskList[riskKey].dicRiskSubtypeses[subriskKey].actionses.filter(currAction => {
                return currAction.id != action.id;
            });
            this.riskListCopy[riskKey].dicRiskSubtypeses[subriskKey].actionses = this.riskListCopy[riskKey].dicRiskSubtypeses[subriskKey].actionses.filter(currAction => {
                return currAction.id != action.id;
            });

            this.hideModal(modal);
        }
    }

    /**
     * 
     * @param modal 
     */
    public saveAction(modal: ModalDirective) {
        OUTERLOOP: for (let risk of this.riskListCopy)
            for (let subrisk of risk.dicRiskSubtypeses)
                for (let action of subrisk.actionses)
                    if (action.id == this.actionModalForm.value.id) {
                        action.oldDescription = action.description;
                        action.description = this.actionModalForm.value.description;
                        break OUTERLOOP;
                    }
        this.hideModal(modal);
    }

    /**
     * 
     * @param data 
     */
    private _setupActionModalForm(data: any) {
        if (data.action) {
            var sub = this._utilityService.copy(data.subrisk);
            data.action.dicRiskSubtypes = sub;
            this.actionModalForm.patchValue(data.action);
        } else {
            this.actionModalForm.patchValue(data);
        }
    }

    /**
     * Show modal based on passed modal directive and custom behaviour based on modalName and data
     * @author Nikola Gavric
     */
    public showModal(modal: ModalDirective, modalName: string, data: any, riskKey?: string, subriskKey?: string): void {
        this._utilityService.setAlert(this.componentAlert);
        this.formErrors = new RestResponse();
        switch (modalName) {
            case 'editAction':
                this._setupActionModalForm(data);
                break;
            case 'deleteAction':
                this.actionToDelete = [riskKey, subriskKey, data];
                break;
        }
        modal.show();
    }

    /**
     * Hide modal based on passed modal directive
     * @author Nikola Gavric
     */
    public hideModal(modal: ModalDirective) {
        this.actionModalForm.reset();
        this.actionToDelete = null;
        modal.hide();
    }

    /*--------- NG On Init ---------*/
    ngOnInit() {
        // Initital method to be executed when page loads
        this._appService.pageLoaded('', this);

        this.componentAlert = new Alert(null, true);
        this.actionModalForm = this._formBuilder.group({
            id: [null, []],
            name: [null, []],
            description: [null, []],
            dicRiskSubtypes: [null, []]
        });
        // Initial methods
        this.loadData();

        this._appService.languageChangeForComponent(this);
    }

    /*--------- NG On Destroy ---------*/
    ngOnDestroy(): void {
        this._appService.refreshEmitters(this.subscriptions);
    }
}