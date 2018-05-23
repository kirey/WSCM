import { Injectable } from '@angular/core';
import { UtilityService } from "./../../kjcore/shared/services/utility.service";
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanLoad, Route } from '@angular/router';

import { Subject } from 'rxjs/Rx';

import { AuthService } from './../../kjcore/shared/services/auth.service';
import { AppService } from './../../kjcore/shared/services/app.service'; 

import { UserInfo } from "./../../kjcore/shared/models/userInfo.model";
import { RestResponse } from './../../kjcore/shared/models';

@Injectable()
export class LoginAuthGuard implements CanActivate {

	constructor(
		private _authService: AuthService,
		private _appService: AppService,
		private _utilityService: UtilityService,
		private _router: Router
	) { }

	canActivate(route: ActivatedRouteSnapshot): any {
		let subject = new Subject<boolean>();
		this._appService.setRouter(this._router);

		if (Object.keys(route.queryParams).length > 0) {
			this._authService.requestedPageNavigationExtras.queryParams = route.queryParams;
		}

		if (!this._authService.initState && !AuthService.loginStatus) {
			this._appService.setGlobalLoader(true);
			this._authService.initRest().toPromise().then((res: RestResponse<any>) => {
				this._authService.postAuthCheck(res.data);

				subject.next(false);
				AppService.router.navigate([AppService.defaultPage]);
			}, () => {
				this._authService.handleFailedInitRest(subject, route.url[0].path);
			});
			return subject.asObservable().take(1);
		} else {
			//this._appService.postLoginLoad = true;
			return !AuthService.loginStatus;
		}
	}
}