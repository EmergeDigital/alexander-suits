import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeasurementsInnerComponent } from './measurements-inner.component';

describe('MeasurementsInnerComponent', () => {
  let component: MeasurementsInnerComponent;
  let fixture: ComponentFixture<MeasurementsInnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeasurementsInnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeasurementsInnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
