import { Injectable } from '@angular/core';
import { Route, CanLoad, Params, Router } from '@angular/router';

import { Subject } from 'rxjs/Rx';

import { AuthService } from '../../kjcore/shared/services/auth.service';
import { AppService } from '../../kjcore/shared/services/app.service';
import { UtilityService } from "./../../kjcore/shared/services/utility.service";
import { UserInfo, RestResponse } from "./../../kjcore/shared/models";

import { KJGriConstants } from "./../kjgri.constants";

@Injectable()
export class KJGriHomeAuthGuard {
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
		} else if (this._appService.isAuthorised([KJGriConstants.ROLES.ADMIN_A, KJGriConstants.ROLES.SUBADMIN_A, KJGriConstants.ROLES.ADMIN_I, KJGriConstants.ROLES.SUBADMIN_I])) {
			this._appService.getRouter().navigate(['admin/users']);
			return false
		}
		this._appService.postLoginLoad = true;

		if (route.path != location && location != 'login') {
			this._appService.postLoginLoad = false;
		}

		return true;
	}
}