import { Injectable } from '@angular/core';
import { api } from 'src/environments/apis';
import { HttpService } from '../http.service';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private _http: HttpService) {}

  getAllPost(LastEvaluatedKey: null | object) {
    const body = {
      pageNo: 1,
      LastEvaluatedKey: LastEvaluatedKey === undefined ? null : LastEvaluatedKey,
    };
    return this._http.post(api.getAllPost, body);
  }
}
