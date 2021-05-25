import { Component, OnInit, ViewChild } from '@angular/core';
// import { SignUpDataTemplate } from 'src/app/core/interfaces/signUpDataTemplate';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { routes } from '../../../../environments/routes';
import { map, startWith } from 'rxjs/operators';
import { SignUpDataTemplate } from '../../../core/interfaces/signUpDataTemplate';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { StateService } from 'src/app/core/services/state/state.service';
import { UtilityService } from 'src/app/core/utility/utility.service';
@Component({
  selector: 'app-profile-setup',
  templateUrl: './profile-setup.component.html',
  styleUrls: ['./profile-setup.component.css'],
})
export class ProfileSetupComponent implements OnInit {
  myControlCountry = new FormControl();
  signUpFormControl: FormGroup;
  options: string[] = ['Nepal', 'India', 'USA', 'United Kingdom'];
  filteredOptions: Observable<string[]>;
  activeStep = {
    step2: true,
    step3: false,
  };
  emailInvalid: boolean = false;
  uuid: string;
  constructor(
    private _state: StateService,
    private _router: Router,
    private fb: FormBuilder,
    private _auth: AuthService,
    private _utility: UtilityService
  ) {}
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
  ngOnInit(): void {
    this.initializeForm();
    this._state.uuid.subscribe((res) => {
      this.uuid = res;
    });
    this.filteredOptions = this.myControlCountry.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter((option) => option.toLowerCase().indexOf(filterValue) === 0);
  }
  nextStep(currentStep) {
    console.log(this.signUpFormControl.value);
    if (currentStep == 'step2') {
      this.activeStep = {
        step2: false,
        step3: true,
      };
    } else if (currentStep == 'step3') {
      this.activeStep = {
        step2: true,
        step3: false,
      };
    }
  }
  @ViewChild('uploadImg') uploadImgElem;
  @ViewChild('containerImg') containerImg;
  initializeForm(): void {
    this.signUpFormControl = this.fb.group({
      description: ['', Validators.required],
      country: ['', Validators.required],
      subDomainPrefix: ['', Validators.required],
      userImg: ['', Validators.required],
      acceptToTOU: [false, Validators.required],
    });
  }
  clickImgButton() {
    this.uploadImgElem.nativeElement.click();
  }
  uploadImgFunction(event) {
    var image = event.target.files[0];
    console.log(image);
    this.containerImg.nativeElement.src = window.URL.createObjectURL(image);
    let reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = () => {
      console.log(reader.result);
    };
    this._auth
      .S3_addUserImg(image)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  Submit() {
    console.log(this.uuid);
    const payLoad = {
      uuid: this.uuid,
      description: this.signUpFormControl.value.description,
      country: this.signUpFormControl.value.country,
      subDomainPrefix: this.signUpFormControl.value.subDomainPrefix,
      image: this.signUpFormControl.value.userImg,
    };
    this._auth
      .dynamoDB_updateSetupUser(payLoad)
      .then((res) => {
        //TODO:: Pass it in to the api as well coz backend data will not update it self
        console.log(res);
        let user = this._utility.LOCAL_STORAGE_GET('user');
        user.isSetupCompleted_FLAG = true;
        this._utility.LOCAL_STORAGE_DELETE('user');
        this._utility.LOCAL_STORAGE_SET('user', user);
        this._router.navigate([routes.dashBaord]);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
