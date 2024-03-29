import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { observable, throwError } from 'rxjs';
import { HttpClient, HttpClientModule, HttpHeaders, HttpParams } from '@angular/common/http';
import { Auth } from 'aws-amplify';
import { Router } from '@angular/router';
import { UtilityService } from '../../utility/utility.service';
@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private _http: HttpClient, private router: Router) {}

  post(url: string, obj: any, jwtToken: string | null) {
    let headers;
    let options = {};
    if (jwtToken !== null) {
      headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: jwtToken,
      });
      options = { headers: headers };
    }

    return this._http.post<any>(url, obj, options).pipe(catchError(this.handleError));
  }
  get(url: string, query: null | object = null, jwtToken: string | null = null) {
    let options = {};
    let headers;
    if (query !== null) {
      options['params'] = query;
    }
    if (jwtToken !== null) {
      headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: jwtToken,
      });
      options['headers'] = headers;
    }
    return this._http.get(url, options).pipe(catchError(this.handleError));
  }

  delete(url: string, query: null | object = null, jwtToken: string | null = null) {
    let options = {};
    let headers;
    if (query !== null) {
      options['params'] = query;
    }
    if (jwtToken !== null) {
      headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: jwtToken,
      });
      options['headers'] = headers;
    }
    return this._http.delete(url, options).pipe(catchError(this.handleError));
  }

  uploadImgPost(url, obj) {
    return this._http
      .post<any>(url, obj, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        },
      })
      .pipe(catchError(this.handleError));
  }
  handleError(error) {
    console.log(error);
    return throwError(error);
  }
}
