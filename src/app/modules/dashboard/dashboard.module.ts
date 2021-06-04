import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from '../../app-routing.module';
import { PostComponent } from './post/post.component';
import { SettingComponent } from './setting/setting.component';
import { StatsComponent } from './stats/stats.component';
import { CommonComponentsModule } from 'src/app/core/commonComponents/commomComponents.module';
import { MatDatepickerModule } from '@angular/material/datepicker';

@NgModule({
  declarations: [PostComponent, SettingComponent, StatsComponent],
  imports: [CommonModule, MatDatepickerModule, AppRoutingModule, CommonComponentsModule],
})
export class DashboardModule {}
