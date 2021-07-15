import { Component, OnInit, NgZone, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StateService } from 'src/app/core/services/state/state.service';

import { take } from 'rxjs/operators';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { UtilityService } from 'src/app/core/utility/utility.service';
import { PostService } from 'src/app/core/services/http/post/post.service';
import { routes } from 'src/environments/routes';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css'],
})
export class CreatePostComponent implements OnInit, AfterViewInit {
  error = {
    state: {
      isImage: false,
      isImageType: false,
    },
    httpsError: {
      state: false,
      message: '',
    },
  };
  isLoading: boolean = false;
  constructor(
    private _utility: UtilityService,
    private _state: StateService,
    private _ngZone: NgZone,
    private _router: Router,
    private fb: FormBuilder,
    private httpPost: PostService
  ) {}
  editorModules = {
    toolbar: [
      [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
      ['bold', 'italic'], // toggled buttons
      ['blockquote'],
      ['link', 'image', 'video'], // link and image, video
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
    ],
  };

  postSettingStates = {
    isOn: false,
    isFromPost: false,
    featuredImageEdit: false,
    postURLEdit: false,
  };
  __isEditPage__: Boolean = false;
  user = {
    img: '',
    name: '',
    uuid: '',
  };
  ngAfterViewInit() {
    let self = this;
    if (window.location.pathname.includes(routes.editPost)) {
      const postID = window.location.pathname.slice(20);
      self.__isEditPage__ = true;
      self._state.setPageTitle('Edit post | Primate ');
      self._loadPost(postID);
    } else {
      self._state.setPageTitle('Create a post | Primate ');
    }
  }
  ngOnInit(): void {
    this.lastSavedTime = 'Today';
    this.initializeForm();
    this.ngAfterViewInit();
    // window.addEventListener('load', function (event) {});
    this.user = this._utility.LOCAL_STORAGE_GET('user');
  }

  postFormControl: FormGroup;
  postData = {};
  initializeForm(): void {
    this.postFormControl = this.fb.group({
      title: ['', Validators.required],
      subTitle: ['', Validators.required],
      body: ['', Validators.required],
      customSlug: [''],
      img: ['', Validators.required],
    });
  }
  __populateEditablePost__(title, desc, body, img, slug) {
    this.postFormControl.controls['customSlug'].setValue(slug);
    this.postFormControl.controls['title'].setValue(title);
    this.postFormControl.controls['body'].setValue(body);
    this.postFormControl.controls['img'].setValue(img);
    this.postFormControl.controls['subTitle'].setValue(desc);
    if (img.length >= 2 && img !== undefined) {
      var elem = document.getElementById('editPostImg');
      this.base64Image.preview = true;
      console.log(elem);
      elem['src'] = img;
    }
  }
  changedEditor(event) {
    if (event['html'] !== undefined) {
      this.postFormControl.controls['body'].setValue(event['html']);
    }
    // console.log(this.postFormControl.value);
  }

  @ViewChild('autosizeSubTitle') autosizeSubTitle: CdkTextareaAutosize;

  triggerResizeSubtitle() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable.pipe(take(1)).subscribe(() => this.autosizeSubTitle.resizeToFitContent(true));
  }

  @ViewChild('autosizeTitle') autosizeTitle: CdkTextareaAutosize;

