import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContrastInnerComponent } from './contrast-inner.component';

describe('ContrastInnerComponent', () => {
  let component: ContrastInnerComponent;
  let fixture: ComponentFixture<ContrastInnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContrastInnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContrastInnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
