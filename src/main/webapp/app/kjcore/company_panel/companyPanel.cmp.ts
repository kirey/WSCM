import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { TranslateService, TranslatePipe } from 'ng2-translate';

import { CompanyPanelService } from './companyPanel.service';


import { UtilityService } from '../shared/services/utility.service';
import { AppService } from '../shared/services/app.service';

import { Alert, RestResponse, DataTableConfig } from '../shared/models';
import { CompanyDetails, Company, ColorPicker, CompanyCss, FileInput } from "./models";

/**
 * Component for Company Management component
 * @author Roxana
 */
@Component({
    moduleId: module.id,
    templateUrl: 'companyPanel.cmp.html',
    encapsulation: ViewEncapsulation.None,
})
export class CompanyPanelCmp implements OnInit {
    subscriptions: {};
    componentAlert: Alert;

    colorPickerToggle: boolean[];
    cssBundle: any;

    company: CompanyDetails;

    tabsActivity: any;

    companyForm: FormGroup;

    formErrors: RestResponse<any>;

    /*--------- Constructor ---------*/
    constructor(
        private _utilityService: UtilityService,
        private _companyPanelService: CompanyPanelService,
        private _appService: AppService,
        private _translateService: TranslateService,
        private _formBuilder: FormBuilder) { }

    /*--------- App Logic ---------*/

    /*--------- REST calls ---------*/
    /**
     * Load company details
     * @author Mario Petrovic
     */
    loadCompany(): void {
        this.subscriptions['loadCompany'] = this._companyPanelService.getCompanyRest().subscribe(
            (res: RestResponse<any>) => {
                this.company = res.data;
                this.company.company.passwordTimeout = this._utilityService.convertMillisecondsDays(this.company.company.passwordTimeout, true);
                this.setCompanyForm(this.company.company);
                this.setCssModel('activeCss', this.company.activeCss);
                this.setCssModel('previousCss', this.company.previousCss);
                this.setCssModel('defaultCss', this.company.defaultCss);

            }, (err: RestResponse<any>) => {
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode);
            });
    }

    /**
     * Edit company details
     * @author Mario Petrovic
     */
    updateCompany(companyData: Company) {
        companyData.passwordTimeout = this._utilityService.convertMillisecondsDays(companyData.passwordTimeout);
        this.subscriptions['updateCompany'] = this._companyPanelService.updateCompanyRest(companyData).subscribe(
            (res: RestResponse<any>) => {
                this._utilityService.setAlert(this.componentAlert, res.message, res.statusCode);
            }, (err: RestResponse<any>) => {
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode);
            });
    }

    /**
     * Edit default style
     * @author Mario Petrovic
     */
    editCompanyStyle(data: any): void {
        let companyCss: CompanyCss[] = [];
        for (let rule of Object.keys(data)) {
            let ruleTemp = new CompanyCss();
            ruleTemp.key = data[rule].key;
            ruleTemp.name = data[rule].name;
            ruleTemp.value = data[rule].property + ':' + data[rule].value + ';';
            companyCss.push(ruleTemp);
        }

        this.subscriptions['editCompanyStyle'] = this._companyPanelService.updateCompanyCssRest(companyCss).subscribe(
            (res: RestResponse<any>) => {
                this._utilityService.setAlert(this.componentAlert, res.message, res.statusCode);
                this._appService.setCompanyCSSInit();

                this.loadCompany();
            }, (err: RestResponse<any>) => {
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode);
            });
    }

    /**
     * Reset company style to previous css
     * @author Mario Petrovic
     */
    resetCompanyStyleToPrevious(id: number): void {
        this.subscriptions['resetCompanyStyleToPrevious'] = this._companyPanelService.resetCompanyStyleToPreviousRest(id).subscribe(
            (res: RestResponse<any>) => {
                this._utilityService.setAlert(this.componentAlert, res.message, res.statusCode);
                this._appService.setCompanyCSSInit();

                this.loadCompany();
            }, (err: RestResponse<any>) => {
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode);
                this.formErrors = err;
            }
        );
    }

    /**
     * Reset company style to default css
     * @author Mario Petrovic
     */
    resetCompanyStyleToDefault(): void {
        this.subscriptions['resetCompanyStyleToDefault'] = this._companyPanelService.resetCompanyStyleToDefault().subscribe(
            (res: RestResponse<any>) => {
                this._utilityService.setAlert(this.componentAlert, res.message, res.statusCode);
                this._appService.setCompanyCSSInit();

                this.loadCompany();
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

    setCompanyForm(data?: Company): void {
        let tempData: Company = new Company();
        if (data) {
            tempData = data;
        }

        this.companyForm = this._formBuilder.group({
            id: new FormControl(tempData.id, [Validators.required]),
            code: new FormControl(tempData.code, [Validators.required]),
            name: new FormControl(tempData.name, [Validators.required]),
            description: new FormControl(tempData.description, [Validators.required]),
            passwordTimeout: new FormControl(tempData.passwordTimeout)
        });
    }

    /*--------- Utility ---------*/

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

    /*--------- NG On Init ---------*/
    ngOnInit() {
        // Initital method to be executed when page loads
        this._appService.pageLoaded('', this);

        // Variables initialization
        this.subscriptions = {};
        this.componentAlert = new Alert(null, true);

        this.company = new CompanyDetails();

        this.cssBundle = {};

        this.tabsActivity = {
            profile: true,
            editStyle: false,
            defaultStyle: false,
            previousStyle: false,
            currentStyle: true
        }

        // Initial methods
        this.setCompanyForm();
        this.loadCompany();

        this._appService.languageChangeForComponent(this);
    }

    /*--------- NG On Destroy ---------*/
    ngOnDestroy(): void {
        this._appService.refreshEmitters(this.subscriptions);
    }
}