import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingdetailsComponent } from './trainingdetails.component';

describe('TrainingdetailsComponent', () => {
  let component: TrainingdetailsComponent;
  let fixture: ComponentFixture<TrainingdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
