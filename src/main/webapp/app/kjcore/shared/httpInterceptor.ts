import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { UtilityService } from "./services/utility.service";
import { AppService } from '../shared/services/app.service';
import { AuthService } from '../shared/services/auth.service';

import { RestResponse } from '../shared/models';

import { Constants } from '../constants';

import {
    RequestOptionsArgs,
    RequestOptions,
    ConnectionBackend,
    Http,
    Response,
    Headers
} from "@angular/http";


declare const jstz: any;
/**
 * Http interceptor extension of Angular's Http wrapper
 * @author Mario Petrovic
 */
@Injectable()
export class HttpInterceptor extends Http {

    /*--------- Constructor --------*/
    constructor(
        backend: ConnectionBackend,
        defaultOptions: RequestOptions,
        private _utilityService: UtilityService) {
        super(backend, defaultOptions);
    }

    /*--------- Http methods --------*/
    get(url: string, options?: RequestOptionsArgs): Observable<Response> {
        url = this._utilityService.encodeURIChar('#', url);
        let tempUrl: number = url.indexOf('/fe/');
        let tempGetTranslation = url.indexOf('translation/fe');
        let noAuthTranslation: number = url.indexOf('/fe/noAuth');
        let tempUrlChangeLang: number = url.indexOf('translation/language');

        url = this._utilityService.trimCharacter(url, '/', true, true);

        if (tempGetTranslation != -1) {
            let splittedUrl = url.split('/');
            url = splittedUrl.splice(0, splittedUrl.length - 1).join('/');
        }


        if (tempUrl == -1 && tempUrlChangeLang == -1) { //Get call for all except translation requests
            AppService.restQueue(true);
            return super.get(url, this.generateHeaders(true, true))
                .finally(this.finallyRestHandler)
                .do(this.successfulRestCallHandler,
                (err: Response) => {
                    return this.errorRestCallHandler(err);
                });

        } else if (noAuthTranslation != -1) {
            return super.get(url)
                .do(this.successfulRestCallHandler,
                (err: Response) => {
                    return this.errorRestCallHandler(err);
                });

        } else if (tempUrlChangeLang == -1) {
            return super.get(url, this.generateHeaders(true, false))
                .do(this.successfulRestCallHandler,
                (err: Response) => {
                    return this.errorRestCallHandler(err);
                });

        } else {
            return super.get(url, this.generateHeaders(true, true))
                .do(this.successfulRestCallHandler,
                (err: Response) => {
                    return this.errorRestCallHandler(err);
                })
        }
    }

    post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
        url = this._utilityService.encodeURIChar('#', url);
        let tempUrl: any = url.indexOf('authenticate');
        url = this._utilityService.trimCharacter(url, '/', true, true);

        AppService.restQueue(true);

        if (tempUrl == -1) {
            return super.post(url, body, this.generateHeaders(true, true, body))
                .finally(this.finallyRestHandler)
                .do(this.successfulRestCallHandler,
                (err: Response) => {
                    return this.errorRestCallHandler(err);
                });

        } else {
            return super.post(url, body, this.generateHeaders(false, true, body))
                .finally(this.finallyRestHandler)
                .do(this.successfulRestCallHandler,
                (err: Response) => {
                    return this.errorRestCallHandler(err);
                });
        }
    }

    delete(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
        url = this._utilityService.encodeURIChar('#', url);
        url = this._utilityService.trimCharacter(url, '/', true, true);
        AppService.restQueue(true);

        return super.delete(url, this.generateHeaders(true, true, body))
            .finally(this.finallyRestHandler)
            .do(this.successfulRestCallHandler,
            (err: Response) => {
                return this.errorRestCallHandler(err);
            });
    }

    put(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
        url = this._utilityService.encodeURIChar('#', url);
        url = this._utilityService.trimCharacter(url, '/', true, true);

        AppService.restQueue(true);
        return super.put(url, body, this.generateHeaders(true, true, body))
            .finally(this.finallyRestHandler)
            .do(this.successfulRestCallHandler,
            (err: Response) => {
                return this.errorRestCallHandler(err);
            });
    }

    /*--------- Utility methods --------*/

    /**
     * Generate request options with headers based on parameters passed
     * @author Mario Petrovic
     */
    generateHeaders(setAuthToken: boolean, setTimezone: boolean, body?: any): RequestOptions {
        let headers: Headers = new Headers();

        if (setAuthToken) {
            headers.append(Constants.TOKEN_STORED_NAME, this._utilityService.getToken());
        }

        if (setTimezone) {
            var tz = jstz.determine();
            headers.append('Client-TZ-Id', tz.name());
        }

        if (body && !body.append) {
            let contentType = 'application/json';
            headers.append('Content-Type', contentType);
        } else if (!body) {
            let contentType = 'application/json';
            headers.append('Content-Type', contentType);
        }

        return new RequestOptions({ headers: headers });
    }

    /**
     * Handler for case of successful rest call
     * @author Mario Petrovic
     */
    successfulRestCallHandler(res: Response) {
        return Observable;
    }

    /**
     * Handler for case of unsuccessful rest call
     * @author Mario Petrovic
     */
    errorRestCallHandler(err: Response) {
        this.handleErrorRequest(err, 'PUT', false, true);
        return Observable.throw(err);
    }

    /**
     * Handler for finally case which happens after every call
     * @author Mario Petrovic
     */
    finallyRestHandler() {
        AppService.restQueue(false);
    }

    /**
     * Method for handling request with error
     * @author Mario Petrovic
     */
    private handleErrorRequest(err: any, method: string, success: boolean, consoleLog: boolean): void {
        // if (consoleLog) {
        //     this._utilityService.restConsoleMessage(url, method, err.status, success, err);
        // }
        switch (err.status) {
            //Uauthorized
            case 401:
                if (err.json().errorCode != 'Err.Sec.3.2') { // Check if 401 has errorCode to differentiate wrong password check
                    err._body = new RestResponse();
                    AuthService.clearAuth();
                }
                break;

            // Forbidden
            case 403:
                AuthService.redirectUrl = '';
                AuthService.clearAuth();
                err._body = new RestResponse();
                break;

            // Not found
            case 404:
                err._body = new RestResponse();
                err._body.message = 'Not found';
                err._body.statusCode = 500;
                break;

            // No internet
            case 0:
                err._body = new RestResponse();
                err._body.message = 'No internet';
                err._body.statusCode = 500;
                break;
        }

    }
}