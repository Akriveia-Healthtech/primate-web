import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from 'aws-amplify';
import { routes } from 'src/environments/routes';

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
      this.isPrimateLandingPage = false;
      if (window.location.pathname.length >= 2) {
        this._router.navigate([window.location.pathname]);
      } else {
        this._router.navigate([routes.signUp]);
      }
      console.log('THIS IS THE MAIN SITE');
    } else {
      this.isPrimateLandingPage = true;
      console.log('THIS IS THE Primate landing SITE');
    }
  }

  setbackoff() {
    this._state.setBackdrop_Off();
  }
}
