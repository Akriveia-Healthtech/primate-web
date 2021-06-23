import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from '../../app-routing.module';
import { PostComponent } from './post/post.component';
import { SettingComponent } from './setting/setting.component';
import { StatsComponent } from './stats/stats.component';
import { CommonComponentsModule } from 'src/app/core/commonComponents/commomComponents.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatNativeDateModule } from '@angular/material/core';
import { CreatePostComponent } from './post/create-post/create-post.component';

@NgModule({
  declarations: [PostComponent, SettingComponent, StatsComponent, CreatePostComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    AppRoutingModule,
    CommonComponentsModule,
    MatNativeDateModule,
  ],
})
export class DashboardModule {}
