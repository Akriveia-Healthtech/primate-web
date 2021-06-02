import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Auth } from 'aws-amplify';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  private isAuthenticatedSource = new BehaviorSubject<boolean>(false);
  private backDropSource = new BehaviorSubject<boolean>(false);

  private uuidSource = new BehaviorSubject<string>('');
  private authTokenSource = new BehaviorSubject<string>('');

  uuid = this.uuidSource.asObservable();
  authToken = this.authTokenSource.asObservable();
  isbackDropON = this.backDropSource.asObservable();

  isAuthenticated = this.isAuthenticatedSource.asObservable();

  constructor() {
    this._CheckAuth();
  }

  private async _CheckAuth() {
    const session = (await Auth.currentSession()).isValid;
    if (session) {
      console.log('SESSION:', session);
      this.isAuthenticatedSource.next(true);
    } else {
      console.log('No SESSIOn:', session);
      this.isAuthenticatedSource.next(false);
    }

    const auth = Auth.currentUserInfo();
  }

  setAuthentication(bool) {
    this.isAuthenticatedSource.next(bool);
  }

  setAuthjwtToken(jwtToken) {
    this.authTokenSource.next('Bearer ' + jwtToken);
  }
  setUuid(id) {
    this.uuidSource.next(id);
  }

  setBackdrop_On() {
    this.backDropSource.next(true);
  }
  setBackdrop_Off() {
    this.backDropSource.next(false);
  }
}
