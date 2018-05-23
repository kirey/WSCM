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
var app_service_1 = require('../../kjcore/shared/services/app.service');
var utility_service_1 = require('../../kjcore/shared/services/utility.service');
var validation_service_1 = require('../../kjcore/shared/services/validation.service');
var models_1 = require('../../kjcore/shared/models');
var kjgri_adminUsers_service_1 = require('./kjgri.adminUsers.service');
var adminRoles_service_1 = require('../../kjcore/admin/roles/adminRoles.service');
var companyManagement_service_1 = require('../../kjcore/company_management/companyManagement.service');
var models_2 = require("./../../kjcore/admin/users/models");
var company_model_1 = require("./../../kjcore/company_management/models/company.model");
var kjgri_constants_1 = require("./../kjgri.constants");
var KJGriAdminUsersCmp = (function () {
    /*--------- Constructor --------*/
    function KJGriAdminUsersCmp(_utilityService, _changeDetectionRef, _translateService, _appService, _adminService, _companyService, _rolesService, _formBuilder, _constants) {
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
    /*--------- REST calls --------*/
    /**
     * Loading/Refreshing all filtered
     * users in the table
     * @author Nikola Gavric
     */
    KJGriAdminUsersCmp.prototype.loadFilteredUsers = function (filters) {
        var _this = this;
        this._utilityService.setAlert(this.componentAlert);
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
                if (user.timeout) {
                    user.timeout = _this._utilityService.convertMillisecondsMinutes(user.timeout, true);
                }
                //Required to update the view with changes
                _this._changeDetectionRef.detectChanges();
            }
        }, function (err) {
            _this.allUsers = [];
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode, err.errors);
        });
    };
    /**
     * Load roles based on selected company
     * @author Nikola Gavric
     */
    KJGriAdminUsersCmp.prototype.loadRolesByCompanyId = function (selectedCompanyId, modal) {
        var _this = this;
        this._utilityService.setAlert(this.componentAlert);
        this.subscriptions['loadRolesByCompanyId'] = this._adminService.getRolesByCompanyId(selectedCompanyId).subscribe(function (res) {
            _this.roles = res.data;
            if (modal) {
                modal.show();
            }
        }, function (err) {
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode, err.errors);
        });
    };
    /**
     * Load roles based on loggedin user
     * @author Mario Petrovic
     */
    KJGriAdminUsersCmp.prototype.loadRolesByUserCompany = function (modal) {
        var _this = this;
        this._utilityService.setAlert(this.componentAlert);
        this.subscriptions['loadRolesByUserCompany'] = this._adminService.getRolesByUserCompany().subscribe(function (res) {
            _this.roles = res.data;
            if (modal) {
                modal.show();
            }
        }, function (err) {
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode, err.errors);
        });
    };
    /**
     * Loading all active companies
     * @author Nikola Gavric
     */
    KJGriAdminUsersCmp.prototype.loadActiveCompanies = function () {
        var _this = this;
        this._utilityService.setAlert(this.componentAlert);
        this.subscriptions['loadActiveCompanies'] = this._adminService.getActiveCompanies().subscribe(function (res) {
            _this.availableCompanies = res.data;
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
     * Clear field
     * @author Nikola Gavric
     */
    KJGriAdminUsersCmp.prototype.clearFieldValue = function (formControl) {
        formControl.reset();
    };
    /**
     * Updating whole selected user
     * @author Mario Petrovic
     */
    KJGriAdminUsersCmp.prototype.updateUser = function (userData, modal) {
        var _this = this;
        if (this._appService.isAuthorised(kjgri_constants_1.KJGriConstants.ROLES.SUPER_ADMIN)) {
            //Setting up user companies
            this.setupUserCompanies(userData);
            if (userData.value.timeout && userData.value.timeout != 0) {
                userData.controls['timeout'].setValue(this._utilityService.convertMillisecondsMinutes(userData.value.timeout));
            }
            else {
                userData.controls['timeout'].setValue(null);
            }
        }
        //Setting up user authorities
        this.setupUserRoles(userData);
        this.subscriptions['updateUser'] = this._adminService.editUser(userData.value).subscribe(function (res) {
            if (_this.filterFormValidity) {
                _this.loadFilteredUsers(_this.filterForm.value);
            }
            else if (!_this.filterForm) {
                _this.loadFilteredUsers();
            }
            _this.hideModal(modal);
            _this._utilityService.setAlert(_this.componentAlert, res.message, res.statusCode);
        }, function (err) {
            _this.formErrors = err;
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode, err.errors);
            if (_this._appService.isAuthorised(kjgri_constants_1.KJGriConstants.ROLES.SUPER_ADMIN)) {
                if (userData.value.timeout && userData.value.timeout != 0) {
                    userData.controls['timeout'].setValue(_this._utilityService.convertMillisecondsMinutes(userData.value.timeout, true));
                }
                else {
                    userData.controls['timeout'].setValue(null);
                }
            }
        });
    };
    /**
     * Updating user status
     * @author Nikola Gavric
     */
    KJGriAdminUsersCmp.prototype.updateUserStatus = function (user) {
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
    KJGriAdminUsersCmp.prototype.addUser = function (userData, modal) {
        var _this = this;
        if (this._appService.isAuthorised(kjgri_constants_1.KJGriConstants.ROLES.SUPER_ADMIN)) {
            this.setupUserCompanies(userData);
            if (userData.value.timeout && userData.value.timeout != 0) {
                userData.controls['timeout'].setValue(this._utilityService.convertMillisecondsMinutes(userData.value.timeout));
            }
            else {
                userData.controls['timeout'].setValue(null);
            }
        }
        this.setupUserRoles(userData);
        this.subscriptions['addUser'] = this._adminService.addUser(userData.value).subscribe(function (res) {
            if (_this.filterFormValidity) {
                _this.loadFilteredUsers(_this.filterForm.value);
            }
            else if (!_this.filterForm) {
                _this.loadFilteredUsers();
            }
            _this.hideModal(modal);
            _this._utilityService.setAlert(_this.componentAlert, res.message, res.statusCode);
        }, function (err) {
            _this.formErrors = err;
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode, err.errors);
            if (_this._appService.isAuthorised(kjgri_constants_1.KJGriConstants.ROLES.SUPER_ADMIN)) {
                if (userData.value.timeout && userData.value.timeout != 0) {
                    userData.controls['timeout'].setValue(_this._utilityService.convertMillisecondsMinutes(userData.value.timeout, true));
                }
                else {
                    userData.controls['timeout'].setValue(null);
                }
            }
        });
    };
    /*------------ Other ------------- */
    /**
     * Returns a list of active companies
     * without a default company only
     * @author Nikola Gavric
     */
    KJGriAdminUsersCmp.prototype.companiesWithoutDefaultCompany = function () {
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
    KJGriAdminUsersCmp.prototype.setupEditUserRoles = function () {
        //Updating form value before sending
        for (var _i = 0, _a = this.roles; _i < _a.length; _i++) {
            var role = _a[_i];
            if (role.name == this.editForm.controls['selectedRoles'].value) {
                this.editForm.controls['authorities'].setValue([role]);
            }
        }
    };
    /**
     * Sort roles so that Super admin role and Admin role are in first two places
     * @author Mario Petrovic
     */
    KJGriAdminUsersCmp.prototype.sortRoles = function (roles) {
        var superAdminRole = new models_2.Role();
        var adminRole = new models_2.Role();
        var subAdminRole = new models_2.Role();
        var platinumIRole = new models_2.Role();
        var platinumARole = new models_2.Role();
        var goldIRole = new models_2.Role();
        var goldARole = new models_2.Role();
        var silverIRole = new models_2.Role();
        var silverARole = new models_2.Role();
        var rows = [];
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
        var rolesTemp = roles.filter(function (item) {
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
    };
    /**
     * Check if role is selected
     * @author Nikola Gavric
     */
    KJGriAdminUsersCmp.prototype.isRoleSelected = function (roleNames, formGroup) {
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
    KJGriAdminUsersCmp.prototype.loadLanguages = function () {
        var _this = this;
        this.subscriptions['loadLanguages'] = this._adminService.getLanguagesRest().subscribe(function (res) {
            _this.languages = [];
            for (var key in res.data) {
                _this.languages.push({ languageCode: key, languageText: res.data[key] });
            }
        });
    };
    /**
     * Setting currently selected user
     * @author Nikola Gavric
     */
    KJGriAdminUsersCmp.prototype.setUser = function (user) {
        this.selectedUser = user;
        //Setting currently selected user roles variable
        this.selectedUser.selectedRoles = this.selectedUser.authorities.length ? this.selectedUser.authorities[0].name : null;
        //Setting currently selected user companies variable        
        this.selectedUser.selectedCompany = this.selectedUser.kjcCompanies;
        this.formErrors = new models_1.RestResponse();
    };
    /**
     * Setting up edit user form
     * @author Nikola Gavric
     */
    KJGriAdminUsersCmp.prototype.setupEditForm = function () {
        var formTemp = {
            id: new forms_1.FormControl(null),
            username: new forms_1.FormControl(null, [forms_1.Validators.required, forms_1.Validators.maxLength(255)]),
            password: new forms_1.FormControl(null, [forms_1.Validators.maxLength(255)]),
            enabled: new forms_1.FormControl(null),
            firstName: new forms_1.FormControl(null, [forms_1.Validators.required, forms_1.Validators.maxLength(40)]),
            lastName: new forms_1.FormControl(null, [forms_1.Validators.required, forms_1.Validators.maxLength(40)]),
            securityNumber: new forms_1.FormControl(null),
            logCounter: new forms_1.FormControl(null),
            passwordTimestamp: new forms_1.FormControl(null),
            firstLogin: new forms_1.FormControl({ value: null, disabled: true }),
            lastLogin: new forms_1.FormControl({ value: null, disabled: true }),
            email: new forms_1.FormControl(null, [forms_1.Validators.maxLength(255), validation_service_1.ValidationService.emailValidator(), forms_1.Validators.required]),
            defaultLanguage: new forms_1.FormControl(null),
            authorities: new forms_1.FormControl(null),
            faccountExpiryDate: new forms_1.FormControl({ value: null, disabled: true }),
            ffirstLogin: new forms_1.FormControl({ value: null, disabled: true }),
            flastLogin: new forms_1.FormControl({ value: null, disabled: true }),
            fpasswordTimestamp: new forms_1.FormControl({ value: null, disabled: true }),
            flogCounter: new forms_1.FormControl({ value: null, disabled: true }),
            kjcCompanies: new forms_1.FormControl(null),
            userAccounts: new forms_1.FormControl(null)
        };
        if (this._appService.isAuthorised(kjgri_constants_1.KJGriConstants.ROLES.SUPER_ADMIN)) {
            formTemp.timeout = new forms_1.FormControl(null, [forms_1.Validators.maxLength(19)]);
        }
        formTemp.selectedRoles = new forms_1.FormControl(null, [forms_1.Validators.required, forms_1.Validators.minLength(1)]);
        if (this._appService.isAuthorised(kjgri_constants_1.KJGriConstants.ROLES.SUPER_ADMIN)) {
            formTemp.selectedCompany = new forms_1.FormControl(null, [forms_1.Validators.required]);
        }
        this.editForm = this._formBuilder.group(formTemp);
    };
    /**
     * Setting up add user form
     * @author Nikola Gavric
     */
    KJGriAdminUsersCmp.prototype.setupAddForm = function (modal) {
        this.formErrors = new models_1.RestResponse();
        // If addForm is initialized again, error will occure because it is loosing reference to old addForm
        if (this.addForm) {
            if (this._appService.isAuthorised(kjgri_constants_1.KJGriConstants.ROLES.SUPER_ADMIN)) {
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
            }
            else {
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
        }
        else {
            var formTemp = {
                username: new forms_1.FormControl(null, [forms_1.Validators.required, forms_1.Validators.maxLength(255)]),
                firstName: new forms_1.FormControl(null, [forms_1.Validators.required, forms_1.Validators.maxLength(40)]),
                lastName: new forms_1.FormControl(null, [forms_1.Validators.required, forms_1.Validators.maxLength(40)]),
                securityNumber: new forms_1.FormControl(null),
                password: new forms_1.FormControl(null, [forms_1.Validators.required, forms_1.Validators.maxLength(255)]),
                confirmPassword: new forms_1.FormControl(null, [forms_1.Validators.required, forms_1.Validators.maxLength(255)]),
                enabled: new forms_1.FormControl(true),
                email: new forms_1.FormControl(null, [forms_1.Validators.required, validation_service_1.ValidationService.emailValidator(), forms_1.Validators.maxLength(255)]),
                defaultLanguage: new forms_1.FormControl(null, [forms_1.Validators.required]),
                authorities: new forms_1.FormControl([]),
                kjcCompanies: new forms_1.FormControl(null),
                userAccounts: new forms_1.FormControl(null, []),
                selectedRoles: new forms_1.FormControl(null, [forms_1.Validators.required, forms_1.Validators.minLength(1)])
            };
            if (this._appService.isAuthorised(kjgri_constants_1.KJGriConstants.ROLES.SUPER_ADMIN)) {
                formTemp.selectedCompany = new forms_1.FormControl(this.availableCompanies[0], [forms_1.Validators.required]);
                formTemp.timeout = new forms_1.FormControl(null, [forms_1.Validators.maxLength(19)]);
            }
            this.addForm = this._formBuilder.group(formTemp, { validator: validation_service_1.ValidationService.matchingPasswords('password', 'confirmPassword') });
        }
        if (this._appService.isAuthorised(kjgri_constants_1.KJGriConstants.ROLES.SUPER_ADMIN) && this.availableCompanies && this.availableCompanies.length) {
            this.loadRolesByCompanyId(this.availableCompanies[0].id, modal);
        }
        if (!this._appService.isAuthorised(kjgri_constants_1.KJGriConstants.ROLES.SUPER_ADMIN)) {
            this.loadRolesByUserCompany(modal);
        }
    };
    /**
     * Preparing authorities for new user
     *  before sending request
     * @author Nikola
     */
    KJGriAdminUsersCmp.prototype.setupUserRoles = function (form) {
        //Updating form value before sending
        for (var _i = 0, _a = this.roles; _i < _a.length; _i++) {
            var role = _a[_i];
            if (role.name == form.controls['selectedRoles'].value) {
                form.controls['authorities'].setValue([role]);
                break;
            }
        }
    };
    /**
     * Preparing authorities for new user
     *  before sending request
     * @author Nikola
     */
    KJGriAdminUsersCmp.prototype.setupUserCompanies = function (form) {
        //Looping through selected roles
        for (var _i = 0, _a = this.availableCompanies; _i < _a.length; _i++) {
            var realCompany = _a[_i];
            //Matching names of selected role and all roles
            if (realCompany.id == form.controls['selectedCompany'].value.id) {
                //Adding authority to user
                form.controls['kjcCompanies'].setValue(realCompany);
                break;
            }
        }
    };
    /**
     * Updating modal data
     * when editing a user
     * @author Nikola Gavric
     */
    KJGriAdminUsersCmp.prototype.updateModalData = function (selectedUser, modal) {
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
        if (this._appService.isAuthorised(kjgri_constants_1.KJGriConstants.ROLES.SUPER_ADMIN)) {
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
        if (this._appService.isAuthorised(kjgri_constants_1.KJGriConstants.ROLES.SUPER_ADMIN)) {
            this.editForm.controls['kjcCompanies'].setValue(selectedUser.kjcCompanies);
            this.editForm.controls['selectedCompany'].setValue(selectedUser.selectedCompany);
            if (this.availableCompanies) {
                this.loadRolesByCompanyId(selectedUser.selectedCompany.id, modal);
            }
        }
        else {
            this.loadRolesByUserCompany(modal);
        }
    };
    KJGriAdminUsersCmp.prototype.onFilterChange = function (username) {
        if (this.filterForm.value.company != '' && this.filterForm.value.company != null || username != null && username != '' && username.length > 2) {
            this.filterFormValidity = true;
        }
        else {
            this.filterFormValidity = false;
        }
    };
    /**
     * Showing modal
     * @author Mario Petrovic
     */
    KJGriAdminUsersCmp.prototype.showModal = function (modal, modalName, data) {
        this._utilityService.setAlert(this.componentAlert);
        this.formErrors = new models_1.RestResponse();
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
    };
    KJGriAdminUsersCmp.prototype.hasRole = function (roleName, roleArray) {
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
    KJGriAdminUsersCmp.prototype.hideModal = function (modal) {
        modal.hide();
        this.addForm = null;
    };
    /**
     * Toggling view password
     * @author Nikola Gavric
     */
    KJGriAdminUsersCmp.prototype.togglePassword = function () {
        (this.password == "text") ? this.password = "password" : this.password = "text";
    };
    /**
     * Toggling view password for edit
     * @author Nikola Gavric
     */
    KJGriAdminUsersCmp.prototype.toggleEditPassword = function () {
        (this.editPassword == "text") ? this.editPassword = "password" : this.editPassword = "text";
    };
    /**
     * Checking if passwords match
     * @author Nikola Gavric
     */
    KJGriAdminUsersCmp.prototype.checkPasswords = function (password, confirmPassword) {
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
    KJGriAdminUsersCmp.prototype.loadData = function () {
        //Loading all languages
        this.loadLanguages();
        //Loading companies if SUPER_ADMIN
        if (this._appService.isAuthorised(kjgri_constants_1.KJGriConstants.ROLES.SUPER_ADMIN)) {
            //Loading active companies
            this.loadActiveCompanies();
        }
        else {
            this.loadFilteredUsers();
        }
        //Initializing forms
        // this.setupAddForm();
        this.setupEditForm();
    };
    /*--------- NG On Init ---------*/
    //@hasAny()
    KJGriAdminUsersCmp.prototype.ngOnInit = function () {
        // Initital method to be executed when page loads
        this._appService.pageLoaded('', this);
        //Setting alert
        this.subscriptions = {};
        this.componentAlert = new models_1.Alert(null, true);
        this.formErrors = new models_1.RestResponse();
        this.allUsers = [];
        // this.filterForm = {
        //     username: '',
        //     company: ''
        // }
        this.defaultCompany = new company_model_1.Company();
        this.today = new Date();
        this.availableCompanies = [];
        //Setting initial password value
        this.password = "password";
        this.editPassword = "password";
        //Setting initial submit value
        //Loading view data
        this.loadData();
        this._appService.languageChangeForComponent(this);
    };
    KJGriAdminUsersCmp.prototype.ngOnDestroy = function () {
        this._appService.refreshEmitters(this.subscriptions);
    };
    __decorate([
        core_1.ViewChild('filterForm'), 
        __metadata('design:type', Object)
    ], KJGriAdminUsersCmp.prototype, "filterForm", void 0);
    __decorate([
        core_1.ViewChild('globalFilter'), 
        __metadata('design:type', Object)
    ], KJGriAdminUsersCmp.prototype, "globalFilter", void 0);
    KJGriAdminUsersCmp = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'kjgri.adminUsers.cmp.html',
            encapsulation: core_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [utility_service_1.UtilityService, core_1.ChangeDetectorRef, ng2_translate_1.TranslateService, app_service_1.AppService, kjgri_adminUsers_service_1.KJGriAdminUserService, companyManagement_service_1.CompanyManagementService, adminRoles_service_1.AdminRoleService, forms_1.FormBuilder, kjgri_constants_1.KJGriConstants])
    ], KJGriAdminUsersCmp);
    return KJGriAdminUsersCmp;
}());
exports.KJGriAdminUsersCmp = KJGriAdminUsersCmp;
//# sourceMappingURL=kjgri.adminUsers.cmp.js.map