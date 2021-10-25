import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-result-post-card',
  templateUrl: './search-result-post-card.component.html',
  styleUrls: ['./search-result-post-card.component.css'],
})
export class SearchResultPostCardComponent implements OnInit {
  constructor() {}
  @Input() authorPostLink = 'https://primate.health/';
  @Input() id = '';
  @Input() authorName = '';
  @Input() createddate = '';
  @Input() description = '';
  @Input() title = '';
  @Input() votes = '';
  @Input() img = '';
  ngOnInit(): void {}
}
