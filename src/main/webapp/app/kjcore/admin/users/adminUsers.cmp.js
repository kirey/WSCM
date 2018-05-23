"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
var ng2_translate_1 = require('ng2-translate');
var app_service_1 = require('../../shared/services/app.service');
var utility_service_1 = require('../../shared/services/utility.service');
var validation_service_1 = require('../../shared/services/validation.service');
var primeng_1 = require('primeng/primeng');
var models_1 = require('../../shared/models');
var adminUsers_service_1 = require('./adminUsers.service');
var adminRoles_service_1 = require('./../roles/adminRoles.service');
var companyManagement_service_1 = require('../../company_management/companyManagement.service');
var models_2 = require('./models');
var constants_1 = require("./../../constants");
var AdminUsersCmp = (function () {
    /*--------- Constructor --------*/
    function AdminUsersCmp(_utilityService, _changeDetectionRef, _translateService, _appService, _adminService, _companyService, _rolesService, _formBuilder, _constants) {
        this._utilityService = _utilityService;
        this._changeDetectionRef = _changeDetectionRef;
        this._translateService = _translateService;
        this._appService = _appService;
        this._adminService = _adminService;
        this._companyService = _companyService;
        this._rolesService = _rolesService;
        this._formBuilder = _formBuilder;
        this._constants = _constants;
        this.pageSizes = [5, 10, 15, 20, 25, 50, 100, 250, 500];
    }
    /**
     * Loading/Refreshing all filtered
     * users in the table
     * @author Nikola Gavric
     */
    AdminUsersCmp.prototype.loadFilteredUsers = function (filters) {
        var _this = this;
        this.subscriptions['loadFilteredUsers'] = this._adminService.getFilteredUsers(filters).subscribe(function (res) {
            _this.allUsers = res.data;
            //Loop through users
            for (var _i = 0, _a = _this.allUsers; _i < _a.length; _i++) {
                var user = _a[_i];
                //Prepare new variable to set all roles
                user.roles = "";
                //Loop through all user authorities
                for (var i = 0; i < user.authorities.length; i++) {
                    //Append name of authority to new variable
                    user.roles += (user.authorities[i].name + (((user.authorities.length - 1) != i) ? ", " : ""));
                }
                user.timeout = _this._utilityService.convertMillisecondsMinutes(user.timeout, true);
                //Required to update the view with changes
                _this._changeDetectionRef.detectChanges();
            }
        }, function (err) {
            _this.allUsers = [];
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode, err.errors);
        });
    };
    /**
     * Loading all companies
     * @author Nikola Gavric
     */
    AdminUsersCmp.prototype.loadCompanies = function () {
        var _this = this;
        this.subscriptions['loadCompanies'] = this._adminService.getCompanies().subscribe(function (res) {
            _this.companies = res.data;
        }, function (err) {
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode, err.errors);
        });
    };
    /**
     * Loading all active companies
     * @author Nikola Gavric
     */
    AdminUsersCmp.prototype.loadActiveCompanies = function () {
        var _this = this;
        this.subscriptions['loadActiveCompanies'] = this._adminService.getActiveCompanies().subscribe(function (res) {
            _this.availableCompanies = res.data;
            _this.availableCompaniesChangeable = _this.availableCompanies;
            for (var _i = 0, _a = _this.availableCompanies; _i < _a.length; _i++) {
                var company = _a[_i];
                if (company.code == 'defaultCompany') {
                    _this.defaultCompany = company;
                }
            }
        }, function (err) {
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode, err.errors);
        });
    };
    /**
     * Loading/Refreshing all roles
     * @author Nikola Gavric
     */
    AdminUsersCmp.prototype.loadRoles = function () {
        var _this = this;
        this.subscriptions['loadRoles'] = this._adminService.getAllRoles().subscribe(function (res) {
            _this.roles = _this.sortRoles(res.data);
        }, function (err) {
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode, err.errors);
        });
    };
    /**
     * Clear field
     * @author Nikola Gavric
     */
    AdminUsersCmp.prototype.clearFieldValue = function (formControl) {
        formControl.reset();
    };
    /**
     * Updating whole selected user
     * @author Mario Petrovic
     */
    AdminUsersCmp.prototype.updateUser = function (userData, modal) {
        var _this = this;
        //Setting up user authorities
        this.setupEditUserRoles();
        //Setting up user companies
        this.setupEditUserCompanies();
        if (userData.value.faccountExpiryDate && userData.value.faccountExpiryDate != 0) {
            userData.controls['accountExpiryDate'].setValue(new Date(userData.value.faccountExpiryDate).getTime());
        }
        else {
            userData.controls['accountExpiryDate'].setValue(null);
        }
        if (userData.value.timeout && userData.value.timeout != 0) {
            userData.controls['timeout'].setValue(this._utilityService.convertMillisecondsMinutes(userData.value.timeout));
        }
        else {
            userData.controls['timeout'].setValue(null);
        }
        userData.controls['tokenTimestamp'].setValue(new Date(userData.controls['ftokenTimestamp'].value).getTime());
        this.subscriptions['updateUser'] = this._adminService.editUser(userData.value).subscribe(function (res) {
            _this.loadFilteredUsers(_this.filterForm.value);
            _this.hideModal(modal);
            _this._utilityService.setAlert(_this.componentAlert, res.message, res.statusCode);
        }, function (err) {
            _this.formErrors = err;
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode, err.errors);
            if (userData.value.timeout && userData.value.timeout != 0) {
                userData.controls['timeout'].setValue(_this._utilityService.convertMillisecondsMinutes(userData.value.timeout, true));
            }
            else {
                userData.controls['timeout'].setValue(null);
            }
        });
    };
    /**
     * Updating user status
     * @author Nikola Gavric
     */
    AdminUsersCmp.prototype.updateUserStatus = function (user) {
        var _this = this;
        this.subscriptions['updateUserStatus'] = this._adminService.updateUserStatus(user).subscribe(function (res) {
            _this._utilityService.setAlert(_this.componentAlert, res.message, res.statusCode);
            user.enabled = !user.enabled;
        }, function (err) {
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode, err.errors);
        });
    };
    /**
     * Adding new user
     * @author Nikola Gavric
     */
    AdminUsersCmp.prototype.addUser = function (userData, modal) {
        var _this = this;
        this.setupUserRoles();
        this.setupUserCompanies();
        if (userData.value.faccountExpiryDate && userData.value.faccountExpiryDate != 0) {
            userData.controls['accountExpiryDate'].setValue(new Date(userData.value.faccountExpiryDate).getTime());
        }
        else {
            userData.controls['accountExpiryDate'].setValue(null);
        }
        if (userData.value.timeout && userData.value.timeout != 0) {
            userData.controls['timeout'].setValue(this._utilityService.convertMillisecondsMinutes(userData.value.timeout));
        }
        else {
            userData.controls['timeout'].setValue(null);
        }
        this.subscriptions['addUser'] = this._adminService.addUser(userData.value).subscribe(function (res) {
            if (_this.filterForm.value.username && _this.filterForm.value.username.length > 2) {
                _this.loadFilteredUsers(_this.filterForm.value);
            }
            _this.hideModal(modal);
            _this._utilityService.setAlert(_this.componentAlert, res.message, res.statusCode);
        }, function (err) {
            _this.formErrors = err;
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode, err.errors);
            if (userData.value.timeout && userData.value.timeout != 0) {
                userData.controls['timeout'].setValue(_this._utilityService.convertMillisecondsMinutes(userData.value.timeout, true));
            }
            else {
                userData.controls['timeout'].setValue(null);
            }
        });
    };
    /*------------ Other ------------- */
    /**
     * Returns a list of active companies
     * without a default company only
     * @author Nikola Gavric
     */
    AdminUsersCmp.prototype.companiesWithoutDefaultCompany = function () {
        var companies = [];
        for (var _i = 0, _a = this.availableCompanies; _i < _a.length; _i++) {
            var company = _a[_i];
            if (company.id != this.defaultCompany.id)
                companies.push(company);
        }
        companies.sort();
        return companies;
    };
    /**
     * Preparing authorities for edited user
     *  before sending request
     * @author Nikola
     */
    AdminUsersCmp.prototype.setupEditUserRoles = function () {
        //Clearing user authorities
        this.selectedUser.authorities = [];
        //Looping through selected roles
        for (var _i = 0, _a = this.editForm.controls['selectedRoles'].value; _i < _a.length; _i++) {
            var authority = _a[_i];
            //Looping through all roles
            INNERLOOP: for (var _b = 0, _c = this.roles; _b < _c.length; _b++) {
                var realAuthority = _c[_b];
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
    };
    /**
     * Sort roles so that Super admin role and Admin role are in first two places
     * @author Mario Petrovic
     */
    AdminUsersCmp.prototype.sortRoles = function (roles) {
        var superAdminRole = new models_2.Role();
        var adminRole = new models_2.Role();
        var subAdminRole = new models_2.Role();
        // Get Super admin and Admin roles
        for (var _i = 0, roles_1 = roles; _i < roles_1.length; _i++) {
            var role = roles_1[_i];
            if (role.name == constants_1.Constants.ROLES.SUPER_ADMIN) {
                superAdminRole = this._utilityService.copy(role);
            }
            else if (role.name == constants_1.Constants.ROLES.ADMIN) {
                adminRole = this._utilityService.copy(role);
            }
            else if (role.name == constants_1.Constants.ROLES.SUBADMIN) {
                subAdminRole = this._utilityService.copy(role);
            }
        }
        var rolesTemp = roles.filter(function (item) {
            return !item.name.includes('ADMIN');
        });
        if (adminRole.name != null && subAdminRole.name != null) {
            rolesTemp.unshift(adminRole, subAdminRole);
        }
        if (superAdminRole.name != null) {
            rolesTemp.unshift(superAdminRole);
        }
        return rolesTemp;
    };
    /**
     * Validate and modify array of roles based on selected one
     * @author Mario Petrovic
     */
    AdminUsersCmp.prototype.validateRoleSelection = function (roleName, controlValue, companyControl, formGroup) {
        switch (roleName) {
            case constants_1.Constants.ROLES.SUPER_ADMIN:
                this.availableCompaniesChangeable = this.availableCompanies;
                controlValue.setValue([constants_1.Constants.ROLES.SUPER_ADMIN]);
                companyControl.setValue(this.defaultCompany.id);
                break;
            case constants_1.Constants.ROLES.ADMIN:
                this.availableCompaniesChangeable = this.companiesWithoutDefaultCompany();
                controlValue.setValue([constants_1.Constants.ROLES.ADMIN]);
                if (companyControl)
                    companyControl.setValue(null);
                break;
            case constants_1.Constants.ROLES.SUBADMIN:
                this.availableCompaniesChangeable = this.companiesWithoutDefaultCompany();
                controlValue.setValue([constants_1.Constants.ROLES.SUBADMIN]);
                if (companyControl)
                    companyControl.setValue(null);
                break;
            default:
                this.availableCompaniesChangeable = this.companiesWithoutDefaultCompany();
                var rolesTemp = controlValue.value.filter(function (role) {
                    return !role.includes('ADMIN');
                });
                controlValue.setValue(rolesTemp);
                break;
        }
    };
    /**
     * Check if role is selected
     * @author Nikola Gavric
     */
    AdminUsersCmp.prototype.isRoleSelected = function (roleNames, formGroup) {
        var formControl = formGroup.controls['selectedRoles'];
        if (formControl.value) {
            if (typeof roleNames == "string") {
                return formControl.value && formControl.value == roleNames;
            }
            else {
                var rolesTemp = [];
                for (var _i = 0, roleNames_1 = roleNames; _i < roleNames_1.length; _i++) {
                    var i = roleNames_1[_i];
                    if (formControl.value && formControl.value.indexOf(i) > -1) {
                        rolesTemp.push(i);
                    }
                }
                return rolesTemp.length > 0;
            }
        }
        return false;
    };
    /**
     * Loading languages
     * @author Nikola Gavric
     */
    AdminUsersCmp.prototype.loadLanguages = function () {
        var _this = this;
        this.subscriptions['loadLanguages'] = this._adminService.getLanguagesRest().subscribe(function (res) {
            _this.languages = [];
            for (var key in res.data) {
                _this.languages.push({ languageCode: key, languageText: res.data[key] });
            }
        });
    };
    /**
     * Checking presence of role
     * @author Nikola Gavric
     */
    AdminUsersCmp.prototype.contains = function (role) {
        return (this.roles.indexOf(role) == -1) ? false : true;
    };
    /**
     * Setting currently selected user
     * @author Nikola Gavric
     */
    AdminUsersCmp.prototype.setUser = function (user) {
        this.selectedUser = user;
        //Setting currently selected user roles variable
        this.selectedUser.selectedRoles = [];
        //Setting currently selected user companies variable
        this.selectedUser.selectedCompany = null;
        //Looping through selected user roles to extract them
        for (var _i = 0, _a = this.selectedUser.authorities; _i < _a.length; _i++) {
            var authority = _a[_i];
            //Looping through roles that are in view
            this.selectedUser.selectedRoles.push(authority.name);
        }
        this.selectedUser.selectedCompany = this.selectedUser.kjcCompanies.id;
        this.formErrors = new models_1.RestResponse();
    };
    /**
     * Setting up edit user form
     * @author Nikola Gavric
     */
    AdminUsersCmp.prototype.setupEditForm = function () {
        var formTemp = {
            id: new forms_1.FormControl(null),
            username: new forms_1.FormControl(null, [forms_1.Validators.required]),
            password: new forms_1.FormControl(null),
            enabled: new forms_1.FormControl(null),
            firstName: new forms_1.FormControl(null, [forms_1.Validators.required]),
            lastName: new forms_1.FormControl(null, [forms_1.Validators.required]),
            securityNumber: new forms_1.FormControl(null),
            logCounter: new forms_1.FormControl(null),
            passwordTimestamp: new forms_1.FormControl(null),
            firstLogin: new forms_1.FormControl({ value: null, disabled: true }),
            lastLogin: new forms_1.FormControl({ value: null, disabled: true }),
            email: new forms_1.FormControl(null, [forms_1.Validators.maxLength(60), validation_service_1.ValidationService.emailValidator(), forms_1.Validators.required]),
            defaultLanguage: new forms_1.FormControl(null),
            authorities: new forms_1.FormControl(null),
            accountExpiryDate: new forms_1.FormControl(null),
            faccountExpiryDate: new forms_1.FormControl(null),
            timeout: new forms_1.FormControl(null),
            tokenTimestamp: new forms_1.FormControl(null),
            ftokenTimestamp: new forms_1.FormControl(null),
            ffirstLogin: new forms_1.FormControl({ value: null, disabled: true }),
            flastLogin: new forms_1.FormControl({ value: null, disabled: true }),
            fpasswordTimestamp: new forms_1.FormControl({ value: null, disabled: true }),
            flogCounter: new forms_1.FormControl({ value: null, disabled: true }),
            selectedRoles: new forms_1.FormControl([], [forms_1.Validators.required, forms_1.Validators.minLength(1)]),
            kjcCompanies: new forms_1.FormControl(null),
            userAccounts: new forms_1.FormControl(null)
        };
        this.editForm = this._formBuilder.group(formTemp);
        if (this._appService.isAuthorised(constants_1.Constants.ROLES.SUPER_ADMIN)) {
            this.editForm.addControl('selectedCompany', new forms_1.FormControl(null, [forms_1.Validators.required]));
        }
    };
    /**
     * Setting up edit user form
     * @author Nikola Gavric
     */
    AdminUsersCmp.prototype.setupAddForm = function () {
        this.formErrors = new models_1.RestResponse();
        var formTemp = {
            username: new forms_1.FormControl(null, [forms_1.Validators.required]),
            firstName: new forms_1.FormControl(null, [forms_1.Validators.required]),
            lastName: new forms_1.FormControl(null, [forms_1.Validators.required]),
            securityNumber: new forms_1.FormControl(null),
            password: new forms_1.FormControl(null, [forms_1.Validators.required]),
            confirmPassword: new forms_1.FormControl(null, [forms_1.Validators.required]),
            enabled: new forms_1.FormControl(true),
            email: new forms_1.FormControl(null, [forms_1.Validators.required, validation_service_1.ValidationService.emailValidator(), forms_1.Validators.maxLength(60)]),
            defaultLanguage: new forms_1.FormControl(null, [forms_1.Validators.required]),
            authorities: new forms_1.FormControl([]),
            accountExpiryDate: new forms_1.FormControl(null),
            faccountExpiryDate: new forms_1.FormControl(null),
            timeout: new forms_1.FormControl(null, []),
            selectedRoles: new forms_1.FormControl([], [forms_1.Validators.required, forms_1.Validators.minLength(1)]),
            kjcCompanies: new forms_1.FormControl(null),
            selectedCompany: new forms_1.FormControl(null, []),
            userAccounts: new forms_1.FormControl(null, [])
        };
        this.addForm = this._formBuilder.group(formTemp, { validator: validation_service_1.ValidationService.matchingPasswords('password', 'confirmPassword') });
        if (this._appService.isAuthorised(constants_1.Constants.ROLES.SUPER_ADMIN)) {
            this.addForm.controls['selectedCompany'].setValidators([forms_1.Validators.required]);
        }
    };
    /**
     * Setting up form for filters
     * @author Nikola Gavric
     */
    AdminUsersCmp.prototype.setupFilterForm = function () {
        var formGroupTemp;
        formGroupTemp = {
            company: new forms_1.FormControl(''),
            role: new forms_1.FormControl(''),
            username: new forms_1.FormControl(null, [forms_1.Validators.required, forms_1.Validators.minLength(3)])
        };
        this.filterForm = this._formBuilder.group(formGroupTemp);
    };
    /**
     * Preparing authorities for edited user
     *  before sending request
     * @author Nikola
     */
    AdminUsersCmp.prototype.setupEditUserCompanies = function () {
        //Clearing user authorities
        this.selectedUser.kjcCompanies = {};
        //Looping through selected roles
        //Looping through all roles
        for (var _i = 0, _a = this.availableCompanies; _i < _a.length; _i++) {
            var realCompany = _a[_i];
            //Matching names of selected role and all roles
            if (realCompany.id == this.editForm.controls['selectedCompany'].value) {
                //Adding authority to user
                this.editForm.controls['kjcCompanies'].setValue(realCompany);
                break;
            }
        }
    };
    /**
     * Preparing authorities for new user
     *  before sending request
     * @author Nikola
     */
    AdminUsersCmp.prototype.setupUserRoles = function () {
        var authorities = [];
        //Looping through selected roles
        for (var _i = 0, _a = this.addForm.controls['selectedRoles'].value; _i < _a.length; _i++) {
            var authority = _a[_i];
            //Looping through all roles
            INNERLOOP: for (var _b = 0, _c = this.roles; _b < _c.length; _b++) {
                var realAuthority = _c[_b];
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
    };
    /**
     * Preparing authorities for new user
     *  before sending request
     * @author Nikola
     */
    AdminUsersCmp.prototype.setupUserCompanies = function () {
        //Looping through selected roles
        for (var _i = 0, _a = this.availableCompanies; _i < _a.length; _i++) {
            var realCompany = _a[_i];
            //Matching names of selected role and all roles
            if (realCompany.id == this.addForm.controls['selectedCompany'].value) {
                //Adding authority to user
                this.addForm.controls['kjcCompanies'].setValue(realCompany);
                break;
            }
        }
    };
    /**
     * Updating modal data
     * when editing a user
     * @author Nikola Gavric
     */
    AdminUsersCmp.prototype.updateModalData = function (selectedUser) {
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
        if (selectedUser.lastLogin)
            this.editForm.controls['flastLogin'].setValue(new Date(selectedUser.firstLogin), { disabled: true });
        else
            this.editForm.controls['flastLogin'].setValue(null, { disabled: true });
        this.editForm.controls['selectedRoles'].setValue(selectedUser.selectedRoles);
        this.editForm.controls['kjcCompanies'].setValue(selectedUser.kjcCompanies);
        this.editForm.controls['userAccounts'].setValue(this.selectedUser.userAccounts);
        if (this._appService.isAuthorised(constants_1.Constants.ROLES.SUPER_ADMIN)) {
            this.editForm.controls['selectedCompany'].setValue(selectedUser.selectedCompany);
        }
        if (!this.hasRole(constants_1.Constants.ROLES.SUPER_ADMIN, this.editForm.controls['selectedRoles'].value)) {
            this.availableCompaniesChangeable = this.companiesWithoutDefaultCompany();
        }
    };
    /**
     * Showing modal
     * @author Mario Petrovic
     */
    AdminUsersCmp.prototype.showModal = function (modal, modalName, data) {
        this._utilityService.setAlert(this.componentAlert);
        this.formErrors = new models_1.RestResponse();
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
    };
    AdminUsersCmp.prototype.hasRole = function (roleName, roleArray) {
        if (typeof roleName != 'string') {
            for (var _i = 0, roleArray_1 = roleArray; _i < roleArray_1.length; _i++) {
                var role = roleArray_1[_i];
                for (var _a = 0, roleName_1 = roleName; _a < roleName_1.length; _a++) {
                    var currRole = roleName_1[_a];
                    if (role == currRole)
                        return true;
                }
            }
        }
        else {
            for (var role in roleArray) {
                if (role == roleName)
                    return true;
            }
        }
        return false;
    };
    /**
     * Hide modal based on passed modal directive
     * @author Mario Petrovic
     */
    AdminUsersCmp.prototype.hideModal = function (modal) {
        modal.hide();
    };
    /**
     * Toggling view password
     * @author Nikola Gavric
     */
    AdminUsersCmp.prototype.togglePassword = function () {
        (this.password == "text") ? this.password = "password" : this.password = "text";
    };
    /**
     * Toggling view password for edit
     * @author Nikola Gavric
     */
    AdminUsersCmp.prototype.toggleEditPassword = function () {
        (this.editPassword == "text") ? this.editPassword = "password" : this.editPassword = "text";
    };
    /**
     * Checking if passwords match
     * @author Nikola Gavric
     */
    AdminUsersCmp.prototype.checkPasswords = function (password, confirmPassword) {
        if (password != "" && confirmPassword != "") {
            if (password != confirmPassword) {
                this.passwordMismatch = true;
            }
            else {
                this.passwordMismatch = false;
            }
        }
    };
    /**
     * Loading all necessary stuff
     * @author Nikola Gavric
     */
    AdminUsersCmp.prototype.loadData = function () {
        //Loading all roles available
        this.loadRoles();
        //Loading all languages
        this.loadLanguages();
        //Loading companies if SUPER_ADMIN
        if (this._appService.isAuthorised(constants_1.Constants.ROLES.SUPER_ADMIN)) {
            //Loading all companies
            this.loadCompanies();
            //Loading active companies
            this.loadActiveCompanies();
        }
        //Initializing forms
        this.setupAddForm();
        this.setupEditForm();
        this.setupFilterForm();
    };
    /*--------- NG On Init ---------*/
    //@hasAny()
    AdminUsersCmp.prototype.ngOnInit = function () {
        // Initital method to be executed when page loads
        this._appService.pageLoaded('', this);
        //Modal opened or not?
        this.modalAlreadyOpened = false;
        //Setting alert
        this.subscriptions = {};
        this.componentAlert = new models_1.Alert(null, true);
        this.formErrors = new models_1.RestResponse();
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
    };
    AdminUsersCmp.prototype.ngOnDestroy = function () {
        this._appService.refreshEmitters(this.subscriptions);
    };
    __decorate([
        core_1.ViewChild('dataTable'), 
        __metadata('design:type', primeng_1.DataTable)
    ], AdminUsersCmp.prototype, "dataTable", void 0);
    __decorate([
        core_1.ViewChild('globalFilter'), 
        __metadata('design:type', Object)
    ], AdminUsersCmp.prototype, "globalFilter", void 0);
    AdminUsersCmp = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'adminUsers.cmp.html',
            encapsulation: core_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [utility_service_1.UtilityService, core_1.ChangeDetectorRef, ng2_translate_1.TranslateService, app_service_1.AppService, adminUsers_service_1.AdminUserService, companyManagement_service_1.CompanyManagementService, adminRoles_service_1.AdminRoleService, forms_1.FormBuilder, constants_1.Constants])
    ], AdminUsersCmp);
    return AdminUsersCmp;
}());
exports.AdminUsersCmp = AdminUsersCmp;
//# sourceMappingURL=adminUsers.cmp.js.map