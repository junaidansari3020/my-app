import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { HttpResponse } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-add-client-address',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatCardModule,
    MatDialogModule,
    FormsModule,
    MatSelectModule,
    MatOptionModule,
  ],
  templateUrl: './add-client-address.component.html',
  styleUrl: './add-client-address.component.css',
})
export class AddClientAddressComponent implements OnInit {
  address = {
    line1: '',
    line2: '',
    city: '',
    postalCode: '',
  };

  cities: any[] = [
    { id: 1, city: 'Mumbai' },
    { id: 2, city: 'Thane' },
  ];

  constructor(
    private authService: AuthService,
    public dialogRef: MatDialogRef<AddClientAddressComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    if (this.data.element) {
      this.authService
        .dataUser({ iRequestID: 2162, iCliAddID: this.data.element.iCliAddID })
        .subscribe({
          next: (response: HttpResponse<any>) => {
            console.log('Client address loaded successfully:', response.body);
            const cliObj = response.body[0];
            this.address.line1 = cliObj.sAdd1;
            this.address.line2 = cliObj.sAdd2;
            this.address.city = cliObj.iCityID;
            this.address.postalCode = cliObj.sPostalCode;
          },
          error: (error) => {
            console.error('Client address loading failed:', error);
          },
        });
    }
  }

  onSave(): void {
    if (this.data.element) {
      const updateClientAddressObj = {
        iRequestID: 2164,
        iCliAddID: this.data.element.iCliAddID,
        iCliID: this.data.element.iCliID,
        sAdd1: this.address.line1,
        sAdd2: this.address.line2,
        iCityID: this.address.city,
        sPostalCode: this.address.postalCode,
      };
  
      this.authService.dataUser(updateClientAddressObj).subscribe({
        next: (response: HttpResponse<any>) => {
          // console.log('Client updated added successfully:', response.body);
          this.dialogRef.close(this.address);
        },
        error: (error) => {
          console.error('Client updated adding failed:', error);
        },
      });
    } 
    else {
      const addClientAddressObj = {
        iRequestID: 2163,
        iCliID: this.data.cliId,
        sAdd1: this.address.line1,
        sAdd2: this.address.line2,
        iCityID: this.address.city,
        sPostalCode: this.address.postalCode,
      };
  
      this.authService.dataUser(addClientAddressObj).subscribe({
        next: (response: HttpResponse<any>) => {
          // console.log('Client address added successfully:', response.body);
          this.dialogRef.close(this.address);
        },
        error: (error) => {
          console.error('Client address adding failed:', error);
        },
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close(null);
  }
}
