import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Auth } from 'aws-amplify';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  private isAuthenticatedSource = new BehaviorSubject<boolean>(false);
  private uuidSource = new BehaviorSubject<string>('');
  uuid = this.uuidSource.asObservable();
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
  setUuid(id) {
    this.uuidSource.next(id);
  }
}
