import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { observable, throwError } from 'rxjs';
import { HttpClient, HttpClientModule, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private _http: HttpClient, private router: Router) {}

  post(url: string, obj: any) {
    return this._http.post<any>(url, obj).pipe(catchError(this.handleError));
  }
  get(url: string) {
    return this._http.get(url).pipe(catchError(this.handleError));
  }

  handleError(error) {
    console.log(error);
    return throwError(error);
  }
}
