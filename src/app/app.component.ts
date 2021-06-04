import { Component } from '@angular/core';
import { Auth } from 'aws-amplify';

import { StateService } from '../app/core/services/state/state.service';
import { AuthService } from './core/services/auth/auth.service';
import { UtilityService } from './core/utility/utility.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Primate';
  backDropState: boolean = false;
  constructor(private _state: StateService, private _auth: AuthService, private _utility: UtilityService) {
    this._auth._CheckAuth();
    this._state.isbackDropON.subscribe((data) => {
      this.backDropState = data;
    });
  }

  setbackoff() {
    this._state.setBackdrop_Off();
  }
}
