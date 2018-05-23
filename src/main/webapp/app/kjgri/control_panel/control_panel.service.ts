import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { UtilityService } from '../../kjcore/shared/services/utility.service';

import { RestResponse } from "./../../kjcore/shared/models";

@Injectable()
export class ControlPanelService {
    public baseUrl: string = 'rest/admin/controlPanel';

    constructor(private _http: Http,
                private _utilityService: UtilityService) {}

    /**
     * Post call to load all given modules into cache
     * 
     * @param modules string[]
     * @author Nikola Gavric
     */
    loadCache(modules: string[]): Observable<RestResponse<any>> {
        return this._http.post(this.baseUrl+'/load', modules)
            .map(UtilityService.handleSuccess)
            .catch(UtilityService.handleError);
    }

    /**
     * Post call to clear all modules from cache
     * 
     * @param modules string[]
     * @author Nikola Gavric
     */
    clearCache(modules: string[]): Observable<RestResponse<any>> {
        return this._http.post(this.baseUrl+'/clear', modules)
            .map(UtilityService.handleSuccess)
            .catch(UtilityService.handleError);
    }

    /**
     * 
     */
    refreshMemory(): Observable<RestResponse<any>> {
        return this._http.get(this.baseUrl+'/memoryUsage')
        .map(UtilityService.handleSuccess)
        .catch(UtilityService.handleError);
    }

    /**
     * 
     */
    currentModulesStatus(): Observable<RestResponse<any>> {
        return this._http.get(this.baseUrl+'/currentNumber')
        .map(UtilityService.handleSuccess)
        .catch(UtilityService.handleError);
    }

    /**
     * 
     */
    currentSFTPStatus(): Observable<RestResponse<any>> {
        return this._http.get(this.baseUrl+'/download/counter')
        .map(UtilityService.handleSuccess)
        .catch(UtilityService.handleError);
    }

    /**
     * 
     */
    currentDBStatus(): Observable<RestResponse<any>> {
        return this._http.get(this.baseUrl+'/currentNumber')
        .map(UtilityService.handleSuccess)
        .catch(UtilityService.handleError);
    }

    /**
     * 
     */
    runGC(): Observable<RestResponse<any>> {
        return this._http.get(this.baseUrl+'/gc')
        .map(UtilityService.handleSuccess)
        .catch(UtilityService.handleError);
    }

    /**
     * 
     * 
     * @param sftp string[]
     * @author Nikola Gavric
     */
    downloadSFTP(sftp: string[]): Observable<RestResponse<any>> {
        return this._http.post(this.baseUrl+'/download', sftp)
            .map(UtilityService.handleSuccess)
            .catch(UtilityService.handleError);
    }

    /**
     * 
     * 
     * @param minutes number
     * @author Nikola Gavric
     */
    updateAlert(minutes: number): Observable<RestResponse<any>> {
        return this._http.post(this.baseUrl+'/download', minutes)
            .map(UtilityService.handleSuccess)
            .catch(UtilityService.handleError);
    }

    /**
     * 
     * 
     * @param db string[]
     * @author Nikola Gavric
     */
    loadIntoDB(db: string[]): Observable<RestResponse<any>> {
        return this._http.post(this.baseUrl+'/insert', db)
            .map(UtilityService.handleSuccess)
            .catch(UtilityService.handleError);
    }

    /**
     * 
     * @author Nikola Gavric
     */
    dbStatus(): Observable<RestResponse<any>> {
        return this._http.get(this.baseUrl+'/insert/counter')
            .map(UtilityService.handleSuccess)
            .catch(UtilityService.handleError);
    }

    /**
     * 
     * 
     * @param arr string[]
     * @author Nikola Gavric
     */
    loadAll(arr: string[]): Observable<RestResponse<any>> {
        return this._http.post(this.baseUrl+'/all', arr)
            .map(UtilityService.handleSuccess)
            .catch(UtilityService.handleError);
    }

    /**
     * 
     */
    cancelSFTP(): Observable<RestResponse<any>> {
        return this._http.get(this.baseUrl+'/download/cancel')
        .map(UtilityService.handleSuccess)
        .catch(UtilityService.handleError);
    }

    /**
     * 
     */
    cancelModules(): Observable<RestResponse<any>> {
        return this._http.get(this.baseUrl+'/load/cancel')
        .map(UtilityService.handleSuccess)
        .catch(UtilityService.handleError);
    }

    /**
     * 
     */
    cancelDB(): Observable<RestResponse<any>> {
        return this._http.get(this.baseUrl+'/insert/cancel')
        .map(UtilityService.handleSuccess)
        .catch(UtilityService.handleError);
    }

    /**
     * 
     */
    cancelAll(): Observable<RestResponse<any>[]> {
        return Observable.forkJoin(
            this.cancelModules(),
            this.cancelDB(),
            this.cancelSFTP()
        );
    }

