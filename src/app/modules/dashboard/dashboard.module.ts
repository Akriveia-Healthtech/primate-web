import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from '../../app-routing.module';
import { PostComponent } from './post/post.component';
import { SettingComponent } from './setting/setting.component';
import { StatsComponent } from './stats/stats.component';

@NgModule({
  declarations: [PostComponent, SettingComponent, StatsComponent],
  imports: [CommonModule, AppRoutingModule],
})
export class DashboardModule {}
