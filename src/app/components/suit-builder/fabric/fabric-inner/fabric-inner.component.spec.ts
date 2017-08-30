import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FabricInnerComponent } from './fabric-inner.component';

describe('FabricInnerComponent', () => {
  let component: FabricInnerComponent;
  let fixture: ComponentFixture<FabricInnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FabricInnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FabricInnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
