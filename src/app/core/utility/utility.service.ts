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

  reArrangePostData(posts): Array<object> {
    let post = [];
    posts.map((data, index) => {
      const CurData = {
        postID: data.postID.S,
        slug: data.slug.S,
        createdDate: data.createdDate.N,
        reads: data.reads.N,
        votes: data.votes.N,
        title: data.title.S,
        description: data.description.S,
        featuredImg: data.featuredImg.S,
        tags: data.tags.L,
        status: data.status.S,
      };
      post.push(CurData);
    });
    return post;
  }

  formatCreatedDate(createdDate) {
    const month = new Date(createdDate * 1000).toLocaleString('default', { month: 'short' });
    const date = new Date(createdDate * 1000).getDate();
    const year = new Date(createdDate * 1000).getFullYear();
    const time = new Date(createdDate * 1000).toLocaleTimeString(navigator.language, {
      hour: '2-digit',
      minute: '2-digit',
    });
    const currentYear = new Date().getFullYear();
    let returnFormat = '';
    if (year < currentYear) {
      returnFormat = month.toString() + ' ' + date.toString() + ' on ' + year.toString();
    } else {
      returnFormat = month.toString() + ' ' + date.toString() + ' at ' + time.toString();
    }
    // console.log(returnFormat);
    return returnFormat;
  }

  kFormatter(num): any {
    const k: any = ((num / 1000) * Math.sign(num)).toFixed(0).toString() + 'K';
    return Math.abs(num) > 999 ? k : Math.sign(num) * Math.abs(num);
  }
  testSite = 'https://primate.health';
  checkSubdomainInput(): boolean {
    var domain = /:\/\/([^\/]+)/.exec(window.location.href)[1];
    // var domain = /:\/\/([^\/]+)/.exec(this.testSite)[1];

    let list = domain.split('.');
    // console.log(domain);

    if (list.length == 3) {
      if (list[0] == 'www') {
        return false;
      } else {
        if (list.includes('d320m25mt8uqti')) {
          return false;
        } else {
          return true;
        }
      }
    } else {
      return false;
    }
  }

  throwSubDomainPreFix(): string {
    var domain = /:\/\/([^\/]+)/.exec(window.location.href)[1];
    // var domain = /:\/\/([^\/]+)/.exec(this.testSite)[1];

    let list = domain.split('.');
    // console.log(domain);

    if (list.length == 3) {
      if (list[0] == 'www') {
        return '';
      } else {
        return list[0];
      }
    } else {
      return '';
    }
  }
}
