import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-skeleton',
  templateUrl: './skeleton.component.html',
  styleUrls: ['./skeleton.component.css'],
})
export class SkeletonComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
  @Input() type: 'image' | 'header';
  @Input() image: boolean = false;
  @Input() title: boolean = false;
  @Input() box: boolean = false;

  @Input() description: boolean = false;

  @Input() paragraph: boolean = false;

  test;
}
