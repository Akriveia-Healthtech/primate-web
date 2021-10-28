import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routes } from 'src/environments/routes';
import { StateService } from '../../services/state/state.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(private _router: Router, private _state: StateService) {}

  ngOnInit(): void {
    this._state.isbackDropON.subscribe((data) => {
      if (!data) {
        this.menuState = false;
      }
    });
  }
  menuState: boolean = false;
  toggleMenu() {
    this.menuState = this.menuState ? false : true;
    if (this.menuState) {
      this._state.setBackdrop_On();
    } else {
      this._state.setBackdrop_Off();
    }
    return this.menuState;
  }
  @Input() userLandingPage: boolean = false;
  redirectToSignin() {
    this._state.setBackdrop_Off();
    this._router.navigate([routes.signIp]);
  }

  checkError(key) {
    if (key.length <= 0) {
      document.getElementById('searchInput').classList.add('redBorder');
    } else {
      document.getElementById('searchInput').classList.remove('redBorder');
    }
  }
  search(key) {
    if (key.length <= 0) {
      document.getElementById('searchInput').classList.add('redBorder');
    } else {
      this._router.navigate([routes.searchResult], { queryParams: { search_key: key } });
    }
  }
}
