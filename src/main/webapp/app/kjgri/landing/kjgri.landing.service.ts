import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { UtilityService } from '../../kjcore/shared/services/utility.service';

import { RestResponse } from "./../../kjcore/shared/models";

@Injectable()
export class KJGriLandingService {
    private baseUrl: string;

    constructor(private _http: Http) {
        this.baseUrl = 'rest/kfuture/landing'
    }
}