    /**
     * 
     */
    fireAlert(): Observable<RestResponse<any>> {
        return this._http.get(this.baseUrl+'/fireAlert')
        .map(UtilityService.handleSuccess)
        .catch(UtilityService.handleError);
    }
    
    /**
     * 
     */
    alertStatus(): Observable<RestResponse<any>> {
        return this._http.get(this.baseUrl+'/fireAlert/status')
        .map(UtilityService.handleSuccess)
        .catch(UtilityService.handleError);
    }

    /**
     * 
     * @param seconds number
     */
    private _startAlert(seconds: number): Observable<RestResponse<any>> {
        return this._http.get(this.baseUrl+'/fireAlert/start/'+seconds)
        .map(UtilityService.handleSuccess)
        .catch(UtilityService.handleError);
    }

    /**
     * 
     */
    private _stopAlert(): Observable<RestResponse<any>> {
        return this._http.get(this.baseUrl+'/fireAlert/stop')
        .map(UtilityService.handleSuccess)
        .catch(UtilityService.handleError);
    }

    /**
     * 
     * @param isScheduled boolean
     * @param seconds number
     */
    runAlert(isScheduled: boolean, seconds: number): Observable<RestResponse<any>> {
        return !isScheduled?this._startAlert(seconds):this._stopAlert();
    }

    /**
     * 
     */
    checkAll(): Observable<RestResponse<any>> {
        return this._http.get(this.baseUrl+'/all/counter')
        .map(UtilityService.handleSuccess)
        .catch(UtilityService.handleError);
    }

    /**
     * 
     */
    startScheduleTimer(date: Date, schedulers: string[]): Observable<RestResponse<any>> {
        let url = this._utilityService.generateUrlWithQueryParams(this.baseUrl + '/forecast/schedule/start', {
            min: date.getMinutes(),
            hour: date.getHours()
        });

        return this._utilityService.postRequest(url, schedulers);
    }
    
    /**
     * 
     */
    scheduleTimerStatus(): Observable<RestResponse<any>> {
        let url = this._utilityService.generateUrlWithQueryParams(this.baseUrl + '/forecast/schedule/status', {});

        return this._utilityService.getRequest(url);
    }

    /**
     * 
     */
    stopScheduleTimer(schedulers: string[]): Observable<RestResponse<any>> {
        let url = this._utilityService.generateUrlWithQueryParams(this.baseUrl + '/forecast/schedule/stop', {});

        return this._utilityService.postRequest(url, schedulers);
    }

    /**
     * 
     */
    nextScheduleTimer(): Observable<RestResponse<any>> {
        let url = this._utilityService.generateUrlWithQueryParams(this.baseUrl + '/forecast/schedule/next', {});

        return this._utilityService.getRequest(url);
    }

    /**
     * 
     */
    nextAlert(): Observable<RestResponse<any>> {
        let url = this._utilityService.generateUrlWithQueryParams(this.baseUrl + '/fireAlert/nextExecution', {});

        return this._utilityService.getRequest(url);
    }

    /**
     * 
     * @param status 
     */
    automaticallyFireAlert(status: boolean): Observable<RestResponse<any>> {
        let url = this._utilityService.generateUrlWithQueryParams(this.baseUrl + '/alerts', {
            fire: status
        });
        
        return this._utilityService.getRequest(url);
    }

    /**
     * 
     */
    loadSFTPHistoryDates(): Observable<RestResponse<any>> {
        return this._http.get(this.baseUrl+'/download/dates')
        .map(UtilityService.handleSuccess)
        .catch(UtilityService.handleError);
    }

    /**
     * 
     */
    loadDBHistoryDates(): Observable<RestResponse<any>> {
        return this._http.get(this.baseUrl+'/insert/dates')
        .map(UtilityService.handleSuccess)
        .catch(UtilityService.handleError);
    }

    /**
     * 
     */
    resetModulesProgress(modules: any): Observable<RestResponse<any>> {
        return this._http.post(this.baseUrl+'/load/counters/reset', modules)
        .map(UtilityService.handleSuccess)
        .catch(UtilityService.handleError);
    }

    /**
     * 
     */
    numberOfFilesOnDisc(): Observable<RestResponse<any>> {
        return this._http.get(this.baseUrl+'/download/files/count')
        .map(UtilityService.handleSuccess)
        .catch(UtilityService.handleError);
    }

    /**
     * 
     */
    refreshPageVars(): Observable<RestResponse<any>> {
        return this._http.get(this.baseUrl+'/monitor')
        .map(UtilityService.handleSuccess)
        .catch(UtilityService.handleError);
    }

    /**
     * 
     */
    connectPoints(): Observable<RestResponse<any>> {
        return this._http.post(this.baseUrl+'/locations/affiliation', {})
        .map(UtilityService.handleSuccess)
        .catch(UtilityService.handleError);
    }
}