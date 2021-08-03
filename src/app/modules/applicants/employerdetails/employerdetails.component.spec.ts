import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployerdetailsComponent } from './employerdetails.component';

describe('EmployerdetailsComponent', () => {
  let component: EmployerdetailsComponent;
  let fixture: ComponentFixture<EmployerdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployerdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployerdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
