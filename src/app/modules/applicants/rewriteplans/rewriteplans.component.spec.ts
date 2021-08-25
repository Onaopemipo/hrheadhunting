import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RewriteplansComponent } from './rewriteplans.component';

describe('RewriteplansComponent', () => {
  let component: RewriteplansComponent;
  let fixture: ComponentFixture<RewriteplansComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RewriteplansComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RewriteplansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
