import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  constructor() {}
  filterMenuState: boolean = false;
  filter = {
    status: {
      status: false,
      shared: false,
      draft: false,
    },
    date: {
      status: false,
    },
  };
  ngOnInit(): void {}
  toggleFilterOption() {
    this.filterMenuState = this.filterMenuState ? false : true;
  }
  toggleFilter(filter: string) {
    switch (filter.toUpperCase()) {
      case 'STATUS':
        if (!this.filter.status.status) {
          this.filter = {
            status: {
              status: true,
              shared: true,
              draft: false,
            },
            date: {
              status: false,
            },
          };
        } else {
          this.filter = {
            status: {
              status: false,
              shared: false,
              draft: false,
            },
            date: {
              status: false,
            },
          };
        }
        break;
      case 'SHARED':
        if (!this.filter.status.shared) {
          this.filter = {
            status: {
              status: true,
              shared: true,
              draft: false,
            },
            date: {
              status: false,
            },
          };
        } else {
          this.filter = {
            status: {
              status: false,
              shared: false,
              draft: false,
            },
            date: {
              status: false,
            },
          };
        }
        break;
      case 'DRAFTS':
        if (!this.filter.status.draft) {
          this.filter = {
            status: {
              status: true,
              shared: false,
              draft: true,
            },
            date: {
              status: false,
            },
          };
        } else {
          this.filter = {
            status: {
              status: false,
              shared: false,
              draft: false,
            },
            date: {
              status: false,
            },
          };
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
  @ViewChild('date1') date1;

  toggleCalender() {
    console.log(this.date1.nativeElement);
    this.date1.nativeElement.click();
  }
}
