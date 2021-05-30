import { Injectable } from '@angular/core';
import { Auth } from 'aws-amplify';
import { HttpService } from '../http/http.service';
import { api } from '../../../../environments/apis';
import { routes } from '../../../../environments/routes';

import { Router } from '@angular/router';
import { UtilityService } from '../../utility/utility.service';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _utility: UtilityService, private _http: HttpService, private _router: Router) {}

  async AWS_signUp(username, password) {
    return Auth.signUp({
      username,
      password,
      attributes: {
        email: username,
      },
    });
  }

  async VerifyAccount(userName, code) {
    try {
      const res = await Auth.confirmSignUp(userName, code);
      return res;
    } catch (err) {
      return err;
    }
  }

  async AWS_signIn(userName, code) {
    try {
      let state = false;
      const user = await Auth.signIn(userName);
      const authCode = await Auth.sendCustomChallengeAnswer(user, code);

      console.log('USER:', user.signInUserSession.accessToken.jwtToken);
      const userDetails = await this.getUserDetails(authCode.attributes.sub.toString());
      await Auth.currentSession();
      return userDetails;
    } catch (e) {
      return false;
    }
    // await Auth.currentSession();
    // return Auth.signIn(userName);
  }

  async CustomAuthCode(user, code) {
    return Auth.sendCustomChallengeAnswer(user, code);
  }

  async AWS_signOut() {
    Auth.signOut()
      .then((res) => {
        localStorage.removeItem('user');
        this._router.navigate([routes.signIp]);
      })
      .catch((err) => {
        window.alert('somethig went wrong');
        console.log(err);
      });
  }

  async AWS_signInWithPassword(userName, password) {
    return Auth.signIn(userName, password);
  }

  dynamoDB_addUser(data) {
    return this._http.post(api.addUser, data).toPromise();
  }

  S3_addUserImg(obj, type) {
    const payLoad = {
      image: obj,
      mime: type,
    };
    console.log(payLoad);
    return this._http.uploadImgPost(api.addUserImg, payLoad).toPromise();
  }

  dynamoDB_updateSetupUser(data) {
    return this._http.post(api.setupUser, data).toPromise();
  }

  sendMagiclink(email) {
    return this._http
      .post(api.magicLinkLogin, {
        email: email,
      })
      .toPromise();
  }
  getUserDetails(uuid) {
    return this._http.get(api.getUser + '/' + uuid);
  }
}
