import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { HttpResponse } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-edit-employee',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    RouterLink,
  ],
  templateUrl: './edit-employee.component.html',
  styleUrl: './edit-employee.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditEmployeeComponent {
  public firstName: string = '';
  public lastName: string = '';
  public email: string = '';
  public mobileNo: string = '';
  public address: string = '';
  public role: string = '';
  public addressArray: any[] = [];
  public roleArray: any[] = [];

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.dataUser({iRequestID: 20310, iEmpID: 1}).subscribe({
      next: (response: HttpResponse<any>) => {
        console.log('Address loaded successful:', response.body);
        const empObj = response.body;
        this.firstName = empObj.sFirstName;
        this.lastName = empObj.sLastName;
        this.email = empObj.sEmail;
        this.mobileNo = empObj.sMobileNo;
        this.address = empObj.iAddID;
        this.role = empObj.iRoleID;
      },
      error: (error) => {
        console.error('Address loading failed:', error);
      },
    });

    this.authService.dataUser({iRequestID: 2016}).subscribe({
      next: (response: HttpResponse<any>) => {
        // console.log('Address loaded successful:', response.body);
        this.addressArray = response.body;
      },
      error: (error) => {
        console.error('Address loading failed:', error);
      },
    });

    this.authService.dataUser({iRequestID: 2094}).subscribe({
      next: (response: HttpResponse<any>) => {
        // console.log('Role loaded successful:', response.body);
        this.roleArray = response.body;
      },
      error: (error) => {
        console.error('Role loading failed:', error);
      },
    });
  }
  
  protected readonly value = signal('');

  protected onInput(event: Event) {
    this.value.set((event.target as HTMLInputElement).value);
  }

  editEmployee(item: any) {
    const addEmployeeObj = {
      iRequestID: 2033,
      iEmpID: 1,
      sFirstName: this.firstName,
      sLastName: this.lastName,
      sEmail: this.email,
      sMobileNo: this.mobileNo,
      iAddID: parseInt(this.address),
      iRoleID: parseInt(this.role),
    };

    this.authService.dataUser(addEmployeeObj).subscribe({
      next: (response: HttpResponse<any>) => {
        console.log('Employee added successful:', response.body);
        this.router.navigateByUrl('/employee');
      },
      error: (error) => {
        console.error('Employee adding failed:', error);
      },
    });
  }
}
