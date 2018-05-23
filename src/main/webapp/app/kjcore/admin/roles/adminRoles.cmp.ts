import { Component, ViewEncapsulation, OnInit, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { TranslateService } from 'ng2-translate';
import { ModalDirective } from 'ng2-bootstrap';

import { AppService } from '../../shared/services/app.service';
import { UtilityService } from '../../shared/services/utility.service';
import { AdminRoleService } from './adminRoles.service';

import { Alert, RestResponse } from '../../shared/models';

import { ValidationService } from '../../shared/services/validation.service';
import { Role } from "./../users/models";

@Component({
    moduleId: module.id,
    templateUrl: 'adminRoles.cmp.html',
    encapsulation: ViewEncapsulation.None
})
export class AdminRolesCmp implements OnInit {
    subscriptions: Object;
    componentAlert: Alert;
    formErrors: RestResponse<any>;

    allRoles: Role[];
    selectedRole: Role;
    
    editForm: FormGroup;
    modalAlreadyOpened: boolean;
    pageSizes: number[] = [5, 10, 15, 20, 25, 50, 100, 250, 500];

    /*--------- Constructor --------*/
    constructor(private _utilityService: UtilityService,
        private _changeDetectionRef: ChangeDetectorRef,
        private _translateService: TranslateService,
        private _appService: AppService,
        private _roleService: AdminRoleService,
        private _formBuilder: FormBuilder) { }

    /*--------- REST calls --------*/
    /**
     * Loading/Refreshing all roles
     * @author Nikola Gavric
     */
    private loadRoles() {
        this.subscriptions['loadRoles'] = this._roleService.getAllRolesSuperAdmin().subscribe(
            (res: RestResponse<Role[]>) => {
                this.allRoles = res.data;

                for (let role of this.allRoles) {
                    role.timeout = this._utilityService.convertMillisecondsMinutes(role.timeout, true);
                }
            },
            (err: RestResponse<null>) => {
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode, err.errors);
            }
        );
    }

    /**
     * Editing of a role
     * @author Nikola Gavric
     */
    private editRole(modal: ModalDirective) {
        if (this.editForm.value.timeoutForm) {
            this.editForm.controls['timeout'].setValue(this._utilityService.convertMillisecondsMinutes(this.editForm.value.timeoutForm));
        }

        this.subscriptions['editRole'] = this._roleService.editRole(this.editForm.value).subscribe(
            (res: RestResponse<null>) => {
                this.loadRoles();
                this.hideModal(modal);
                this.selectedRole = null;
                this._utilityService.setAlert(this.componentAlert, res.message, res.statusCode);
            },
            (err: RestResponse<null>) => {
                this.formErrors = err;
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode, err.errors);

                if (this.editForm.value.timeoutForm) {
                    this.editForm.controls['timeout'].setValue(this._utilityService.convertMillisecondsMinutes(this.editForm.value.timeout, true));
                }
            }
        );
    }

    /**
     * Adding new role
     * @author Nikola Gavric
     */
    private addRole(modal: ModalDirective) {
        if (this.editForm.value.timeoutForm) {
            this.editForm.controls['timeout'].setValue(this._utilityService.convertMillisecondsMinutes(this.editForm.value.timeoutForm));
        }

        this.subscriptions['addRole'] = this._roleService.addRole(this.editForm.value).subscribe(
            (res: RestResponse<null>) => {
                this.loadRoles();
                this.hideModal(modal);
                this.selectedRole = null;
                this._utilityService.setAlert(this.componentAlert, res.message, res.statusCode);
            },
            (err: RestResponse<null>) => {
                this.formErrors = err;
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode, err.errors);

                if (this.editForm.value.timeoutForm) {
                    this.editForm.controls['timeout'].setValue(this._utilityService.convertMillisecondsMinutes(this.editForm.value.timeout, true));
                }
            }
        );
    }

    /**
     * Deleting a role
     * @author Nikola Gavric
     */
    public deleteRole(modal: ModalDirective) {
        this.subscriptions['deleteRole'] = this._roleService.deleteRole(this.selectedRole).subscribe(
            (res: RestResponse<null>) => {
                let index = this.allRoles.indexOf(this.selectedRole);
                if (index != -1) {
                    this.allRoles.splice(index, 1);
                }
                this.hideModal(modal);
                this.selectedRole = null;
                this._utilityService.setAlert(this.componentAlert, res.message, res.statusCode);
            },
            (err: RestResponse<null>) => {
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode, err.errors);
            }
        );
    }

    /*--------- App logics --------*/

    /**
     * Checking presence of role
     * @author Nikola Gavric
     */
    private contains(roleName: any): boolean {
        for (let role of this.allRoles) {
            if (role.name == roleName) {
                return true;
            }
        }
        return false;
    }

    /**
     * Updating or adding role
     * @author Nikola Gavric
     */
    public updateOrAddRole(newRole: boolean, modal: ModalDirective) {
        let exists = this.contains(this.editForm.controls['name'].value);
        let roleNameSame = (this.selectedRole != null) ? ((this.editForm.controls['name'].value == this.selectedRole.name) ? true : false) : false;
        if (roleNameSame) {
            this.editRole(modal);
        } else {
            if (!exists) {
                if (newRole) {
                    this.addRole(modal);
                } else {
                    this.editRole(modal);
                }
            } else {
                this.editForm.controls['name'].setErrors({
                    "notUnique": true
                });
            }
        }
    }

    /**
     * Setting selected role
     * @author Nikola Gavric
     */
    public setRole(role: Role) {
        this.selectedRole = role;
        if (this.selectedRole != null) {
            this.setupEditForm();
        } else {
            this.setupEditForm(true);
        }
    }

    /**
     * Setting up add or edit form for role
     * @author Nikola Gavric
     */
    private setupEditForm(newRole?: boolean) {
        if (newRole) {
            this.editForm = this._formBuilder.group({
                timeoutForm: [null, [Validators.required]],
                name: [null, [Validators.required]],
                timeout: [null, []]
            });
        } else {
            this.editForm = this._formBuilder.group({
                id: [this.selectedRole.id, []],
                timeoutForm: [this.selectedRole.timeout, [Validators.required]],
                name: [this.selectedRole.name, [Validators.required]],
                timeout: [this.selectedRole.timeout, []]
            });
        }
    }

    /**
     * Showing edit user modal
     * @author Mario Petrovic
     */
    public showModal(modal: ModalDirective, modalName: string, data?: any) {
        this._utilityService.setAlert(this.componentAlert);
        this.formErrors = new RestResponse();

        this.setRole(data);

        modal.show();
    }

    /**
     * Hide modal based on passed modal directive
     * @author Mario Petrovic
     */
    hideModal(modal: ModalDirective) {
        modal.hide();
    }

    /*--------- NG On Init ---------*/
    ngOnInit() {
        // Initital method to be executed when page loads
        this._appService.pageLoaded('', this);
        this._appService.languageChangeForComponent(this, () => {
            this.loadRoles();
        });

        //Modal already opened or not?
        this.modalAlreadyOpened = false;

        //Setting Alert
        this.subscriptions = {};
        this.componentAlert = new Alert(null, true);

        //Initial methods
        this.loadRoles();
    }

    /*--------- NG On Destroy ---------*/
    ngOnDestroy() {
        this._appService.refreshEmitters(this.subscriptions);
    }
}