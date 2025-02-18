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
  selector: 'app-add-employee',
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
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddEmployeeComponent implements OnInit {
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
    const addressObj = {
      iRequestID: 2016,
    };
    const roleObj = {
      iRequestID: 2094,
    };

    this.authService.dataEmployee(addressObj).subscribe({
      next: (response: HttpResponse<any>) => {
        // console.log('Address loaded successful:', response.body);
        this.addressArray = response.body;
      },
      error: (error) => {
        console.error('Address loading failed:', error);
      },
    });

    this.authService.dataEmployee(roleObj).subscribe({
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

  addEmployee() {
    const addEmployeeObj = {
      iRequestID: 2032,
      sFirstName: this.firstName,
      sLastName: this.lastName,
      sEmail: this.email,
      sMobileNo: this.mobileNo,
      iAddID: this.address,
      iRoleID: this.role,
    };

    this.authService.dataEmployee(addEmployeeObj).subscribe({
      next: (response: HttpResponse<any>) => {
        console.log('Employee added successful:', response.body);
      },
      error: (error) => {
        console.error('Employee adding failed:', error);
      },
    });
  }
}

