import { Component, ViewEncapsulation, OnInit, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { TranslateService } from 'ng2-translate';
import { ModalDirective } from 'ng2-bootstrap';

import { AppService } from '../../shared/services/app.service';
import { UtilityService } from '../../shared/services/utility.service';
import { ValidationService } from '../../shared/services/validation.service';

import { DataTable, SelectItem } from 'primeng/primeng';

import { Alert, RestResponse } from '../../shared/models';

import { AdminUserService } from './adminUsers.service';

import { AdminRoleService } from './../roles/adminRoles.service';
import { CompanyManagementService } from '../../company_management/companyManagement.service';

import { Role } from './models';

import { Constants } from "./../../constants";

@Component({
    moduleId: module.id,
    templateUrl: 'adminUsers.cmp.html',
    encapsulation: ViewEncapsulation.None
})
export class AdminUsersCmp implements OnInit {

    availableAgencies: SelectItem[];
    @ViewChild('dataTable')
    dataTable: DataTable;
    defaultDate: Date;
    allUsers: any;
    roles: Role[];
    companies: any[];
    availableCompanies: any[];
    availableCompaniesChangeable: any[];
    defaultCompany: any;
    selectedUser: any;
    editForm: FormGroup;
    addForm: FormGroup;
    filterForm: FormGroup;
    pageSizes: number[] = [5, 10, 15, 20, 25, 50, 100, 250, 500];
    @ViewChild('globalFilter')
    globalFilter: any;
    today: Date;

    languages: any;

    subscriptions: any;
    componentAlert: Alert;
    modalAlreadyOpened: boolean;

    selectedRolesPreviousValues: string[];

    password: string;
    editPassword: string;
    passwordMismatch: boolean;

    formErrors: RestResponse<any>;

    /*--------- Constructor --------*/
    constructor(private _utilityService: UtilityService,
        private _changeDetectionRef: ChangeDetectorRef,
        private _translateService: TranslateService,
        private _appService: AppService,
        private _adminService: AdminUserService,
        private _companyService: CompanyManagementService,
        private _rolesService: AdminRoleService,
        private _formBuilder: FormBuilder,
        private _constants: Constants) { }

    /**
     * Loading/Refreshing all filtered
     * users in the table
     * @author Nikola Gavric
     */
    public loadFilteredUsers(filters: any) {
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

                    user.timeout = this._utilityService.convertMillisecondsMinutes(user.timeout, true);
                    //Required to update the view with changes
                    this._changeDetectionRef.detectChanges();
                }
            },
            (err: RestResponse<any>) => {
                this.allUsers = [];
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode, err.errors);
            }
        );
    }

    /**
     * Loading all companies
     * @author Nikola Gavric
     */
    loadCompanies() {
        this.subscriptions['loadCompanies'] = this._adminService.getCompanies().subscribe(
            (res: RestResponse<any>) => {
                this.companies = res.data;
            },
            (err: RestResponse<any>) => {
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode, err.errors);
            }
        )
    }

    /**
     * Loading all active companies
     * @author Nikola Gavric
     */
    loadActiveCompanies() {
        this.subscriptions['loadActiveCompanies'] = this._adminService.getActiveCompanies().subscribe(
            (res: RestResponse<any>) => {
                this.availableCompanies = res.data;
                this.availableCompaniesChangeable = this.availableCompanies;
                for (let company of this.availableCompanies) {
                    if (company.code == 'defaultCompany') {
                        this.defaultCompany = company;
                    }
                }
            },
            (err: RestResponse<any>) => {
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode, err.errors);
            }
        )
    }

    /**
     * Loading/Refreshing all roles
     * @author Nikola Gavric
     */
    private loadRoles() {
        this.subscriptions['loadRoles'] = this._adminService.getAllRoles().subscribe(
            (res: RestResponse<any>) => {
                this.roles = this.sortRoles(res.data);
            },
            (err: RestResponse<any>) => {
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode, err.errors);
            }
        );
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
        //Setting up user authorities
        this.setupEditUserRoles();
        //Setting up user companies
        this.setupEditUserCompanies();

        if (userData.value.faccountExpiryDate && userData.value.faccountExpiryDate!=0) {
            userData.controls['accountExpiryDate'].setValue(new Date(userData.value.faccountExpiryDate).getTime());
        } else {
            userData.controls['accountExpiryDate'].setValue(null);
        }

        
        if (userData.value.timeout && userData.value.timeout!=0) {
            userData.controls['timeout'].setValue(this._utilityService.convertMillisecondsMinutes(userData.value.timeout));
        } else {
            userData.controls['timeout'].setValue(null);
        }

        userData.controls['tokenTimestamp'].setValue(new Date((<FormControl>userData.controls['ftokenTimestamp']).value).getTime());
        this.subscriptions['updateUser'] = this._adminService.editUser(userData.value).subscribe(
            (res: RestResponse<any>) => {
                this.loadFilteredUsers(this.filterForm.value);
                this.hideModal(modal);
                this._utilityService.setAlert(this.componentAlert, res.message, res.statusCode);
            },
            (err: RestResponse<any>) => {
                this.formErrors = err;
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode, err.errors);
                if (userData.value.timeout && userData.value.timeout!=0) {
                    userData.controls['timeout'].setValue(this._utilityService.convertMillisecondsMinutes(userData.value.timeout, true));
                } else {
                    userData.controls['timeout'].setValue(null);
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
            (res: RestResponse<any>) => {
                this._utilityService.setAlert(this.componentAlert, res.message, res.statusCode);
                user.enabled = !user.enabled;
            },
            (err: RestResponse<any>) => {
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode, err.errors);
            }
        );
    }


    /**
     * Adding new user
     * @author Nikola Gavric
     */
    public addUser(userData: any, modal: ModalDirective) {
        this.setupUserRoles();
        this.setupUserCompanies();

        if (userData.value.faccountExpiryDate && userData.value.faccountExpiryDate!=0) {
            userData.controls['accountExpiryDate'].setValue(new Date(userData.value.faccountExpiryDate).getTime());
        } else {
            userData.controls['accountExpiryDate'].setValue(null);
        }

        if (userData.value.timeout && userData.value.timeout!=0) {
            userData.controls['timeout'].setValue(this._utilityService.convertMillisecondsMinutes(userData.value.timeout));
        } else {
            userData.controls['timeout'].setValue(null);
        }
        
        this.subscriptions['addUser'] = this._adminService.addUser(userData.value).subscribe(
            (res: RestResponse<any>) => {
                if (this.filterForm.value.username && this.filterForm.value.username.length > 2) {
                    this.loadFilteredUsers(this.filterForm.value);
                }
                this.hideModal(modal);
                this._utilityService.setAlert(this.componentAlert, res.message, res.statusCode);
            },
            (err: RestResponse<any>) => {
                this.formErrors = err;
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode, err.errors);

                if (userData.value.timeout && userData.value.timeout!=0) {
                    userData.controls['timeout'].setValue(this._utilityService.convertMillisecondsMinutes(userData.value.timeout, true));
                } else {
                    userData.controls['timeout'].setValue(null);
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

        for(let company of this.availableCompanies)
            if(company.id!=this.defaultCompany.id)
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
        //Clearing user authorities
        this.selectedUser.authorities = [];
        //Looping through selected roles
        for (let authority of this.editForm.controls['selectedRoles'].value) {
            //Looping through all roles
            INNERLOOP: for (let realAuthority of this.roles) {
                //Matching names of selected role and all roles
                if (realAuthority.name == authority) {
                    //Adding authority to user
                    this.selectedUser.authorities.push(realAuthority);
                    break INNERLOOP;
                }
            }
        }
        //Updating form value before sending
        this.editForm.controls['authorities'].setValue(this.selectedUser.authorities);
    }


    /**
     * Sort roles so that Super admin role and Admin role are in first two places
     * @author Mario Petrovic
     */
    sortRoles(roles: Role[]): Role[] {
        let superAdminRole: Role = new Role();
        let adminRole: Role = new Role();
        let subAdminRole: Role = new Role();
        
        // Get Super admin and Admin roles
        for (let role of roles) {
            if (role.name == Constants.ROLES.SUPER_ADMIN) {
                superAdminRole = this._utilityService.copy(role);
            } else if(role.name == Constants.ROLES.ADMIN) {
                adminRole = this._utilityService.copy(role);
            } else if(role.name == Constants.ROLES.SUBADMIN) {
                subAdminRole = this._utilityService.copy(role);
            }
        }

        let rolesTemp = roles.filter((item: Role) => {
            return !item.name.includes('ADMIN');
        });

        
        if(adminRole.name!=null && subAdminRole.name!=null) {
            rolesTemp.unshift(adminRole, subAdminRole);
        }
        if (superAdminRole.name!=null) {
            rolesTemp.unshift(superAdminRole);
        }
        
        return rolesTemp;
    }

    /**
     * Validate and modify array of roles based on selected one
     * @author Mario Petrovic
     */
    validateRoleSelection(roleName: string, controlValue: any, companyControl: any, formGroup: FormGroup): void {
        switch (roleName) {
            case Constants.ROLES.SUPER_ADMIN:
                this.availableCompaniesChangeable = this.availableCompanies;
                controlValue.setValue([Constants.ROLES.SUPER_ADMIN]);
                companyControl.setValue(this.defaultCompany.id);
                break;
            
            case Constants.ROLES.ADMIN:
                this.availableCompaniesChangeable = this.companiesWithoutDefaultCompany();
                controlValue.setValue([Constants.ROLES.ADMIN]);
                if(companyControl) companyControl.setValue(null);
                break;
            
            case Constants.ROLES.SUBADMIN:
                this.availableCompaniesChangeable = this.companiesWithoutDefaultCompany();
                controlValue.setValue([Constants.ROLES.SUBADMIN]);
                if(companyControl) companyControl.setValue(null);
                break;

            default:
                this.availableCompaniesChangeable = this.companiesWithoutDefaultCompany();
                let rolesTemp = controlValue.value.filter((role: string) => {
                    return !role.includes('ADMIN');
                });
                controlValue.setValue(rolesTemp);
                break;
        }
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
     * Checking presence of role
     * @author Nikola Gavric
     */
    private contains(role: any): boolean {
        return (this.roles.indexOf(role) == -1) ? false : true;
    }

    /**
     * Setting currently selected user
     * @author Nikola Gavric
     */
    private setUser(user: any) {
        this.selectedUser = user;
        //Setting currently selected user roles variable
        this.selectedUser.selectedRoles = [];
        //Setting currently selected user companies variable
        this.selectedUser.selectedCompany = null;
        //Looping through selected user roles to extract them
        for (let authority of this.selectedUser.authorities) {
            //Looping through roles that are in view
            this.selectedUser.selectedRoles.push(authority.name);
        }
        this.selectedUser.selectedCompany = this.selectedUser.kjcCompanies.id;

        this.formErrors = new RestResponse();
    }

    /**
     * Setting up edit user form
     * @author Nikola Gavric
     */
    private setupEditForm() {
        let formTemp: any = {
            id: new FormControl(null),
            username: new FormControl(null, [Validators.required]),
            password: new FormControl(null),
            enabled: new FormControl(null),
            firstName: new FormControl(null, [Validators.required]),
            lastName: new FormControl(null, [Validators.required]),
            securityNumber: new FormControl(null),
            logCounter: new FormControl(null),
            passwordTimestamp: new FormControl(null),
            firstLogin: new FormControl({ value: null, disabled: true }),
            lastLogin: new FormControl({ value: null, disabled: true }),
            email: new FormControl(null, [Validators.maxLength(60), ValidationService.emailValidator(), Validators.required]),
            defaultLanguage: new FormControl(null),
            authorities: new FormControl(null),
            accountExpiryDate: new FormControl(null),
            faccountExpiryDate: new FormControl(null),
            timeout: new FormControl(null),
            tokenTimestamp: new FormControl(null),
            ftokenTimestamp: new FormControl(null),
            ffirstLogin: new FormControl({ value: null, disabled: true }),
            flastLogin: new FormControl({ value: null, disabled: true }),
            fpasswordTimestamp: new FormControl({ value: null, disabled: true }),
            flogCounter: new FormControl({ value: null, disabled: true }),
            selectedRoles: new FormControl([], [Validators.required, Validators.minLength(1)]),
            kjcCompanies: new FormControl(null),
            userAccounts: new FormControl(null)
        }

        this.editForm = this._formBuilder.group(formTemp);

        if(this._appService.isAuthorised(Constants.ROLES.SUPER_ADMIN)) {
            this.editForm.addControl('selectedCompany', new FormControl(null, [Validators.required]));
        }
    }

    /**
     * Setting up edit user form
     * @author Nikola Gavric
     */
    private setupAddForm() {
        this.formErrors = new RestResponse();
        let formTemp: any = {
            username: new FormControl(null, [Validators.required]),
            firstName: new FormControl(null, [Validators.required]),
            lastName: new FormControl(null, [Validators.required]),
            securityNumber: new FormControl(null),
            password: new FormControl(null, [Validators.required]),
            confirmPassword: new FormControl(null, [Validators.required]),
            enabled: new FormControl(true),
            email: new FormControl(null, [Validators.required, ValidationService.emailValidator(), Validators.maxLength(60)]),
            defaultLanguage: new FormControl(null, [Validators.required]),
            authorities: new FormControl([]),
            accountExpiryDate: new FormControl(null),
            faccountExpiryDate: new FormControl(null),
            timeout: new FormControl(null, []),
            selectedRoles: new FormControl([], [Validators.required, Validators.minLength(1)]),
            kjcCompanies: new FormControl(null),
            selectedCompany: new FormControl(null, []),
            userAccounts: new FormControl(null, [])
        }

        this.addForm = this._formBuilder.group(formTemp, {validator: ValidationService.matchingPasswords('password', 'confirmPassword')});

        if (this._appService.isAuthorised(Constants.ROLES.SUPER_ADMIN)) {
            this.addForm.controls['selectedCompany'].setValidators([Validators.required]);
        }
    }

    /**
     * Setting up form for filters
     * @author Nikola Gavric
     */
    private setupFilterForm() {
        let formGroupTemp;

        formGroupTemp = {
            company: new FormControl(''),
            role: new FormControl(''),
            username: new FormControl(null, [Validators.required, Validators.minLength(3)])
        };

        this.filterForm = this._formBuilder.group(formGroupTemp);
    }

    /**
     * Preparing authorities for edited user
     *  before sending request
     * @author Nikola
     */
    private setupEditUserCompanies() {
        //Clearing user authorities
        this.selectedUser.kjcCompanies = {};
        //Looping through selected roles
        //Looping through all roles
        for (let realCompany of this.availableCompanies) {
            //Matching names of selected role and all roles
            if (realCompany.id == this.editForm.controls['selectedCompany'].value) {
                //Adding authority to user
                this.editForm.controls['kjcCompanies'].setValue(realCompany);
                break;
            }
        }
    }

    /**
     * Preparing authorities for new user
     *  before sending request
     * @author Nikola
     */
    private setupUserRoles() {
        let authorities = [];
        //Looping through selected roles
        for (let authority of this.addForm.controls['selectedRoles'].value) {
            //Looping through all roles
            INNERLOOP: for (let realAuthority of this.roles) {
                //Matching names of selected role and all roles
                if (realAuthority.name == authority) {
                    //Adding authority to user
                    authorities.push(realAuthority);
                    break INNERLOOP;
                }
            }
        }
        //Updating form value before sending
        this.addForm.controls['authorities'].setValue(authorities);
    }

    /**
     * Preparing authorities for new user
     *  before sending request
     * @author Nikola
     */
    private setupUserCompanies() {
        //Looping through selected roles
        for (let realCompany of this.availableCompanies) {
            //Matching names of selected role and all roles
            if (realCompany.id == this.addForm.controls['selectedCompany'].value) {
                //Adding authority to user
                this.addForm.controls['kjcCompanies'].setValue(realCompany);
                break;
            }
        }
    }

    /**
     * Updating modal data
     * when editing a user
     * @author Nikola Gavric
     */
    private updateModalData(selectedUser: any) {
        this.defaultDate = new Date(selectedUser.tokenTimestamp);
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
        this.editForm.controls['accountExpiryDate'].setValue(new Date(selectedUser.accountExpiryDate));
        if (selectedUser.accountExpiryDate)
            this.editForm.controls['faccountExpiryDate'].setValue(new Date(selectedUser.accountExpiryDate));
        else
            this.editForm.controls['faccountExpiryDate'].setValue(null);
        this.editForm.controls['defaultLanguage'].setValue(selectedUser.defaultLanguage);
        this.editForm.controls['authorities'].setValue(selectedUser.authorities);
        this.editForm.controls['timeout'].setValue(selectedUser.timeout || null);
        this.editForm.controls['tokenTimestamp'].setValue(selectedUser.tokenTimestamp);
        this.editForm.controls['ftokenTimestamp'].setValue(new Date(selectedUser.tokenTimestamp));
        this.editForm.controls['fpasswordTimestamp'].setValue(new Date(selectedUser.passwordTimestamp), { disabled: true });
        this.editForm.controls['flogCounter'].setValue(selectedUser.logCounter, { disabled: true });

        if (selectedUser.firstLogin)
            this.editForm.controls['ffirstLogin'].setValue(new Date(selectedUser.firstLogin), { disabled: true });
        else
            this.editForm.controls['ffirstLogin'].setValue(null, { disabled: true });

        if(selectedUser.lastLogin)
            this.editForm.controls['flastLogin'].setValue(new Date(selectedUser.firstLogin), { disabled: true });
        else
            this.editForm.controls['flastLogin'].setValue(null, { disabled: true });
        
        this.editForm.controls['selectedRoles'].setValue(selectedUser.selectedRoles);
        this.editForm.controls['kjcCompanies'].setValue(selectedUser.kjcCompanies);
        this.editForm.controls['userAccounts'].setValue(this.selectedUser.userAccounts);

        if(this._appService.isAuthorised(Constants.ROLES.SUPER_ADMIN)) {
            this.editForm.controls['selectedCompany'].setValue(selectedUser.selectedCompany);
        }

        if(!this.hasRole(Constants.ROLES.SUPER_ADMIN, this.editForm.controls['selectedRoles'].value)) {
            this.availableCompaniesChangeable = this.companiesWithoutDefaultCompany();
        }
    }

    /**
     * Showing modal
     * @author Mario Petrovic
     */
    public showModal(modal: ModalDirective, modalName: string, data?: any) {
        this._utilityService.setAlert(this.componentAlert);
        this.formErrors = new RestResponse();

        switch (modalName) {
            case 'add':
                this.setupAddForm();
                break;

            case 'edit':
                this.setUser(data);
                this.updateModalData(this.selectedUser);
                break;
        }

        modal.show();
    }

    public hasRole(roleName: string[] | string, roleArray: string[]): boolean {
        if(typeof roleName != 'string') {
            for(let role of roleArray) {
                for(let currRole of roleName) {
                    if(role==currRole) return true;
                }
            }
        } else {
            for(let role in roleArray) {
                if(role==roleName) return true;
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
        //Loading all roles available
        this.loadRoles();
        //Loading all languages
        this.loadLanguages();
        //Loading companies if SUPER_ADMIN
        if(this._appService.isAuthorised(Constants.ROLES.SUPER_ADMIN)) {
            //Loading all companies
            this.loadCompanies();
            //Loading active companies
            this.loadActiveCompanies();
        }
        //Initializing forms
        this.setupAddForm();
        this.setupEditForm();
        this.setupFilterForm();
    }

    /*--------- NG On Init ---------*/
    //@hasAny()
    ngOnInit() {
        // Initital method to be executed when page loads
        this._appService.pageLoaded('', this);
        //Modal opened or not?
        this.modalAlreadyOpened = false;
        //Setting alert
        this.subscriptions = {};
        this.componentAlert = new Alert(null, true);

        this.formErrors = new RestResponse();

        this.companies = [];
        this.allUsers = [];

        this.defaultCompany = {};

        this.today = new Date();

        this.selectedRolesPreviousValues = [];
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