import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './modules/auth/auth.module';
// import { Amplify, Auth } from 'aws-amplify';
import Amplify from '@aws-amplify/core';

import { awsConfig } from '../config';
// console.log(awsConfig.cognito.USERPOOL_ID);
Amplify.configure({
  Auth: {
    mandatorySignId: true,
    region: awsConfig.cognito.REGION,
    UserPoolId: awsConfig.cognito.USERPOOL_ID,
    userPoolWebCilentId: awsConfig.cognito.APP_CLIEND_ID,
  },
});

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, AuthModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
