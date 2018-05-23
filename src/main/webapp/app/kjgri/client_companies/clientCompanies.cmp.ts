import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { TranslateService, TranslatePipe } from 'ng2-translate';
import { DataTable } from 'primeng/primeng';
import { ModalDirective } from 'ng2-bootstrap';

import { ClientCompaniesService } from './clientCompanies.service';

import { UtilityService } from '../../kjcore/shared/services/utility.service';
import { AppService } from '../../kjcore/shared/services/app.service';

import { CompanyQueryParams } from "./models";

import { PaginationTableResult } from "./../kjgri_shared/models";

import { Company } from "./../../kjcore/company_management/models/company.model";

import { Alert, RestResponse, DataTableConfig } from '../../kjcore/shared/models';

/**
 * Component for insurace companies management
 * @author Mario Petrovic
 */
@Component({
    moduleId: module.id,
    templateUrl: 'clientCompanies.cmp.html',
    encapsulation: ViewEncapsulation.None
})
export class ClientCompaniesCmp implements OnInit {
    subscriptions: Object;
    componentAlert: Alert;
    dataTableConfig: DataTableConfig;
    formErrors: RestResponse<any>;

    clientCompaniesResult: PaginationTableResult<Company>;

    detachingCompany: Company;

    @ViewChild('clientCompanyDataTable')
    clientCompanyDataTable: DataTable;
    @ViewChild('filterForm')
    filterForm: FormGroup;

    /*--------- Constructor ---------*/
    constructor(
        public _clientCompaniesService: ClientCompaniesService,
        public _utilityService: UtilityService,
        public _appService: AppService,
        public _translateService: TranslateService) { }

    /*--------- REST calls ---------*/
    /**
     * Loads filtered client companies
     * @author Mario Petrovic
     */
    filterCompanies(filterForm: { value: { companyName: string } }, dataTable: DataTable): void {
        this._utilityService.setAlert(this.componentAlert);

        var queryParams = new CompanyQueryParams(dataTable.rows, (dataTable.first / dataTable.rows + 1));

        queryParams.sortType = dataTable.sortOrder == 1 ? 'asc' : 'desc';

        queryParams.companyName = filterForm.value.companyName || '';

        this.subscriptions['filterCompanies'] = this._clientCompaniesService.getInsuranceCompanies(queryParams).subscribe(
            (res: RestResponse<PaginationTableResult<Company>>) => {
                this.clientCompaniesResult = res.data;
            },
            (err: RestResponse<any>) => {
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode);
            }
        )
    }

    /**
     * 
     */
    clearFilters(): void {
        this.filterForm.reset();
        this.filterCompanies({value: {companyName: ''}}, this.clientCompanyDataTable);
    }

    /**
     * Detaches insurance company of logged in user from selected client company
     * @author Mario Petrovic
     */
    detachFromClientCompany(clientCompany: Company, modal: ModalDirective): void {
        this._utilityService.setAlert(this.componentAlert);

        this.subscriptions['detachFromClientCompany'] = this._clientCompaniesService.detachFromClientCompany(clientCompany.id).subscribe(
            (res: RestResponse<PaginationTableResult<Company>>) => {
                this._utilityService.setAlert(this.componentAlert, res.message);
                this.filterCompanies({value: {companyName: ''}}, this.clientCompanyDataTable);
                modal.hide();
            },
            (err: RestResponse<any>) => {
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode);
            }
        )
    }

    /*--------- App logic ---------*/

    /**
     * Show modal based on passed modal directive and custom behaviour based on modalName and data
     * @author Mario Petrovic
     */
    showModal(modal: ModalDirective, modalName: string, data?: Company): void {
        this._utilityService.setAlert(this.componentAlert);

        this.detachingCompany = data;
        modal.show();
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
        this.subscriptions = {};
        this.componentAlert = new Alert(null, true);
        this.dataTableConfig = new DataTableConfig(10, true, 3, [5, 10, 20, 50, 100], true);

        this.formErrors = new RestResponse();

        this.clientCompaniesResult = new PaginationTableResult<Company>();

        // Initial methods
    }

    /*--------- NG On Destroy ---------*/
    ngOnDestroy(): void {
        this._appService.refreshEmitters(this.subscriptions);
    }
}
