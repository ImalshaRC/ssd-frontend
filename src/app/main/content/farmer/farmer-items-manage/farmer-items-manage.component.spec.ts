import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmerItemsManageComponent } from './farmer-items-manage.component';

describe('FarmerItemsManageComponent', () => {
  let component: FarmerItemsManageComponent;
  let fixture: ComponentFixture<FarmerItemsManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FarmerItemsManageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FarmerItemsManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
