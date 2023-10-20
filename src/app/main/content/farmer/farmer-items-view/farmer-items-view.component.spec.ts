import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmerItemsViewComponent } from './farmer-items-view.component';

describe('FarmerItemsViewComponent', () => {
  let component: FarmerItemsViewComponent;
  let fixture: ComponentFixture<FarmerItemsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FarmerItemsViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FarmerItemsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
