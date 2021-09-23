import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicAuthorPostCardComponent } from './public-author-post-card.component';

describe('PublicAuthorPostCardComponent', () => {
  let component: PublicAuthorPostCardComponent;
  let fixture: ComponentFixture<PublicAuthorPostCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicAuthorPostCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicAuthorPostCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
