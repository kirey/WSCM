import { Component, ViewEncapsulation, OnInit, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { ModalDirective } from 'ng2-bootstrap';
import { TranslateService } from 'ng2-translate';

import { AppService } from '../../kjcore/shared/services/app.service';
import { UtilityService } from '../../kjcore/shared/services/utility.service';

import { Alert, RestResponse } from '../../kjcore/shared/models';

import { PackageManagementService } from './kjgri.package.service';

import { KJGriConstants } from "../kjgri.constants";

@Component({
    moduleId: module.id,
    templateUrl: 'kjgri.package.cmp.html',
    encapsulation: ViewEncapsulation.None
})
export class PackageManagementCmp implements OnInit {

    subscriptions: Subscription[] = [];
    componentAlert: Alert;
    globalFilter: any;
    formErrors: any;
    packages: any;
    packageForm: FormGroup;

    /*--------- Constructor --------*/
    constructor(private _utilityService: UtilityService,
        private _changeDetectionRef: ChangeDetectorRef,
        private _appService: AppService,
        private _translateService: TranslateService,
        private _formBuilder: FormBuilder,
        private _packageManagementService: PackageManagementService,
        private _constants: KJGriConstants) { }

    /**
     * Loading all packages.
     * @author Nikola Gavric
     */
    private _loadPackages() {
        this.subscriptions['_loadPackages'] = this._packageManagementService.getAllPackages().subscribe(
            (res: RestResponse<any>) => {
                this.packages = res.data;
            },
            (err: RestResponse<any>) => {
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode);
            }
        );
    }

    /**
     * Saving a package.
     * @param modal ModalDirective
     * @author Nikola Gavric
     */
    public packageFormSubmit(modal: ModalDirective) {
        this.subscriptions['packageFormSubmit'] = this._packageManagementService.updatePackage(this.packageForm.value).subscribe(
            (res: RestResponse<any>) => {
                this._utilityService.setAlert(this.componentAlert, res.message, res.statusCode);
                this._loadData();
                this.hideModal(modal);
            },
            (err: RestResponse<any>) => {
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode);
            }
        );
    }

    /**
     * Loading all necessary stuff
     * @author Nikola Gavric
     */
    private _loadData() {
        this._loadPackages();
    }

    /**
     * Show modal based on passed modal directive and custom behaviour based on modalName and data
     * @author Nikola Gavric
     */
    public showModal(modal: ModalDirective, modalName: string, data: any): void {
        this._utilityService.setAlert(this.componentAlert);
        this.formErrors = new RestResponse<any>();
        switch (modalName) {
            case 'editPackage':
                this.packageForm.patchValue(data);
                if(this.isAsicurativo()) this.packageForm.get('numberOfLocations').disable();
                else this.packageForm.get('numberOfLocations').enable();
                break;
        }
        modal.show();
    }

    /**
     * Hide modal based on passed modal directive
     * @author Nikola Gavric
     */
    public hideModal(modal: ModalDirective) {
        this.packageForm.reset();
        modal.hide();
    }

    /**
     * Check if package is for asicurativo.
     * @author Nikola Gavric
     */
    public isAsicurativo() {
        return this.packageForm.get('clientCompanyType').value == 'A';
    }

    /*--------- NG On Init ---------*/
    //@hasAny()
    ngOnInit() {
        // Initital method to be executed when page loads
        this._appService.pageLoaded('', this);

        //Setting initial submit value
        this.componentAlert = new Alert(null, true);
        this.packageForm = this._formBuilder.group({
            id: [null, []],
            code: [null, []],
            name: [null, []],
            clientCompanyType: [null, []],
            numberOfAccounts: [null, [Validators.required]],
            numberOfLocations: [null, []],
            duration: [null, [Validators.required]]
        });
        //Loading view data
        this._loadData();

        this._appService.languageChangeForComponent(this);
    }

    ngOnDestroy() { // On destroy
        this._appService.refreshEmitters(this.subscriptions);
    }
}