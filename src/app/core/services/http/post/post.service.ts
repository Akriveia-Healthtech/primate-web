import { Injectable } from '@angular/core';
import { api } from 'src/environments/apis';
import { HttpService } from '../http.service';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private _http: HttpService) {}

  getAllPost(LastEvaluatedKey: null | object, jwtToken: string | null, uuid: null | string) {
    const body = {
      pageNo: 1,
      uuid: uuid,
      LastEvaluatedKey: LastEvaluatedKey === undefined ? null : LastEvaluatedKey,
    };
    return this._http.post(api.getAllPost, body, jwtToken);
  }

  filterPost(status: null | string = null, startDate: null | string = null, endDate: null | string = null) {
    let params = {};
    if (status !== null) {
      params['status'] = status.toUpperCase();
    }
    if (startDate !== null) {
      params['startDate'] = startDate;
    }
    if (endDate !== null) {
      params['endDate'] = endDate;
    }
    return this._http.get(api.filterPost, params, null);
  }

  pinPost(oldPost: string | null = null, newPost: string, jwtToken: string) {
    let body = {
      newPinnedID: newPost,
    };
    if (oldPost !== null) {
      body['oldPinnedID'] = oldPost;
    }
    return this._http.post(api.pinPost, body, jwtToken);
  }
}
