import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectFabricComponent } from './select-fabric.component';

describe('SelectFabricComponent', () => {
  let component: SelectFabricComponent;
  let fixture: ComponentFixture<SelectFabricComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectFabricComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectFabricComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
