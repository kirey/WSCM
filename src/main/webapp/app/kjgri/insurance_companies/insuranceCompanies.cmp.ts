import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { TranslateService, TranslatePipe } from 'ng2-translate';
import { DataTable } from 'primeng/primeng';
import { ModalDirective } from 'ng2-bootstrap';

import { InsuranceCompaniesService } from './insuranceCompanies.service';

import { UtilityService } from '../../kjcore/shared/services/utility.service';
import { AppService } from '../../kjcore/shared/services/app.service';
import { ValidationService } from "../../kjcore/shared/services/validation.service";

import { Alert, RestResponse, DataTableConfig } from '../../kjcore/shared/models';

import { InsuranceCompany, AttachForm } from "./models";

/**
 * Component for insurace companies management
 * @author Mario Petrovic
 */
@Component({
    moduleId: module.id,
    templateUrl: 'insuranceCompanies.cmp.html',
    encapsulation: ViewEncapsulation.None,
})
export class InsuranceCompaniesCmp implements OnInit {
    subscriptions: Object;
    componentAlert: Alert;
    dataTableConfig: DataTableConfig;
    formErrors: RestResponse<any>;

    insuranceCompanies: InsuranceCompany[];

    captchaImage: string;
    attachForm: FormGroup;

    detachingCompany: InsuranceCompany;

    /*--------- Constructor ---------*/
    constructor(
        public _insuranceCompaniesService: InsuranceCompaniesService,
        public _utilityService: UtilityService,
        public _appService: AppService,
        public _translateService: TranslateService,
        public _formBuilder: FormBuilder) { }

    /*--------- REST calls ---------*/

    /**
     * Loads insurance companies
     * @author Mario Petrovic
     */
    loadInsuranceCompanies(): void {
        this.subscriptions['loadInsuranceCompanies'] = this._insuranceCompaniesService.getInsuranceCompanies().subscribe(
            (res: RestResponse<InsuranceCompany[]>) => {
                this._utilityService.setAlert(this.componentAlert, res.message, res.statusCode);
                this.insuranceCompanies = res.data;
                this.insuranceCompanies.sort((a, b) => {
                    if(a.name > b.name) return 1;
                    if(a.name < b.name) return -1;
                    return 0;
                })
            },
            (err: RestResponse<null>) => {
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode, err.errors);
            }
        )
    }

    /**
     * Update company's info view priviledge for selected insurance company
     * @author Mario Petrovic
     */
    updateInfoConsent(insuranceCompanyId: number, flag: boolean): void {
        this.subscriptions['attachToInsuranceCompany'] = this._insuranceCompaniesService.updateInfoConsent(insuranceCompanyId, !flag).subscribe(
            (res: RestResponse<null>) => {
                this.loadInsuranceCompanies();
                this._utilityService.setAlert(this.componentAlert, res.message, res.statusCode);
            },
            (err: RestResponse<null>) => {
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode, err.errors);
                this.formErrors = err;
            }
        )
    }

    /**
     * Attaches loaded users's company to choosen insurance company
     * @author Mario Petrovic
     */
    attachToInsuranceCompany(attachForm: AttachForm, modal: ModalDirective): void {
        this.subscriptions['attachToInsuranceCompany'] = this._insuranceCompaniesService.attachToInsuranceCompany(attachForm).subscribe(
            (res: RestResponse<null>) => {
                modal.hide();
                this.loadInsuranceCompanies();
                setTimeout(() => {
                    this._utilityService.setAlert(this.componentAlert, res.message, res.statusCode);
                }, 500);
            },
            (err: RestResponse<null>) => {
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode, err.errors);
                this.formErrors = err;
                this.getCaptcha();
            }
        )
    }

    /**
     * Detach loaded users's company from choosen insurance company
     * @author Mario Petrovic
     */
    detachFromInsuranceCompany(insuranceCompanyId: number, modal: ModalDirective): void {
        this.subscriptions['attachToInsuranceCompany'] = this._insuranceCompaniesService.detachFromInsuranceCompany(insuranceCompanyId).subscribe(
            (res: RestResponse<null>) => {
                modal.hide();
                this.loadInsuranceCompanies();
                setTimeout(() => {
                    this._utilityService.setAlert(this.componentAlert, res.message, res.statusCode);
                }, 500);
            },
            (err: RestResponse<null>) => {
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode, err.errors);
            }
        )
    }

    /*--------- App logic ---------*/

    /**
     * Set attach form in modal
     * @author Mario Petrovic
     */
    setAttachForm(modal?: ModalDirective): void {
        this.getCaptcha((res: RestResponse<any>, modal: ModalDirective) => {
            this.attachForm = this._formBuilder.group({
                insuranceCompanyCode: new FormControl(null, [Validators.required]),
                captchaHashCode: new FormControl(res.data.hashedCode),
                captchaCode: new FormControl(null, [Validators.required])
            })
            this.captchaImage = res.data.imageBase64;

            modal.show();
        }, modal)
    }

    /**
     * Get captcha code and image
     * @author Mario Petrovic
     */
    getCaptcha(callback?: Function, modal?: ModalDirective): void {
        this._utilityService.getCaptchaRest().subscribe(
            (res: RestResponse<any>) => {
                if (callback) {
                    callback.call(this, res, modal);
                } else {
                    this.captchaImage = res.data.imageBase64;
                    this.attachForm.controls['captchaHashCode'].setValue(res.data.hashedCode);
                    this.attachForm.controls['captchaCode'].setValue(null);
                }
            },
            (err: RestResponse<any>) => {
                this.formErrors = err;
            }
        )
    }

    /**
     * Show modal based on passed modal directive and custom behaviour based on modalName and data
     * @author Mario Petrovic
     */
    showModal(modal: ModalDirective, modalName: string, data?: InsuranceCompany): void {
        this._utilityService.setAlert(this.componentAlert);
        this.formErrors = new RestResponse();

        switch (modalName) {
            case 'attach':
                this.setAttachForm(modal);
                break;

            case 'detach':
                this.detachingCompany = data;
                modal.show();
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
        this.subscriptions = {};
        this.componentAlert = new Alert(null, true);
        this.dataTableConfig = new DataTableConfig(10, true, 3, [5, 10, 20, 50, 100], true);

        this.formErrors = new RestResponse();

        this.captchaImage = '';

        // Initial methods
        // this.setAttachForm();
        this.loadInsuranceCompanies();
    }

    /*--------- NG On Destroy ---------*/
    ngOnDestroy(): void {
        this._appService.refreshEmitters(this.subscriptions);
    }
}
