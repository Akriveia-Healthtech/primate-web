import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './modules/auth/auth.module';
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from '../aws-exports';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
// import { HeaderComponent } from './core/commonComponents/header/header.component';
import { CommonComponentsModule } from '../app/core/commonComponents/commomComponents.module';
import { HttpRequestInterceptor } from './core/services/interceptor/http-request.interceptor';
import { ErrorPageNotFoundComponent } from './core/errors/error-page-not-found/error-page-not-found.component';
import { UsersComponent } from './modules/users/users.component';
import { LandingPageComponent } from './modules/users/landing-page/landing-page.component';
import { Router } from '@angular/router';
import { PostPreviewComponent } from './modules/users/post-preview/post-preview.component';
import { ConnectFormComponent } from './modules/users/connect-form/connect-form.component';
import { SearchComponent } from './modules/search/search.component';
import { SearchHomeComponent } from './modules/search/search-home/search-home.component';
import { SearchResultComponent } from './modules/search/search-result/search-result.component';
Amplify.configure(awsconfig);

@NgModule({
  declarations: [AppComponent, ErrorPageNotFoundComponent, UsersComponent, LandingPageComponent, PostPreviewComponent, ConnectFormComponent, SearchComponent, SearchHomeComponent, SearchResultComponent],
  imports: [AppRoutingModule, CommonComponentsModule, BrowserModule, HttpClientModule, BrowserAnimationsModule],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true }],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private _r: Router) {
    // NOTE: This is for router debugging
    // _r.events.subscribe((d) => console.log(d));
  }
}
