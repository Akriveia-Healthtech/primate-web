import { Injectable } from '@angular/core';
import { Auth } from 'aws-amplify';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  async AWS_signUp(username, password) {
    try {
      const signUpResponses = await Auth.signUp({
        username,
        password,
        attributes: {
          email: username,
        },
      });
      console.log(signUpResponses);
    } catch (err) {
      console.log(err);
    }
  }
}
