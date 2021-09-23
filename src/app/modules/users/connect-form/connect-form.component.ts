import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/http/users/user.service';
import { StateService } from 'src/app/core/services/state/state.service';
import { UtilityService } from 'src/app/core/utility/utility.service';
import { routes } from 'src/environments/routes';

@Component({
  selector: 'app-connect-form',
  templateUrl: './connect-form.component.html',
  styleUrls: ['./connect-form.component.css'],
})
export class ConnectFormComponent implements OnInit {
  constructor(
    private _utility: UtilityService,
    private _state: StateService,
    private _router: Router,
    private userService: UserService
  ) {}
  preFix: string = '';
  isLoading: boolean = false;
  user = {
    uuid: '',
    fName: '',
    isPro: false,
    image: '',
    lName: '',
  };
  ngOnInit(): void {
    this.preFix = this._utility.throwSubDomainPreFix();
    if (this.preFix == '') {
      this._router.navigate([routes.error404]);
    }
    console.log('this USER PREFIX:', this.preFix);
    this.isLoading = true;
    this.userService.checkSubdomain(this.preFix).subscribe(
      (data) => {
        console.log(data);
        if (!data.exists) {
          console.log('user not found.');
          this._router.navigate([routes.error404]);
        } else {
          const userData = data.userDetails[0];
          this.user = {
            uuid: userData.uuid.S,
            fName: userData.fName.S,
            isPro: userData.isPro.BOOL,
            image: userData.image.S,
            lName: userData.lName.S,
          };
        }
      },
      (err) => {
        console.log(err);
      }
    );
    console.log(this._router.getCurrentNavigation());
  }

  goBack() {
    console.log(window.location.host);
    window.open(`https://${window.location.host}`, '_self');
  }
}
