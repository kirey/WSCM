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
var common_1 = require('@angular/common');
var router_1 = require('@angular/router');
var app_service_1 = require('../../kjcore/shared/services/app.service');
var utility_service_1 = require('../../kjcore/shared/services/utility.service');
var ng2_translate_1 = require('ng2-translate');
var primeng_1 = require('primeng/primeng');
var models_1 = require('../../kjcore/shared/models');
var kjgri_history_service_1 = require('./kjgri.history.service');
var kjgri_constants_1 = require("../kjgri.constants");
var kjgri_control_panel_service_1 = require('../kjgri_shared/kjgri.control_panel.service');
var KJGriHistoryCmp = (function () {
    /*--------- Constructor --------*/
    function KJGriHistoryCmp(_utilityService, _changeDetectionRef, _appService, _historyService, _cpShared, _constants, _translateService, _datepipe, route, router) {
        this._utilityService = _utilityService;
        this._changeDetectionRef = _changeDetectionRef;
        this._appService = _appService;
        this._historyService = _historyService;
        this._cpShared = _cpShared;
        this._constants = _constants;
        this._translateService = _translateService;
        this._datepipe = _datepipe;
        this.route = route;
        this.router = router;
        this.chartColumns = [];
    }
    Object.defineProperty(KJGriHistoryCmp.prototype, "currentModule", {
        /**
         *
         * @author Nikola Gavric
         */
        get: function () {
            var _this = this;
            return this.modules.filter(function (singleModule) {
                return singleModule.moduleName == _this.selectedModule;
            })[0];
        },
        enumerable: true,
        configurable: true
    });
    /**
     *
     * @param event
     * @author Nikola Gavric
     */
    KJGriHistoryCmp.prototype.onSubtypeSelected = function (event) {
        this.selectedSubrisk = event;
        if (this.currentModule.moduleName == 'risk')
            this._loadRiskIndexes();
        if (this.currentModule.moduleName == 'forecast')
            this._loadForecasts();
    };
    /**
     *
     * @author Nikola Gavric
     */
    KJGriHistoryCmp.prototype.clientCompanyChanged = function () {
        if (this.selectedClientCompany) {
            this._loadClientLocations();
            this._clearAll();
        }
    };
    /**
     *
     * @author Nikola Gavric
     */
    KJGriHistoryCmp.prototype.clientCompanyLocationChanged = function () {
        this._clearHistoryTable();
    };
    /**
     * Loading all necessary stuff
     * @author Nikola Gavric
     */
    KJGriHistoryCmp.prototype.loadData = function () {
        if (this._appService.isAuthorised([kjgri_constants_1.KJGriConstants.ROLES.PLATINUM_I, kjgri_constants_1.KJGriConstants.ROLES.GOLD_I, kjgri_constants_1.KJGriConstants.ROLES.SILVER_I])) {
            this._loadClientLocations(this._locationsCallback.bind(this));
        }
        else {
            this._loadClientCompanies(this._companiesCallback.bind(this));
        }
    };
    /**
     *
     * @param moduleName
     * @author Nikola Gavric
     */
    KJGriHistoryCmp.prototype._getModule = function (moduleName) {
        return this.modules.filter(function (obj) { return obj.moduleName == moduleName; })[0];
    };
    /**
     *
     * @author Nikola Gavric
     */
    KJGriHistoryCmp.prototype._loadRisks = function () {
        var _this = this;
        this.subscriptions['_loadRisks'] = this._historyService.getAllRisks().subscribe(function (res) {
            _this.risks = res.data;
        }, function (err) {
            console.log(err);
        });
    };
    /**
     *
     * @author Nikola Gavric
     */
    KJGriHistoryCmp.prototype._loadStyles = function (selectedModule, data, historyModule) {
        var _this = this;
        this.subscriptions['_loadStyles'] = this._historyService.getAllStyles(selectedModule[0]).subscribe(function (res) {
            _this.styles = res.data;
            _this._buildIndexesTable(data, historyModule);
        }, function (err) {
            console.log(err);
        });
    };
    /**
     *
     * @author Nikola Gavric
     */
    KJGriHistoryCmp.prototype._loadClientCompanies = function (callback) {
        var _this = this;
        this.subscriptions['_loadClientCompanies'] = this._historyService.getClientCompanies().subscribe(function (res) {
            _this.clientCompanies = res.data;
            if (callback)
                callback(_this.clientCompanies);
        }, function (err) {
            console.log(err);
        });
    };
    /**
     *
     * @author Nikola Gavric
     */
    KJGriHistoryCmp.prototype._loadClientLocations = function (callback) {
        var _this = this;
        this.subscriptions['_loadClientLocations'] = this._historyService.getCompanyLocations(this.selectedClientCompany).subscribe(function (res) {
            _this.companyLocations = res.data;
            if (callback)
                callback(_this.companyLocations);
        }, function (err) {
            console.log(err);
        });
    };
    /**
     *
     * @param value
     * @author Nikola Gavric
     */
    KJGriHistoryCmp.prototype.typeOf = function (value) {
        return typeof value;
    };
    /**
     *
     * @param object
     * @param modal
     * @author Nikola Gavric
     */
    KJGriHistoryCmp.prototype.preview = function (object, modal) {
        if (this.currentModule.moduleName == 'pdf')
            this._previewPDF(object.id);
        if (this.currentModule.moduleName == 'alert')
            this.showModal(modal, object);
    };
    /**
     *
     * @param currValue
     * @param dateTo
     * @author Nikola Gavric
     */
    KJGriHistoryCmp.prototype.onDateFromChange = function (currValue) {
        if (currValue && this.toDate) {
            if (currValue.getTime() > this.toDate.getTime()) {
                this.toDate = null;
            }
        }
    };
    /**
     *
     * @param moduleName
     * @author Nikola Gavric
     */
    KJGriHistoryCmp.prototype.getHistoryFor = function (moduleName, dateFrom, dateTo) {
        this.selectedModule = moduleName;
        this.histories = null;
        this._appService.refreshEmitters(this.subscriptions);
        switch (this.selectedModule) {
            case "pdf":
                this._loadPDFs(dateFrom, dateTo);
                break;
            case "risk":
                this._loadRiskIndexes(dateFrom, dateTo);
                break;
            case "forecast":
                this._loadForecasts(dateFrom, dateTo);
                break;
            case "alert":
                this._loadAlerts(dateFrom, dateTo);
                break;
        }
    };
    /**
     *
     * @param dateFrom
     * @param dateTo
     * @author Nikola Gavric
     */
    KJGriHistoryCmp.prototype._loadForecasts = function (dateFrom, dateTo) {
        var _this = this;
        this.subscriptions['_loadForecasts'] = this._historyService.getForecast(this.selectedCompanyLocation.id, dateFrom, dateTo).subscribe(function (res) {
            _this._loadStyles(_this.selectedModule, res.data, 'forecast');
        }, function (err) {
            console.log(err);
        });
    };
    /**
     *
     * @param dateFrom
     * @param dateTo
     * @author Nikola Gavric
     */
    KJGriHistoryCmp.prototype._loadRiskIndexes = function (dateFrom, dateTo) {
        var _this = this;
        this.subscriptions['_loadRiskIndexes'] = this._historyService.getRiskIndexes(this.selectedCompanyLocation.id, dateFrom, dateTo).subscribe(function (res) {
            _this._loadStyles(_this.selectedModule, res.data, 'risk');
        }, function (err) {
            console.log(err);
        });
    };
    /**
     *
     * @param data
     * @author Nikola Gavric
     */
    KJGriHistoryCmp.prototype._buildIndexesTable = function (data, moduleName) {
        var _this = this;
        var mod = this._getModule(moduleName);
        mod.columns = [];
        //Populate columns
        for (var dateKey in data) {
            mod.columns.push(function (object) {
                var val;
                if (object) {
                    val = new Date(object.dateKey.value);
                    if (_this.currentModule.moduleName == 'risk') {
                        val = _this._datepipe.transform(val, 'y');
                    }
                    else {
                        val = _this._datepipe.transform(val, 'd MMM y HH:mm:ss');
                    }
                }
                return { value: val, header: 'fe.history.dateKey', column: 'dateKey' };
            });
            //Sorting Wind, Ice, and other subtypes
            data[dateKey].sort(function (a, b) {
                return a.dicRiskSubtypes.name.localeCompare(b.dicRiskSubtypes.name);
            });
            data[dateKey].forEach(function (riskIndex) {
                mod.columns.push(function (object) {
                    var val;
                    if (object) {
                        val = object[riskIndex.dicRiskSubtypes.code].value != -1 ? parseInt(object[riskIndex.dicRiskSubtypes.code].value) : 'N/A';
                    }
                    return { value: val, header: 'fe.history.' + riskIndex.dicRiskSubtypes.code, column: riskIndex.dicRiskSubtypes.code };
                });
            });
            break;
        }
        //Populate history table with data
        var temp = [];
        var chart = [];
        var _loop_1 = function(dateKey) {
            var tempObj = {
                dateKey: { value: dateKey }
            };
            data[dateKey].forEach(function (obj) {
                tempObj[obj.dicRiskSubtypes.code] = {};
                _this.styles.some(function (style) {
                    //If global check numericValue instead of indexValue and this only applies for risks
                    if (obj.dicRiskSubtypes.code == 'GL' && obj.numericValue == style.indexValue && moduleName == 'risk') {
                        tempObj[obj.dicRiskSubtypes.code]['fill'] = style.fill;
                        return true;
                    }
                    if ((obj.value !== undefined && obj.value >= style.riskIndexMin && obj.value < style.riskIndexMax) ||
                        (obj.indexValue !== undefined && obj.indexValue == style.indexValue)) {
                        tempObj[obj.dicRiskSubtypes.code]['fill'] = style.fill;
                        return true;
                    }
                });
                tempObj['dicRiskSubtypes'] = obj.dicRiskSubtypes;
                tempObj[obj.dicRiskSubtypes.code]['value'] = obj.value !== undefined ? parseInt(obj.value) : parseInt(obj.indexValue);
                tempObj[obj.dicRiskSubtypes.code]['numericValue'] = obj.numericValue !== undefined ? parseInt(obj.numericValue) : parseInt(obj.value);
            });
            temp.push(tempObj);
        };
        for (var dateKey in data) {
            _loop_1(dateKey);
        }
        temp.sort(function (a, b) {
            var firstDate = (new Date(b.dateKey.value));
            var secondDate = (new Date(a.dateKey.value));
            if (firstDate > secondDate)
                return -1;
            if (firstDate < secondDate)
                return 1;
            return 0;
        });
        this.histories = temp;
        for (var dateKey in this.histories) {
            var subrisks = this.histories[dateKey];
            for (var objKey in subrisks) {
                var obj = subrisks[objKey];
                if (objKey != 'dateKey') {
                    if (!chart[objKey]) {
                        chart[objKey] = [];
                        chart[objKey]['data'] = [];
                        chart[objKey]['fill'] = false;
                        chart[objKey]['borderColor'] = this._randomColor();
                    }
                    chart[objKey]['data'].push(obj.numericValue);
                }
            }
        }
        this.currentChartData = chart;
    };
    /**
     *
     * @param dateFrom
     * @param dateTo
     * @author Nikola Gavric
     */
    KJGriHistoryCmp.prototype._loadAlerts = function (dateFrom, dateTo) {
        var _this = this;
        this.subscriptions['_loadAlerts'] = this._historyService.getCompanyAlerts(this.selectedCompanyLocation, dateFrom, dateTo).subscribe(function (res) {
            _this.histories = res.data;
        }, function (err) {
            console.log(err);
        });
    };
    /**
     *
     * @param dateFrom
     * @param dateTo
     * @author Nikola Gavric
     */
    KJGriHistoryCmp.prototype._loadPDFs = function (dateFrom, dateTo) {
        var _this = this;
        this.subscriptions['_loadPDFs'] = this._historyService.getPDFs(this.selectedCompanyLocation.id, dateFrom, dateTo).subscribe(function (res) {
            _this.histories = res.data;
        }, function (err) {
            console.log(err);
        });
    };
    /**
     *
     * @param id
     * @author Nikola Gavric
     */
    KJGriHistoryCmp.prototype._previewPDF = function (id) {
        var _this = this;
        this.subscriptions['_previewPDF'] = this._historyService.previewObject(id, 'pdf').subscribe(function (res) {
            var blob = _this._appService.convertBase64ToBlob(res.data, 'application/pdf');
            var fileURL = URL.createObjectURL(blob);
            // If site settings has popups blocked, this variable will be null, thus try/catch is required
            var newWindowState = window.open(fileURL);
            setTimeout(function () {
                try {
                    if (newWindowState.closed) {
                        _this._utilityService.setAlert(_this.componentAlert, _this._translateService.instant('fe.history.popupBlockerPresent'), 400);
                    }
                    else {
                        _this._utilityService.setAlert(_this.componentAlert, res.message, 200);
                    }
                }
                catch (e) {
                    _this._utilityService.setAlert(_this.componentAlert, _this._translateService.instant('fe.history.popupBlockerPresent'), 400);
                }
            }, 700);
        }, function (err) {
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode, err.errors);
        });
    };
    /**
     *
     * @author Nikola Gavric
     */
    KJGriHistoryCmp.prototype._clearAll = function () {
        this.selectedCompanyLocation = null;
        this._clearHistoryTable();
    };
    /**
     *
     * @author Nikola Gavric
     */
    KJGriHistoryCmp.prototype._clearHistoryTable = function () {
        this.selectedModule = null;
        this.histories = null;
        this.risks = null;
        this.selectedSubrisk = null;
    };
    /**
     *
     * @param data
     * @author Nikola Gavric
     */
    KJGriHistoryCmp.prototype._constructPreviewModel = function (data) {
        var _this = this;
        var values, names;
        /** Alert */
        if (this.currentModule.moduleName == 'alert') {
            names = ['Date sent', 'Full name', 'Subtype name', 'Index Value', 'Forecast Target Timestamp', 'Message title', 'Message body', 'Message text'];
            values = [
                function (object) {
                    var val;
                    if (object) {
                        val = new Date(object.sentTimestamp);
                        val = _this._datepipe.transform(val, 'd MMM y HH:mm:ss');
                    }
                    return val;
                },
                function (object) {
                    var val;
                    if (object) {
                        val = object.kjcUserAccounts.firstName + ' ' + object.kjcUserAccounts.lastName;
                    }
                    return val;
                },
                'alerts.dicRiskSubtypes.name',
                'forecastIndexValue',
                function (object) {
                    var val;
                    if (object) {
                        val = new Date(object.forecastTargetTimestamp);
                        val = _this._datepipe.transform(val, 'd MMM y HH:mm:ss');
                    }
                    return val;
                },
                'messageTitle',
                'messageBody',
                'messageText'
            ];
        }
        /** Html create */
        if (names && values) {
            var html_1 = "";
            values.forEach(function (row, index) {
                var type = _this.typeOf(row);
                var isString = type === 'string';
                var isFunction = type === 'function';
                var newObj;
                if (isString) {
                    row = row;
                    var dots = row.split('.');
                    if (dots.length > 1) {
                        dots.forEach(function (dot, index) {
                            if (index == 0)
                                newObj = data[dot];
                            else
                                newObj = newObj[dot];
                        });
                    }
                    else {
                        newObj = data[row];
                    }
                }
                else {
                    newObj = row(data);
                }
                html_1 += "<div class='row'>\n                            <div class='col-md-12'>\n                                <p><strong>" + names[index] + ":</strong> " + newObj + "</p>\n                            </div>\n                        </div>";
            });
            this.previewModel = html_1;
        }
    };
    /**
     * Show modal based on passed modal directive and custom behaviour based on data
     * @author Nikola Gavric
     */
    KJGriHistoryCmp.prototype.showModal = function (modal, data, modalName) {
        this._utilityService.setAlert(this.componentAlert);
        if (modalName && modalName == 'chart') {
            this.chartData = null;
            this.chartColumns = [];
            this.updateChartData(null);
        }
        if (data)
            this._constructPreviewModel(data);
        modal.show();
    };
    /**
     * Hide modal based on passed modal directive
     * @author Nikola Gavric
     */
    KJGriHistoryCmp.prototype.hideModal = function (modal) {
        modal.hide();
    };
    /**
     *
     * @param object
     * @author Nikola Gavric
     */
    KJGriHistoryCmp.prototype.styleClasses = function (object) {
        var classes = {
            display: 'table-cell',
            width: '100%',
            height: '79px',
            'vertical-align': 'middle'
        };
        if (object) {
            if (this.typeOf(object) === 'object') {
                if (object.hasOwnProperty('fill')) {
                    classes['background-color'] = object.fill;
                    classes['color'] = '#333';
                }
            }
        }
        return classes;
    };
    /**
     *
     * @param hex
     * @author Nikola Gavric
     */
    KJGriHistoryCmp.prototype.hexToRgbA = function (hex, opacity) {
        if (opacity === void 0) { opacity = 1; }
        if (hex) {
            var c = void 0;
            if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
                c = hex.substring(1).split('');
                if (c.length == 3) {
                    c = [c[0], c[0], c[1], c[1], c[2], c[2]];
                }
                c = '0x' + c.join('');
                return 'rgba(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + ', ' + opacity + ')';
            }
            throw new Error('Bad Hex');
        }
    };
    /**
     *
     * @param event
     * @author Nikola Gavric
     */
    KJGriHistoryCmp.prototype.updateChartData = function (event) {
        var temp = [];
        temp['labels'] = [];
        temp['datasets'] = [];
        // this.chartData = null;
        // this._changeDetectionRef.detectChanges();
        //Labels
        for (var _i = 0, _a = this.histories; _i < _a.length; _i++) {
            var obj = _a[_i];
            if (obj) {
                var dateObject = new Date(obj.dateKey.value);
                var dateString = obj.dateKey.value;
                //If it's risk show only year as a label
                if (this.selectedModule != 'risk') {
                    dateString = this._datepipe.transform(dateObject, 'dd-MM-yyyy HH:mm:ss');
                }
                else {
                    dateString = this._datepipe.transform(dateObject, 'y');
                }
                temp['labels'].push(dateString);
            }
        }
        //Graph data
        for (var i = 0; i < this.chartColumns.length; i++) {
            var obj = this.chartColumns[i];
            if (this.currentChartData[obj]) {
                var elem = {
                    label: obj,
                    data: this.currentChartData[obj]['data'],
                    fill: this.currentChartData[obj]['fill'],
                    borderColor: this.currentChartData[obj]['borderColor']
                };
                if (temp['datasets'].length == 0) {
                    temp['datasets'].push(elem);
                }
                else {
                    var found = false;
                    for (var _b = 0, _c = temp['datasets']; _b < _c.length; _b++) {
                        var dataset = _c[_b];
                        if (dataset.label == obj) {
                            dataset.data.push(this.currentChartData[obj]['data']);
                            found = true;
                            break;
                        }
                    }
                    if (!found) {
                        temp['datasets'].push(elem);
                    }
                }
            }
        }
        this.chartData = temp;
        this._changeDetectionRef.detectChanges();
        this.chart.refresh();
    };
    /**
     * @author Nikola Gavric
     */
    KJGriHistoryCmp.prototype._randomColor = function () {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };
    /**
     *
     * @param locations
     * @author Nikola Gavric
     */
    KJGriHistoryCmp.prototype._locationsCallback = function (locations) {
        var _this = this;
        this.subscriptions['routeParams'] = this.route.params.subscribe(function (params) {
            var companyId = +params['companyId']; // (+) converts string 'id' to a number
            var locationId = +params['locationId'];
            if (!isNaN(locationId)) {
                if (locationId < 0) {
                    _this.router.navigate(['/home']);
                }
                //Impreza
                if (_this._appService.isAuthorised([_this._constants.getROLES().PLATINUM_I, _this._constants.getROLES().GOLD_I, _this._constants.getROLES().SILVER_I])) {
                    var found = false;
                    for (var _i = 0, locations_1 = locations; _i < locations_1.length; _i++) {
                        var location_1 = locations_1[_i];
                        if (location_1.id == locationId) {
                            _this.selectedCompanyLocation = location_1;
                            found = true;
                            break;
                        }
                    }
                    if (!found)
                        _this.router.navigate(['/home']);
                }
            }
        });
    };
    /**
     *
     * @param companies
     */
    KJGriHistoryCmp.prototype._companiesCallback = function (companies) {
        var _this = this;
        this.subscriptions['routeParams'] = this.route.params.subscribe(function (params) {
            var companyId = +params['companyId']; // (+) converts string 'id' to a number
            var locationId = +params['locationId'];
            if (!isNaN(companyId) && !isNaN(locationId)) {
                if (companyId < 0 || locationId < 0) {
                    _this.router.navigate(['/home']);
                }
                //Assicurativo
                if (_this._appService.isAuthorised([_this._constants.getROLES().PLATINUM_A, _this._constants.getROLES().SUPER_ADMIN])) {
                    var found_1 = false;
                    for (var _i = 0, companies_1 = companies; _i < companies_1.length; _i++) {
                        var company = companies_1[_i];
                        if (company.id == companyId) {
                            _this.selectedClientCompany = company;
                            found_1 = true;
                            break;
                        }
                    }
                    if (!found_1)
                        _this.router.navigate(['/home']);
                    _this._loadClientLocations(function (locations) {
                        if (!isNaN(locationId)) {
                            found_1 = false;
                            for (var _i = 0, locations_2 = locations; _i < locations_2.length; _i++) {
                                var location_2 = locations_2[_i];
                                if (location_2.id == locationId) {
                                    _this.selectedCompanyLocation = location_2;
                                    found_1 = true;
                                    break;
                                }
                            }
                            if (!found_1)
                                _this.router.navigate(['/home']);
                        }
                    });
                }
            }
        });
    };
    /*--------- NG On Init ---------*/
    KJGriHistoryCmp.prototype.ngOnInit = function () {
        var _this = this;
        // Initital method to be executed when page loads
        this._appService.pageLoaded('', this);
        this.subscriptions = [];
        this.componentAlert = new models_1.Alert(null, true);
        this.modules = [
            {
                moduleName: 'pdf',
                columns: [
                    // 'id',
                    function (object) {
                        var val;
                        if (object) {
                            val = new Date(object.tsInsert);
                            val = _this._datepipe.transform(val, 'd MMM y HH:mm:ss');
                        }
                        return { value: val, header: 'fe.history.createdDate', column: 'tsInsert' };
                    },
                ],
                plural: 'fe.history.pdfColumn'
            },
            {
                moduleName: 'risk',
                columns: [],
                plural: 'fe.history.risksColumn'
            },
            {
                moduleName: 'forecast',
                columns: [
                    'id',
                    function (object) {
                        var val;
                        if (object) {
                            val = new Date(object.dataMeasurementTimestamp);
                            val = _this._datepipe.transform(val, 'd MMM y HH:mm:ss');
                        }
                        return { value: val, header: 'fe.history.measurementDate', column: 'dataMeasurementTimestamp' };
                    },
                    function (object) {
                        var val;
                        if (object) {
                            val = new Date(object.targetTimestamp);
                            val = _this._datepipe.transform(val, 'd MMM y HH:mm:ss');
                        }
                        return { value: val, header: 'fe.history.targetDate', column: 'targetTimestamp' };
                    },
                    'value'
                ],
                plural: 'fe.history.forecastsColumn'
            },
            {
                moduleName: 'alert',
                columns: [
                    function (object) {
                        var val;
                        if (object) {
                            val = new Date(object.sentTimestamp);
                            val = _this._datepipe.transform(val, 'd MMM y HH:mm:ss');
                        }
                        return { value: val, header: 'fe.history.dateSent', column: 'sentTimestamp' };
                    },
                    function (object) {
                        var val;
                        if (object) {
                            val = object.kjcUserAccounts.firstName + ' ' + object.kjcUserAccounts.lastName;
                        }
                        return { value: val, header: 'fe.history.userName', column: 'kjcUserAccounts.firstName' };
                    },
                    function (object) {
                        var val;
                        if (object) {
                            val = object.forecastIndexValue;
                        }
                        return { value: val, header: 'fe.history.forecastIndexValue', column: 'forecastIndexValue' };
                    },
                    function (object) {
                        var val;
                        if (object) {
                            val = new Date(object.forecastTargetTimestamp);
                            val = _this._datepipe.transform(val, 'd MMM y HH:mm:ss');
                        }
                        return { value: val, header: 'fe.history.forecastTargetTimestamp', column: 'forecastTargetTimestamp' };
                    },
                    function (object) {
                        var val;
                        if (object) {
                            val = object.alerts.dicRiskSubtypes.name;
                        }
                        return { value: val, header: 'fe.history.subtypeName', column: 'alerts.dicRiskSubtypes.name' };
                    },
                    function (object) {
                        var val;
                        if (object) {
                            val = object.messageTitle;
                        }
                        return { value: val, header: 'fe.history.messageTitle', column: 'messageTitle' };
                    }
                ],
                plural: 'fe.history.alertsColumn',
            }
        ];
        this.companyLocations = [];
        //Setting initial submit value
        this.today = new Date();
        //this.today.setDate(this.today.getDate() + 2);
        //Loading view data
        this.loadData();
        this._appService.languageChangeForComponent(this);
    };
    KJGriHistoryCmp.prototype.ngOnDestroy = function () {
        this._appService.refreshEmitters(this.subscriptions);
    };
    __decorate([
        core_1.ViewChild('chart'), 
        __metadata('design:type', primeng_1.UIChart)
    ], KJGriHistoryCmp.prototype, "chart", void 0);
    KJGriHistoryCmp = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'kjgri.history.cmp.html',
            encapsulation: core_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [utility_service_1.UtilityService, core_1.ChangeDetectorRef, app_service_1.AppService, kjgri_history_service_1.KJGriHistoryService, kjgri_control_panel_service_1.ControlPanelSharedService, kjgri_constants_1.KJGriConstants, ng2_translate_1.TranslateService, common_1.DatePipe, router_1.ActivatedRoute, router_1.Router])
    ], KJGriHistoryCmp);
    return KJGriHistoryCmp;
}());
exports.KJGriHistoryCmp = KJGriHistoryCmp;
//# sourceMappingURL=kjgri.history.cmp.js.map