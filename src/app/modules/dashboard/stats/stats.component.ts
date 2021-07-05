import { Component, OnInit } from '@angular/core';
import { StateService } from 'src/app/core/services/state/state.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css'],
})
export class StatsComponent implements OnInit {
  constructor(private _state: StateService) {}

  ngOnInit(): void {
    this._state.setPageTitle('Dashboard | Primate ');
  }
}
