import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from 'aws-amplify';

import { StateService } from 'src/app/core/services/state/state.service';
import { UtilityService } from 'src/app/core/utility/utility.service';
import { routes } from 'src/environments/routes';
import { AuthService } from '../../../core/services/auth/auth.service';
import { userLocalStorageDataTemplate } from '../../../core/interfaces/userLocalStorageTemplate';
@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.css'],
})
export class RedirectComponent implements OnInit {
  reDirectState = {
    email: '',
    code: '',
  };
  error = {
    state: {
      isEmail: false,
      isTOU: false,
      isFName: false,
      isLName: false,
    },
    httpsError: {
      state: false,
      message: '',
    },
  };
  responseState;
  constructor(
    private _state: StateService,
    private _utility: UtilityService,
    private _router: Router,
    private _Auth: AuthService
  ) {
    let url = window.location.href;
    this._createMetaState(url);
    this.definationFunction();
  }

  ngOnInit(): void {
    this._state.setPageTitle('Authenticating | Primate ');
  }

  private _createMetaState(url) {
    let urlArray = url.split('/');
    let cypherText = urlArray[urlArray.length - 1];
    let state = cypherText.split(',');
    this.reDirectState = {
      email: state[0],
      code: state[1],
    };
    console.log(state);
  }

  async definationFunction() {
    const user = await this._Auth.AWS_signIn(this.reDirectState.email, this.reDirectState.code);
    if (user == false) {
      this.error.httpsError.state = true;
      this.error.httpsError.message = 'Link Expired!';
      this._state.setAuthentication(false);
    } else {
      user.subscribe(
        (res) => {
          console.log(res);
          let userStorage: userLocalStorageDataTemplate = {
            uuid: res['data']['uuid'],
            name: res['data']['fName'] + ' ' + res['data']['lName'],
            email: res['data']['email'],
            isPro: res['data']['isPro'],
            country: res['data']['country'],
            subDomainPrefix: res['data']['subDomainPrefix'],
            img: res['data']['image'],
            isSetupCompleted_FLAG: res['data']['isSetupCompleted_FLAG'],
          };
          this._utility.LOCAL_STORAGE_SET('user', userStorage);
          console.log('AUTH CODE:', userStorage);
          console.log('Login Success full');
          this._state.setAuthentication(true);
          this.error.httpsError.state = false;
          this._Auth._CheckAuth();
          this._router.navigate([routes.dashBaord]);
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }
}
