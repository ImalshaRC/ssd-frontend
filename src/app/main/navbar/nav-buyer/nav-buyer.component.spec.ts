import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBuyerComponent } from './nav-buyer.component';

describe('NavBuyerComponent', () => {
  let component: NavBuyerComponent;
  let fixture: ComponentFixture<NavBuyerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavBuyerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavBuyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
