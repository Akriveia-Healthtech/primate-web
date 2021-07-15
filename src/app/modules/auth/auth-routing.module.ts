import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthComponent } from './auth.component';
import { ProfileSetupComponent } from './profile-setup/profile-setup.component';
import { RedirectComponent } from './redirect/redirect.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { UrlGuard } from '../../../app/core/services/guard/url.guard';
import { ErrorPageNotFoundComponent } from 'src/app/core/errors/error-page-not-found/error-page-not-found.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      { path: '', redirectTo: '/auth/signup', pathMatch: 'full' },
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
  { path: '404', component: ErrorPageNotFoundComponent },
  { path: '**', redirectTo: '404' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
