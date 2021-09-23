import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { PostService } from '../../../core/services/http/post/post.service';
import { PostDataTemplate } from '../../../core/interfaces/postDataTemplate';
import { StateService } from 'src/app/core/services/state/state.service';
import { FormControl, FormGroup } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { UtilityService } from 'src/app/core/utility/utility.service';

import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { routes } from 'src/environments/routes';
import { Router } from '@angular/router';
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  constructor(
    private _router: Router,
    private _utility: UtilityService,
    private _postHttp: PostService,
    private _state: StateService
  ) {}
  filterMenuState: boolean = false;

  filter = {
    activeFilterNumber: 0,
    status: {
      status: false,
      shared: false,
      draft: false,
    },
    date: {
      status: false,
      startDate: '',
      endDate: '',
    },
  };
  PostData = {
    PostList: [],
    TotalSize: 0,
    LastEvaluatedKey: null,
  };
  contentType: string = 'All';

  postDataStruct = {
    postID: '',
    slug: '',
    createdDate: 0,
    reads: '',
    votes: 0,
    authorID: '',
    author: {
      name: '',
      img: '',
    },
    title: '',
    description: '',
    body: '',
    featuredImg: '',
    tags: [],
    status: '',
  };
  currentPinnedPostId = '';
  isLoading: boolean = false;
  ngOnInit(): void {
    this.piningFunction = this._piningFunction.bind(this);
    this.editPostFunction = this._editPost.bind(this);
    this._state.setPageTitle('Dashboard | Primate ');

    this._loadAllPostData();
  }
  changeContentType(string: 'Drafts' | 'Shared' | 'All') {
    this.contentType = string;
  }
  toggleFilterOption() {
    this.filterMenuState = this.filterMenuState ? false : true;
  }
  toggleFilter(filter: string) {
    switch (filter.toUpperCase()) {
      case 'STATUS':
        if (!this.filter.status.status) {
          this.filter.status.status = true;
          this.filter.status.shared = true;
          this.filter.status.draft = false;
          if (this.filter.date.endDate.length >= 2 && this.filter.date.startDate.length >= 2) {
            this._loadFilterData('PUBLISHED', this.filter.date.startDate, this.filter.date.endDate);
            this.filter.activeFilterNumber = 2;
          } else {
            this._loadFilterData('PUBLISHED');
            this.filter.activeFilterNumber = 1;
          }
          this.changeContentType('Shared');
        } else {
          this._loadAllPostData();
          this.filter.status.status = false;
          this.filter.status.shared = false;
          this.filter.status.draft = false;
          this.filter.activeFilterNumber -= 1;
          this.changeContentType('All');
        }
        break;
      case 'SHARED':
        if (!this.filter.status.shared) {
          this.filter.status.status = true;
          this.filter.status.shared = true;
          this.filter.status.draft = false;
          if (this.filter.date.endDate.length >= 2 && this.filter.date.startDate.length >= 2) {
            this._loadFilterData('PUBLISHED', this.filter.date.startDate, this.filter.date.endDate);
            this.filter.activeFilterNumber = 2;
          } else {
            this._loadFilterData('PUBLISHED');
            this.filter.activeFilterNumber = 1;
          }
          this.changeContentType('Shared');
        } else {
          this.filter.status.status = false;
          this.filter.status.shared = false;
          this.filter.status.draft = false;
          this.changeContentType('All');
          this.filter.activeFilterNumber -= 1;

          this._loadAllPostData();
        }
        break;
      case 'DRAFTS':
        if (!this.filter.status.draft) {
          this.filter.status.status = true;
          this.filter.status.shared = false;
          this.filter.status.draft = true;
          if (this.filter.date.endDate.length >= 2 && this.filter.date.startDate.length >= 2) {
            this._loadFilterData('DRAFT', this.filter.date.startDate, this.filter.date.endDate);
            this.filter.activeFilterNumber = 2;
          } else {
            this.filter.activeFilterNumber = 1;

            this._loadFilterData('DRAFT');
          }
          this.changeContentType('Drafts');
        } else {
          this.filter.status.status = false;
          this.filter.status.shared = false;
          this.filter.status.draft = false;
          this.changeContentType('All');
          this.filter.activeFilterNumber -= 1;

          this._loadAllPostData();
        }
        break;
      case 'DATE':
        if (!this.filter.date.status) {
          this.filter.date.status = true;
        } else {
          this.filter.date.status = false;
          this.filter.activeFilterNumber -= 1;

          this._loadAllPostData();
        }
        break;
    }
  }

  filterDate(end: HTMLInputElement, start: HTMLInputElement) {
    // console.log(new Date(end.value), new Date(start.value));
    if (end.value.length >= 3 && start.value.length >= 3) {
      this.filter.date.startDate = Math.round(new Date(start.value).getTime() / 1000).toString();
      this.filter.date.endDate = Math.round(new Date(end.value).getTime() / 1000).toString();
      console.log(this.filter);
      this.filter.activeFilterNumber += 1;

      if (this.filter.status.shared) {
        this._loadFilterData('PUBLISHED', this.filter.date.startDate, this.filter.date.endDate);
      } else if (this.filter.status.draft) {
        this._loadFilterData('DRAFT', this.filter.date.startDate, this.filter.date.endDate);
      } else {
        this._loadFilterData(null, this.filter.date.startDate, this.filter.date.endDate);
      }
    }
  }

  public piningFunction: Function;

  _piningFunction(newPinnedPostId) {
    this.isLoading = true;
    this._state.authToken.subscribe((res) => {
      if (res) {
        this._postHttp
          .pinPost(this.currentPinnedPostId == '' ? null : this.currentPinnedPostId, newPinnedPostId, res)
          .subscribe(
            (data) => {
              console.log(data);
              this._loadAllPostData();
            },
            (err) => {
              console.log(err);
              this.isLoading = false;
            }
          );
      }
    });
  }

  public editPostFunction: Function;
  _editPost(postID) {
    console.log(postID);
    this._router.navigate([routes.editPost, postID]);
  }
  _loadAllPostData() {
    this.isLoading = true;
    this._state.authToken.subscribe((res) => {
      console.log(res);
      if (res) {
        this._postHttp.getAllPost(null, res, null).subscribe(
          (data) => {
            this.isLoading = false;
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

  _loadFilterData(status: null | string = null, startDate: null | string = null, endDate: null | string = null) {
    this.isLoading = true;
    this._postHttp.filterPost(status, startDate, endDate).subscribe(
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

    this.PostData.PostList = this._utility.reArrangePostData(data.posts);
    this.PostData.TotalSize = data.TotalSize;
    this.PostData.PostList.map((data) => {
      data.createdDate = this._utility.formatCreatedDate(data.createdDate);
      data.reads = this._utility.kFormatter(data.reads);
      data.votes = this._utility.kFormatter(data.votes);
      // console.log(data.featuredImg);
    });
    console.log(this.PostData);
    if (this.PostData.PostList[0].isPinned !== undefined && this.PostData.PostList[0].isPinned == true) {
      this.currentPinnedPostId = this.PostData.PostList[0].postID;
      this._utility.systemLog(`Pinned Post Id: ${this.currentPinnedPostId}`, 'info');
    }
    this.isLoading = false;
  }

  nagivate_CreatePost() {
    this._router.navigate([routes.createPost]);
  }

  postContainerClickEventRecorder() {
    console.log('Click on post event');
    if (this.filterMenuState) {
      this.filterMenuState = false;
    }
  }
}
