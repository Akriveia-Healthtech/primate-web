import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { PostComponent } from './post/post.component';
import { SettingComponent } from './setting/setting.component';
import { StatsComponent } from './stats/stats.component';
import { UrlGuard } from '../../../app/core/services/guard/url.guard';
import { StateService } from '../../../app//core/services/state/state.service';
import { CreatePostComponent } from './post/create-post/create-post.component';
import { ErrorPageNotFoundComponent } from 'src/app/core/errors/error-page-not-found/error-page-not-found.component';
const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [UrlGuard],
    data: ['dashboard'],
    children: [
      { path: '', redirectTo: '/dashboard/post', pathMatch: 'full' },
      { path: 'post', component: PostComponent },
      // { path: 'createPost', component: CreatePostComponent },
      { path: 'setting', component: SettingComponent },
      { path: 'stats', component: StatsComponent },
    ],
  },
  {
    path: 'createPost',
    component: CreatePostComponent,
  },
  {
    path: 'editPost/:postID',
    component: CreatePostComponent,
  },
  { path: '404', component: ErrorPageNotFoundComponent },
  { path: '**', redirectTo: '404' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
