import { Component, Inject } from '@angular/core';
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
    MatOptionModule
  ],
  templateUrl: './add-client-vehicle.component.html',
  styleUrl: './add-client-vehicle.component.css'
})
export class AddClientVehicleComponent {
  vehicle: any =  {};

  constructor(
    public dialogRef: MatDialogRef<AddClientVehicleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.vehicle = data || {};
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.dialogRef.close(this.vehicle);
  }
brands: string[] = ['Toyota', 'Honda', 'Ford', 'BMW', 'Mercedes'];
models: string[] = ['Sedan', 'SUV', 'Hatchback', 'Convertible'];
variants: string[] = ['Base', 'Mid', 'Top'];
}
