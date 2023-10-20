import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerItemsViewComponent } from './buyer-items-view.component';

describe('BuyerItemsViewComponent', () => {
  let component: BuyerItemsViewComponent;
  let fixture: ComponentFixture<BuyerItemsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyerItemsViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyerItemsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
