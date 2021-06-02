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
  options: string[] = [];
  filteredOptions: Observable<string[]>;
  activeStep = {
    step2: true,
    step3: false,
  };
  base64Image = {
    image: '',
    mime: '',
  };

  post = {
    postId: '123e4567-e89b-12d3-a456-426614174000',
    authorId: '972swq08-ja82-9a7d-as8v-as8xc7a6dan8',
    createdDate: 1622044008,
    title: 'The Art Of Writing An Article',
    slug: 'the-art-of-ariting-an-article',
    description:
      'The definite article is the word the. It limits the meaning of a noun to one particular thing. For example, your friend might ask, “Are you going to the party this weekend?”',
    body: `<p> The indefinite <b> article </b> takes two forms. It’s the word a when it precedes a word that begins with a consonant. It’s the word an when it precedes a word that begins with a vowel. The indefinite article indicates that a noun refers to a general idea rather than a particular thing.</p> 
    <p>For example, you might ask your friend, “Should I bring a gift to the party?” Your friend will understand that you are not asking about a specific type of gift or a specific item. “I am going to bring an apple pie,” your friend tells you. Again, the indefinite article indicates that she is not talking about a specific apple pie. Your friend probably doesn’t even have any pie yet. The indefinite article only appears with singular nouns. Consider the following examples of indefinite articles used in context:</p>
    `,
    featuredImg:
      'https://uploads-ssl.webflow.com/5f5fb097a5d1a7e8248a80bd/5f84ababa603ecc62d8f7282_1MT7HgpJN5Qz1UXjEqfw4BA.png',
    tags: ['Article', 'Meditating'],
    reads: 10,
    votes: 7,
    status: 'Published',
  };
  error = {
    state: {
      isDescription: false,
      isCountry: false,
      isImage: false,
      isImageType: false,
      isPrefix: false,
    },
    httpsError: {
      state: false,
      message: '',
    },
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
    this.populateOptions();
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
      const valid = this.checkYourProfileValidity();
      console.log('forum Valid', valid);
      if (valid) {
        this.activeStep = {
          step2: false,
          step3: true,
        };
      }
    } else if (currentStep == 'step3') {
      this.activeStep = {
        step2: true,
        step3: false,
      };
    }
  }

  populateOptions() {
    let self = this;
    this.options = [];
    this._utility
      .getCountriesList()
      .then((data: Array<Object>) => {
        console.log(data);
        data.map((data, index) => {
          self.options.push(data['countryName']);
        });
        console.log(self.options);
      })
      .catch((err) => {
        console.log(err);
      });
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
    let self = this;
    var fileImage = event.target.files[0];
    console.log(fileImage, fileImage.type);
    const valid = fileImage.type.includes('image');
    this.checkImageType(fileImage);

    this.containerImg.nativeElement.src = window.URL.createObjectURL(fileImage);
    let reader = new FileReader();
    reader.readAsArrayBuffer(fileImage);
    reader.onload = function (event) {
      var blob = new Blob([event.target.result]);
      window.URL = window.URL || window.webkitURL;
      var blobURL = window.URL.createObjectURL(blob);
      var image = new Image();
      image.src = blobURL;
      image.onload = function () {
        var resized = self._utility.reSizeImage(image, 100, 100);
        self.base64Image.image = resized.slice(16).toString();
        self.base64Image.mime = fileImage.type;
        console.log(self.base64Image);
      };
    };
  }

  Submit() {
    const TestpayLoad = {
      uuid: this.uuid,
      description: this.signUpFormControl.value.description,
      country: this.countryNameTemp,
      subDomainPrefix: this.signUpFormControl.value.subDomainPrefix,
      image: '',
    };
    console.log(TestpayLoad);
    if (this.signUpFormControl.get('subDomainPrefix').valid) {
      this._auth
        .S3_addUserImg(this.base64Image.image, this.base64Image.mime)
        .then((data) => {
          this.error.httpsError.state = false;

          console.log(data);
          const payLoad = {
            uuid: this.uuid,
            description: this.signUpFormControl.value.description,
            country: this.countryNameTemp,
            subDomainPrefix: this.signUpFormControl.value.subDomainPrefix,
            image: data.imageURL,
          };
          console.log(payLoad);
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
        })
        .catch((err) => {
          console.log(err);
          this.error.httpsError.state = true;
          this.error.httpsError.message = 'Something went wrong, please reload.';
        });
    } else {
      this.error.state.isPrefix = true;
    }
  }

  checkPreFixValid() {
    return this.signUpFormControl.get('subDomainPrefix').valid;
  }

  checkImageType(fileImage) {
    this.error.state.isImageType = !fileImage.type.includes('image');
    console.log(this.error.state.isImageType);
  }
  countryNameTemp = '';
  checkYourProfileValidity() {
    // this.signUpFormControl.setValue({
    //   country: = this.myControlCountry.value;
    // })
    this.countryNameTemp = this.myControlCountry.value;
    if (typeof this.countryNameTemp == 'string') {
      console.log(this.countryNameTemp);
      if (this.countryNameTemp.length < 1) {
        this.error.state.isCountry = true;
      } else {
        this.error.state.isCountry = false;
      }
    } else {
      this.error.state.isCountry = true;
    }
    if (this.base64Image.image.length <= 1) {
      this.error.state.isImage = true;
    } else {
      this.error.state.isImage = false;
    }
    if (!this.signUpFormControl.get('description').valid) {
      this.error.state.isDescription = true;
    } else {
      this.error.state.isDescription = false;
    }
    // console.log(this.error.state);
    return this.error.state.isImage || this.error.state.isCountry || this.error.state.isDescription ? false : true;
  }
}
