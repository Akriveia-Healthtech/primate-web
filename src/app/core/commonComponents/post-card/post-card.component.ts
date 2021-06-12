import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.css'],
})
export class PostCardComponent implements OnInit {
  constructor() {
    // console.log(new Date(this.createdDate * 1000), this.createdDate);
    // this.createdDate
  }

  ngOnInit(): void {}
  @Input() draft: boolean = false;
  @Input() postID: string;
  @Input() slug: string;
  @Input() createdDate: number;
  @Input() reads: number;
  @Input() votes: number;
  @Input() title: string;
  @Input() description: string;
  @Input() featuredImg: string | null;
  @Input() status: string;
  @Input() pinned: boolean = false;
  @Input() isSkeleton: boolean = false;
}
