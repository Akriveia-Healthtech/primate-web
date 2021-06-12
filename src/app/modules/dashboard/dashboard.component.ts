import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { StateService } from 'src/app/core/services/state/state.service';
import { UtilityService } from 'src/app/core/utility/utility.service';
import { routes } from 'src/environments/routes';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(
    private _router: Router,
    private _auth: AuthService,
    private _state: StateService,
    private _utility: UtilityService
  ) {}
  dashboardMenuState = {
    post: true,
    stats: false,
    setting: false,
  };
  user = {
    name: 'Unknown',
    img: '',
  };
  menuState: boolean = false;
  ngOnInit(): void {
    try {
      const localUser = this._utility.LOCAL_STORAGE_GET('user');
      this.user.name = localUser.name;
      this.user.img = localUser.img;
    } catch (e) {}
    // this._state.uuid.subscribe((uuid) => {
    //   console.log(uuid);
    //   this._auth.getUserDetails(uuid).subscribe((data) => {
    //     console.log(data);
    //     this.user = data['data'];
    //   });
    // });
  }
  signOut() {
    this._auth.AWS_signOut();
  }
  toggleMenu() {
    this.menuState = this.menuState ? false : true;
    return this.menuState;
  }
  toggleDashboardPage(pageTo) {
    switch (pageTo) {
      case 'post':
        this.dashboardMenuState = {
          post: true,
          setting: false,
          stats: false,
        };
        this._router.navigate([routes.dashBaord]);
        break;
      case 'stats':
        this.dashboardMenuState = {
          post: false,
          setting: false,
          stats: true,
        };
        this._router.navigate([routes.stats]);

        break;
      case 'settings':
        this.dashboardMenuState = {
          post: false,
          setting: true,
          stats: false,
        };
        this._router.navigate([routes.setting]);

        break;
    }
  }
}
