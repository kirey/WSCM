import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { UtilityService } from '../shared/services/utility.service';
import { RestResponse } from '../shared/models';

@Injectable()
export class AdminTranslationService {

    baseUrl: string;

    constructor(private _http: Http) {
        this.baseUrl = 'rest/adminTranslation/';
    }

    /**
     * Rest GET call for all existing languages
     * @author Stefan Svrkota
     */
    getLanguagesRest(): Observable<RestResponse<any>> {
        return this._http.get(this.baseUrl + 'languages')
            .map((res: Response) => res.json())
            .catch(UtilityService.handleError);
    }

    /**
     * Rest GET call for all available languages
     * @author Stefan Svrkota
     */
    getAvailableLanguagesRest(): Observable<RestResponse<any>> {
        return this._http.get(this.baseUrl + 'availableLanguages')
            .map((res: Response) => res.json())
            .catch(UtilityService.handleError);
    }

    /**
     * Rest GET call for all sections from database
     * @author Stefan Svrkota
     */
    getSectionsRest(): Observable<RestResponse<any>> {
        return this._http.get(this.baseUrl + 'section')
            .map((res: Response) => res.json())
            .catch(UtilityService.handleError);
    }

    /**
     * Rest PUT call for editing section
     * @author Stefan Svrkota
     */
    editSectionRest(sectionName: string, editedSectionName: string): Observable<RestResponse<any>> {
        return this._http.put(this.baseUrl + 'section?sectionName=' + sectionName + '&editedSectionName=' + editedSectionName + '&pageId=adminTranslation', '')
            .map((res: Response) => res.json())
            .catch(UtilityService.handleError);
    }

    /**
     * Rest DELETE call for deleting selected section
     * @author Stefan Svrkota
     */
    deleteSectionRest(sectionName: string): Observable<RestResponse<any>> {
        return this._http.delete(this.baseUrl + 'section?section=' + sectionName + '&pageId=adminTranslation')
            .map((res: Response) => res.json())
            .catch(UtilityService.handleError);
    }

    /**
     * Rest GET call for modules from database based on selected section
     * @author Stefan Svrkota
     */
    getModulesRest(sectionName: string): Observable<RestResponse<any>> {
        return this._http.get(this.baseUrl + 'module?section=' + sectionName + '&pageId=adminTranslation')
            .map((res: Response) => res.json())
            .catch(UtilityService.handleError);
    }

    /**
     * Rest PUT call for editing module
     * @author Stefan Svrkota
     */
    editModuleRest(moduleName: string, editedModuleName: string): Observable<RestResponse<any>> {
        return this._http.put(this.baseUrl + 'module?moduleName=' + moduleName + '&editedModuleName=' + editedModuleName + '&pageId=adminTranslation', '')
            .map((res: Response) => res.json())
            .catch(UtilityService.handleError);
    }

    /**
     * Rest DELETE call for deleting selected module
     * @author Stefan Svrkota
     */
    deleteModuleRest(moduleName: string): Observable<RestResponse<any>> {
        return this._http.delete(this.baseUrl + 'module?name=' + moduleName + '&pageId=adminTranslation')
            .map((res: Response) => res.json())
            .catch(UtilityService.handleError);
    }

    /**
     * Rest GET call for translations from database based on selected section and module
     * @author Stefan Svrkota
     */
    getTranslationsRest(menu: string): Observable<RestResponse<any>> {
        return this._http.get(this.baseUrl + 'translation?module=' + menu + '&pageId=adminTranslation')
            .map((res: Response) => res.json())
            .catch(UtilityService.handleError);
    }

    /**
     * Rest POST call for adding one or more translations to database. Also used for adding section or module
     * @author Kirey
     */
    addTranslationRest(list: any[]): Observable<RestResponse<any>> {
        return this._http.post(this.baseUrl + 'translation?pageId=adminTranslation', list)
            .map((res: Response) => res.json())
            .catch(UtilityService.handleError);
    }

    /**
     * Rest PUT call for editing translation
     * @author Stefan Svrkota
     */
    editTranslationRest(key: any): Observable<RestResponse<any>> {
        return this._http.put(this.baseUrl + 'translation?pageId=adminTranslation', key)
            .map((res: Response) => res.json())
            .catch(UtilityService.handleError);
    }

    /**
     * Rest DELETE call for deleting selected translation
     * @author Stefan Svrkota
     */
    deleteTranslationRest(genericName: string): Observable<RestResponse<any>> {
        return this._http.delete(this.baseUrl + 'translation?name=' + genericName + '&pageId=adminTranslation')
            .map((res: Response) => res.json())
            .catch(UtilityService.handleError);
    }

    /**
     * Rest POST call for uploading file that contains translations
     * @author DynTech
     */
    uploadCsvFileRest(formData: FormData, override: number): Observable<RestResponse<any>> {
        return this._http.post(this.baseUrl + 'uploadTranslation?pageId=adminTranslation&checked=' + override, formData)
            .map((res: Response) => res.json())
            .catch(UtilityService.handleError);
    }
}