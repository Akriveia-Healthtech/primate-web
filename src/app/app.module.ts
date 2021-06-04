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
Amplify.configure(awsconfig);

@NgModule({
  declarations: [AppComponent, DashboardComponent],
  imports: [
    CommonComponentsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AuthModule,
    DashboardModule,
    BrowserAnimationsModule,
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true }],
  bootstrap: [AppComponent],
})
export class AppModule {}
