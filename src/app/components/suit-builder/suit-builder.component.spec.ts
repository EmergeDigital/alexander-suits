import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuitBuilderComponent } from './suit-builder.component';

describe('SuitBuilderComponent', () => {
  let component: SuitBuilderComponent;
  let fixture: ComponentFixture<SuitBuilderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuitBuilderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuitBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
