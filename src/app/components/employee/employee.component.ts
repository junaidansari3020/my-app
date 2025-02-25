import { HttpResponse } from '@angular/common/http';
import { Component, OnInit, ChangeDetectionStrategy, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';2

import { MatDialog } from '@angular/material/dialog';
import { AlertComponent } from '../../dialog/alert/alert.component';

@Component({
  selector: 'app-employee',
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatButtonModule, RouterLink, MatIconModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeComponent implements OnInit {
  readonly dialog = inject(MatDialog);

  displayedColumns: string[] = ['iEmpID', 'sFirstName', 'sLastName', 'sEmail', 'sMobileNo', 'sFullAddress', 'sRoleName', 'Action'];
  dataSource = new MatTableDataSource();

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.getAllEmployee();
  }

  getAllEmployee() {
    const getAllEmployeeObj = {
      iRequestID: 2031
    };

    this.authService.dataUser(getAllEmployeeObj).subscribe({
      next: (response: HttpResponse<any>) => {
        // console.log('All employees loaded successfully:', response.body);
        this.dataSource.data = response.body;
      },
      error: (error) => {
        console.error('Employees loading failed:', error);
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  editEmployee(item: any) {
    this.router.navigate(['/employee', item.iEmpID]);
  }

  deleteEmployee(item: any) {
    const deleteEmployeeObj = {
      iRequestID: 2034,
      iEmpID: item.iEmpID,
    };

    let dialogRef = this.dialog.open(AlertComponent, {data: {msg: 'Are you sure you want to delete this employee?'}});
    
    dialogRef.afterClosed().subscribe(result => {
      if (result === "true") {
        this.authService.dataUser(deleteEmployeeObj).subscribe({
          next: (response: HttpResponse<any>) => {
            console.log('Employee deleted successfully:', response.body);
            this.getAllEmployee();
          },
          error: (error) => {
            console.error('Employee deleting failed:', error);
          }
        });
      }
    });
  }

}
