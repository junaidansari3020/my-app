import { HttpResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

import {MatButtonModule} from '@angular/material/button';
import {MatTableDataSource, MatTable, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
];

@Component({
  selector: 'app-employee',
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatButtonModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent implements OnInit {

  public employeesArray: any = [];

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  @ViewChild(MatTable) table: MatTable<PeriodicElement>;

  addData() {
    const randomElementIndex = Math.floor(Math.random() * ELEMENT_DATA.length);
    this.dataSource.push(ELEMENT_DATA[randomElementIndex]);
    this.table.renderRows();
  }

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
        console.log('All employees loaded successful:', response.body[0]);
        this.employeesArray = response.body[0];
      },
      error: (error) => {
        console.error('Employees loading failed:', error);
      }
    });
  }
}
