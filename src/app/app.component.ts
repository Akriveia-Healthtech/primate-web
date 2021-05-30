import { Component } from '@angular/core';
import { Auth } from 'aws-amplify';

import { StateService } from '../app/core/services/state/state.service';
import { UtilityService } from './core/utility/utility.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Primate';
  constructor(private _state: StateService, private _utility: UtilityService) {
    this._CheckAuth();
  }

  private async _CheckAuth() {
    const session = (await Auth.currentSession()).isValid();
    if (session) {
      console.log('SESSION:', session);
      // console.log('SESSION:', res);
      const user = this._utility.LOCAL_STORAGE_GET('user');
      // this._state.setUuid(user.uuid);
      this._state.setAuthentication(true);
      Auth.currentSession()
        .then((res) => {
          // console.log(res['accessToken']['jwtToken']);
          this._state.setAuthjwtToken(res['accessToken']['jwtToken']);
        })
        .catch((err) => {
          console.log(err);
        });
      // console.log(tes);
    } else {
      console.log('No SESSIOn:', session);
      this._state.setAuthentication(false);
    }
    this._state.isAuthenticated.subscribe(
      (res) => {
        console.log('IS AUTH:', res);
      },
      (err) => {
        console.log(err);
      }
    );
    this._state.authToken.subscribe(
      (res) => {
        console.log('Authorization:', res);
      },
      (err) => {
        console.log(err);
      }
    );
    const auth = Auth.currentUserInfo();
  }
}
