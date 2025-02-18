import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-employee',
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatButtonModule, RouterLink],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent implements OnInit {

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
        console.log('All employees loaded successfully:', response.body);
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

}
