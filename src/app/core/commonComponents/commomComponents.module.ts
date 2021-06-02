import { NgModule } from '@angular/core';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { PostCardComponent } from './post-card/post-card.component';
@NgModule({
  declarations: [HeaderComponent, FooterComponent, PostCardComponent],
  providers: [HeaderComponent, FooterComponent, PostCardComponent],
  bootstrap: [HeaderComponent, FooterComponent, PostCardComponent],
  exports: [HeaderComponent, FooterComponent, PostCardComponent],

  imports: [CommonModule],
})
export class CommonComponentsModule {}