  triggerResizeTitle() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable.pipe(take(1)).subscribe(() => this.autosizeTitle.resizeToFitContent(true));
  }

  toggleFeatureEditState() {
    this.postSettingStates.featuredImageEdit = this.postSettingStates.featuredImageEdit ? false : true;
  }

  togglePostURLEditState() {
    this.postSettingStates.postURLEdit = this.postSettingStates.postURLEdit ? false : true;
  }

  toggleSetting(isFromPost = false) {
    this.postFormControl.controls['customSlug'].setValue(this._utility.slugify(this.postFormControl.value.title));
    this.postSettingStates.isOn = this.postSettingStates.isOn ? false : true;
    this.postSettingStates.isFromPost = isFromPost;
  }

  saveFeaturedImg() {
    this.base64Image.confirmed = true;
    this.toggleFeatureEditState();
  }

  saveNewSlug(value) {
    console.log(value);
    this.postFormControl.controls['customSlug'].setValue(this._utility.slugify(value));
    this.togglePostURLEditState();
  }

  @ViewChild('uploadImg') uploadImgElem;
  @ViewChild('containerImg') containerImg;
  clickImgButton() {
    this._utility.systemLog('UPload clicked', 'debug');
    this.uploadImgElem.nativeElement.click();
  }
  base64Image = {
    confirmed: false,
    preview: false,
    image: '',
    mime: '',
  };
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
        var resized = self._utility.reSizeImage(image, 720, 447);
        console.log(resized);
        self.base64Image.image = resized.slice(16).toString();
        self.base64Image.mime = fileImage.type;
        self.base64Image.preview = true;
        console.log(self.base64Image);
      };
    };
  }
  lastSavedTime = 'Today';
  checkImageType(fileImage) {
    this.error.state.isImageType = !fileImage.type.includes('image');
    console.log(this.error.state.isImageType);
  }
  editingPostData = { title: '', description: '', body: '', featuredImg: '' };
  _loadPost(id) {
    this.isLoading = true;
    this._state.authToken.subscribe((jwt) => {
      console.log(id);
      this.httpPost.getPost(id, jwt).subscribe(
        (data) => {
          this.isLoading = false;
          this.editingPostData = data['data'];

          this.lastSavedTime = this._utility.formatCreatedDate(this.editingPostData['createdDate']);
          var editor = document.getElementsByClassName('ql-editor');
          console.log('loading post');
          editor.item(0).innerHTML = this.editingPostData.body;
          console.log(this.editingPostData);
          this.__populateEditablePost__(
            this.editingPostData.title,
            this.editingPostData.description,
            this.editingPostData.body,
            this.editingPostData.featuredImg,
            data['data'].slug
          );
        },
        (error) => {
          console.log(error);
        }
      );
    });
  }

  postFunction(inComplete = false) {
    const post = {
      author: {
        uuid: this.user.uuid,
        name: this.user.name,
        img: this.user.img,
      },
      title: this.postFormControl.value.title,
      slug: this.postFormControl.value.customSlug == '' ? null : this.postFormControl.value.customSlug,
      description: this.postFormControl.value.subTitle,
      body: this.postFormControl.value.body,
      featuredImg: this.base64Image.confirmed ? this.base64Image : '',
      tags: [],
      status: inComplete ? 'DRAFT' : 'PUBLISHED',
    };
    if (!this.__isEditPage__) {
      this._state.authToken.subscribe((token) => {
        if (post.featuredImg != '') {
          this.httpPost
            .S3_addFeaturedImg(this.base64Image.image, this.base64Image.mime)
            .then((res) => {
              console.log(res);
              post.featuredImg = res.imageURL;
              this.httpPost.addANewPost(post, token).subscribe(
                (data) => {
                  console.log(data);
                  this._router.navigate([routes.dashBaord]);
                },
                (error) => {
                  console.log(error);
                }
              );
            })
            .catch((e) => {
              console.log(e);
            });
        } else {
          this.httpPost.addANewPost(post, token).subscribe(
            (data) => {
              console.log(data);
              this._router.navigate([routes.dashBaord]);
            },
            (error) => {
              console.log(error);
            }
          );
        }
      });
      console.log(post);
    } else {
      this.__updatePost__(post);
    }
  }

  checkEligibleForDraft() {
    const draftPost = {
      title: this.postFormControl.value.title,
      slug: this.postFormControl.value.customSlug == '' ? null : this.postFormControl.value.customSlug,
      description: this.postFormControl.value.subTitle,
      body: this.postFormControl.value.body,
      featuredImg: this.base64Image.confirmed ? this.base64Image : '',
    };

    if (this.__isEditPage__) {
      this._router.navigate([routes.dashBaord]);
    } else {
      if (draftPost.title.length >= 5 || draftPost.description.length >= 5 || draftPost.body.length >= 5) {
        this.postFunction(true);
      } else {
        this._router.navigate([routes.dashBaord]);
      }
    }
  }

  __updatePost__(data) {
    console.log(data);
  }

  __deletePost__(postID) {
    if (postID !== undefined) {
      let imgFile = this.editingPostData.featuredImg;

      this._state.authToken.subscribe((token) => {
        this.httpPost.deletePost(postID, token).subscribe(
          (data) => {
            console.log(data);
            if (imgFile.length >= 2 || imgFile !== undefined) {
              console.log('has Image');
              let File = this.editingPostData.featuredImg;
              let FileHandle = File.split('/')[File.split('/').length - 1];
              this.httpPost.deleteFeaturedImg(FileHandle, token).subscribe(
                (data) => {
                  console.log(data);
                },
                (error) => {
                  console.log(error);
                }
              );
            }
            this._router.navigate([routes.dashBaord]);
          },
          (error) => {
            console.log(error);
          }
        );
      });
    } else {
      this._router.navigate([routes.dashBaord]);
    }
  }
}
