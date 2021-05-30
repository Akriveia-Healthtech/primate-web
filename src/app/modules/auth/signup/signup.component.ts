import { Component, OnInit, ViewChild } from '@angular/core';
import { UtilityService } from 'src/app/core/utility/utility.service';
// import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { SignUpDataTemplate } from '../../../core/interfaces/signUpDataTemplate';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { StateService } from 'src/app/core/services/state/state.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  myControlCountry = new FormControl();
  signUpFormControl: FormGroup;
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
  signUpUserData: SignUpDataTemplate = {
    fName: '',
    lName: '',
    email: '',
    password: '',
    description: '',
    country: '',
    subDomainPrefix: '',
    isPro: false,
    isSetupCompleted_FLAG: false,
    image: '',
    isVerified: true,
    uuid: '',
    oneLiner: '',
  };

  emailInvalid: boolean = false;

  constructor(
    private _router: Router,
    private fb: FormBuilder,
    private _auth: AuthService,
    private _state: StateService,
    private _utility: UtilityService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.signUpFormControl = this.fb.group({
      email: ['', Validators.required],
      fName: ['', Validators.required],
      lName: ['', Validators.required],
      acceptToTOU: ['', Validators.required],
    });
  }
  gotosignin() {
    this._router.navigate(['/auth/signin']);
  }
  validityChecker() {
    if (!this.signUpFormControl.get('email').valid) {
      this.error.state.isEmail = true;
    } else {
      this.error.state.isEmail = false;
    }
    if (!this.signUpFormControl.get('fName').valid) {
      this.error.state.isFName = true;
    } else {
      this.error.state.isFName = false;
    }
    if (!this.signUpFormControl.get('lName').valid) {
      this.error.state.isLName = true;
    } else {
      this.error.state.isLName = false;
    }
    if (!this.signUpFormControl.value.acceptToTOU) {
      this.error.state.isTOU = true;
    } else {
      this.error.state.isTOU = false;
    }
    return this.error.state.isEmail || this.error.state.isFName || this.error.state.isTOU || this.error.state.isLName
      ? false
      : true;
  }
  register() {
    let valid = this.validityChecker();
    if (valid) {
      console.log(this.signUpFormControl.value);
      let uploadData: SignUpDataTemplate = {
        uuid: '',
        isSetupCompleted_FLAG: false,
        isVerified: true,
        fName: this.signUpFormControl.value.fName,
        lName: this.signUpFormControl.value.lName,
        email: this.signUpFormControl.value.email,
        password: this.signUpFormControl.value.password,
        description: this.signUpFormControl.value.description,
        country: this.signUpFormControl.value.country,
        subDomainPrefix: this.signUpFormControl.value.subDomainPrefix,
        image: '',
        isPro: false,
        oneLiner: '',
      };
      let randomPassword = this.generatePassword();
      console.log(randomPassword);

      this._auth
        .AWS_signUp(uploadData.email, randomPassword)
        .then((res) => {
          uploadData.uuid = res.userSub;
          console.log('setting up user . . . ');
          let userStorage = {
            uuid: uploadData.uuid,
            name: uploadData.fName + ' ' + uploadData.lName,
            email: uploadData.email,
            isPro: uploadData.isPro,
            isSetupCompleted_FLAG: uploadData.isSetupCompleted_FLAG,
          };
          this._auth
            .dynamoDB_addUser(uploadData)
            .then((res) => {
              this.error.httpsError.state = false;
              console.log(res);
              this._auth
                .AWS_signInWithPassword(uploadData.email, randomPassword)
                .then((res) => {
                  console.log('login succesfull!');
                  this._state.setAuthentication(true);
                  this._utility.LOCAL_STORAGE_SET('user', userStorage);
                  this.error.httpsError.state = false;
                  this._router.navigate(['/auth/setup']);
                })
                .catch((err) => {
                  console.log(err);
                  this.error.httpsError.state = true;
                  this.error.httpsError.message = 'Something went terribly wrong, Try using login Service';
                });
            })
            .catch((err) => {
              this.error.httpsError.state = true;
              this.error.httpsError.message = 'User Creds Could not be stored';
              console.log(err);
            });
        })
        .catch((err) => {
          this.error.httpsError.state = true;
          this.error.httpsError.message = err.message;
          console.log(err);
        });
    }
  }
  generatePassword() {
    var length = 8,
      charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
      retVal = '';
    for (var i = 0, n = charset.length; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
  }
}
