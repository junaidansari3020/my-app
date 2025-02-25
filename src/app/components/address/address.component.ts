import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { HttpResponse } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { AlertComponent } from '../../dialog/alert/alert.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-address',
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatCardModule,
    RouterLink,
  ],
  templateUrl: './address.component.html',
  styleUrl: './address.component.css',
})
export class AddressComponent implements OnInit {
  readonly dialog = inject(MatDialog);
  
  displayedColumns: string[] = [
    'line1',
    'line2',
    'city',
    'postalCode',
    'mobile',
    'tel',
    'action',
  ];

  dataSource = new MatTableDataSource();

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.getAllAddress();
  }

  getAllAddress() {
    const getAllAddressObj = {
      iRequestID: 2014,
    };

    this.authService.dataUser(getAllAddressObj).subscribe({
      next: (response: HttpResponse<any>) => {
        // console.log('All employees loaded successfully:', response.body);
        this.dataSource.data = response.body;
      },
      error: (error) => {
        console.error('Employees loading failed:', error);
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  editAddress(item: any) {
    this.router.navigate(['/address', item.iAddID]);
  }

  deleteAddress(item: any) {
    const deleteAddressObj = {
      iRequestID: 2013,
      iAddID: item.iAddID,
    };
    
    let dialogRef = this.dialog.open(AlertComponent, {data: {msg: 'Are you sure you want to delete this address?'}});
    
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'true') {
        this.authService.dataUser(deleteAddressObj).subscribe({
          next: (response: HttpResponse<any>) => {
            console.log('Address deleted successfully:', response.body);
            this.getAllAddress();
          },
          error: (error) => {
            console.error('Address deleting failed:', error);
          },
        });
      }
    });
  }

}
