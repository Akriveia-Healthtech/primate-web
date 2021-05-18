import { Component, OnInit } from '@angular/core';
// import Auth from '@aws-amplify/auth';
import { AuthService } from '../../../core/services/auth/auth.service';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  emailValue: string = '';
  constructor(private Auth: AuthService) {}

  ngOnInit(): void {}
  sendEmail(value) {
    console.log(value);
    this.emailValue = value.toString();
    this.Auth.AWS_signUp(this.emailValue, '');
  }
}
