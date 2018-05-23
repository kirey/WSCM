import { Component, ViewEncapsulation, OnInit, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { TranslateService } from 'ng2-translate';
import { ModalDirective } from 'ng2-bootstrap';

import { SelectItem } from 'primeng/primeng';

import { AppService } from '../../kjcore/shared/services/app.service';
import { UtilityService } from '../../kjcore/shared/services/utility.service';
import { ValidationService } from '../../kjcore/shared/services/validation.service';


import { Alert, RestResponse } from '../../kjcore/shared/models';

import { KJGriAdminUserService } from './kjgri.adminUsers.service';

import { AdminRoleService } from '../../kjcore/admin/roles/adminRoles.service';
import { CompanyManagementService } from '../../kjcore/company_management/companyManagement.service';

import { Role } from "./../../kjcore/admin/users/models";
import { Company } from "./../../kjcore/company_management/models/company.model";

import { KJGriConstants } from "./../kjgri.constants";

@Component({
    moduleId: module.id,
    templateUrl: 'kjgri.adminUsers.cmp.html',
    encapsulation: ViewEncapsulation.None
})
export class KJGriAdminUsersCmp implements OnInit {
    subscriptions: any;
    componentAlert: Alert;
    formErrors: RestResponse<any>;

    defaultDate: Date;
    allUsers: any;
    roles: Role[];

    availableCompanies: Company[];
    defaultCompany: Company;

    selectedUser: any;
    editForm: FormGroup;
    addForm: FormGroup;
    @ViewChild('filterForm') filterForm: any;
    filterFormValidity: boolean;

    pageSizes: number[] = [5, 10, 15, 20, 25, 50, 100, 250, 500];
    @ViewChild('globalFilter')
    globalFilter: any;
    today: Date;

    languages: any;

    password: string;
    editPassword: string;
    passwordMismatch: boolean;

    strength: number;

    /*--------- Constructor --------*/
    constructor(
        private _utilityService: UtilityService,
        private _changeDetectionRef: ChangeDetectorRef,
        private _translateService: TranslateService,
        private _appService: AppService,
        private _adminService: KJGriAdminUserService,
        private _companyService: CompanyManagementService,
        private _rolesService: AdminRoleService,
        private _formBuilder: FormBuilder,
        private _constants: KJGriConstants) { }


    /*--------- REST calls --------*/
    /**
     * Loading/Refreshing all filtered
     * users in the table
     * @author Nikola Gavric
     */
    public loadFilteredUsers(filters?: any) {
        this._utilityService.setAlert(this.componentAlert);
        this.subscriptions['loadFilteredUsers'] = this._adminService.getFilteredUsers(filters).subscribe(
            (res: RestResponse<any>) => {
                this.allUsers = res.data;
                //Loop through users
                for (let user of this.allUsers) {
                    //Prepare new variable to set all roles
                    user.roles = "";
                    //Loop through all user authorities
                    for (let i = 0; i < user.authorities.length; i++) {
                        //Append name of authority to new variable
                        user.roles += (user.authorities[i].name + (((user.authorities.length - 1) != i) ? ", " : ""));
                    }

                    if (user.timeout) {
                        user.timeout = this._utilityService.convertMillisecondsMinutes(user.timeout, true);
                    }
                    //Required to update the view with changes
                    this._changeDetectionRef.detectChanges();
                }
            },
            (err: RestResponse<null>) => {
                this.allUsers = [];
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode, err.errors);
            }
        );
    }

    /**
     * Load roles based on selected company
     * @author Nikola Gavric
     */
    loadRolesByCompanyId(selectedCompanyId: number, modal?: ModalDirective) {
        this._utilityService.setAlert(this.componentAlert);
        this.subscriptions['loadRolesByCompanyId'] = this._adminService.getRolesByCompanyId(selectedCompanyId).subscribe(
            (res: RestResponse<Role[]>) => {
                this.roles = res.data;

                if (modal) {
                    modal.show();
                }
            },
            (err: RestResponse<null>) => {
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode, err.errors);
            }
        )
    }

    /**
     * Load roles based on loggedin user
     * @author Mario Petrovic
     */
    loadRolesByUserCompany(modal?: ModalDirective) {
        this._utilityService.setAlert(this.componentAlert);
        this.subscriptions['loadRolesByUserCompany'] = this._adminService.getRolesByUserCompany().subscribe(
            (res: RestResponse<Role[]>) => {
                this.roles = res.data;

                if (modal) {
                    modal.show();
                }
            },
            (err: RestResponse<null>) => {
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode, err.errors);
            }
        )
    }

    /**
     * Loading all active companies
     * @author Nikola Gavric
     */
    loadActiveCompanies() {
        this._utilityService.setAlert(this.componentAlert);
        this.subscriptions['loadActiveCompanies'] = this._adminService.getActiveCompanies().subscribe(
            (res: RestResponse<Company[]>) => {
                this.availableCompanies = res.data;
                for (let company of this.availableCompanies) {
                    if (company.code == 'defaultCompany') {
                        this.defaultCompany = company;
                    }
                }
            },
            (err: RestResponse<null>) => {
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode, err.errors);
            }
        )
    }

    /**
     * Clear field
     * @author Nikola Gavric
     */
    public clearFieldValue(formControl: FormControl) {
        formControl.reset();
    }

    /**
     * Updating whole selected user
     * @author Mario Petrovic
     */
    public updateUser(userData: any, modal: ModalDirective) {
        if (this._appService.isAuthorised(KJGriConstants.ROLES.SUPER_ADMIN)) {
            //Setting up user companies
            this.setupUserCompanies(userData);

            if (userData.value.timeout && userData.value.timeout != 0) {
                userData.controls['timeout'].setValue(this._utilityService.convertMillisecondsMinutes(userData.value.timeout));
            } else {
                userData.controls['timeout'].setValue(null);
            }
        }
        //Setting up user authorities
        this.setupUserRoles(userData);

        this.subscriptions['updateUser'] = this._adminService.editUser(userData.value).subscribe(
            (res: RestResponse<null>) => {
                if (this.filterFormValidity) {
                    this.loadFilteredUsers(this.filterForm.value);
                } else if (!this.filterForm) {
                    this.loadFilteredUsers();
                }
                this.hideModal(modal);
                this._utilityService.setAlert(this.componentAlert, res.message, res.statusCode);
            },
            (err: RestResponse<null>) => {
                this.formErrors = err;
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode, err.errors);


                if (this._appService.isAuthorised(KJGriConstants.ROLES.SUPER_ADMIN)) {
                    if (userData.value.timeout && userData.value.timeout != 0) {
                        userData.controls['timeout'].setValue(this._utilityService.convertMillisecondsMinutes(userData.value.timeout, true));
                    } else {
                        userData.controls['timeout'].setValue(null);
                    }
                }
            }
        );
    }

    /**
     * Updating user status
     * @author Nikola Gavric
     */
    public updateUserStatus(user) {
        this.subscriptions['updateUserStatus'] = this._adminService.updateUserStatus(user).subscribe(
            (res: RestResponse<null>) => {
                this._utilityService.setAlert(this.componentAlert, res.message, res.statusCode);
                user.enabled = !user.enabled;
            },
            (err: RestResponse<null>) => {
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode, err.errors);
            }
        );
    }


    /**
     * Adding new user
     * @author Nikola Gavric
     */
    public addUser(userData: FormGroup, modal: ModalDirective) {
        if (this._appService.isAuthorised(KJGriConstants.ROLES.SUPER_ADMIN)) {
            this.setupUserCompanies(userData);

            if (userData.value.timeout && userData.value.timeout != 0) {
                userData.controls['timeout'].setValue(this._utilityService.convertMillisecondsMinutes(userData.value.timeout));
            } else {
                userData.controls['timeout'].setValue(null);
            }
        }

        this.setupUserRoles(userData);

        this.subscriptions['addUser'] = this._adminService.addUser(userData.value).subscribe(
            (res: RestResponse<null>) => {
                if (this.filterFormValidity) {
                    this.loadFilteredUsers(this.filterForm.value);
                } else if (!this.filterForm) {
                    this.loadFilteredUsers();
                }
                this.hideModal(modal);
                this._utilityService.setAlert(this.componentAlert, res.message, res.statusCode);
            },
            (err: RestResponse<null>) => {
                this.formErrors = err;
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode, err.errors);


                if (this._appService.isAuthorised(KJGriConstants.ROLES.SUPER_ADMIN)) {

                    if (userData.value.timeout && userData.value.timeout != 0) {
                        userData.controls['timeout'].setValue(this._utilityService.convertMillisecondsMinutes(userData.value.timeout, true));
                    } else {
                        userData.controls['timeout'].setValue(null);
                    }
                }
            }
        );
    }

    /*------------ Other ------------- */

    /**
     * Returns a list of active companies
     * without a default company only
     * @author Nikola Gavric
     */
    public companiesWithoutDefaultCompany(): any[] {
        let companies: any = [];

        for (let company of this.availableCompanies)
            if (company.id != this.defaultCompany.id)
                companies.push(company);

        companies.sort();
        return companies;
    }

    /**
     * Preparing authorities for edited user
     *  before sending request
     * @author Nikola
     */
    private setupEditUserRoles() {
        //Updating form value before sending
        for (let role of this.roles) {
            if (role.name == this.editForm.controls['selectedRoles'].value) {
                this.editForm.controls['authorities'].setValue([role]);
            }
        }
    }

    /**
     * Sort roles so that Super admin role and Admin role are in first two places
     * @author Mario Petrovic
     */
    sortRoles(roles: Role[]): Role[] {
        let superAdminRole: Role = new Role();
        let adminRole: Role = new Role();
        let subAdminRole: Role = new Role();
        let platinumIRole: Role = new Role();
        let platinumARole: Role = new Role();
        let goldIRole: Role = new Role();
        let goldARole: Role = new Role();
        let silverIRole: Role = new Role();
        let silverARole: Role = new Role();
        let rows: any = [];

        // Get Super admin and Admin roles
        // for (let role of roles) {
        //     if (role.name == KJGriConstants.ROLES.SUPER_ADMIN) {
        //         superAdminRole = this._utilityService.copy(role);
        //     } else if (role.name == KJGriConstants.ROLES.ADMIN) {
        //         adminRole = this._utilityService.copy(role);
        //     } else if (role.name == KJGriConstants.ROLES.SUBADMIN) {
        //         subAdminRole = this._utilityService.copy(role);
        //     } else if (role.name == KJGriConstants.ROLES.PLATINUM_A) {
        //         platinumARole = this._utilityService.copy(role);
        //     } else if (role.name == KJGriConstants.ROLES.PLATINUM_I) {
        //         platinumIRole = this._utilityService.copy(role);
        //     } else if (role.name == KJGriConstants.ROLES.GOLD_A) {
        //         goldARole = this._utilityService.copy(role);
        //     } else if (role.name == KJGriConstants.ROLES.GOLD_I) {
        //         goldIRole = this._utilityService.copy(role);
        //     } else if (role.name == KJGriConstants.ROLES.SILVER_A) {
        //         silverARole = this._utilityService.copy(role);
        //     } else if (role.name == KJGriConstants.ROLES.SILVER_I) {
        //         silverIRole = this._utilityService.copy(role);
        //     }
        // }

        let rolesTemp = roles.filter((item: Role) => {
            return !item.name.includes('_A') && !item.name.includes('_I') && !item.name.includes('ADMIN');
        });

        if (superAdminRole.name != null) {
            rows[0] = [superAdminRole];
        }
        if (adminRole.name != null && subAdminRole.name != null) {
            rows[1] = [adminRole, subAdminRole];
        }
        if (platinumARole.name != null && goldARole != null && silverARole != null) {
            rows[2] = [platinumARole, goldARole, silverARole];
        }
        if (platinumIRole.name != null && goldIRole != null && silverIRole != null) {
            rows[3] = [platinumIRole, goldIRole, silverIRole];
        }
        if (rolesTemp.length) {
            rows[4] = rolesTemp;
        }

        return rows;
    }

    /**
     * Check if role is selected
     * @author Nikola Gavric
     */
    isRoleSelected(roleNames: string[] | string, formGroup: FormGroup): boolean {
        let formControl = formGroup.controls['selectedRoles'];
        if (formControl.value) { // Change detection problem solved by asking if values are defined
            if (typeof roleNames == "string") {
                return formControl.value && formControl.value == roleNames;
            } else {
                let rolesTemp = [];
                for (let i of roleNames) {
                    if (formControl.value && formControl.value.indexOf(i) > -1) {
                        rolesTemp.push(i);
                    }
                }
                return rolesTemp.length > 0;
            }

        }
        return false;
    }

    /**
     * Loading languages
     * @author Nikola Gavric
     */
    private loadLanguages() {
        this.subscriptions['loadLanguages'] = this._adminService.getLanguagesRest().subscribe(
            (res: RestResponse<any>) => {
                this.languages = [];
                for (let key in res.data) {
                    this.languages.push({ languageCode: key, languageText: res.data[key] });
                }
            }
        );
    }

    /**
     * Setting currently selected user
     * @author Nikola Gavric
     */
    private setUser(user: any) {
        this.selectedUser = user;
        //Setting currently selected user roles variable
        this.selectedUser.selectedRoles = this.selectedUser.authorities.length ? this.selectedUser.authorities[0].name : null;

        //Setting currently selected user companies variable        
        this.selectedUser.selectedCompany = this.selectedUser.kjcCompanies;

        this.formErrors = new RestResponse();
    }

    /**
     * Setting up edit user form
     * @author Nikola Gavric
     */
    private setupEditForm() {
        let formTemp: any = {
            id: new FormControl(null),
            username: new FormControl(null, [Validators.required, Validators.maxLength(255)]),
            password: new FormControl(null, [Validators.maxLength(255)]),
            enabled: new FormControl(null),
            firstName: new FormControl(null, [Validators.required, Validators.maxLength(40)]),
            lastName: new FormControl(null, [Validators.required, Validators.maxLength(40)]),
            securityNumber: new FormControl(null),
            logCounter: new FormControl(null),
            passwordTimestamp: new FormControl(null),
            firstLogin: new FormControl({ value: null, disabled: true }),
            lastLogin: new FormControl({ value: null, disabled: true }),
            email: new FormControl(null, [Validators.maxLength(255), ValidationService.emailValidator(), Validators.required]),
            defaultLanguage: new FormControl(null),
            authorities: new FormControl(null),
            faccountExpiryDate: new FormControl({ value: null, disabled: true }),
            ffirstLogin: new FormControl({ value: null, disabled: true }),
            flastLogin: new FormControl({ value: null, disabled: true }),
            fpasswordTimestamp: new FormControl({ value: null, disabled: true }),
            flogCounter: new FormControl({ value: null, disabled: true }),
            kjcCompanies: new FormControl(null),
            userAccounts: new FormControl(null)
        }

        if (this._appService.isAuthorised(KJGriConstants.ROLES.SUPER_ADMIN)) {
            formTemp.timeout = new FormControl(null, [Validators.maxLength(19)]);
        }

        formTemp.selectedRoles = new FormControl(null, [Validators.required, Validators.minLength(1)]);

        if (this._appService.isAuthorised(KJGriConstants.ROLES.SUPER_ADMIN)) {
            formTemp.selectedCompany = new FormControl(null, [Validators.required]);
        }

        this.editForm = this._formBuilder.group(formTemp);

    }

    /**
     * Setting up add user form
     * @author Nikola Gavric
     */
    private setupAddForm(modal: ModalDirective) {
        this.formErrors = new RestResponse();

        // If addForm is initialized again, error will occure because it is loosing reference to old addForm
        if (this.addForm) {
            if (this._appService.isAuthorised(KJGriConstants.ROLES.SUPER_ADMIN)) {
                this.addForm.setValue({
                    username: null,
                    firstName: null,
                    lastName: null,
                    securityNumber: null,
                    password: null,
                    confirmPassword: null,
                    enabled: true,
                    email: null,
                    defaultLanguage: null,
                    authorities: [],
                    timeout: [],
                    selectedRoles: [],
                    kjcCompanies: null,
                    userAccounts: null,
                    selectedCompany: this.availableCompanies[0]
                });
            } else {
                this.addForm.setValue({
                    username: null,
                    firstName: null,
                    lastName: null,
                    securityNumber: null,
                    password: null,
                    confirmPassword: null,
                    enabled: true,
                    email: null,
                    defaultLanguage: null,
                    authorities: [],
                    selectedRoles: [],
                    kjcCompanies: null,
                    userAccounts: null,
                });
            }
        } else {
            let formTemp: any = {
                username: new FormControl(null, [Validators.required, Validators.maxLength(255)]),
                firstName: new FormControl(null, [Validators.required, Validators.maxLength(40)]),
                lastName: new FormControl(null, [Validators.required, Validators.maxLength(40)]),
                securityNumber: new FormControl(null),
                password: new FormControl(null, [Validators.required, Validators.maxLength(255)]),
                confirmPassword: new FormControl(null, [Validators.required, Validators.maxLength(255)]),
                enabled: new FormControl(true),
                email: new FormControl(null, [Validators.required, ValidationService.emailValidator(), Validators.maxLength(255)]),
                defaultLanguage: new FormControl(null, [Validators.required]),
                authorities: new FormControl([]),
                kjcCompanies: new FormControl(null),
                userAccounts: new FormControl(null, []),
                selectedRoles: new FormControl(null, [Validators.required, Validators.minLength(1)])
            }

            if (this._appService.isAuthorised(KJGriConstants.ROLES.SUPER_ADMIN)) {
                formTemp.selectedCompany = new FormControl(this.availableCompanies[0], [Validators.required]);
                formTemp.timeout = new FormControl(null, [Validators.maxLength(19)]);
            }

            this.addForm = this._formBuilder.group(formTemp, { validator: ValidationService.matchingPasswords('password', 'confirmPassword') });
        }
        if (this._appService.isAuthorised(KJGriConstants.ROLES.SUPER_ADMIN) && this.availableCompanies && this.availableCompanies.length) {
            this.loadRolesByCompanyId(this.availableCompanies[0].id, modal);
        }

        if (!this._appService.isAuthorised(KJGriConstants.ROLES.SUPER_ADMIN)) {
            this.loadRolesByUserCompany(modal);
        }
    }

    /**
     * Preparing authorities for new user
     *  before sending request
     * @author Nikola
     */
    private setupUserRoles(form: FormGroup) {
        //Updating form value before sending
        for (let role of this.roles) {
            if (role.name == form.controls['selectedRoles'].value) {
                form.controls['authorities'].setValue([role]);
                break;
            }
        }
    }

    /**
     * Preparing authorities for new user
     *  before sending request
     * @author Nikola
     */
    private setupUserCompanies(form: FormGroup) {
        //Looping through selected roles
        for (let realCompany of this.availableCompanies) {
            //Matching names of selected role and all roles
            if (realCompany.id == form.controls['selectedCompany'].value.id) {
                //Adding authority to user
                form.controls['kjcCompanies'].setValue(realCompany);
                break;
            }
        }
    }

    /**
     * Updating modal data
     * when editing a user
     * @author Nikola Gavric
     */
    private updateModalData(selectedUser: any, modal: ModalDirective) {
        this.editForm.controls['id'].setValue(selectedUser.id);
        this.editForm.controls['username'].setValue(selectedUser.username);
        this.editForm.controls['firstName'].setValue(selectedUser.firstName);
        this.editForm.controls['lastName'].setValue(selectedUser.lastName);
        this.editForm.controls['securityNumber'].setValue(selectedUser.securityNumber);
        this.editForm.controls['password'].setValue(null);
        this.editForm.controls['enabled'].setValue(selectedUser.enabled);
        this.editForm.controls['logCounter'].setValue(selectedUser.logCounter, { disabled: true });
        this.editForm.controls['passwordTimestamp'].setValue(selectedUser.passwordTimestamp, { disabled: true });
        this.editForm.controls['firstLogin'].setValue(selectedUser.firstLogin, { disabled: true });
        this.editForm.controls['lastLogin'].setValue(selectedUser.lastLogin, { disabled: true });
        this.editForm.controls['email'].setValue(selectedUser.email);
        if (selectedUser.accountExpiryDate) {
            this.editForm.controls['faccountExpiryDate'].setValue(new Date(selectedUser.accountExpiryDate));
        }
        else {
            this.editForm.controls['faccountExpiryDate'].setValue(null);
        }
        this.editForm.controls['defaultLanguage'].setValue(selectedUser.defaultLanguage);
        this.editForm.controls['authorities'].setValue(selectedUser.authorities);

        if (this._appService.isAuthorised(KJGriConstants.ROLES.SUPER_ADMIN)) {
            this.editForm.controls['timeout'].setValue(selectedUser.timeout || null);
        }

        this.editForm.controls['fpasswordTimestamp'].setValue(new Date(selectedUser.passwordTimestamp), { disabled: true });
        this.editForm.controls['flogCounter'].setValue(selectedUser.logCounter, { disabled: true });

        if (selectedUser.firstLogin) {
            this.editForm.controls['ffirstLogin'].setValue(new Date(selectedUser.firstLogin), { disabled: true });
        }
        else {
            this.editForm.controls['ffirstLogin'].setValue(null, { disabled: true });
        }

        if (selectedUser.lastLogin) {
            this.editForm.controls['flastLogin'].setValue(new Date(selectedUser.firstLogin), { disabled: true });
        }
        else {
            this.editForm.controls['flastLogin'].setValue(null, { disabled: true });
        }

        this.editForm.controls['userAccounts'].setValue(this.selectedUser.userAccounts);

        this.editForm.controls['selectedRoles'].setValue(selectedUser.selectedRoles);
        if (this._appService.isAuthorised(KJGriConstants.ROLES.SUPER_ADMIN)) {
            this.editForm.controls['kjcCompanies'].setValue(selectedUser.kjcCompanies);
            this.editForm.controls['selectedCompany'].setValue(selectedUser.selectedCompany);

            if (this.availableCompanies) {
                this.loadRolesByCompanyId(selectedUser.selectedCompany.id, modal);
            }
        } else {
            this.loadRolesByUserCompany(modal);
        }
    }

    onFilterChange(username: any): void {
        if (this.filterForm.value.company != '' && this.filterForm.value.company != null || username != null && username != '' && username.length > 2) {
            this.filterFormValidity = true;
        } else {
            this.filterFormValidity = false;
        }
    }

    /**
     * Showing modal
     * @author Mario Petrovic
     */
    public showModal(modal: ModalDirective, modalName: string, data?: any) {
        this._utilityService.setAlert(this.componentAlert);
        this.formErrors = new RestResponse();
        this.strength = 0;

        switch (modalName) {
            case 'add':
                this.setupAddForm(modal);
                break;

            case 'edit':
                this.setUser(data);
                this.updateModalData(this.selectedUser, modal);
                break;
        }

    }

    public hasRole(roleName: string[] | string, roleArray: string[]): boolean {
        if (typeof roleName != 'string') {
            for (let role of roleArray) {
                for (let currRole of roleName) {
                    if (role == currRole) return true;
                }
            }
        } else {
            for (let role in roleArray) {
                if (role == roleName) return true;
            }
        }
        return false;
    }

    /**
     * Hide modal based on passed modal directive
     * @author Mario Petrovic
     */
    hideModal(modal: ModalDirective) {
        modal.hide();

        this.addForm = null;

    }

    /**
     * Toggling view password
     * @author Nikola Gavric
     */
    public togglePassword() {
        (this.password == "text") ? this.password = "password" : this.password = "text";
    }

    /**
     * Toggling view password for edit
     * @author Nikola Gavric
     */
    public toggleEditPassword() {
        (this.editPassword == "text") ? this.editPassword = "password" : this.editPassword = "text";
    }

    /**
     * Checking if passwords match
     * @author Nikola Gavric
     */
    public checkPasswords(password: string, confirmPassword: string) {
        if (password != "" && confirmPassword != "") {
            if (password != confirmPassword) {
                this.passwordMismatch = true;
            } else {
                this.passwordMismatch = false;
            }
        }
    }

    /**
     * Loading all necessary stuff
     * @author Nikola Gavric
     */
    public loadData() {
        //Loading all languages
        this.loadLanguages();
        //Loading companies if SUPER_ADMIN
        if (this._appService.isAuthorised(KJGriConstants.ROLES.SUPER_ADMIN)) {
            //Loading active companies
            this.loadActiveCompanies();
        } else {
            this.loadFilteredUsers();
        }
        //Initializing forms
        // this.setupAddForm();
        this.setupEditForm();
    }

    /*--------- NG On Init ---------*/
    //@hasAny()
    ngOnInit() {
        // Initital method to be executed when page loads
        this._appService.pageLoaded('', this);
        //Setting alert
        this.subscriptions = {};
        this.componentAlert = new Alert(null, true);

        this.formErrors = new RestResponse();

        this.allUsers = [];

        // this.filterForm = {
        //     username: '',
        //     company: ''
        // }

        this.defaultCompany = new Company();

        this.today = new Date();

        this.availableCompanies = [];

        //Setting initial password value
        this.password = "password";
        this.editPassword = "password";
        //Setting initial submit value
        //Loading view data
        this.loadData();

        this._appService.languageChangeForComponent(this);
    }

    ngOnDestroy() { // On destroy
        this._appService.refreshEmitters(this.subscriptions);
    }
}