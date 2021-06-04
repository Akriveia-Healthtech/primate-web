import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { observable, throwError } from 'rxjs';
import { HttpClient, HttpClientModule, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { UtilityService } from '../../utility/utility.service';
@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private _http: HttpClient, private router: Router) {}

  post(url: string, obj: any) {
    let headers;
    let options = {};
    try {
      const token = JSON.parse(localStorage.getItem('TId'));
      console.log(token);
      if (token === null) {
      } else {
        headers = new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        });
        options = { headers: headers };
      }
    } catch (e) {}
    return this._http.post<any>(url, obj, options).pipe(catchError(this.handleError));
  }
  get(url: string) {
    return this._http.get(url).pipe(catchError(this.handleError));
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
