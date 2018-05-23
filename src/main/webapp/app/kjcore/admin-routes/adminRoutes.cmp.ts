import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';

import { TranslateService } from 'ng2-translate';
import { DataTable } from 'primeng/primeng';

import { AdminRoutesService } from './adminRoutes.service';
import { ModalDirective } from 'ng2-bootstrap';

import { UtilityService } from '../shared/services/utility.service';
import { AppService } from '../shared/services/app.service';
import { Alert, RestResponse, UserRoute } from '../shared/models';

import { Role } from "./../admin/users/models";

import { UserRouteAdmin } from "./models";

@Component({
    moduleId: module.id,
    templateUrl: 'adminRoutes.cmp.html',

    encapsulation: ViewEncapsulation.None
})
export class AdminRoutesCmp implements OnInit {
    subscriptions: Object;
    componentAlert: Alert;

    routes: UserRoute[];
    tableRoutes: UserRouteAdmin[];

    roles: Role[];
    selectedRoles: string[];

    routeAdd: any;
    routeAdding: boolean;

    routeEdit: any;
    routeEditing: boolean;

    routeDelete: UserRouteAdmin;
    routeDeleting: boolean;

    formError: RestResponse<any>;

    @ViewChild('adminRoutesDataTable')
    dataTable: DataTable;

    /*--------- Constructor ---------*/
    constructor(
        private _utilityService: UtilityService,
        private _adminRoutesService: AdminRoutesService,
        private _appService: AppService,
        private _translateService: TranslateService
    ) { }

    /*--------- REST CALLS ---------*/
    /**
     * Gets all routes
     * @author Stefan Svrkota
     */
    getRoutes(): void {
        this.subscriptions['getRoutes'] = this._adminRoutesService.getRoutesRest().subscribe(
            (res: RestResponse<UserRoute[]>) => {
                this.routes = res.data;
                this.modifyRoutes(this.routes);
            },
            (err: RestResponse<null>) => {
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode, err.errors);
            }
        )
    }

    /**
     * Get all roles
     * @author Stefan Svrkota
     */
    getRoles(): void {
        this.subscriptions['getRoles'] = this._adminRoutesService.getRolesRest().subscribe(
            (res: RestResponse<Role[]>) => {
                this.roles = res.data;
            },
            (err: RestResponse<null>) => {
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode, err.errors);
            }
        )
    }

    /**
     * Add new route
     * @author Stefan Svrkota
     */
    postRoute(modal: ModalDirective): void {
        this.organizeRoles(this.routeAdd);

        this.subscriptions['postRoute'] = this._adminRoutesService.postRouteRest(this.routeAdd).subscribe(
            (res: RestResponse<null>) => {
                this._utilityService.setAlert(this.componentAlert, res.message, res.statusCode);
                this.getRoutes();
                this.hideModal(modal);
            },
            (err: RestResponse<null>) => {
                this.formError = err;
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode, err.errors);
            }
        )
    }

    /**
     * Delete route
     * @author Stefan Svrkota
     */
    deleteRoute(modal: ModalDirective): void {
        this.subscriptions['deleteRoute'] = this._adminRoutesService.deleteRouteRest(this.routeDelete.id).subscribe(
            (res: RestResponse<null>) => {
                this._utilityService.setAlert(this.componentAlert, res.message, res.statusCode);
                this.getRoutes();
                this.hideModal(modal);
            },
            (err: RestResponse<null>) => {
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode, err.errors);
            }
        )
    }

    /**
     * Edit route
     * @author Stefan Svrkota
     */
    postEditRoute(modal: ModalDirective): void {
        this.organizeRoles(this.routeEdit);

        this.subscriptions['postEditRoute'] = this._adminRoutesService.editRouteRest(this.routeEdit).subscribe(
            (res: RestResponse<null>) => {
                this._utilityService.setAlert(this.componentAlert, res.message, res.statusCode);
                this.getRoutes();
                this.hideModal(modal);
            },
            (err: RestResponse<null>) => {
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode, err.errors);
                this.formError = err;
            }
        )
    }

    /*--------- App logic ---------*/

    /**
     * Modify routes object
     * @author Stefan Svrkota
     */
    modifyRoutes(routes: UserRoute[]): void {
        this.tableRoutes = [];

        for (let i = 0; i < routes.length; i++) {
            let roles = "";

            for (let j = 0; j < routes[i].kjcApplicationRoleses.length; j++) {
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
    }

    /**
     * Open modal for adding routes and clear form
     * @author Stefan Svrkota
     */
    addRoute(modal: ModalDirective): void {
        this.selectedRoles = [];
        this.routeAdd = null;
        this.routeAdding = false;
        this.formError = null;
        this.routeEditing = false;
        this.routeDeleting = false;
        setTimeout(() => {
            this.routeAdding = true;
        });
        this.routeAdd = {
            url: '',
            kjcApplicationRoleses: []
        }
        modal.show();
    }

    /**
     * Open modal for deleting route
     * @author Stefan Svrkota
     */
    getDeleteRoute(route: UserRouteAdmin, modal: ModalDirective): void {
        this.routeDelete = null;
        this.routeAdding = false;
        this.routeEditing = false;
        this.routeDeleting = true;

        this.routeDelete = route;
        modal.show();
    }

    /**
     * Open modal for editing routes and clear form
     * @author Stefan Svrkota
     */
    getEditRoute(route: any, modal: ModalDirective): void {
        this.selectedRoles = [];
        this.routeEdit = null;
        this.routeEditing = false;
        this.routeAdding = false;
        this.routeDeleting = false;
        setTimeout(() => {
            this.routeEditing = true;
        });

        this.routeEdit = this._utilityService.copy(route);
        for (let key in this.routeEdit.kjcApplicationRoleses) {
            this.selectedRoles.push(this.routeEdit.kjcApplicationRoleses[key].name);
        }
        modal.show();
    }

    /**
     * Edit role object
     * @author Stefan Svrkota
     */
    organizeRoles(routeForm: any): void {
        routeForm.kjcApplicationRoleses = [];
        for (let key in this.selectedRoles) {
            INNERLOOP: for (let key2 in this.roles) {
                if (this.roles[key2].name == this.selectedRoles[key]) {
                    routeForm.kjcApplicationRoleses.push(this.roles[key2]);
                    break INNERLOOP;
                }
            }
        }
    }

    /**
     * Showing modal
     * @author Mario Petrovic
     */
    public showModal(modal: ModalDirective, modalName: string, data?: any): void {
        this._utilityService.setAlert(this.componentAlert);
        this.formError = new RestResponse();

        switch (modalName) {
            case 'addRoute':
                this.addRoute(modal);
                break;

            case 'editRoute':
                this.getEditRoute(data, modal);
                break;

            case 'deleteRoute':
                this.getDeleteRoute(data, modal)
                break;
        }
    }

    /**
     * Hide modal based on passed modal directive
     * @author Mario Petrovic
     */
    hideModal(modal: ModalDirective): void {
        modal.hide();
    }

    /*--------- NG On Init ---------*/
    ngOnInit() {
        // Initital method to be executed when page loads
        this._appService.pageLoaded('', this);
        this._appService.languageChangeForComponent(this);

        // Variables initialization
        this.selectedRoles = [];
        this.subscriptions = {};
        this.componentAlert = new Alert(null, true);

        // Initial methods
        this.getRoutes();
        this.getRoles();
    }

    /*--------- NG On Destroy ---------*/
    ngOnDestroy(): void {
        this._appService.refreshEmitters(this.subscriptions);
    }
}