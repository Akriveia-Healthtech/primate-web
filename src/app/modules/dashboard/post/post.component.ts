import { Component, OnInit, ViewChild } from '@angular/core';
import { PostService } from '../../../core/services/http/post/post.service';
import { PostDataTemplate } from '../../../core/interfaces/postDataTemplate';
import { StateService } from 'src/app/core/services/state/state.service';
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  constructor(private _postHttp: PostService, private _state: StateService) {}
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

  ngOnInit(): void {
    this._state.authToken.subscribe((res) => {
      // console.log(res);
      if (res) {
        this._postHttp.getAllPost(null, res).subscribe(
          (data) => {
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
            this.PostData.PostList = data.posts;
            this.PostData.TotalSize = data.TotalSize;
            this.PostData.PostList.map((data) => {
              data.createdDate = this.formatCreatedDate(data.createdDate);
              data.reads = this.kFormatter(data.reads);
              data.votes = this.kFormatter(data.votes);
              console.log(data.featuredImg);
            });
            console.log(this.PostData);
          },
          (err) => {
            console.log(err);
          }
        );
      }
    });
    console.log(new Date(1440516958 * 1000));
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
        } else {
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
        } else {
          this.filter.status.status = false;
          this.filter.status.shared = false;
          this.filter.status.draft = false;
        }
        break;
      case 'DATE':
        if (!this.filter.date.status) {
          this.filter.date.status = true;
        } else {
          this.filter.date.status = false;
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
}
