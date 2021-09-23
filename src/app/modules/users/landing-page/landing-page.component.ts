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
    subDomainPrefix: '',
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
          console.log('user not found.');
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
            subDomainPrefix: userData.subDomainPrefix.S,
            oneLiner: userData.oneLiner.S,
            lName: userData.lName.S,
            email: userData.email.S,
            description: userData.description.S,
            country: userData.country.S,
          };
          this._state.setPageTitle(`${this.user.fName} ${this.user.lName} | Primate `);

          this._loadAllPostData();
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
    this._postHttp.getAllPost(null, null, this.user.uuid).subscribe(
      (data) => {
        this._loadResponseData(data);
      },
      (err) => {
        this.isLoading = false;
        console.log(err);
      }
    );
  }
  isLoading: boolean = false;
  TotalPostList = [];
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
      let readyData = data;
      if (data.status.S == 'PUBLISHED') {
        if (data.isPinned !== undefined) {
          if (data.isPinned.BOOL) {
            if (displayPost[0] === undefined) {
              readyData = data;
            } else {
              readyData = displayPost[0];
              displayPost[0] = data;
            }
          }
        }
        displayPost.push(readyData);
      }
    });
    this.TotalPostList = displayPost;
    this.PostData.PostList = this._utility.reArrangePostData(
      this.TotalPostList.slice(this.postState.start, this.postState.size + this.postState.start)
    );
    this.PostData.TotalSize = data.TotalSize;
    this.PostData.PostList.map((data) => {
      data.createdDate = this._utility.formatCreatedDate(data.createdDate, 'long', true, false);
      data.reads = this._utility.kFormatter(data.reads);
      data.votes = this._utility.kFormatter(data.votes);

      // console.log(data.featuredImg);
    });
    console.log(this.PostData);
    this.checkShowMoreEvent(this.PostData.PostList);
    this.isLoading = false;
  }
  postState = {
    start: 0,
    size: 3,
    page: 1,
    isShowMore: false,
    previous: 0,
  };
  showMore() {
    this.postState.page += 1;
    this.PostData.PostList = this._utility.reArrangePostData(
      this.TotalPostList.slice(this.postState.start, this.postState.start + this.postState.size * this.postState.page)
    );
    this.PostData.PostList.map((data) => {
      data.createdDate = this._utility.formatCreatedDate(data.createdDate, 'long', true, false);
      data.reads = this._utility.kFormatter(data.reads);
      data.votes = this._utility.kFormatter(data.votes);

      // console.log(data.featuredImg);
    });
    this.checkShowMoreEvent(this.PostData.PostList);
  }

  checkShowMoreEvent(list) {
    if (list.length < this.TotalPostList.length) {
      this.postState.isShowMore = true;
    } else {
      this.postState.isShowMore = false;
    }
  }

  __connect() {
    this._router.navigate([routes.connect]);
  }
}
