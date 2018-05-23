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
var http_1 = require('@angular/http');
var forms_1 = require('@angular/forms');
var utility_service_1 = require('../shared/services/utility.service');
var ErrorLogService = (function () {
    function ErrorLogService(_http, _formBuilder) {
        this._http = _http;
        this._formBuilder = _formBuilder;
        this.baseUrl = 'rest/errors/';
        this.errorLogForm = this._formBuilder.group({
            filterDateFrom: new forms_1.FormControl(null, []),
            filterDateTo: new forms_1.FormControl(null, []),
            filterErrorName: new forms_1.FormControl(null, []),
            filterUsername: new forms_1.FormControl(null, []),
            filterProcessType: new forms_1.FormControl(null, [])
        });
        this.logs = [];
        this.pageRow = { first: 0, rows: 10 };
    }
    /**
     * Rest call for getting log trace by id
     * @author Stefan Svrkota
     */
    ErrorLogService.prototype.getLogByIdRest = function (id) {
        return this._http.get(this.baseUrl + 'traces/' + id)
            .map(function (res) { return res.json(); })
            .catch(utility_service_1.UtilityService.handleError);
    };
    /**
     * Rest call for causing exception on backend and storing it into DB
     * @author Stefan Svrkota
     */
    ErrorLogService.prototype.causeExceptionRest = function () {
        return this._http.get('rest/tests/exceptions')
            .map(function (res) { return res.json(); })
            .catch(utility_service_1.UtilityService.handleError);
    };
    /**
     * Rest get all comboboxes
     * @author Stefan Svrkota
     */
    ErrorLogService.prototype.getLogsInitRest = function () {
        return this._http.get(this.baseUrl + 'populateFilters')
            .map(function (res) { return res.json(); })
            .catch(utility_service_1.UtilityService.handleError);
    };
    /**
     * Rest get filtered logs
     * @author Stefan Svrkota
     */
    ErrorLogService.prototype.getFilteredLogsRest = function (filter) {
        var encodedFilter = encodeURI(JSON.stringify(filter));
        return this._http.get(this.baseUrl + 'logs?filterMap=' + encodedFilter)
            .map(function (res) { return res.json(); })
            .catch(utility_service_1.UtilityService.handleError);
    };
    ErrorLogService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, forms_1.FormBuilder])
    ], ErrorLogService);
    return ErrorLogService;
}());
exports.ErrorLogService = ErrorLogService;
//# sourceMappingURL=errorLog.service.js.map