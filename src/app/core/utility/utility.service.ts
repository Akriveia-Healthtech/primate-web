import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilityService {
  constructor() {}

  LOCAL_STORAGE_SET(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  LOCAL_STORAGE_DELETE(key) {
    localStorage.removeItem(key);
  }
  LOCAL_STORAGE_GET(key) {
    return JSON.parse(localStorage.getItem(key));
  }
}
