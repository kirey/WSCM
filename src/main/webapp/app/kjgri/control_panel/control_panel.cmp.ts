import { Component, OnInit, ViewEncapsulation, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { Footer, DataTable } from 'primeng/primeng';

import { TranslateService } from 'ng2-translate';

import { ModalDirective } from 'ng2-bootstrap';

import { ControlPanelService } from './control_panel.service';

import { UtilityService } from '../../kjcore/shared/services/utility.service';
import { AppService } from '../../kjcore/shared/services/app.service';
import { ControlPanelSharedService } from './../kjgri_shared/kjgri.control_panel.service';

import { Alert, RestResponse } from '../../kjcore/shared/models';
import { Observable } from 'rxjs/Observable';

@Component({
    moduleId: module.id,
    templateUrl: 'control_panel.cmp.html'
})
export class ControlPanelCmp implements OnInit {

    subscriptions: Subscription[] = [];
    componentAlert: Alert;

    memory: any[];

    isScheduled: boolean;
    scheduledMinutes: number = 0;
    scheduledMinutesFocused: boolean;
    alertTimeout: any;

    sftpSelectAll: boolean;
    dbSelectAll: boolean;
    modulesSelectAll: boolean;

    isAlert: boolean;

    sftpHistoryDates: any;
    dbHistoryDates: any;

    timer1: Date;
    timer1Enabled: boolean;
    timer2: Date;
    timer2Enabled: boolean;

    nextScheduler1Date: Date;
    nextScheduler2Date: Date;
    nextAlertDate: Date;

    automaticallyLoad: boolean;
    filesExecuted: any;
    alertExecuted: any;
    allGeo: any;

    @ViewChild('clearCacheModal')
    clearCacheModal: ModalDirective;

    /*--------- Constructor ---------*/
    constructor(
        private _utilityService: UtilityService,
        private _cpService: ControlPanelService,
        private _appService: AppService,
        private _translateService: TranslateService,
        private _formBuilder: FormBuilder,
        private _cpShared: ControlPanelSharedService,
        private _changeDetector: ChangeDetectorRef
    ) { }

    /**
     * Loading into cache and checking status every
     * 1.5 seconds
     * 
     * @author Nikola Gavric
     */
    public loadIntoCache(): void {
        this._cpShared.isModules = true;

        this.subscriptions['loadIntoCache'] = this._cpService.loadCache(this._cpShared.modules).finally(
            () => {
                setTimeout(() => {
                    this._cpShared.isModules = false;
                    this._cpShared.isAll = false;
                }, 1600);
            }
        ).subscribe(
            (res: RestResponse<any>) => {
                if(res.statusCode == 400) this._cpShared.isModules = false;
                this._utilityService.setAlert(this.componentAlert, res.message, res.statusCode);
            },
            (err: RestResponse<any>) => {
                if(err.statusCode == 400) this._cpShared.isModules = false;
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode, err.errors);
            }
        )
    }

    /**
     * Clearing cache
     * 
     * @author Nikola Gavric
     */
    public clearCache(): void {
        this.subscriptions['clearCache'] = this._cpService.clearCache(this._cpShared.modules).finally(
            () => {
                this.hideModal(this.clearCacheModal);
                this.selectAll(false, 'modules');
            }
        ).subscribe(
            (res: RestResponse<any>) => {
                this._utilityService.setAlert(this.componentAlert, res.message, res.statusCode);
            },
            (err: RestResponse<any>) => {
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode, err.errors);
            }
        )
    }

    /**
     * Run garbage collector
     * 
     * @author Nikola Gavric
     */
    public runGC(): void {
        this.subscriptions['runGC'] = this._cpService.runGC().subscribe(
            (res: RestResponse<any>) => {
                this._utilityService.setAlert(this.componentAlert, res.message, res.statusCode);
            },
            (err: RestResponse<any>) => {
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode, err.errors);
            }
        )
    }

    /**
     * Download all selected files
     * 
     * @author Nikola Gavric
     */
    public downloadSFTP(): void {
        this._cpShared.isSftp = true;

        this.subscriptions['downloadSFTP'] = this._cpService.downloadSFTP(this._cpShared.sftp).finally(
            () => {
                setTimeout(() => {
                    this._cpShared.isSftp = false;
                    if(this._cpShared.isAll && this._cpShared.db.length > 0) {
                        this.loadIntoDb();
                    } else if(this._cpShared.isAll && this._cpShared.modules.length > 0) {
                        this.loadIntoCache();
                    }
                }, 1600);
            }
        ).subscribe(
            (res: RestResponse<any>) => {
                if(res.statusCode == 400) this._cpShared.isSftp = false;
                this._utilityService.setAlert(this.componentAlert, res.message, res.statusCode);
            },
            (err: RestResponse<any>) => {
                if(err.statusCode == 400) this._cpShared.isSftp = false;
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode, err.errors);
                this._cpShared.isAll = false;
            }
        )
    }

    /**
     * Insert/update selected items into the DB
     * 
     * @author Nikola Gavric
     */
    public loadIntoDb(): void {
        this._cpShared.isDB = true;

        this.subscriptions['loadIntoDb'] = this._cpService.loadIntoDB(this._cpShared.db).finally(
            () => {
                setTimeout(() => {
                    this._cpShared.isDB = false;
                    if(this._cpShared.isAll && this._cpShared.modules.length > 0) {
                        this.loadIntoCache();
                    }
                }, 1600);
            }
        ).subscribe(
            (res: RestResponse<any>) => {
                if(res.statusCode == 400) this._cpShared.isDB = false;
                this._utilityService.setAlert(this.componentAlert, res.message, res.statusCode);
            },
            (err: RestResponse<any>) => {
                if(err.statusCode == 400) this._cpShared.isDB = false;
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode, err.errors);
                this._cpShared.isAll = false;
            }
        )
    }

    /**
     * Trigger select all/deselect all where
     * value is true or false and type is
     * which type is being clicked on.
     * 
     * @param value boolean
     * @param type string
     * @author Nikola Gavric
     */
    public selectAll(value: boolean, type: string): void {
        switch(type) {
            case 'modules':
                if(value) {
                    this._cpShared.modules = ['L1', 'LLS', 'LFL', 'RI', 'FIV', 'TR'];
                } else {
                    this._cpShared.modules = [];
                }
                break;
            case 'db':
                if(value) {
                    this._cpShared.db = ['IUSGDDB', 'ISGGDB', 'ILSDDB', 'IFLDDB', 'ISRIDB'];
                } else {
                    this._cpShared.db = [];
                }
                break;
            case 'sftp':
                if(value) {
                    this._cpShared.sftp = ['DSGD', 'DSGG', 'DLSG', 'DFLG', 'DSRI', 'DSFM'];
                } else {
                    this._cpShared.sftp = [];
                }
                break;
        }
    }

    /**
     * Submit all selected items
     * 
     * @author Nikola Gavric
     */
    public submitAll(): void {
        let temp = [];
        temp = temp.concat(this._cpShared.modules, this._cpShared.db, this._cpShared.sftp);

        if(temp.length > 0) {
            this._cpShared.isAll = true;
            if(this._cpShared.sftp.length > 0) {
                this.downloadSFTP();
            } else if(this._cpShared.db.length > 0) {
                this.loadIntoDb();
            } else {
                this.loadIntoCache();
            }
        }
    }

    /**
     * Cancel download of files
     * 
     * @author Nikola Gavric
     */
    public cancelSFTP(): void {
        this.subscriptions['cancelSFTP'] = this._cpService.cancelSFTP().finally(
            () => {
                setTimeout(() => {
                    if(this.subscriptions['downloadSFTP']) this.subscriptions['downloadSFTP'].unsubscribe();
                    this._cpShared.isSftp = false;
                }, 1600);
            }
        ).subscribe(
            (res: RestResponse<any>) => {
                this._utilityService.setAlert(this.componentAlert, res.message, res.statusCode);
            },
            (err: RestResponse<any>) => {
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode, err.errors);
            }
        )
    }

    /**
     * Cancel load of modules
     * 
     * @author Nikola Gavric
     */
    public cancelModules(): void {
        this.subscriptions['cancelModules'] = this._cpService.cancelModules().finally(
            () => {
                setTimeout(() => {
                    if(this.subscriptions['loadIntoCache']) this.subscriptions['loadIntoCache'].unsubscribe();
                    this._cpShared.isModules = false;
                }, 1600);
            }
        ).subscribe(
            (res: RestResponse<any>) => {
                this._utilityService.setAlert(this.componentAlert, res.message, res.statusCode);
            },
            (err: RestResponse<any>) => {
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode, err.errors);
            }
        )
    }

    /**
     * Cancel insert/update into database
     * 
     * @author Nikola Gavric
     */
    public cancelDB(): void {
        this.subscriptions['cancelDB'] = this._cpService.cancelDB().finally(
            () => {
                setTimeout(() => {
                    if(this.subscriptions['loadIntoDb']) this.subscriptions['loadIntoDb'].unsubscribe();
                    this._cpShared.isDB = false;
                }, 1600);
            }
        ).subscribe(
            (res: RestResponse<any>) => {
                this._utilityService.setAlert(this.componentAlert, res.message, res.statusCode);
            },
            (err: RestResponse<any>) => {
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode, err.errors);
            }
        )
    }

    /**
     * Cancel all loads, downloads or inserts/updates
     * 
     * @author Nikola Gavric
     */
    public cancelAll(): void {
        if(this._cpShared.sftp.length > 0) {
            this.cancelSFTP();
        } else if(this._cpShared.db.length > 0) {
            this.cancelDB();
        } else if(this._cpShared.modules.length > 0) {
            this.cancelModules();
        }
    }

    /**
     * Checking alert status: scheduled or not
     * 
     * @author Nikola Gavric
     */
    private _alertStatus(): void {
        this.subscriptions['_alertStatus'] = this._cpService.alertStatus().subscribe(
            (res: RestResponse<any>) => {
                this.isScheduled = res.data;
                this.nextAlert();
            },
            (err: RestResponse<any>) => {
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode, err.errors);
            }
        )
    }

    /**
     * Fire a test alert
     * 
     * @author Nikola Gavric
     */
    public fireAlert(): void {
        this.isAlert = true;
        
        this.subscriptions['fireAlert'] = this._cpService.fireAlert().finally(
            () => {
                this.isAlert = false;
            }
        ).subscribe(
            (res: RestResponse<any>) => {
                this._utilityService.setAlert(this.componentAlert, res.message, res.statusCode);
            },
            (err: RestResponse<any>) => {
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode, err.errors);
            }
        )
    }

    /**
     * Schedule an alert after N minutes
     * backend accepts only seconds
     * 
     * @author Nikola Gavric
     */
    public startAlert(): void {
        this.isAlert = true;
        
        this.subscriptions['startAlert'] = this._cpService.runAlert(this.isScheduled, this.scheduledMinutes).finally(
            () => {
                this.isAlert = false;
                this._alertStatus();
            }
        ).subscribe(
            (res: RestResponse<any>) => {
                this._utilityService.setAlert(this.componentAlert, res.message, res.statusCode);
            },
            (err: RestResponse<any>) => {
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode, err.errors);
            }
        )
    }

    public nextAlert(): void {
        this.subscriptions['nextAlert'] = this._cpService.nextAlert().subscribe(
            (res: RestResponse<any>) => {
                this.nextAlertDate = res.data;
            },
            (err: RestResponse<any>) => {
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode, err.errors);
            }
        )
    }

    public startScheduler(timer: Date, scheduler: string): void {
        this.subscriptions['startScheduler'] = this._cpService.startScheduleTimer(timer, [scheduler]).subscribe(
            (res: RestResponse<any>) => {
                this._utilityService.setAlert(this.componentAlert, res.message, res.statusCode);
            },
            (err: RestResponse<any>) => {
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode, err.errors);
            }
        )
    }

    public stopScheduler(scheduler: string): void {
        this.subscriptions['stopScheduler'] = this._cpService.stopScheduleTimer([scheduler]).subscribe(
            (res: RestResponse<any>) => {
                this._utilityService.setAlert(this.componentAlert, res.message, res.statusCode);
            },
            (err: RestResponse<any>) => {
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode, err.errors);
            }
        )
    }

    public schedulerStatus(): void {
        this.subscriptions['schedulerStatus'] = this._cpService.scheduleTimerStatus().subscribe(
            (res: RestResponse<any>) => {
                this.timer1Enabled = res.data.timer1;
                this.timer2Enabled = res.data.timer2;
                this.nextScheduler();
            },
            (err: RestResponse<any>) => {
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode, err.errors);
            }
        )
    }

    public nextScheduler(): void {
        this.subscriptions['nextScheduler'] = this._cpService.nextScheduleTimer().subscribe(
            (res: RestResponse<any>) => {
                this.nextScheduler1Date = res.data.timer1;
                this.nextScheduler2Date = res.data.timer2;
            },
            (err: RestResponse<any>) => {
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode, err.errors);
            }
        )
    }

    public automaticallyLoadChange(event: any): void {
        this.subscriptions['automaticallyLoadChange'] = this._cpService.automaticallyFireAlert(event).subscribe(
            (res: RestResponse<any>) => {
                this._appService.frontendGenerics['automaticallyFireAlerts'] = !this._appService.frontendGenerics['automaticallyFireAlerts'];
                this._utilityService.setAlert(this.componentAlert, res.message, res.statusCode);
            },
            (err: RestResponse<any>) => {
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode, err.errors);
            }
        )
    }

    public loadSFTPHistoryDates(): void {
        this.subscriptions['loadSFTPHistoryDates'] = this._cpService.loadSFTPHistoryDates().subscribe(
            (res: RestResponse<any>) => {
                this.sftpHistoryDates = res.data;
            },
            (err: RestResponse<any>) => {
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode, err.errors);
            }
        )
    }

    public loadDBHistoryDates(): void {
        this.subscriptions['loadDBHistoryDates'] = this._cpService.loadDBHistoryDates().subscribe(
            (res: RestResponse<any>) => {
                this.dbHistoryDates = res.data;
            },
            (err: RestResponse<any>) => {
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode, err.errors);
            }
        )
    }

    public refreshPageVars(): void {
        this.subscriptions['refreshPageVars'] = this._cpService.refreshPageVars().subscribe(
            (res: RestResponse<any>) => {
                let data = res.data;
                this.isScheduled = data.alertScheduler;
                this.alertExecuted = data.alertSchedulerTaskDone;
                this._cpShared.dbProgress = data.dbProgress;
                this._cpShared.modulesProgress = data.moduleProgress;
                this.sftpHistoryDates = data.sftpHistoryDates;
                this._cpShared.sftpProgress = data.sftpProgress;
                if(!this.scheduledMinutesFocused) {
                    this.scheduledMinutes = data.alertSchedulerInterval;
                }
                this.timer1Enabled = data.timer1;
                this.timer2Enabled = data.timer2;
                if(data.timer1NextExecution) {
                    let date = new Date(data.timer1NextExecution);
                    this.timer1 = date;
                    this.nextScheduler1Date = date;
                }
                if(data.timer2NextExecution) {
                    let date = new Date(data.timer2NextExecution);
                    this.timer2 = date;
                    this.nextScheduler2Date = date;
                }
                this.nextAlertDate = data.nextAlerts.alertSchedulerNextExecution;
                this.filesExecuted = {
                    timer1: data.timer1TaskDone,
                    timer2: data.timer2TaskDone
                }
                this.memory = data.memory;
                this.allGeo = data.allGeo;
            },
            (err: RestResponse<any>) => {
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode, err.errors);
            }
        )
    }

    public connectPoints(): void {
        this.subscriptions['connectPoints'] = this._cpService.connectPoints().subscribe(
            (res: RestResponse<any>) => {
                this._utilityService.setAlert(this.componentAlert, res.message, res.statusCode);
            },
            (err: RestResponse<any>) => {
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode, err.errors);
            }
        )
    }

    //
    private loadData() {
        this.subscriptions['reloadMemory'] = Observable.interval(3000).subscribe(() => this.refreshPageVars());
        this.loadSFTPHistoryDates();
        this.loadDBHistoryDates();
    }

    /**
     * Show modal based on passed modal directive and custom behaviour based on modalName and data
     * @author Nikola Gavric
     */
    public showModal(modal: ModalDirective): void {
        this._utilityService.setAlert(this.componentAlert);
        modal.show();
    }

    /**
     * Hide modal based on passed modal directive
     * @author Nikola Gavric
     */
    public hideModal(modal: ModalDirective) {
        modal.hide();
    }

    /*--------- NG On Init ---------*/
    ngOnInit() {
        // Initital method to be executed when page loads
        this._appService.pageLoaded('', this);

        this.componentAlert = new Alert(null, true);
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
        }
        this.nextScheduler1Date = new Date();
        this.nextScheduler2Date = new Date();
        this.scheduledMinutesFocused = false;

        this.automaticallyLoad = this._appService.getFrontendGeneric('automaticallyFireAlerts', false);

        this._appService.languageChangeForComponent(this, this.loadData.bind(this));
    }

    /*--------- NG On Destroy ---------*/
    ngOnDestroy(): void {
        this._appService.refreshEmitters(this.subscriptions);
    }
}