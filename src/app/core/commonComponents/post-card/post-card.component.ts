import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routes } from 'src/environments/routes';
import { PostService } from '../../services/http/post/post.service';
import { StateService } from '../../services/state/state.service';
import { UtilityService } from '../../utility/utility.service';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.css'],
})
export class PostCardComponent implements OnInit {
  constructor(private _router: Router, private _postHttp: PostService, private _state: StateService) {
    // console.log(new Date(this.createdDate * 1000), this.createdDate);
    // this.createdDate
  }

  ngOnInit(): void {}
  @Input() draft: boolean = false;
  @Input() postID: string;
  @Input() slug: string;
  @Input() createdDate: number;
  @Input() reads: number;
  // @Input() currentPinnedPostId: string;
  @Input() voted = false;
  @Input() votes: number;
  @Input() title: string;
  @Input() description: string;
  @Input() featuredImg: string | null;
  @Input() status: string;
  @Input() pinned: boolean = false;
  @Input() isLandingPage: boolean = false;
  @Input() isSkeleton: boolean = false;
  @Input() piningFunction: Function;
  @Input() editPostFunction: Function;

  redirectTo(uri: string, id) {
    this._router.navigateByUrl('/', { skipLocationChange: true }).then(() => this._router.navigate([uri, id]));
  }

  gotoPost(id) {
    // this.redirectTo(routes.postPreview, id);
    // this._router.navigate([routes.postPreview, id], { skipLocationChange: true });
  }
}
