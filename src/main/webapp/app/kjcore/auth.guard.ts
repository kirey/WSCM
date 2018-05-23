import { Injectable } from '@angular/core';
import { CanLoad, Route, CanActivateChild, ActivatedRouteSnapshot, Router } from '@angular/router';

import { AuthService } from './shared/services/auth.service';
import { AppService } from './shared/services/app.service';
import { UtilityService } from "./shared/services/utility.service";

import { UserInfo, RestResponse } from './shared/models';

import { Observable, Subject } from 'rxjs/Rx';

@Injectable()
export class AuthGuard {
	constructor(
		private _authService: AuthService,
		private _appService: AppService,
		private _utilityService: UtilityService,
		private _router: Router
	) { }

	canLoad(route: Route): any {
		this._appService.setRouter(this._router);
		let subject = new Subject<boolean>();

		let location = this._utilityService.trimCharacter(route.path, '/', true, true);

		if (!AuthService.loginStatus && !this._authService.initState) {
			if (route.canActivateChild) {
				location = this._utilityService.trimCharacter(window.location.hash.slice(1), '/', true, true);
				location = location != 'login' ? location : AuthService.redirectUrl;
			}
			AuthService.redirectUrl = location;
			this._appService.setGlobalLoader(true);
			this._authService.initRest().toPromise().then((res: RestResponse<any>) => {
				this._authService.postAuthCheck(res.data);

				let tempRoute = location;

				if (tempRoute == 'login' || tempRoute == 'registration' || tempRoute == 'password_change' || tempRoute == 'confirm_registration') {
					subject.next(false);
					AppService.router.navigate([AppService.defaultPage]);
				} else {
					let permissionTemp = this._authService.checkPermission(AuthService.redirectUrl);
					if (permissionTemp) {
						subject.next(true);
					} else {
						subject.next(false);
						AppService.router.navigate([AppService.defaultPage]);
					}
				}
			}, () => {
				this._authService.handleFailedInitRest(subject, location);
			});

			return subject.asObservable().take(1);
		} else {
			this._appService.postLoginLoad = true;
			this._authService.requestedPageNavigationExtras.queryParams = {};

			AuthService.redirectUrl = location;

			let permissionTemp = this._authService.checkPermission(AuthService.redirectUrl);
			this._appService.currentPageRoute = route.path;
			
			this._appService.postLoginLoad = permissionTemp;

			return permissionTemp;
		}
	}

	canActivateChild(route: ActivatedRouteSnapshot): boolean {
		// if (Object.keys(route.params).length > 0) {
		//   this._authService.requestedPageNavigationExtras.queryParams = route.params;
		// }

		let tempUrlSliced = '';
		let tempUrl = '';

		for (let segment of route.parent.url) {
			tempUrl += '/' + segment.path;
		}

		tempUrl += '/';

		for (let segment of route.url) {
			tempUrl += segment.path;
		}

		tempUrlSliced = this._utilityService.trimCharacter(tempUrl, '/', true, true);

		AuthService.redirectUrl = tempUrlSliced;

		let permissionTemp = this._authService.checkPermission(tempUrlSliced);

		return permissionTemp;
	}
}