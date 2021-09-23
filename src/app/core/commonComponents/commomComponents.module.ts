import { NgModule } from '@angular/core';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { PostCardComponent } from './post-card/post-card.component';
import { SkeletonComponent } from './skeleton/skeleton.component';
import { PublicAuthorPostCardComponent } from './public-author-post-card/public-author-post-card.component';
import { SearchResultPostCardComponent } from './search-result-post-card/search-result-post-card.component';
@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    PostCardComponent,
    SkeletonComponent,
    PublicAuthorPostCardComponent,
    SearchResultPostCardComponent,
  ],
  providers: [
    HeaderComponent,
    FooterComponent,
    PostCardComponent,
    SkeletonComponent,
    PublicAuthorPostCardComponent,
    SearchResultPostCardComponent,
  ],
  bootstrap: [
    HeaderComponent,
    FooterComponent,
    PostCardComponent,
    SkeletonComponent,
    PublicAuthorPostCardComponent,
    SearchResultPostCardComponent,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    PostCardComponent,
    SkeletonComponent,
    PublicAuthorPostCardComponent,
    SearchResultPostCardComponent,
  ],

  imports: [CommonModule],
})
export class CommonComponentsModule {}
