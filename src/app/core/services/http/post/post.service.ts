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
  S3_addFeaturedImg(obj, type) {
    const payLoad = {
      image: obj,
      mime: type,
    };
    console.log(payLoad);
    return this._http.uploadImgPost(api.addFeaturedImg, payLoad).toPromise();
  }
  addANewPost(payload, jwtToken) {
    console.log('Initiating Post');
    return this._http.post(api.addPost, payload, jwtToken);
  }

  getPost(id, jwtToken) {
    console.log(api.getPost + `/${id}`);
    return this._http.get(api.getPost + `/${id}`, jwtToken);
  }

  deletePost(id, jwtToken) {
    return this._http.delete(api.deletePost + `/${id}`, jwtToken);
  }

  deleteFeaturedImg(fileName, jwtToken) {
    return this._http.delete(api.deleteFeatureImg + `/${fileName}`, jwtToken);
  }
  q = `https://search-primate-posts-rm626giotwvzsiq4flbm2acw24.ap-southeast-1.cloudsearch.amazonaws.com/2013-01-01/search?q=`;

  searchPosts(string, region = '', time = '') {
    return this._http.get(
      `https://107ef7pr84.execute-api.ap-south-1.amazonaws.com/dev/searchPosts?searchKey=${string}`
    );
  }
}
