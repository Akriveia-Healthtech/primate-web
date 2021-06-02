import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './modules/auth/auth.component';
import { ProfileSetupComponent } from './modules/auth/profile-setup/profile-setup.component';
import { RedirectComponent } from './modules/auth/redirect/redirect.component';
import { SigninComponent } from './modules/auth/signin/signin.component';
import { SignupComponent } from './modules/auth/signup/signup.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { PostComponent } from './modules/dashboard/post/post.component';
import { SettingComponent } from './modules/dashboard/setting/setting.component';
import { StatsComponent } from './modules/dashboard/stats/stats.component';
import { UrlGuard } from '../app/core/services/guard/url.guard';
import { StateService } from './core/services/state/state.service';
const routes: Routes = [
  { path: '', redirectTo: '/auth/signin', pathMatch: 'full' },
  { path: '*', redirectTo: '/auth/signin', pathMatch: 'full' },
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      { path: '', redirectTo: '/auth/signin', pathMatch: 'full' },
      { path: 'signup', canActivate: [UrlGuard], data: ['signUpPage'], component: SignupComponent },
      { path: 'signin', canActivate: [UrlGuard], data: ['signInPage'], component: SigninComponent },
      {
        path: 'setup',
        canActivate: [UrlGuard],
        data: ['setupPage'],
        component: ProfileSetupComponent,
      },
      { path: 'redirect/:cypherCode', component: RedirectComponent },
    ],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [UrlGuard],
    data: ['dashboard'],
    children: [
      { path: '', redirectTo: '/dashboard/post', pathMatch: 'full' },
      { path: 'post', component: PostComponent },
      { path: 'setting', component: SettingComponent },
      { path: 'stats', component: StatsComponent },
    ],
  },
];

@NgModule({
  // RouterModule.forRoot(routes, {  })
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
