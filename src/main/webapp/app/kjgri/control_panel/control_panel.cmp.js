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
var forms_1 = require('@angular/forms');
var ng2_translate_1 = require('ng2-translate');
var ng2_bootstrap_1 = require('ng2-bootstrap');
var control_panel_service_1 = require('./control_panel.service');
var utility_service_1 = require('../../kjcore/shared/services/utility.service');
var app_service_1 = require('../../kjcore/shared/services/app.service');
var kjgri_control_panel_service_1 = require('./../kjgri_shared/kjgri.control_panel.service');
var models_1 = require('../../kjcore/shared/models');
var Observable_1 = require('rxjs/Observable');
var ControlPanelCmp = (function () {
    /*--------- Constructor ---------*/
    function ControlPanelCmp(_utilityService, _cpService, _appService, _translateService, _formBuilder, _cpShared, _changeDetector) {
        this._utilityService = _utilityService;
        this._cpService = _cpService;
        this._appService = _appService;
        this._translateService = _translateService;
        this._formBuilder = _formBuilder;
        this._cpShared = _cpShared;
        this._changeDetector = _changeDetector;
        this.subscriptions = [];
        this.scheduledMinutes = 0;
    }
    /**
     * Loading into cache and checking status every
     * 1.5 seconds
     *
     * @author Nikola Gavric
     */
    ControlPanelCmp.prototype.loadIntoCache = function () {
        var _this = this;
        this._cpShared.isModules = true;
        this.subscriptions['loadIntoCache'] = this._cpService.loadCache(this._cpShared.modules).finally(function () {
            setTimeout(function () {
                _this._cpShared.isModules = false;
                _this._cpShared.isAll = false;
            }, 1600);
        }).subscribe(function (res) {
            if (res.statusCode == 400)
                _this._cpShared.isModules = false;
            _this._utilityService.setAlert(_this.componentAlert, res.message, res.statusCode);
        }, function (err) {
            if (err.statusCode == 400)
                _this._cpShared.isModules = false;
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode, err.errors);
        });
    };
    /**
     * Clearing cache
     *
     * @author Nikola Gavric
     */
    ControlPanelCmp.prototype.clearCache = function () {
        var _this = this;
        this.subscriptions['clearCache'] = this._cpService.clearCache(this._cpShared.modules).finally(function () {
            _this.hideModal(_this.clearCacheModal);
            _this.selectAll(false, 'modules');
        }).subscribe(function (res) {
            _this._utilityService.setAlert(_this.componentAlert, res.message, res.statusCode);
        }, function (err) {
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode, err.errors);
        });
    };
    /**
     * Run garbage collector
     *
     * @author Nikola Gavric
     */
    ControlPanelCmp.prototype.runGC = function () {
        var _this = this;
        this.subscriptions['runGC'] = this._cpService.runGC().subscribe(function (res) {
            _this._utilityService.setAlert(_this.componentAlert, res.message, res.statusCode);
        }, function (err) {
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode, err.errors);
        });
    };
    /**
     * Download all selected files
     *
     * @author Nikola Gavric
     */
    ControlPanelCmp.prototype.downloadSFTP = function () {
        var _this = this;
        this._cpShared.isSftp = true;
        this.subscriptions['downloadSFTP'] = this._cpService.downloadSFTP(this._cpShared.sftp).finally(function () {
            setTimeout(function () {
                _this._cpShared.isSftp = false;
                if (_this._cpShared.isAll && _this._cpShared.db.length > 0) {
                    _this.loadIntoDb();
                }
                else if (_this._cpShared.isAll && _this._cpShared.modules.length > 0) {
                    _this.loadIntoCache();
                }
            }, 1600);
        }).subscribe(function (res) {
            if (res.statusCode == 400)
                _this._cpShared.isSftp = false;
            _this._utilityService.setAlert(_this.componentAlert, res.message, res.statusCode);
        }, function (err) {
            if (err.statusCode == 400)
                _this._cpShared.isSftp = false;
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode, err.errors);
            _this._cpShared.isAll = false;
        });
    };
    /**
     * Insert/update selected items into the DB
     *
     * @author Nikola Gavric
     */
    ControlPanelCmp.prototype.loadIntoDb = function () {
        var _this = this;
        this._cpShared.isDB = true;
        this.subscriptions['loadIntoDb'] = this._cpService.loadIntoDB(this._cpShared.db).finally(function () {
            setTimeout(function () {
                _this._cpShared.isDB = false;
                if (_this._cpShared.isAll && _this._cpShared.modules.length > 0) {
                    _this.loadIntoCache();
                }
            }, 1600);
        }).subscribe(function (res) {
            if (res.statusCode == 400)
                _this._cpShared.isDB = false;
            _this._utilityService.setAlert(_this.componentAlert, res.message, res.statusCode);
        }, function (err) {
            if (err.statusCode == 400)
                _this._cpShared.isDB = false;
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode, err.errors);
            _this._cpShared.isAll = false;
        });
    };
    /**
     * Trigger select all/deselect all where
     * value is true or false and type is
     * which type is being clicked on.
     *
     * @param value boolean
     * @param type string
     * @author Nikola Gavric
     */
    ControlPanelCmp.prototype.selectAll = function (value, type) {
        switch (type) {
            case 'modules':
                if (value) {
                    this._cpShared.modules = ['L1', 'LLS', 'LFL', 'RI', 'FIV', 'TR'];
                }
                else {
                    this._cpShared.modules = [];
                }
                break;
            case 'db':
                if (value) {
                    this._cpShared.db = ['IUSGDDB', 'ISGGDB', 'ILSDDB', 'IFLDDB', 'ISRIDB'];
                }
                else {
                    this._cpShared.db = [];
                }
                break;
            case 'sftp':
                if (value) {
                    this._cpShared.sftp = ['DSGD', 'DSGG', 'DLSG', 'DFLG', 'DSRI', 'DSFM'];
                }
                else {
                    this._cpShared.sftp = [];
                }
                break;
        }
    };
    /**
     * Submit all selected items
     *
     * @author Nikola Gavric
     */
    ControlPanelCmp.prototype.submitAll = function () {
        var temp = [];
        temp = temp.concat(this._cpShared.modules, this._cpShared.db, this._cpShared.sftp);
        if (temp.length > 0) {
            this._cpShared.isAll = true;
            if (this._cpShared.sftp.length > 0) {
                this.downloadSFTP();
            }
            else if (this._cpShared.db.length > 0) {
                this.loadIntoDb();
            }
            else {
                this.loadIntoCache();
            }
        }
    };
    /**
     * Cancel download of files
     *
     * @author Nikola Gavric
     */
    ControlPanelCmp.prototype.cancelSFTP = function () {
        var _this = this;
        this.subscriptions['cancelSFTP'] = this._cpService.cancelSFTP().finally(function () {
            setTimeout(function () {
                if (_this.subscriptions['downloadSFTP'])
                    _this.subscriptions['downloadSFTP'].unsubscribe();
                _this._cpShared.isSftp = false;
            }, 1600);
        }).subscribe(function (res) {
            _this._utilityService.setAlert(_this.componentAlert, res.message, res.statusCode);
        }, function (err) {
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode, err.errors);
        });
    };
    /**
     * Cancel load of modules
     *
     * @author Nikola Gavric
     */
    ControlPanelCmp.prototype.cancelModules = function () {
        var _this = this;
        this.subscriptions['cancelModules'] = this._cpService.cancelModules().finally(function () {
            setTimeout(function () {
                if (_this.subscriptions['loadIntoCache'])
                    _this.subscriptions['loadIntoCache'].unsubscribe();
                _this._cpShared.isModules = false;
            }, 1600);
        }).subscribe(function (res) {
            _this._utilityService.setAlert(_this.componentAlert, res.message, res.statusCode);
        }, function (err) {
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode, err.errors);
        });
    };
    /**
     * Cancel insert/update into database
     *
     * @author Nikola Gavric
     */
    ControlPanelCmp.prototype.cancelDB = function () {
        var _this = this;
        this.subscriptions['cancelDB'] = this._cpService.cancelDB().finally(function () {
            setTimeout(function () {
                if (_this.subscriptions['loadIntoDb'])
                    _this.subscriptions['loadIntoDb'].unsubscribe();
                _this._cpShared.isDB = false;
            }, 1600);
        }).subscribe(function (res) {
            _this._utilityService.setAlert(_this.componentAlert, res.message, res.statusCode);
        }, function (err) {
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode, err.errors);
        });
    };
    /**
     * Cancel all loads, downloads or inserts/updates
     *
     * @author Nikola Gavric
     */
    ControlPanelCmp.prototype.cancelAll = function () {
        if (this._cpShared.sftp.length > 0) {
            this.cancelSFTP();
        }
        else if (this._cpShared.db.length > 0) {
            this.cancelDB();
        }
        else if (this._cpShared.modules.length > 0) {
            this.cancelModules();
        }
    };
    /**
     * Checking alert status: scheduled or not
     *
     * @author Nikola Gavric
     */
    ControlPanelCmp.prototype._alertStatus = function () {
        var _this = this;
        this.subscriptions['_alertStatus'] = this._cpService.alertStatus().subscribe(function (res) {
            _this.isScheduled = res.data;
            _this.nextAlert();
        }, function (err) {
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode, err.errors);
        });
    };
    /**
     * Fire a test alert
     *
     * @author Nikola Gavric
     */
    ControlPanelCmp.prototype.fireAlert = function () {
        var _this = this;
        this.isAlert = true;
        this.subscriptions['fireAlert'] = this._cpService.fireAlert().finally(function () {
            _this.isAlert = false;
        }).subscribe(function (res) {
            _this._utilityService.setAlert(_this.componentAlert, res.message, res.statusCode);
        }, function (err) {
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode, err.errors);
        });
    };
    /**
     * Schedule an alert after N minutes
     * backend accepts only seconds
     *
     * @author Nikola Gavric
     */
    ControlPanelCmp.prototype.startAlert = function () {
        var _this = this;
        this.isAlert = true;
        this.subscriptions['startAlert'] = this._cpService.runAlert(this.isScheduled, this.scheduledMinutes).finally(function () {
            _this.isAlert = false;
            _this._alertStatus();
        }).subscribe(function (res) {
            _this._utilityService.setAlert(_this.componentAlert, res.message, res.statusCode);
        }, function (err) {
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode, err.errors);
        });
    };
    ControlPanelCmp.prototype.nextAlert = function () {
        var _this = this;
        this.subscriptions['nextAlert'] = this._cpService.nextAlert().subscribe(function (res) {
            _this.nextAlertDate = res.data;
        }, function (err) {
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode, err.errors);
        });
    };
    ControlPanelCmp.prototype.startScheduler = function (timer, scheduler) {
        var _this = this;
        this.subscriptions['startScheduler'] = this._cpService.startScheduleTimer(timer, [scheduler]).subscribe(function (res) {
            _this._utilityService.setAlert(_this.componentAlert, res.message, res.statusCode);
        }, function (err) {
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode, err.errors);
        });
    };
    ControlPanelCmp.prototype.stopScheduler = function (scheduler) {
        var _this = this;
        this.subscriptions['stopScheduler'] = this._cpService.stopScheduleTimer([scheduler]).subscribe(function (res) {
            _this._utilityService.setAlert(_this.componentAlert, res.message, res.statusCode);
        }, function (err) {
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode, err.errors);
        });
    };
    ControlPanelCmp.prototype.schedulerStatus = function () {
        var _this = this;
        this.subscriptions['schedulerStatus'] = this._cpService.scheduleTimerStatus().subscribe(function (res) {
            _this.timer1Enabled = res.data.timer1;
            _this.timer2Enabled = res.data.timer2;
            _this.nextScheduler();
        }, function (err) {
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode, err.errors);
        });
    };
    ControlPanelCmp.prototype.nextScheduler = function () {
        var _this = this;
        this.subscriptions['nextScheduler'] = this._cpService.nextScheduleTimer().subscribe(function (res) {
            _this.nextScheduler1Date = res.data.timer1;
            _this.nextScheduler2Date = res.data.timer2;
        }, function (err) {
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode, err.errors);
        });
    };
    ControlPanelCmp.prototype.automaticallyLoadChange = function (event) {
        var _this = this;
        this.subscriptions['automaticallyLoadChange'] = this._cpService.automaticallyFireAlert(event).subscribe(function (res) {
            _this._appService.frontendGenerics['automaticallyFireAlerts'] = !_this._appService.frontendGenerics['automaticallyFireAlerts'];
            _this._utilityService.setAlert(_this.componentAlert, res.message, res.statusCode);
        }, function (err) {
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode, err.errors);
        });
    };
    ControlPanelCmp.prototype.loadSFTPHistoryDates = function () {
        var _this = this;
        this.subscriptions['loadSFTPHistoryDates'] = this._cpService.loadSFTPHistoryDates().subscribe(function (res) {
            _this.sftpHistoryDates = res.data;
        }, function (err) {
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode, err.errors);
        });
    };
    ControlPanelCmp.prototype.loadDBHistoryDates = function () {
        var _this = this;
        this.subscriptions['loadDBHistoryDates'] = this._cpService.loadDBHistoryDates().subscribe(function (res) {
            _this.dbHistoryDates = res.data;
        }, function (err) {
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode, err.errors);
        });
    };
    ControlPanelCmp.prototype.refreshPageVars = function () {
        var _this = this;
        this.subscriptions['refreshPageVars'] = this._cpService.refreshPageVars().subscribe(function (res) {
            var data = res.data;
            _this.isScheduled = data.alertScheduler;
            _this.alertExecuted = data.alertSchedulerTaskDone;
            _this._cpShared.dbProgress = data.dbProgress;
            _this._cpShared.modulesProgress = data.moduleProgress;
            _this.sftpHistoryDates = data.sftpHistoryDates;
            _this._cpShared.sftpProgress = data.sftpProgress;
            if (!_this.scheduledMinutesFocused) {
                _this.scheduledMinutes = data.alertSchedulerInterval;
            }
            _this.timer1Enabled = data.timer1;
            _this.timer2Enabled = data.timer2;
            if (data.timer1NextExecution) {
                var date = new Date(data.timer1NextExecution);
                _this.timer1 = date;
                _this.nextScheduler1Date = date;
            }
            if (data.timer2NextExecution) {
                var date = new Date(data.timer2NextExecution);
                _this.timer2 = date;
                _this.nextScheduler2Date = date;
            }
            _this.nextAlertDate = data.nextAlerts.alertSchedulerNextExecution;
            _this.filesExecuted = {
                timer1: data.timer1TaskDone,
                timer2: data.timer2TaskDone
            };
            _this.memory = data.memory;
            _this.allGeo = data.allGeo;
        }, function (err) {
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode, err.errors);
        });
    };
    ControlPanelCmp.prototype.connectPoints = function () {
        var _this = this;
        this.subscriptions['connectPoints'] = this._cpService.connectPoints().subscribe(function (res) {
            _this._utilityService.setAlert(_this.componentAlert, res.message, res.statusCode);
        }, function (err) {
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode, err.errors);
        });
    };
    //
    ControlPanelCmp.prototype.loadData = function () {
        var _this = this;
        this.subscriptions['reloadMemory'] = Observable_1.Observable.interval(3000).subscribe(function () { return _this.refreshPageVars(); });
        this.loadSFTPHistoryDates();
        this.loadDBHistoryDates();
    };
    /**
     * Show modal based on passed modal directive and custom behaviour based on modalName and data
     * @author Nikola Gavric
     */
    ControlPanelCmp.prototype.showModal = function (modal) {
        this._utilityService.setAlert(this.componentAlert);
        modal.show();
    };
    /**
     * Hide modal based on passed modal directive
     * @author Nikola Gavric
     */
    ControlPanelCmp.prototype.hideModal = function (modal) {
        modal.hide();
    };
    /*--------- NG On Init ---------*/
    ControlPanelCmp.prototype.ngOnInit = function () {
        // Initital method to be executed when page loads
        this._appService.pageLoaded('', this);
        this.componentAlert = new models_1.Alert(null, true);
        // Initial methods
        this.loadData();
        // Variables
        this.memory = [];
        this.timer1 = new Date();
        this.timer2 = new Date();
        this.allGeo = "0/0";
        this.filesExecuted = {
            timer1: 0,
            timer2: 0
        };
        this.nextScheduler1Date = new Date();
        this.nextScheduler2Date = new Date();
        this.scheduledMinutesFocused = false;
        this.automaticallyLoad = this._appService.getFrontendGeneric('automaticallyFireAlerts', false);
        this._appService.languageChangeForComponent(this, this.loadData.bind(this));
    };
    /*--------- NG On Destroy ---------*/
    ControlPanelCmp.prototype.ngOnDestroy = function () {
        this._appService.refreshEmitters(this.subscriptions);
    };
    __decorate([
        core_1.ViewChild('clearCacheModal'), 
        __metadata('design:type', ng2_bootstrap_1.ModalDirective)
    ], ControlPanelCmp.prototype, "clearCacheModal", void 0);
    ControlPanelCmp = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'control_panel.cmp.html'
        }), 
        __metadata('design:paramtypes', [utility_service_1.UtilityService, control_panel_service_1.ControlPanelService, app_service_1.AppService, ng2_translate_1.TranslateService, forms_1.FormBuilder, kjgri_control_panel_service_1.ControlPanelSharedService, core_1.ChangeDetectorRef])
    ], ControlPanelCmp);
    return ControlPanelCmp;
}());
exports.ControlPanelCmp = ControlPanelCmp;
//# sourceMappingURL=control_panel.cmp.js.map