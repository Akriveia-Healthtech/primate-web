import { NgModule } from '@angular/core';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
@NgModule({
  declarations: [HeaderComponent, FooterComponent],
  providers: [HeaderComponent, FooterComponent],
  bootstrap: [HeaderComponent, FooterComponent],
  exports: [HeaderComponent, FooterComponent],

  imports: [CommonModule],
})
export class CommonComponentsModule {}
