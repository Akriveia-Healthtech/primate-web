import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { StateService } from '../state/state.service';
import { routes } from '../../../../environments/routes';
import { Auth } from 'aws-amplify';
import { UtilityService } from '../../utility/utility.service';

@Injectable({
  providedIn: 'root',
})
export class UrlGuard implements CanActivate {
  isAuthenticated: boolean;
  isSetupCompleted_FLAG: boolean = false;
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this._CheckAuth();
    console.log('isAuthenticated', this.isAuthenticated);
    console.log(next);
    this._utility.systemLog(`isAuthenticated ${this.isAuthenticated}`, 'debug');
    if (this._utility.checkSubdomainInput()) {
      return false;
    }
    if (next.data[0] == 'setupPage') {
      if (this.isAuthenticated && !this.isSetupCompleted_FLAG) {
        return true;
      } else {
        this._utility.systemLog('SETUP PAGE NOT ALLOW', 'error');
        this._router.navigate([routes.dashBaord]);
        return false;
      }
    } else if (next.data[0] == 'signUpPage' || next.data[0] == 'signInPage') {
      if (this.isAuthenticated) {
        this._utility.systemLog('SIGN PAGE NOT ALLOW', 'error');
        this._router.navigate([routes.dashBaord]);
        return false;
      } else {
        if (window.location.pathname.includes(routes.redirect)) {
          this._router.navigate([window.location.pathname]);
          return false;
        } else {
          return true;
        }
      }
    } else if (next.data[0] == 'dashboard') {
      console.log('Dashboard Route');
      if (this.isAuthenticated) {
        if (!this.isSetupCompleted_FLAG) {
          this._router.navigate([routes.setup]);
          return false;
        } else {
          return true;
        }
      } else {
        this._utility.systemLog('DASHBOARD NOT ALLOW', 'error');
        this._router.navigate([routes.signIp]);
        return false;
      }
    } else {
      return true;
    }
  }
  constructor(private _utility: UtilityService, private _state: StateService, private _router: Router) {}
  private _CheckAuth() {
    this._utility.systemLog('Checking Auth From Guard', 'debug');
    const user = this._utility.LOCAL_STORAGE_GET('user');
    if (user) {
      this.isSetupCompleted_FLAG = user.isSetupCompleted_FLAG;
      this._state.setAuthentication(true);
      this._state.setUuid(user.uuid);
    } else {
      this._state.setAuthentication(false);
    }
    this._state.isAuthenticated.subscribe((res) => {
      this.isAuthenticated = res;
    });
  }

  private _titleChanger(route) {}
}
