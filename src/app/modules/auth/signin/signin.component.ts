import { Component, OnInit } from '@angular/core';
import { UtilityService } from '../../../core/utility/utility.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { routes } from 'src/environments/routes';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  emailValue: string = '';
  signInFormControl: FormGroup;
  emailInvalid: boolean = false;
  error = {
    state: {
      isEmail: false,
      isInvalidPassword: false,
    },
    httpsError: {
      state: false,
      message: '',
    },
  };
  constructor(
    private _auth: AuthService,
    private _router: Router,
    private utils: UtilityService,
    private fb: FormBuilder
  ) {}
  activeStep = {
    step1: true,
    step2: false,
    loginWithPW: false,
  };
  ngOnInit(): void {
    this.initializeForm();
  }
  sendEmail() {
    const vaild = this.validityChecker();
    if (vaild) {
      this._auth
        .sendMagiclink(this.signInFormControl.value.email)
        .then((res) => {
          this.error.httpsError.state = false;
          console.log(res);
          this.nextStep('step1');
        })
        .catch((err) => {
          console.log(err);
          this.error.httpsError.state = true;
          this.error.httpsError.message = err.error.errorDetail.includes('User does not exist.')
            ? 'Invalid email address'
            : 'Something went wrong, reload.';
        });
      console.log(this.signInFormControl.value);
    }
  }
  nextStep(currentStep) {
    console.log(this.signInFormControl.value);
    if (currentStep == 'step1') {
      console.log(this.signInFormControl.get('email').valid);
      this.emailInvalid = this.signInFormControl.get('email').valid ? false : true;
      if (!this.emailInvalid) {
        this.emailValue = this.signInFormControl.value.email;
        this.activeStep = {
          step1: false,
          step2: true,
          loginWithPW: false,
        };
      }
    } else if (currentStep == 'loginWithPW') {
      this.activeStep = {
        step1: false,
        step2: false,
        loginWithPW: true,
      };
    } else if (currentStep == 'loginWithEmail') {
      this.activeStep = {
        step1: true,
        step2: false,
        loginWithPW: false,
      };
    }
  }

  initializeForm(): void {
    this.signInFormControl = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  gotosignup() {
    this._router.navigate([routes.signUp]);
  }
  validityChecker() {
    if (!this.signInFormControl.get('email').valid) {
      this.error.state.isEmail = true;
    } else {
      this.error.state.isEmail = false;
    }
    return this.error.state.isEmail ? false : true;
  }
}

// Sends Signup btn -> Confirm in signUp page -> trys login -> sends mail -> custom auth
// sends signup btn -> send mail -> signup in redirect -> login cust auth -> send mail (coz we dont know pw)
