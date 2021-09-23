import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchResultPostCardComponent } from './search-result-post-card.component';

describe('SearchResultPostCardComponent', () => {
  let component: SearchResultPostCardComponent;
  let fixture: ComponentFixture<SearchResultPostCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchResultPostCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchResultPostCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
