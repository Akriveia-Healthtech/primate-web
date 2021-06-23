import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from 'src/app/core/services/http/post/post.service';
import { StateService } from 'src/app/core/services/state/state.service';
import { UtilityService } from 'src/app/core/utility/utility.service';
import { routes } from 'src/environments/routes';
import { UserService } from '../../../core/services/http/users/user.service';
@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
})
export class LandingPageComponent implements OnInit {
  preFix: string = '';
  show: boolean = false;
  PostData = {
    PostList: [],
    TotalSize: 0,
    LastEvaluatedKey: null,
  };
  user = {
    uuid: '',
    isSetupCompleted_FLAG: '',
    isVerified: false,
    fName: '',
    isPro: false,
    image: '',
    oneLiner: '',
    lName: '',
    email: '',
    description: '',
    country: '',
  };
  constructor(
    private _utility: UtilityService,
    private _postHttp: PostService,
    private _state: StateService,
    private userService: UserService,
    private _router: Router
  ) {
    // this.preFix = window.location.href.split('/')[4];
    this.preFix = this._utility.throwSubDomainPreFix();
    if (this.preFix == '') {
      this._router.navigate([routes.error404]);
    }
    console.log('this USER PREFIX:', this.preFix);
    this.userService.checkSubdomain(this.preFix).subscribe(
      (data) => {
        console.log(data);
        if (!data.exists) {
          this._router.navigate([routes.error404]);
        } else {
          const userData = data.userDetails[0];
          this.user = {
            uuid: userData.uuid.S,
            isSetupCompleted_FLAG: userData.isSetupCompleted_FLAG.BOOL,
            isVerified: userData.isVerified.BOOL,
            fName: userData.fName.S,
            isPro: userData.isPro.BOOL,
            image: userData.image.S,
            oneLiner: userData.oneLiner.S,
            lName: userData.lName.S,
            email: userData.email.S,

            description: userData.description.S,
            country: userData.country.S,
          };
          // this._loadAllPostData();
          this.show = true;
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  ngOnInit(): void {}

  _loadAllPostData() {
    this.isLoading = true;
    this._state.authToken.subscribe((res) => {
      // console.log(res);
      if (res) {
        this._postHttp.getAllPost(null, res).subscribe(
          (data) => {
            this._loadResponseData(data);
          },
          (err) => {
            this.isLoading = false;
            console.log(err);
          }
        );
      }
    });
  }
  isLoading: boolean = false;

  _loadResponseData(data) {
    console.log(data);
    let displayPost = [];

    this.PostData = {
      PostList: [],
      TotalSize: 0,
      LastEvaluatedKey: null,
    };
    try {
      this.PostData.LastEvaluatedKey = data.LastEvaluatedKey;
    } catch (e) {
      this.PostData.LastEvaluatedKey = null;
    }
    data.posts.map((data) => {
      if (data.status.S == 'PUBLISHED') {
        displayPost.push(data);
      }
    });
    this.PostData.PostList = this._utility.reArrangePostData(displayPost.slice(0, 3));
    this.PostData.TotalSize = data.TotalSize;
    this.PostData.PostList.map((data) => {
      data.createdDate = this._utility.formatCreatedDate(data.createdDate);
      data.reads = this._utility.kFormatter(data.reads);
      data.votes = this._utility.kFormatter(data.votes);

      // console.log(data.featuredImg);
    });
    console.log(this.PostData);
    this.isLoading = false;
  }
}
