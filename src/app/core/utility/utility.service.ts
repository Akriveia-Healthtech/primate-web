import { Injectable } from '@angular/core';
import hmacSHA512 from 'crypto-js/hmac-sha512';
import AES from 'crypto-js/aes';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class UtilityService {
  privateKey = 'Prazzuuuhahahhaha';
  constructor() {}

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
    // return AES.encrypt(JSON.stringify(plain_text), this.privateKey).toString();
    return plain_text.replace(/./g, function (c) {
      return ('00' + c.charCodeAt(0)).slice(-3);
    });
  }

  DECRYPT_TEXT(cipher_text) {
    // var bytes = AES.decrypt(cipher_text, this.privateKey);
    // return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return cipher_text.replace(/.{3}/g, function (c) {
      return String.fromCharCode(c);
    });
  }
}
