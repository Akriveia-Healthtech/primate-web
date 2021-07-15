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
import { CreatePostComponent } from './modules/dashboard/post/create-post/create-post.component';
import { ErrorPageNotFoundComponent } from './core/errors/error-page-not-found/error-page-not-found.component';
import { UsersComponent } from './modules/users/users.component';
import { LandingPageComponent } from './modules/users/landing-page/landing-page.component';
import { DashboardModule } from '../app/modules/dashboard/dashboard.module';
const routes: Routes = [
  { path: '404', component: ErrorPageNotFoundComponent },
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./modules/dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: 'primate',
    component: UsersComponent,
    //! Checking from subdomain
    // children: [{ path: ':prefix', component: LandingPageComponent }],
  },

  { path: '**', redirectTo: '/auth/signin', pathMatch: 'full' },
];

@NgModule({
  // RouterModule.forRoot(routes, {  })
  // TODO: Have turned on the hash routing to check NGINX can work in it or not, if it does not work then please turn off
  // ! Make sure you check the hashing route with NGINX
  // ! The /user/:prefix doesn't work with hash coz the array index doesn't match, check the array index if you wannt debug
  imports: [RouterModule.forRoot(routes, { enableTracing: false, onSameUrlNavigation: 'reload' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
