import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StateService } from '../state/state.service';
import { UtilityService } from '../../utility/utility.service';
import { Auth } from 'aws-amplify';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  constructor(private _utility: UtilityService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request);
  }
}
