import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomizeInnerComponent } from './customize-inner.component';

describe('CustomizeInnerComponent', () => {
  let component: CustomizeInnerComponent;
  let fixture: ComponentFixture<CustomizeInnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomizeInnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomizeInnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
