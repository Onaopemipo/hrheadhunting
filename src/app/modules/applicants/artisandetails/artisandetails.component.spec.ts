import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtisandetailsComponent } from './artisandetails.component';

describe('ArtisandetailsComponent', () => {
  let component: ArtisandetailsComponent;
  let fixture: ComponentFixture<ArtisandetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtisandetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtisandetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
