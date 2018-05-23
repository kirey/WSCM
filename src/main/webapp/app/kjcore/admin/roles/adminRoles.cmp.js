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
var adminRoles_service_1 = require('./adminRoles.service');
var models_1 = require('../../shared/models');
var AdminRolesCmp = (function () {
    /*--------- Constructor --------*/
    function AdminRolesCmp(_utilityService, _changeDetectionRef, _translateService, _appService, _roleService, _formBuilder) {
        this._utilityService = _utilityService;
        this._changeDetectionRef = _changeDetectionRef;
        this._translateService = _translateService;
        this._appService = _appService;
        this._roleService = _roleService;
        this._formBuilder = _formBuilder;
        this.pageSizes = [5, 10, 15, 20, 25, 50, 100, 250, 500];
    }
    /*--------- REST calls --------*/
    /**
     * Loading/Refreshing all roles
     * @author Nikola Gavric
     */
    AdminRolesCmp.prototype.loadRoles = function () {
        var _this = this;
        this.subscriptions['loadRoles'] = this._roleService.getAllRolesSuperAdmin().subscribe(function (res) {
            _this.allRoles = res.data;
            for (var _i = 0, _a = _this.allRoles; _i < _a.length; _i++) {
                var role = _a[_i];
                role.timeout = _this._utilityService.convertMillisecondsMinutes(role.timeout, true);
            }
        }, function (err) {
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode, err.errors);
        });
    };
    /**
     * Editing of a role
     * @author Nikola Gavric
     */
    AdminRolesCmp.prototype.editRole = function (modal) {
        var _this = this;
        if (this.editForm.value.timeoutForm) {
            this.editForm.controls['timeout'].setValue(this._utilityService.convertMillisecondsMinutes(this.editForm.value.timeoutForm));
        }
        this.subscriptions['editRole'] = this._roleService.editRole(this.editForm.value).subscribe(function (res) {
            _this.loadRoles();
            _this.hideModal(modal);
            _this.selectedRole = null;
            _this._utilityService.setAlert(_this.componentAlert, res.message, res.statusCode);
        }, function (err) {
            _this.formErrors = err;
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode, err.errors);
            if (_this.editForm.value.timeoutForm) {
                _this.editForm.controls['timeout'].setValue(_this._utilityService.convertMillisecondsMinutes(_this.editForm.value.timeout, true));
            }
        });
    };
    /**
     * Adding new role
     * @author Nikola Gavric
     */
    AdminRolesCmp.prototype.addRole = function (modal) {
        var _this = this;
        if (this.editForm.value.timeoutForm) {
            this.editForm.controls['timeout'].setValue(this._utilityService.convertMillisecondsMinutes(this.editForm.value.timeoutForm));
        }
        this.subscriptions['addRole'] = this._roleService.addRole(this.editForm.value).subscribe(function (res) {
            _this.loadRoles();
            _this.hideModal(modal);
            _this.selectedRole = null;
            _this._utilityService.setAlert(_this.componentAlert, res.message, res.statusCode);
        }, function (err) {
            _this.formErrors = err;
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode, err.errors);
            if (_this.editForm.value.timeoutForm) {
                _this.editForm.controls['timeout'].setValue(_this._utilityService.convertMillisecondsMinutes(_this.editForm.value.timeout, true));
            }
        });
    };
    /**
     * Deleting a role
     * @author Nikola Gavric
     */
    AdminRolesCmp.prototype.deleteRole = function (modal) {
        var _this = this;
        this.subscriptions['deleteRole'] = this._roleService.deleteRole(this.selectedRole).subscribe(function (res) {
            var index = _this.allRoles.indexOf(_this.selectedRole);
            if (index != -1) {
                _this.allRoles.splice(index, 1);
            }
            _this.hideModal(modal);
            _this.selectedRole = null;
            _this._utilityService.setAlert(_this.componentAlert, res.message, res.statusCode);
        }, function (err) {
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode, err.errors);
        });
    };
    /*--------- App logics --------*/
    /**
     * Checking presence of role
     * @author Nikola Gavric
     */
    AdminRolesCmp.prototype.contains = function (roleName) {
        for (var _i = 0, _a = this.allRoles; _i < _a.length; _i++) {
            var role = _a[_i];
            if (role.name == roleName) {
                return true;
            }
        }
        return false;
    };
    /**
     * Updating or adding role
     * @author Nikola Gavric
     */
    AdminRolesCmp.prototype.updateOrAddRole = function (newRole, modal) {
        var exists = this.contains(this.editForm.controls['name'].value);
        var roleNameSame = (this.selectedRole != null) ? ((this.editForm.controls['name'].value == this.selectedRole.name) ? true : false) : false;
        if (roleNameSame) {
            this.editRole(modal);
        }
        else {
            if (!exists) {
                if (newRole) {
                    this.addRole(modal);
                }
                else {
                    this.editRole(modal);
                }
            }
            else {
                this.editForm.controls['name'].setErrors({
                    "notUnique": true
                });
            }
        }
    };
    /**
     * Setting selected role
     * @author Nikola Gavric
     */
    AdminRolesCmp.prototype.setRole = function (role) {
        this.selectedRole = role;
        if (this.selectedRole != null) {
            this.setupEditForm();
        }
        else {
            this.setupEditForm(true);
        }
    };
    /**
     * Setting up add or edit form for role
     * @author Nikola Gavric
     */
    AdminRolesCmp.prototype.setupEditForm = function (newRole) {
        if (newRole) {
            this.editForm = this._formBuilder.group({
                timeoutForm: [null, [forms_1.Validators.required]],
                name: [null, [forms_1.Validators.required]],
                timeout: [null, []]
            });
        }
        else {
            this.editForm = this._formBuilder.group({
                id: [this.selectedRole.id, []],
                timeoutForm: [this.selectedRole.timeout, [forms_1.Validators.required]],
                name: [this.selectedRole.name, [forms_1.Validators.required]],
                timeout: [this.selectedRole.timeout, []]
            });
        }
    };
    /**
     * Showing edit user modal
     * @author Mario Petrovic
     */
    AdminRolesCmp.prototype.showModal = function (modal, modalName, data) {
        this._utilityService.setAlert(this.componentAlert);
        this.formErrors = new models_1.RestResponse();
        this.setRole(data);
        modal.show();
    };
    /**
     * Hide modal based on passed modal directive
     * @author Mario Petrovic
     */
    AdminRolesCmp.prototype.hideModal = function (modal) {
        modal.hide();
    };
    /*--------- NG On Init ---------*/
    AdminRolesCmp.prototype.ngOnInit = function () {
        var _this = this;
        // Initital method to be executed when page loads
        this._appService.pageLoaded('', this);
        this._appService.languageChangeForComponent(this, function () {
            _this.loadRoles();
        });
        //Modal already opened or not?
        this.modalAlreadyOpened = false;
        //Setting Alert
        this.subscriptions = {};
        this.componentAlert = new models_1.Alert(null, true);
        //Initial methods
        this.loadRoles();
    };
    /*--------- NG On Destroy ---------*/
    AdminRolesCmp.prototype.ngOnDestroy = function () {
        this._appService.refreshEmitters(this.subscriptions);
    };
    AdminRolesCmp = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'adminRoles.cmp.html',
            encapsulation: core_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [utility_service_1.UtilityService, core_1.ChangeDetectorRef, ng2_translate_1.TranslateService, app_service_1.AppService, adminRoles_service_1.AdminRoleService, forms_1.FormBuilder])
    ], AdminRolesCmp);
    return AdminRolesCmp;
}());
exports.AdminRolesCmp = AdminRolesCmp;
//# sourceMappingURL=adminRoles.cmp.js.map