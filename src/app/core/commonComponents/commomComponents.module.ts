import { NgModule } from '@angular/core';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { PostCardComponent } from './post-card/post-card.component';
import { SkeletonComponent } from './skeleton/skeleton.component';
@NgModule({
  declarations: [HeaderComponent, FooterComponent, PostCardComponent, SkeletonComponent],
  providers: [HeaderComponent, FooterComponent, PostCardComponent, SkeletonComponent],
  bootstrap: [HeaderComponent, FooterComponent, PostCardComponent, SkeletonComponent],
  exports: [HeaderComponent, FooterComponent, PostCardComponent, SkeletonComponent],

  imports: [CommonModule],
})
export class CommonComponentsModule {}
