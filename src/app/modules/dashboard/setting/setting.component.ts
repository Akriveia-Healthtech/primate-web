import { Component, OnInit } from '@angular/core';
import { StateService } from 'src/app/core/services/state/state.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css'],
})
export class SettingComponent implements OnInit {
  constructor(private _state: StateService) {}

  ngOnInit(): void {
    this._state.setPageTitle('Dashboard | Primate ');
  }
}
