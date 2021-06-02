import { Injectable } from '@angular/core';
import hmacSHA512 from 'crypto-js/hmac-sha512';
import AES from 'crypto-js/aes';
import * as CryptoJS from 'crypto-js';
import { HttpService } from '../services/http/http.service';

@Injectable({
  providedIn: 'root',
})
export class UtilityService {
  privateKey = 'Prazzuuuhahahhaha';
  constructor(private _https: HttpService) {}

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }
  LOCAL_STORAGE_SET(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  LOCAL_STORAGE_DELETE(key) {
    localStorage.removeItem(key);
  }
  LOCAL_STORAGE_GET(key) {
    return JSON.parse(localStorage.getItem(key));
  }

  ENCRYPT_TEXT(plain_text) {
    return plain_text.replace(/./g, function (c) {
      return ('00' + c.charCodeAt(0)).slice(-3);
    });
  }

  DECRYPT_TEXT(cipher_text) {
    return cipher_text.replace(/.{3}/g, function (c) {
      return String.fromCharCode(c);
    });
  }

  reSizeImage(img, maxWidth, maxHeight) {
    var canvas = document.createElement('canvas');
    var width = img.width;
    var height = img.height;
    if (width > height) {
      if (width > maxWidth) {
        height = Math.round((height *= maxWidth / width));
        width = maxWidth;
      }
    } else {
      if (height > maxHeight) {
        width = Math.round((width *= maxHeight / height));
        height = maxHeight;
      }
    }
    canvas.width = width;
    canvas.height = height;
    var ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, width, height);
    return canvas.toDataURL('image/jpeg', 0.7);
  }

  async getCountriesList() {
    const res = await this._https.get('https://unstats.un.org/unsd/amaapi/api/Country?countriesOnly=true').toPromise();
    return res;
  }
}
