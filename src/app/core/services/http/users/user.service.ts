import { Injectable } from '@angular/core';
import { api } from 'src/environments/apis';
import { HttpService } from '../http.service';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private _http: HttpService) {}

  checkSubdomain(subdomain) {
    return this._http.post(
      api.checkSubdomain,
      {
        subDomainPrefix: subdomain,
      },
      null
    );
  }
}
