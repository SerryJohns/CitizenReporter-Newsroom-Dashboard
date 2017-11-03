import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CircularSpinnerComponent } from './circular-spinner.component';

describe('CircularSpinnerComponent', () => {
  let component: CircularSpinnerComponent;
  let fixture: ComponentFixture<CircularSpinnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CircularSpinnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CircularSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
