import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavFarmerComponent } from './nav-farmer.component';

describe('NavFarmerComponent', () => {
  let component: NavFarmerComponent;
  let fixture: ComponentFixture<NavFarmerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavFarmerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavFarmerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
