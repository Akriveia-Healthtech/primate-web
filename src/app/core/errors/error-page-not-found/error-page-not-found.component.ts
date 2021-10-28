import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routes } from 'src/environments/routes';

@Component({
  selector: 'app-error-page-not-found',
  templateUrl: './error-page-not-found.component.html',
  styleUrls: ['./error-page-not-found.component.css'],
})
export class ErrorPageNotFoundComponent implements OnInit {
  constructor(private _router: Router) {
    console.log('Not FOUND PAGE.');
  }

  ngOnInit(): void {}
  back() {
    this._router.navigate([routes.signIp]);
  }
}
