import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutInnerComponent } from './checkout-inner.component';

describe('CheckoutInnerComponent', () => {
  let component: CheckoutInnerComponent;
  let fixture: ComponentFixture<CheckoutInnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckoutInnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutInnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
