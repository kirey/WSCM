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
var ng2_translate_1 = require('ng2-translate');
var primeng_1 = require('primeng/primeng');
var adminRoutes_service_1 = require('./adminRoutes.service');
var utility_service_1 = require('../shared/services/utility.service');
var app_service_1 = require('../shared/services/app.service');
var models_1 = require('../shared/models');
var AdminRoutesCmp = (function () {
    /*--------- Constructor ---------*/
    function AdminRoutesCmp(_utilityService, _adminRoutesService, _appService, _translateService) {
        this._utilityService = _utilityService;
        this._adminRoutesService = _adminRoutesService;
        this._appService = _appService;
        this._translateService = _translateService;
    }
    /*--------- REST CALLS ---------*/
    /**
     * Gets all routes
     * @author Stefan Svrkota
     */
    AdminRoutesCmp.prototype.getRoutes = function () {
        var _this = this;
        this.subscriptions['getRoutes'] = this._adminRoutesService.getRoutesRest().subscribe(function (res) {
            _this.routes = res.data;
            _this.modifyRoutes(_this.routes);
        }, function (err) {
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode, err.errors);
        });
    };
    /**
     * Get all roles
     * @author Stefan Svrkota
     */
    AdminRoutesCmp.prototype.getRoles = function () {
        var _this = this;
        this.subscriptions['getRoles'] = this._adminRoutesService.getRolesRest().subscribe(function (res) {
            _this.roles = res.data;
        }, function (err) {
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode, err.errors);
        });
    };
    /**
     * Add new route
     * @author Stefan Svrkota
     */
    AdminRoutesCmp.prototype.postRoute = function (modal) {
        var _this = this;
        this.organizeRoles(this.routeAdd);
        this.subscriptions['postRoute'] = this._adminRoutesService.postRouteRest(this.routeAdd).subscribe(function (res) {
            _this._utilityService.setAlert(_this.componentAlert, res.message, res.statusCode);
            _this.getRoutes();
            _this.hideModal(modal);
        }, function (err) {
            _this.formError = err;
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode, err.errors);
        });
    };
    /**
     * Delete route
     * @author Stefan Svrkota
     */
    AdminRoutesCmp.prototype.deleteRoute = function (modal) {
        var _this = this;
        this.subscriptions['deleteRoute'] = this._adminRoutesService.deleteRouteRest(this.routeDelete.id).subscribe(function (res) {
            _this._utilityService.setAlert(_this.componentAlert, res.message, res.statusCode);
            _this.getRoutes();
            _this.hideModal(modal);
        }, function (err) {
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode, err.errors);
        });
    };
    /**
     * Edit route
     * @author Stefan Svrkota
     */
    AdminRoutesCmp.prototype.postEditRoute = function (modal) {
        var _this = this;
        this.organizeRoles(this.routeEdit);
        this.subscriptions['postEditRoute'] = this._adminRoutesService.editRouteRest(this.routeEdit).subscribe(function (res) {
            _this._utilityService.setAlert(_this.componentAlert, res.message, res.statusCode);
            _this.getRoutes();
            _this.hideModal(modal);
        }, function (err) {
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode, err.errors);
            _this.formError = err;
        });
    };
    /*--------- App logic ---------*/
    /**
     * Modify routes object
     * @author Stefan Svrkota
     */
    AdminRoutesCmp.prototype.modifyRoutes = function (routes) {
        this.tableRoutes = [];
        for (var i = 0; i < routes.length; i++) {
            var roles = "";
            for (var j = 0; j < routes[i].kjcApplicationRoleses.length; j++) {
                roles += (routes[i].kjcApplicationRoleses[j].name + (((routes[i].kjcApplicationRoleses.length - 1) != j) ? ", " : ""));
            }
            this.tableRoutes.push({
                id: routes[i].id,
                url: routes[i].url,
                kjcApplicationRoleses: routes[i].kjcApplicationRoleses,
                roles: roles,
                description: routes[i].description,
            });
        }
    };
    /**
     * Open modal for adding routes and clear form
     * @author Stefan Svrkota
     */
    AdminRoutesCmp.prototype.addRoute = function (modal) {
        var _this = this;
        this.selectedRoles = [];
        this.routeAdd = null;
        this.routeAdding = false;
        this.formError = null;
        this.routeEditing = false;
        this.routeDeleting = false;
        setTimeout(function () {
            _this.routeAdding = true;
        });
        this.routeAdd = {
            url: '',
            kjcApplicationRoleses: []
        };
        modal.show();
    };
    /**
     * Open modal for deleting route
     * @author Stefan Svrkota
     */
    AdminRoutesCmp.prototype.getDeleteRoute = function (route, modal) {
        this.routeDelete = null;
        this.routeAdding = false;
        this.routeEditing = false;
        this.routeDeleting = true;
        this.routeDelete = route;
        modal.show();
    };
    /**
     * Open modal for editing routes and clear form
     * @author Stefan Svrkota
     */
    AdminRoutesCmp.prototype.getEditRoute = function (route, modal) {
        var _this = this;
        this.selectedRoles = [];
        this.routeEdit = null;
        this.routeEditing = false;
        this.routeAdding = false;
        this.routeDeleting = false;
        setTimeout(function () {
            _this.routeEditing = true;
        });
        this.routeEdit = this._utilityService.copy(route);
        for (var key in this.routeEdit.kjcApplicationRoleses) {
            this.selectedRoles.push(this.routeEdit.kjcApplicationRoleses[key].name);
        }
        modal.show();
    };
    /**
     * Edit role object
     * @author Stefan Svrkota
     */
    AdminRoutesCmp.prototype.organizeRoles = function (routeForm) {
        routeForm.kjcApplicationRoleses = [];
        for (var key in this.selectedRoles) {
            INNERLOOP: for (var key2 in this.roles) {
                if (this.roles[key2].name == this.selectedRoles[key]) {
                    routeForm.kjcApplicationRoleses.push(this.roles[key2]);
                    break INNERLOOP;
                }
            }
        }
    };
    /**
     * Showing modal
     * @author Mario Petrovic
     */
    AdminRoutesCmp.prototype.showModal = function (modal, modalName, data) {
        this._utilityService.setAlert(this.componentAlert);
        this.formError = new models_1.RestResponse();
        switch (modalName) {
            case 'addRoute':
                this.addRoute(modal);
                break;
            case 'editRoute':
                this.getEditRoute(data, modal);
                break;
            case 'deleteRoute':
                this.getDeleteRoute(data, modal);
                break;
        }
    };
    /**
     * Hide modal based on passed modal directive
     * @author Mario Petrovic
     */
    AdminRoutesCmp.prototype.hideModal = function (modal) {
        modal.hide();
    };
    /*--------- NG On Init ---------*/
    AdminRoutesCmp.prototype.ngOnInit = function () {
        // Initital method to be executed when page loads
        this._appService.pageLoaded('', this);
        this._appService.languageChangeForComponent(this);
        // Variables initialization
        this.selectedRoles = [];
        this.subscriptions = {};
        this.componentAlert = new models_1.Alert(null, true);
        // Initial methods
        this.getRoutes();
        this.getRoles();
    };
    /*--------- NG On Destroy ---------*/
    AdminRoutesCmp.prototype.ngOnDestroy = function () {
        this._appService.refreshEmitters(this.subscriptions);
    };
    __decorate([
        core_1.ViewChild('adminRoutesDataTable'), 
        __metadata('design:type', primeng_1.DataTable)
    ], AdminRoutesCmp.prototype, "dataTable", void 0);
    AdminRoutesCmp = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'adminRoutes.cmp.html',
            encapsulation: core_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [utility_service_1.UtilityService, adminRoutes_service_1.AdminRoutesService, app_service_1.AppService, ng2_translate_1.TranslateService])
    ], AdminRoutesCmp);
    return AdminRoutesCmp;
}());
exports.AdminRoutesCmp = AdminRoutesCmp;
//# sourceMappingURL=adminRoutes.cmp.js.map