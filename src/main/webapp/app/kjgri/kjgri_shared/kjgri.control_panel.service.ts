import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { UtilityService } from '../../kjcore/shared/services/utility.service';
import { ControlPanelService } from './../control_panel/control_panel.service';

import { Alert, RestResponse } from "./../../kjcore/shared/models";
import { ModalDirective } from 'ng2-bootstrap/modal/modal.component';

@Injectable()
export class ControlPanelSharedService {
    public isModules: boolean = false;
    public subscriptions: any = [];
    public modules: string[] = [];
    public modulesProgress: any;

    public isDB: boolean = false;
    public db: string[] = [];
    public dbProgress: any;

    public isSftp: boolean = false;
    public sftp: string[] = [];
    public sftpProgress: any;

    public isAll: boolean = false;
}