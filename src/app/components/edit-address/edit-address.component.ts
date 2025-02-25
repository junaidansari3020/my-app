import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { AuthService } from '../../services/auth.service';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-edit-address',
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
    MatOptionModule,
    ReactiveFormsModule,
    MatIconModule,
    MatDividerModule,
    RouterLink,
  ],
  templateUrl: './edit-address.component.html',
  styleUrl: './edit-address.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditAddressComponent {
  public addAddressForm: FormGroup;
  public citiesArray: any[] = []; 
  public addId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    
  ) {
    this.addAddressForm = this.fb.group({
      line1: ['', Validators.required],
      line2: ['', Validators.required],
      city: ['', Validators.required],
      postalCode: ['', Validators.required],
      mobile: ['', Validators.required],
      tel: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      this.addId = id ? parseInt(id) : null;

      if (this.addId) {
        this.loadData(this.addId);
      }
    });
  }

  private loadData(addId: number) {
    forkJoin({
      address: this.authService.dataUser({ iRequestID: 2015, iAddID: addId }),
      cities: this.authService.dataUser({ iRequestID: 2141 }),
    }).subscribe({
      next: ({ cities, address }: any) => {
        if (cities.body) {
          this.citiesArray = cities.body;
        }

        if (address.body && address.body.length > 0) {
          const addObj = address.body[0];
          this.addAddressForm.patchValue({
            line1: addObj.sAdd1,
            line2: addObj.sAdd2,
            city: addObj.iCityID,
            postalCode: addObj.sPostalCode,
            mobile: addObj.sTelNo1,
            tel: addObj.sTelNo2,
          });
        }
      },
      error: (error) => {
        console.error('Data loading failed:', error);
      },
    });
  }

  editAddress(): void {
    if (this.addAddressForm.invalid) {
      return;
    }

    const editAddressObj = {
      iRequestID: 2012,
      iAddID: this.addId,
      sAdd1: this.addAddressForm.value.line1,
      sAdd2: this.addAddressForm.value.line2,
      iCityID: this.addAddressForm.value.city,
      sPostalCode: this.addAddressForm.value.postalCode,
      sTelNo1: this.addAddressForm.value.mobile,
      sTelNo2: this.addAddressForm.value.tel,
    };

    this.authService.dataUser(editAddressObj).subscribe({
      next: (response) => {
        console.log('Address updated successfully:', response);
        this.router.navigateByUrl('/address');
      },
      error: (error) => {
        console.error('Address updating failed:', error);
      },
    });
  }
}
