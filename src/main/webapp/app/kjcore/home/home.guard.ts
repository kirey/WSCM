import { Injectable } from '@angular/core';
import { Route, CanLoad, Params, Router } from '@angular/router';

import { Subject } from 'rxjs/Rx';

import { AuthService } from '../shared/services/auth.service';
import { AppService } from '../shared/services/app.service';
import { UtilityService } from "./../shared/services/utility.service";
import { UserInfo, RestResponse } from "./../shared/models";

@Injectable()
export class HomeAuthGuard {
	constructor(
		private _authService: AuthService,
		private _appService: AppService,
		private _utilityService: UtilityService,
		private _router: Router
	) { }

	canLoad(route: Route): any {
		// this._authService.requestedPageNavigationExtras.queryParams = {};
		this._appService.setRouter(this._router);
		let subject = new Subject<boolean>();

		let location = this._utilityService.trimCharacter(window.location.hash.slice(1), '/', true, true);

		if (!this._authService.initState || !AuthService.loginStatus) {
			this._appService.setGlobalLoader(true);
			this._authService.initRest().toPromise().then((res: RestResponse<any>) => {
				this._authService.postAuthCheck(res.data);

				AuthService.redirectUrl = 'home';

				subject.next(true);
			}, () => {
				this._authService.handleFailedInitRest(subject, 'home');
			});
			return subject.asObservable().take(1);
		}
		this._appService.postLoginLoad = true;

		if (route.path != location) {
			this._appService.postLoginLoad = false;
		}

		return true;
	}
}