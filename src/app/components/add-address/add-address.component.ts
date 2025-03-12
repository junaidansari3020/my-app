import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
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
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-address',
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
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.css'],
})
export class AddAddressComponent implements OnInit {
  public addAddressForm: FormGroup;
  public citiesArray: any[] = []; 
  
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
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
    this.loadData();
  }

  private loadData() {
    forkJoin({
      cities: this.authService.dataUser({ iRequestID: 2141 }),
    }).subscribe({
      next: ({ cities }: any) => {
        console.log(cities);
        if (cities.body) {
          this.citiesArray = cities.body;
        }
      },
      error: (error) => {
        console.error('Data loading failed:', error);
      },
    });
  }

  saveAddress(): void {
    if (this.addAddressForm.invalid) {
      return;
    }

    const saveAddressObj = {
      iRequestID: 2011,
      sAdd1: this.addAddressForm.value.line1,
      sAdd2: this.addAddressForm.value.line2,
      iCityID: this.addAddressForm.value.city,
      sPostalCode: this.addAddressForm.value.postalCode,
      sTelNo1: this.addAddressForm.value.mobile,
      sTelNo2: this.addAddressForm.value.tel,
    };

    this.authService.dataUser(saveAddressObj).subscribe({
      next: (response) => {
        // console.log('Address added successfully:', response);
        this.router.navigateByUrl('/address');
        this.snackBar.open('Address added successfully', 'Close', { duration: 2000 });
      },
      error: (error) => {
        console.error('Address saving failed:', error);
      },
    });
  }
}
