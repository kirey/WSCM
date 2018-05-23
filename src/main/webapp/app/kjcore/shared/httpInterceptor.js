"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var Rx_1 = require('rxjs/Rx');
var utility_service_1 = require("./services/utility.service");
var app_service_1 = require('../shared/services/app.service');
var auth_service_1 = require('../shared/services/auth.service');
var models_1 = require('../shared/models');
var constants_1 = require('../constants');
var http_1 = require("@angular/http");
/**
 * Http interceptor extension of Angular's Http wrapper
 * @author Mario Petrovic
 */
var HttpInterceptor = (function (_super) {
    __extends(HttpInterceptor, _super);
    /*--------- Constructor --------*/
    function HttpInterceptor(backend, defaultOptions, _utilityService) {
        _super.call(this, backend, defaultOptions);
        this._utilityService = _utilityService;
    }
    /*--------- Http methods --------*/
    HttpInterceptor.prototype.get = function (url, options) {
        var _this = this;
        url = this._utilityService.encodeURIChar('#', url);
        var tempUrl = url.indexOf('/fe/');
        var tempGetTranslation = url.indexOf('translation/fe');
        var noAuthTranslation = url.indexOf('/fe/noAuth');
        var tempUrlChangeLang = url.indexOf('translation/language');
        url = this._utilityService.trimCharacter(url, '/', true, true);
        if (tempGetTranslation != -1) {
            var splittedUrl = url.split('/');
            url = splittedUrl.splice(0, splittedUrl.length - 1).join('/');
        }
        if (tempUrl == -1 && tempUrlChangeLang == -1) {
            app_service_1.AppService.restQueue(true);
            return _super.prototype.get.call(this, url, this.generateHeaders(true, true))
                .finally(this.finallyRestHandler)
                .do(this.successfulRestCallHandler, function (err) {
                return _this.errorRestCallHandler(err);
            });
        }
        else if (noAuthTranslation != -1) {
            return _super.prototype.get.call(this, url)
                .do(this.successfulRestCallHandler, function (err) {
                return _this.errorRestCallHandler(err);
            });
        }
        else if (tempUrlChangeLang == -1) {
            return _super.prototype.get.call(this, url, this.generateHeaders(true, false))
                .do(this.successfulRestCallHandler, function (err) {
                return _this.errorRestCallHandler(err);
            });
        }
        else {
            return _super.prototype.get.call(this, url, this.generateHeaders(true, true))
                .do(this.successfulRestCallHandler, function (err) {
                return _this.errorRestCallHandler(err);
            });
        }
    };
    HttpInterceptor.prototype.post = function (url, body, options) {
        var _this = this;
        url = this._utilityService.encodeURIChar('#', url);
        var tempUrl = url.indexOf('authenticate');
        url = this._utilityService.trimCharacter(url, '/', true, true);
        app_service_1.AppService.restQueue(true);
        if (tempUrl == -1) {
            return _super.prototype.post.call(this, url, body, this.generateHeaders(true, true, body))
                .finally(this.finallyRestHandler)
                .do(this.successfulRestCallHandler, function (err) {
                return _this.errorRestCallHandler(err);
            });
        }
        else {
            return _super.prototype.post.call(this, url, body, this.generateHeaders(false, true, body))
                .finally(this.finallyRestHandler)
                .do(this.successfulRestCallHandler, function (err) {
                return _this.errorRestCallHandler(err);
            });
        }
    };
    HttpInterceptor.prototype.delete = function (url, body, options) {
        var _this = this;
        url = this._utilityService.encodeURIChar('#', url);
        url = this._utilityService.trimCharacter(url, '/', true, true);
        app_service_1.AppService.restQueue(true);
        return _super.prototype.delete.call(this, url, this.generateHeaders(true, true, body))
            .finally(this.finallyRestHandler)
            .do(this.successfulRestCallHandler, function (err) {
            return _this.errorRestCallHandler(err);
        });
    };
    HttpInterceptor.prototype.put = function (url, body, options) {
        var _this = this;
        url = this._utilityService.encodeURIChar('#', url);
        url = this._utilityService.trimCharacter(url, '/', true, true);
        app_service_1.AppService.restQueue(true);
        return _super.prototype.put.call(this, url, body, this.generateHeaders(true, true, body))
            .finally(this.finallyRestHandler)
            .do(this.successfulRestCallHandler, function (err) {
            return _this.errorRestCallHandler(err);
        });
    };
    /*--------- Utility methods --------*/
    /**
     * Generate request options with headers based on parameters passed
     * @author Mario Petrovic
     */
    HttpInterceptor.prototype.generateHeaders = function (setAuthToken, setTimezone, body) {
        var headers = new http_1.Headers();
        if (setAuthToken) {
            headers.append(constants_1.Constants.TOKEN_STORED_NAME, this._utilityService.getToken());
        }
        if (setTimezone) {
            var tz = jstz.determine();
            headers.append('Client-TZ-Id', tz.name());
        }
        if (body && !body.append) {
            var contentType = 'application/json';
            headers.append('Content-Type', contentType);
        }
        else if (!body) {
            var contentType = 'application/json';
            headers.append('Content-Type', contentType);
        }
        return new http_1.RequestOptions({ headers: headers });
    };
    /**
     * Handler for case of successful rest call
     * @author Mario Petrovic
     */
    HttpInterceptor.prototype.successfulRestCallHandler = function (res) {
        return Rx_1.Observable;
    };
    /**
     * Handler for case of unsuccessful rest call
     * @author Mario Petrovic
     */
    HttpInterceptor.prototype.errorRestCallHandler = function (err) {
        this.handleErrorRequest(err, 'PUT', false, true);
        return Rx_1.Observable.throw(err);
    };
    /**
     * Handler for finally case which happens after every call
     * @author Mario Petrovic
     */
    HttpInterceptor.prototype.finallyRestHandler = function () {
        app_service_1.AppService.restQueue(false);
    };
    /**
     * Method for handling request with error
     * @author Mario Petrovic
     */
    HttpInterceptor.prototype.handleErrorRequest = function (err, method, success, consoleLog) {
        // if (consoleLog) {
        //     this._utilityService.restConsoleMessage(url, method, err.status, success, err);
        // }
        switch (err.status) {
            //Uauthorized
            case 401:
                if (err.json().errorCode != 'Err.Sec.3.2') {
                    err._body = new models_1.RestResponse();
                    auth_service_1.AuthService.clearAuth();
                }
                break;
            // Forbidden
            case 403:
                auth_service_1.AuthService.redirectUrl = '';
                auth_service_1.AuthService.clearAuth();
                err._body = new models_1.RestResponse();
                break;
            // Not found
            case 404:
                err._body = new models_1.RestResponse();
                err._body.message = 'Not found';
                err._body.statusCode = 500;
                break;
            // No internet
            case 0:
                err._body = new models_1.RestResponse();
                err._body.message = 'No internet';
                err._body.statusCode = 500;
                break;
        }
    };
    HttpInterceptor = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.ConnectionBackend, http_1.RequestOptions, utility_service_1.UtilityService])
    ], HttpInterceptor);
    return HttpInterceptor;
}(http_1.Http));
exports.HttpInterceptor = HttpInterceptor;
//# sourceMappingURL=httpInterceptor.js.map