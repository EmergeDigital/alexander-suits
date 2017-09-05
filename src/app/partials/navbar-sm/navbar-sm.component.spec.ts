import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarSmComponent } from './navbar-sm.component';

describe('NavbarSmComponent', () => {
  let component: NavbarSmComponent;
  let fixture: ComponentFixture<NavbarSmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarSmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarSmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
