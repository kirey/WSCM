import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ValidationService } from "./../shared/services/validation.service";
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { TranslateService, TranslatePipe } from 'ng2-translate';
import { DataTable } from 'primeng/primeng';
import { ModalDirective } from 'ng2-bootstrap';

import { CompanyManagementService } from './companyManagement.service';


import { UtilityService } from '../shared/services/utility.service';
import { AppService } from '../shared/services/app.service';

import { Alert, RestResponse, DataTableConfig } from '../shared/models';
import { CompanyDetails, Company, ColorPicker, CompanyCss, FileInput } from "./models";

/**
 * Component for Company Management component
 * @author Mario Petrovic
 */
@Component({
    moduleId: module.id,
    templateUrl: 'companyManagement.cmp.html',
    encapsulation: ViewEncapsulation.None,
})
export class CompanyManagementCmp implements OnInit {
    subscriptions: {};
    componentAlert: Alert;

    companies: Company[];
    defaultCompany: CompanyDetails;
    selectedCompanyProfile: CompanyDetails;

    dataTableConfig: DataTableConfig;

    editForm: FormGroup;
    addForm: FormGroup;
    defaultCompanyForm: FormGroup;

    colorPickerToggle: boolean[];
    cssBundle: any;

    defaultCompanyFileInput: FileInput;
    selectedCompanyFileInput: FileInput;
    addCompanyFileInput: FileInput;

    formErrors: RestResponse<any>;

    tabsActivity: any;

    /*--------- Constructor ---------*/
    constructor(
        public _utilityService?: UtilityService,
        public _companyManagementService?: CompanyManagementService,
        public _appService?: AppService,
        public _translateService?: TranslateService,
        public _formBuilder?: FormBuilder) { }


    /*--------- App Logic ---------*/

