import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorPageNotFoundComponent } from './core/errors/error-page-not-found/error-page-not-found.component';
import { SearchResultComponent } from './modules/search/search-result/search-result.component';
import { ConnectFormComponent } from './modules/users/connect-form/connect-form.component';
import { PostPreviewComponent } from './modules/users/post-preview/post-preview.component';
import { UsersComponent } from './modules/users/users.component';

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
    path: '',
    component: UsersComponent,
    //! Checking from subdomain
    // children: [{ path: ':prefix', component: LandingPageComponent }],
  },
  {
    path: 'result',
    component: SearchResultComponent,
  },
  {
    path: 'connect',
    component: ConnectFormComponent,
  },
  {
    path: ':postID',
    component: PostPreviewComponent,
  },

  { path: '**', redirectTo: '/404', pathMatch: 'full' },
];

@NgModule({
  // RouterModule.forRoot(routes, {  })
  // TODO: Have turned on the hash routing to check NGINX can work in it or not, if it does not work then please turn off
  // ! Make sure you check the hashing route with NGINX
  // ! The /user/:prefix doesn't work with hash coz the array index doesn't match, check the array index if you want debug
  imports: [RouterModule.forRoot(routes, { enableTracing: false, onSameUrlNavigation: 'reload' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
