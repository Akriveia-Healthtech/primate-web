import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from 'src/app/core/services/http/post/post.service';
import { UserService } from 'src/app/core/services/http/users/user.service';
import { StateService } from 'src/app/core/services/state/state.service';
import { UtilityService } from 'src/app/core/utility/utility.service';
import { routes } from 'src/environments/routes';

@Component({
  selector: 'app-post-preview',
  templateUrl: './post-preview.component.html',
  styleUrls: ['./post-preview.component.css'],
})
export class PostPreviewComponent implements OnInit {
  constructor(
    private _utility: UtilityService,
    private _state: StateService,
    private _router: Router,
    private userService: UserService,
    private httpPost: PostService
  ) {
    this._state.isbackDropON.subscribe((data) => {
      if (!data) {
        this.menuState = false;
      }
    });
  }
  isLoading: boolean = false;
  isLoadingPost = true;
  uuid: string = '';
  postData = {
    title: '',
    description: '',
    body: ``,
    author: {
      img: '',
      name: '',
      uuid: '',
    },
    votes: 0,
    createdDate: 0,
    useAbleDate: '',
    featuredImg: '',
  };
  authorPosts = {
    PostList: [],
    TotalSize: 0,
    LastEvaluatedKey: null,
  };
  preFix: string = '';
  user = {
    uuid: '',
    fName: '',
    isPro: false,
    image: '',
    lName: '',
  };
  ngOnInit(): void {
    const postID = window.location.pathname.slice(1);
    console.log('ID:', postID);

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
          this._loadPost(postID);
        }
      },
      (err) => {
        console.log(err);
      }
    );
    console.log(this._router.getCurrentNavigation());
  }
  _loadPost(id) {
    this.isLoadingPost = true;
    this._state.authToken.subscribe((jwt) => {
      console.log(id);
      this.httpPost.getPost(id, jwt).subscribe(
        (data) => {
          this.postData = data['data'];
          console.log(this.postData);
          if (data['data'] === undefined) {
            this._router.navigate([routes.error404]);
          }
          this.uuid = this.postData['authorID'];
          if (this.crossCheckAuthor(this.uuid, this.user.uuid)) {
            console.log('user matched!');
            this._state.setPageTitle(`${this.postData['title']}  | Primate `);
            this._loadAllPostData();
            this.postData['useAbleDate'] =
              new Date(this.postData['createdDate'] * 1000).toLocaleString('default', { month: 'short' }) +
              ' ' +
              new Date(this.postData['createdDate'] * 1000).getDate();
          } else {
            this._router.navigate([routes.error404]);
          }
          this.isLoadingPost = false;
        },
        (error) => {
          this.isLoadingPost = false;

          console.log(error);
        }
      );
    });
  }

  _loadAllPostData() {
    this.isLoading = true;

    this.httpPost.getAllPost(null, null, this.uuid).subscribe(
      (data) => {
        this._loadResponseData(data);
      },
      (err) => {
        this.isLoading = false;
        console.log(err);
      }
    );
  }

  _loadResponseData(data) {
    console.log(data);
    let displayPost = [];

    this.authorPosts = {
      PostList: [],
      TotalSize: 0,
      LastEvaluatedKey: null,
    };
    try {
      this.authorPosts.LastEvaluatedKey = data.LastEvaluatedKey;
    } catch (e) {
      this.authorPosts.LastEvaluatedKey = null;
    }
    data.posts.map((data) => {
      let readyData = data;
      if (data.status.S == 'PUBLISHED') {
        if (data.isPinned !== undefined) {
          this.isLoading = true;
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
    console.log('diplsu');
    console.log(displayPost);
    this.authorPosts.PostList = this._utility.reArrangePostData(
      displayPost.slice(this._utility.getRandomInt(0, 2), this._utility.getRandomInt(3, 5))
    );
    this.authorPosts.TotalSize = data.TotalSize;
    this.authorPosts.PostList.map((data) => {
      data.createdDate = this._utility.formatCreatedDate(data.createdDate, 'long', true, false);
      data.reads = this._utility.kFormatter(data.reads);
      data.votes = this._utility.kFormatter(data.votes);

      // console.log(data.featuredImg);
    });
    console.log(this.authorPosts);

    this.isLoading = false;
  }

  crossCheckAuthor(postUUID, prefixUUID): boolean {
    return postUUID == prefixUUID ? true : false;
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
  redirectToSignin() {
    this._state.setBackdrop_Off();
    this._router.navigate([routes.signIp]);
  }

  redirectToAuthorLP() {
    window.open(`https://${this.preFix}.primate.health`, '_self');
  }
}