    /*--------- REST calls ---------*/
    /**
     * Load all companies
     * @author Mario Petrovic
     */
    loadAllCompanies(): void {
        this.subscriptions['loadAllCompanies'] = this._companyManagementService.getAllCompaniesRest().subscribe(
            (res: RestResponse<any>) => {
                this.companies = res.data;

                for(let company of this.companies){
                    company.passwordTimeout = this._utilityService.convertMillisecondsDays(company.passwordTimeout, true);
                }
            }, (err: RestResponse<any>) => {
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode);
            });
    }

    /**
     * Update selected comapny
     * @author Mario Petrovic
     */
    updateCompany(data: any, modal: ModalDirective): void {
        if(data.passwordTimeout) {
            data.passwordTimeout = this._utilityService.convertMillisecondsDays(data.passwordTimeoutForm);
        }

        this.subscriptions['updateCompany'] = this._companyManagementService.updateCompanyRest(data).subscribe(
            (res: RestResponse<any>) => {
                this._utilityService.setAlert(this.componentAlert, res.message, res.statusCode);
                this.hideModal(modal);
                this.loadAllCompanies();
            }, (err: RestResponse<any>) => {
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode);
                this.formErrors = err;
            });
    }

    updateDefaultCompany(data: Company, modal: ModalDirective): void {
        this.subscriptions['updateDefaultCompany'] = this._companyManagementService.updateDefaultCompanyRest(data).subscribe(
            (res: RestResponse<any>) => {
                this._utilityService.setAlert(this.componentAlert, res.message, res.statusCode);

                this.hideModal(modal);
            }, (err: RestResponse<any>) => {
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode);
            }
        )
    }

    /**
     * Load default company profile
     * @author Mario Petrovic
     */
    loadDefaultCompany(modal: ModalDirective): void {
        this.subscriptions['loadDefaultComapny'] = this._companyManagementService.getDefaultCompanyRest().subscribe(
            (res: RestResponse<any>) => {
                this.defaultCompany = res.data;

                this.defaultCompanyFileInput.file = null;
                this.selectedCompanyProfile.defaultCss = this.defaultCompany.activeCss;
                this.setCssModel('defaultCss', this.defaultCompany.activeCss);
                this.defaultCompanyFileInput.value = 'rest/users/noAuth/logoImage/' + res.data.company.id;

                this.setEditDefaultCompanyModal(modal, this.defaultCompany.company);
            }, (err: RestResponse<any>) => {
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode);
            });
    }


    /**
     * Load company profile by id
     * @author Mario Petrovic
     */
    loadCompanyById(id: number, modal: ModalDirective): void {
        this.subscriptions['loadCompanyById'] = this._companyManagementService.getCompanyProfileByIdRest(id).subscribe(
            (res: RestResponse<any>) => {
                this.selectedCompanyFileInput = new FileInput();

                setTimeout(() => {
                    this.setEditCompanyModal(res.data);
                    this.selectedCompanyFileInput.value = 'rest/users/noAuth/logoImage/' + res.data.company.id;
                    modal.show();
                });
            }, (err: RestResponse<any>) => {
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode);
            });
    }

    /**
     * Update status of the company
     * @author Mario Petrovic
     */
    updateCompanyStatus(data: Company): void {
        this.subscriptions['updateCompanyStatus'] = this._companyManagementService.updateCompanyStatusRest(data.id, !data.flActive).subscribe(
            (res: RestResponse<any>) => {
                this._utilityService.setAlert(this.componentAlert, res.message, res.statusCode);
                this.loadAllCompanies();
            }, (err: RestResponse<any>) => {
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode);
                this.formErrors = err;
            });
    }

    /**
     * Add new company
     * @author Mario Petrovic
     */
    addNewCompany(data: Company, modal: ModalDirective): void {
        let newCompany = new FormData();

        newCompany.append('companyDto',
            new Blob(
                [JSON.stringify(data)],
                {
                    type: "application/json"
                }
            )
        );
        newCompany.append('logo', this.addCompanyFileInput.file);

        this.subscriptions['addNewCompany'] = this._companyManagementService.saveCompanyRest(newCompany).subscribe(
            (res: RestResponse<any>) => {
                this._utilityService.setAlert(this.componentAlert, res.message, res.statusCode);
                this.hideModal(modal);

                this.loadAllCompanies();
            }, (err: RestResponse<any>) => {
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode);
                this.formErrors = err;
            })
    }

    /**
     * Edit default style
     * @author Mario Petrovic
     */
    editDefaultStyle(data: any, modal: ModalDirective): void {
        let defaultCompanyCss: CompanyCss[] = [];
        for (let rule of Object.keys(data)) {
            let ruleTemp = new CompanyCss();
            ruleTemp.key = data[rule].key;
            ruleTemp.name = data[rule].name;
            ruleTemp.value = data[rule].property + ':' + data[rule].value + ';';
            defaultCompanyCss.push(ruleTemp);
        }

        this.subscriptions['editDefaultStyle'] = this._companyManagementService.updateDefaultCssRest(defaultCompanyCss).subscribe(
            (res: RestResponse<any>) => {
                this.hideModal(modal);
                this._utilityService.setAlert(this.componentAlert, res.message, res.statusCode);
                this._appService.setCompanyCSSInit();
            }, (err: RestResponse<any>) => {
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode);
            });
    }

    /**
     * Edit default style
     * @author Mario Petrovic
     */
    editCompanyStyle(id: number, data: any, modal: ModalDirective): void {
        let companyCss: CompanyCss[] = [];
        for (let rule of Object.keys(data)) {
            let ruleTemp = new CompanyCss();
            ruleTemp.key = data[rule].key;
            ruleTemp.name = data[rule].name;
            ruleTemp.value = data[rule].property + ':' + data[rule].value + ';';
            companyCss.push(ruleTemp);
        }

        this.subscriptions['editCompanyStyle'] = this._companyManagementService.updateCompanyCssRest(id, companyCss).subscribe(
            (res: RestResponse<any>) => {
                this.hideModal(modal)
                this._utilityService.setAlert(this.componentAlert, res.message, res.statusCode);
                this._appService.setCompanyCSSInit();
            }, (err: RestResponse<any>) => {
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode);
            });
    }

    /**
     * Reset default css to initial
     * @author Mario Petrovic
     */
    resetDefaultCssToInit(modal: ModalDirective): void {
        this.subscriptions['resetDefaultCssToInit'] = this._companyManagementService.resetDefaultCssToInitRest().subscribe(
            (res: RestResponse<any>) => {
                this.hideModal(modal);
                this._utilityService.setAlert(this.componentAlert, res.message, res.statusCode);
                this._appService.setCompanyCSSInit();
            }, (err: RestResponse<any>) => {
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode);
                this.formErrors = err;
            }
        );
    }

    /**
     * Reset selected company style to default css
     * @author Mario Petrovic
     */
    resetCompanyStyleToDefault(id: number, modal: ModalDirective): void {
        this.subscriptions['resetCompanyStyleToDefault'] = this._companyManagementService.resetCompanyStyleToDefault(id).subscribe(
            (res: RestResponse<any>) => {
                this.hideModal(modal);
                this._utilityService.setAlert(this.componentAlert, res.message, res.statusCode);
                this._appService.setCompanyCSSInit();
            }, (err: RestResponse<any>) => {
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode);
                this.formErrors = err;
            }
        );
    }

    /**
     * Reset selected company style to previous css
     * @author Mario Petrovic
     */
    resetCompanyStyleToPrevious(id: number, modal: ModalDirective): void {
        this.subscriptions['resetCompanyStyleToPrevious'] = this._companyManagementService.resetCompanyStyleToPreviousRest(id).subscribe(
            (res: RestResponse<any>) => {
                this.hideModal(modal);
                this._utilityService.setAlert(this.componentAlert, res.message, res.statusCode);
                this._appService.setCompanyCSSInit();
            }, (err: RestResponse<any>) => {
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode);
                this.formErrors = err;
            }
        );
    }

    /**
     * Upload company logo
     * @author Mario Petrovic
     */
    uploadCompanyLogo(companyLogo: any, companyId: number, modal?: ModalDirective): void {
        let formData: FormData = new FormData();

        formData.append('companyId', new Blob([JSON.stringify(companyId)],
            {
                type: "text/plain"
            }));


        formData.append('companyLogo', companyLogo);

        this.subscriptions['resetCompanyStyleToPrevious'] = this._companyManagementService.uploadCompanyLogoRest(formData).subscribe(
            (res: RestResponse<any>) => {
                this.hideModal(modal);
                this._utilityService.setAlert(this.componentAlert, res.message, res.statusCode);
            }, (err: RestResponse<any>) => {
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode);
                this.formErrors = err;
            }
        );
    }

    /*--------- Other ---------*/
    onFileInputChange(event: any, fileInputName: string) {
        if (event.target.files.length > 0) {
            this[fileInputName].value = '';
            this[fileInputName].file = event.target.files[0];
            let fileReaderTemp = new FileReader();

            fileReaderTemp.onload = (res: any) => {
                this[fileInputName].value = res.target.result;
            }

            fileReaderTemp.readAsDataURL(event.target.files[0]);
        }
    }

    /*--------- Utility ---------*/

    /**
     * Set edit company modal form
     * @author Mario Petrovic
     */
    setEditCompanyModal(company: CompanyDetails): void {
        this.selectedCompanyProfile = company;
        this.selectedCompanyProfile.company.passwordTimeout = this._utilityService.convertMillisecondsDays(this.selectedCompanyProfile.company.passwordTimeout, true);
        this.setCssModel('defaultCss', this.selectedCompanyProfile.defaultCss);
        this.setCssModel('previousCss', this.selectedCompanyProfile.previousCss);
        this.setCssModel('activeCss', this.selectedCompanyProfile.activeCss);
        this.editForm = this._formBuilder.group({
            id: new FormControl(company.company.id),
            code: new FormControl(company.company.code),
            name: new FormControl(company.company.name, [Validators.required]),
            description: new FormControl(company.company.description, [Validators.required]),
            flActive: new FormControl(company.company.flActive),
            passwordTimeout: new FormControl(company.company.passwordTimeout),
            passwordTimeoutForm: new FormControl(company.company.passwordTimeout, [])
        });
    }

    /**
     * Set add company modal form
     * @author Mario Petrovic
     */
    setAddCompanyModal(): void {
        this.addCompanyFileInput = new FileInput();
        this.addCompanyFileInput.value = 'app/kjcore/assets/images/noPhoto.png';
        this.addForm = this._formBuilder.group({
            id: new FormControl(),
            code: new FormControl('', [Validators.required]),
            name: new FormControl('', [Validators.required]),
            description: new FormControl('', [Validators.required]),
            flActive: new FormControl(false),
            passwordTimeout: new FormControl(),
            passwordTimeoutForm: new FormControl(null, [])
        })
    }

    setEditDefaultCompanyModal(modal: ModalDirective, defaultCompany: Company): void {
        this.defaultCompanyForm = this._formBuilder.group({
            name: new FormControl(defaultCompany.name, [Validators.required]),
            description: new FormControl(defaultCompany.description)
        });

        modal.show();
    }

    /**
     * Set edit default style form
     * @author Mario Petrovic
     */
    setCssModel(cssName: string, company: CompanyCss[]): void {
        this.cssBundle[cssName] = {};
        if (company) {
            for (let rule of company) {
                this.cssBundle[cssName][rule.key] = {};
                this.cssBundle[cssName][rule.key].value = this._utilityService.convertToCssValue(rule.value);
                this.cssBundle[cssName][rule.key].toggle = false;
                this.cssBundle[cssName][rule.key].name = rule.name;
                this.cssBundle[cssName][rule.key].key = rule.key;
                this.cssBundle[cssName][rule.key].property = this._utilityService.extractPropertyName(rule.value);
            }
        } else {
            this.cssBundle[cssName] = null;
        }
    }

    /**
     * Toggle color picker
     * @author Mario Petrovic
     */
    toggleColorPicker(colorPicker: ColorPicker): void {
        colorPicker.toggle = !colorPicker.toggle;
    }

    /**
     * Select tab method
     * @author Mario Petrovic
     */
    selectTab(tabName: string, sub?: boolean): void {
        if (sub) {
            this.tabsActivity.defaultStyle = false;
            this.tabsActivity.previousStyle = false;
            this.tabsActivity.currentStyle = false;
        } else {
            this.tabsActivity.profile = false;
            this.tabsActivity.editStyle = false;
        }
        this.tabsActivity[tabName] = true;
    }

    /**
     * Show modal based on passed modal directive and custom behaviour based on modalName and data
     * @author Mario Petrovic
     */
    showModal(modal: ModalDirective, modalName: string, data: any): void {
        this._utilityService.setAlert(this.componentAlert);
        this.formErrors = new RestResponse();
        switch (modalName) {
            case 'editCompany':
                this.loadCompanyById(data, modal)
                break;
            case 'addCompany':
                this.setAddCompanyModal();
                modal.show();
                break;

            case 'editDefaultCompany':
                this.loadDefaultCompany(modal);
                break;
        }
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

        // Variables initialization
        this.subscriptions = {};
        this.componentAlert = new Alert(null, true);

        this.dataTableConfig = new DataTableConfig(10, true, 3, [5, 10, 20, 50, 100], true);
        this.selectedCompanyProfile = new CompanyDetails();
        this.companies = [];
        this.cssBundle = {};
        this.defaultCompanyFileInput = new FileInput();
        this.selectedCompanyFileInput = new FileInput();
        this.addCompanyFileInput = new FileInput();
        this.addCompanyFileInput.value = 'app/kjcore/assets/images/noPhoto.png';

        this.tabsActivity = {
            profile: true,
            editStyle: false,
            defaultStyle: false,
            previousStyle: false,
            currentStyle: true
        }

        // Initial methods
        this.loadAllCompanies();

        this._appService.languageChangeForComponent(this);
    }

    /*--------- NG On Destroy ---------*/
    ngOnDestroy(): void {
        this._appService.refreshEmitters(this.subscriptions);
    }
}