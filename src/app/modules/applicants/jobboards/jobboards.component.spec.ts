import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobboardsComponent } from './jobboards.component';

describe('JobboardsComponent', () => {
  let component: JobboardsComponent;
  let fixture: ComponentFixture<JobboardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobboardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobboardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
