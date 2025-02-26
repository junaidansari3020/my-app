import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddClientVehicleComponent } from './add-client-vehicle.component';

describe('AddClientVehicleComponent', () => {
  let component: AddClientVehicleComponent;
  let fixture: ComponentFixture<AddClientVehicleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddClientVehicleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddClientVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
