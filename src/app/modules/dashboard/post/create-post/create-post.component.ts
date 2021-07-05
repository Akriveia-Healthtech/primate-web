import { Component, OnInit } from '@angular/core';
import { StateService } from 'src/app/core/services/state/state.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css'],
})
export class CreatePostComponent implements OnInit {
  constructor(private _state: StateService) {}

  ngOnInit(): void {
    this._state.setPageTitle('Create a post | Primate ');
  }
}
