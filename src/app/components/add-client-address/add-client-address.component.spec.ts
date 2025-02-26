import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddClientAddressComponent } from './add-client-address.component';

describe('AddClientAddressComponent', () => {
  let component: AddClientAddressComponent;
  let fixture: ComponentFixture<AddClientAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddClientAddressComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddClientAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
