import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { AppRoutingModule } from '../../app-routing.module';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';

@NgModule({
  declarations: [AuthComponent, SignupComponent, SigninComponent],
  imports: [CommonModule, AppRoutingModule],
})
export class AuthModule {}
