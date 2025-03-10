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
import { AuthService } from '../../services/auth.service';
import { HttpResponse } from '@angular/common/http';
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
    FormsModule,
  ],
  templateUrl: './add-client-contact.component.html',
  styleUrl: './add-client-contact.component.css',
})
export class AddClientContactComponent implements OnInit {
  contact = {
    name: '',
    mobile: '',
    email: '',
  };

  constructor(
    private authService: AuthService,
    public dialogRef: MatDialogRef<AddClientContactComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    if (this.data.element) {
      this.authService
        .dataUser({ iRequestID: 2175, iContactID: this.data.element.iContactID, iCliID: this.data.element.iCliID })
        .subscribe({
          next: (response: HttpResponse<any>) => {
            console.log('Client contact loaded successfully:', response.body);
            const cliObj = response.body[0];
            this.contact.name = cliObj.sContactName;
            this.contact.mobile = cliObj.sMobileNo;
            this.contact.email = cliObj.sEmailID;
          },
          error: (error) => {
            console.error('Client contact loading failed:', error);
          },
        });
    }
  }

  onSave(): void {
    if (this.data.element) {
      const updateClientContactObj = {
        iRequestID: 2172,
        iContactID: this.data.element.iContactID,
        iCliID: this.data.element.iCliID,
        sContactName: this.contact.name,
        sMobileNo: this.contact.mobile,
        sEmailID: this.contact.email
      };

      this.authService.dataUser(updateClientContactObj).subscribe({
        next: (response: HttpResponse<any>) => {
          // console.log('Client contact updated successfully:', response.body);
          this.dialogRef.close(this.contact);
        },
        error: (error) => {
          console.error('Client contact updated failed:', error);
        },
      });
    } 
    else {
      const addClientContactObj = {
        iRequestID: 2171,
        iCliID: this.data.cliId,
        sContactName: this.contact.name,
        sMobileNo: this.contact.mobile,
        sEmailID: this.contact.email
      };

      this.authService.dataUser(addClientContactObj).subscribe({
        next: (response: HttpResponse<any>) => {
          // console.log('Client contact added successfully:', response.body);
          this.dialogRef.close(this.contact);
        },
        error: (error) => {
          console.error('Client contact adding failed:', error);
        },
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close(null);
  }

}
