import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from 'aws-amplify';
import { routes } from 'src/environments/routes';
import { Title } from '@angular/platform-browser';

import { StateService } from '../app/core/services/state/state.service';
import { AuthService } from './core/services/auth/auth.service';
import { UtilityService } from './core/utility/utility.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Primate';
  backDropState: boolean = false;
  constructor(
    private _router: Router,
    private _state: StateService,
    private _auth: AuthService,
    private _title: Title,
    private _utility: UtilityService
  ) {
    this._auth._CheckAuth();
    this._state.isbackDropON.subscribe((data) => {
      this.backDropState = data;
    });
  }
  isPrimateLandingPage: boolean = false;
  ngOnInit(): void {
    if (!this._utility.checkSubdomainInput()) {
      // this.isPrimateLandingPage = false;
      const urlSearchParams = new URLSearchParams(window.location.search);
      const myParam = urlSearchParams.get('search_key');

      const pathUrl = window.location.href.split(window.location.host)[1];
      if (pathUrl.length >= 2) {
        if (window.location.search) {
          let urla = pathUrl.split(window.location.search);
          this._router.navigate([urla[0]], { queryParams: { search_key: urlSearchParams.get('search_key') } });
        } else {
          this._router.navigate([pathUrl]);
        }
        console.log(pathUrl);
      } else {
        this._router.navigate([routes.signIp]);
      }
      this._utility.systemLog('THIS IS THE MAIN SITE', 'info');
    } else {
      // this.isPrimateLandingPage = true;
      this._utility.systemLog('THIS IS THE Primate landing SITE', 'info');
    }

    this._state.pageTitle.subscribe((data) => {
      this._title.setTitle(data);
    });
  }

  setbackoff() {
    this._state.setBackdrop_Off();
  }
}
