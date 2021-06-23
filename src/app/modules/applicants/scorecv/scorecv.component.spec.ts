import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScorecvComponent } from './scorecv.component';

describe('ScorecvComponent', () => {
  let component: ScorecvComponent;
  let fixture: ComponentFixture<ScorecvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScorecvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScorecvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
