import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtrasInnerComponent } from './extras-inner.component';

describe('ExtrasInnerComponent', () => {
  let component: ExtrasInnerComponent;
  let fixture: ComponentFixture<ExtrasInnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtrasInnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtrasInnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
