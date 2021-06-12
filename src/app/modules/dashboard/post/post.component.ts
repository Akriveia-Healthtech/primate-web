import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { PostService } from '../../../core/services/http/post/post.service';
import { PostDataTemplate } from '../../../core/interfaces/postDataTemplate';
import { StateService } from 'src/app/core/services/state/state.service';
import { FormControl, FormGroup } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { UtilityService } from 'src/app/core/utility/utility.service';

import { MatDatepickerInputEvent } from '@angular/material/datepicker';
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  constructor(private _utility: UtilityService, private _postHttp: PostService, private _state: StateService) {}
  filterMenuState: boolean = false;

  filter = {
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
  isLoading: boolean = false;
  ngOnInit(): void {
    this._loadAllPostData();
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
          } else {
            this._loadFilterData('PUBLISHED');
          }
        } else {
          this._loadAllPostData();
          this.filter.status.status = false;
          this.filter.status.shared = false;
          this.filter.status.draft = false;
        }
        break;
      case 'SHARED':
        if (!this.filter.status.shared) {
          this.filter.status.status = true;
          this.filter.status.shared = true;
          this.filter.status.draft = false;
          if (this.filter.date.endDate.length >= 2 && this.filter.date.startDate.length >= 2) {
            this._loadFilterData('PUBLISHED', this.filter.date.startDate, this.filter.date.endDate);
          } else {
            this._loadFilterData('PUBLISHED');
          }
        } else {
          this.filter.status.status = false;
          this.filter.status.shared = false;
          this.filter.status.draft = false;
        }
        break;
      case 'DRAFTS':
        if (!this.filter.status.draft) {
          this.filter.status.status = true;
          this.filter.status.shared = false;
          this.filter.status.draft = true;
          if (this.filter.date.endDate.length >= 2 && this.filter.date.startDate.length >= 2) {
            this._loadFilterData('DRAFT', this.filter.date.startDate, this.filter.date.endDate);
          } else {
            this._loadFilterData('DRAFT');
          }
        } else {
          this.filter.status.status = false;
          this.filter.status.shared = false;
          this.filter.status.draft = false;
          this._loadAllPostData();
        }
        break;
      case 'DATE':
        if (!this.filter.date.status) {
          this.filter.date.status = true;
        } else {
          this.filter.date.status = false;
          this._loadAllPostData();
        }
        break;
    }
  }

  formatCreatedDate(createdDate) {
    const month = new Date(createdDate * 1000).toLocaleString('default', { month: 'short' });
    const date = new Date(createdDate * 1000).getDate();
    const year = new Date(createdDate * 1000).getFullYear();
    const time = new Date(createdDate * 1000).toLocaleTimeString(navigator.language, {
      hour: '2-digit',
      minute: '2-digit',
    });
    const currentYear = new Date().getFullYear();
    let returnFormat = '';
    if (year < currentYear) {
      returnFormat = month.toString() + ' ' + date.toString() + ' on ' + year.toString();
    } else {
      returnFormat = month.toString() + ' ' + date.toString() + ' at ' + time.toString();
    }
    return returnFormat;
  }

  kFormatter(num): any {
    const k: any = ((num / 1000) * Math.sign(num)).toFixed(0).toString() + 'K';
    return Math.abs(num) > 999 ? k : Math.sign(num) * Math.abs(num);
  }

  filterDate(end: HTMLInputElement, start: HTMLInputElement) {
    // console.log(new Date(end.value), new Date(start.value));
    if (end.value.length >= 3 && start.value.length >= 3) {
      this.filter.date.startDate = Math.round(new Date(start.value).getTime() / 1000).toString();
      this.filter.date.endDate = Math.round(new Date(end.value).getTime() / 1000).toString();
      console.log(this.filter);
      this._loadFilterData(null, this.filter.date.startDate, this.filter.date.endDate);
    }
  }

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
      data.createdDate = this.formatCreatedDate(data.createdDate);
      data.reads = this.kFormatter(data.reads);
      data.votes = this.kFormatter(data.votes);
      // console.log(data.featuredImg);
    });
    console.log(this.PostData);
    this.isLoading = false;
  }
}
