import { Component, Inject} from '@angular/core';
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
@Component({
  selector: 'app-add-client-contact',
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
    FormsModule
  ],
  templateUrl: './add-client-contact.component.html',
  styleUrl: './add-client-contact.component.css'
})
export class AddClientContactComponent {
  contact: any = {};

  constructor(
    public dialogRef: MatDialogRef<AddClientContactComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.contact = data || {}; // Initialize inside constructor
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.dialogRef.close(this.contact);
  }
}
