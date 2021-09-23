import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routes } from 'src/environments/routes';
import { PostService } from '../../services/http/post/post.service';
import { StateService } from '../../services/state/state.service';
import { UtilityService } from '../../utility/utility.service';

@Component({
  selector: 'app-public-author-post-card',
  templateUrl: './public-author-post-card.component.html',
  styleUrls: ['./public-author-post-card.component.css'],
})
export class PublicAuthorPostCardComponent implements OnInit {
  constructor(private _router: Router, private _utility: UtilityService, private _state: StateService) {
    // console.log(new Date(this.createdDate * 1000), this.createdDate);
    // this.createdDate
  }

  ngOnInit(): void {}
  @Input() postID: string;
  @Input() slug: string;
  @Input() createdDate: number;
  @Input() reads: number;
  // @Input() currentPinnedPostId: string;
  @Input() voted = false;
  @Input() votes: number;
  @Input() author: string;
  @Input() title: string;
  @Input() description: string;
  @Input() featuredImg: string | null;
  @Input() status: string;
  @Input() authorSubDomainPrefix: string;
  @Input() pinned: boolean = false;
  @Input() isSkeleton: boolean = false;

  //NOTE: Turn it on during production stage
  isProd = true;
  redirectTo(uri: string, postId, prefix) {
    if (this.isProd) {
      this._utility.PROD_redirectToAuthorPost(postId, prefix);
    } else {
      this._router.navigateByUrl('/', { skipLocationChange: true }).then(() => this._router.navigate([uri, postId]));
    }
  }

  gotoPost(id, prefix) {
    this.redirectTo(routes.postPreview, id, prefix);
    // this._router.navigate([routes.postPreview, id], { skipLocationChange: true });
  }
}
