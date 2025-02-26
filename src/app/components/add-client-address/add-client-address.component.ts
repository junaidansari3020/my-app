import { Component,Inject } from '@angular/core';
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
  selector: 'app-add-client-address',
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
  templateUrl: './add-client-address.component.html',
  styleUrl: './add-client-address.component.css'
})
export class AddClientAddressComponent {
  address = {
    line1: '',
    line2: '',
    city: '',
    postalCode: ''
  };

  constructor(
    public dialogRef: MatDialogRef<AddClientAddressComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data) {
      this.address = { ...data };
    }
  }

  onSave(): void {
    this.dialogRef.close(this.address);
  }

  onCancel(): void {
    this.dialogRef.close(null);
  }
  cities: string[] = ['Mumbai', 'Thane'];
}
