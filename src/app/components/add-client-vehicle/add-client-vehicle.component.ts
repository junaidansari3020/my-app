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
import { forkJoin } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-client-vehicle',
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
  templateUrl: './add-client-vehicle.component.html',
  styleUrl: './add-client-vehicle.component.css',
})
export class AddClientVehicleComponent implements OnInit {
  vehicle: any = { 
    brand: '', 
    model: '', 
    variant: '', 
    registration: '', 
    chassisNo: '', 
    engineNo: '', 
    color: '', 
  };

  brandArray: any[] = [];
  modelArray: any[] = [];
  variantArray: any[] = [];

  constructor(
    private authService: AuthService,
    public dialogRef: MatDialogRef<AddClientVehicleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  ngOnInit(): void {
    this.loadBrands();
    if (this.data.element) {
      this.authService
        .dataUser({
          iRequestID: 2135,
          iCliVehID: this.data.element.iCliVehID,
        })
        .subscribe({
          next: (response: HttpResponse<any>) => {
            console.log('Client vehicle loaded successfully:', response.body);
            const cliVehObj = response.body[0];
            this.vehicle.brand = cliVehObj.sBrandName;
            this.vehicle.model = cliVehObj.sModel;
            this.vehicle.variant = cliVehObj.sVariant;
            this.vehicle.registration = cliVehObj.sRegNo;
            this.vehicle.chassisNo = cliVehObj.sChassisNo;
            this.vehicle.engineNo = cliVehObj.sEngineNo;
            this.vehicle.color = cliVehObj.sColor;
          },
          error: (error) => {
            console.error('Client vehicle loading failed:', error);
          },
        });
    }
  }

  private loadBrands() {
    this.authService.dataUser({ iRequestID: 2111 }).subscribe({
      next: (response: HttpResponse<any>) => {
        // console.log('Brands loaded successfully:', response.body);
        this.brandArray = response.body;
      },
      error: (error) => {
        console.error('Brands loading failed:', error);
      },
    });
  }

  onBrandChange(event: any) {
    this.authService
      .dataUser({ iRequestID: 2112, iBrandID: event.value })
      .subscribe({
        next: (response: HttpResponse<any>) => {
          // console.log('models loaded successfully:', response.body);
          this.modelArray = response.body;
        },
        error: (error) => {
          console.error('models loading failed:', error);
        },
      });
  }

  onModelChange(event: any) {
    this.authService
      .dataUser({ iRequestID: 2113, iModelID: event.value })
      .subscribe({
        next: (response: HttpResponse<any>) => {
          // console.log('variants loaded successfully:', response.body);
          this.variantArray = response.body;
        },
        error: (error) => {
          console.error('variants loading failed:', error);
        },
      });
  }

  onSave(): void {
    if (this.data.element) {
      const updateClientVehicleObj = {
        iRequestID: 2132,
        iCliVehID: this.data.element.iCliVehID,
        iBrandID: this.vehicle.brand,
        iModelID: this.vehicle.model,
        iVariantID: this.vehicle.variant,
        sRegNo: this.vehicle.registration,
        sChassisNo: this.vehicle.chassisNo,
        sEngineNo: this.vehicle.engineNo,
        sColor: this.vehicle.color,
      };

      this.authService.dataUser(updateClientVehicleObj).subscribe({
        next: (response: HttpResponse<any>) => {
          // console.log('Client vehicle updated successfully:', response.body);
          this.dialogRef.close(this.vehicle);
        },
        error: (error) => {
          console.error('Client vehicle updated failed:', error);
        },
      });
    } 
    else {
      const addClientVehicleObj = {
        iRequestID: 2131,
        iCliID: this.data.cliId,
        iBrandID: this.vehicle.brand,
        iModelID: this.vehicle.model,
        iVariantID: this.vehicle.variant,
        sRegNo: this.vehicle.registration,
        sChassisNo: this.vehicle.chassisNo,
        sEngineNo: this.vehicle.engineNo,
        sColor: this.vehicle.color,
      };

      this.authService.dataUser(addClientVehicleObj).subscribe({
        next: (response: HttpResponse<any>) => {
          // console.log('Client vehicle added successfully:', response.body);
          this.dialogRef.close(this.vehicle);
        },
        error: (error) => {
          console.error('Client vehicle adding failed:', error);
        },
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
