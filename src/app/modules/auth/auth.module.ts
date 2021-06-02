import { NgModule } from '@angular/core';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AuthComponent } from './auth.component';
import { AppRoutingModule } from '../../app-routing.module';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { RedirectComponent } from './redirect/redirect.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
// import { FormsModule } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileSetupComponent } from './profile-setup/profile-setup.component';
import { CommonComponentsModule } from 'src/app/core/commonComponents/commomComponents.module';

@NgModule({
  declarations: [AuthComponent, SignupComponent, SigninComponent, RedirectComponent, ProfileSetupComponent],
  providers: [],

  imports: [
    CommonComponentsModule,
    CommonModule,
    AppRoutingModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class AuthModule {}
