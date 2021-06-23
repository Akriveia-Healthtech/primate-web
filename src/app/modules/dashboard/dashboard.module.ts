import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// import { AppRoutingModule } from '../../app-routing.module';
import { PostComponent } from './post/post.component';
import { SettingComponent } from './setting/setting.component';
import { StatsComponent } from './stats/stats.component';
import { CommonComponentsModule } from 'src/app/core/commonComponents/commomComponents.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { CreatePostComponent } from './post/create-post/create-post.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';

@NgModule({
  declarations: [DashboardComponent, PostComponent, SettingComponent, StatsComponent, CreatePostComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatDatepickerModule,
    CommonComponentsModule,
    MatNativeDateModule,
    DashboardRoutingModule,
  ],
})
export class DashboardModule {
  constructor() {
    console.log('%cLoading Dashboard components ...', 'color:lightgreen');
  }
}
