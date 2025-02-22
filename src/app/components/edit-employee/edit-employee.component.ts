import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute, ParamMap, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-employee',
  imports: [
    CommonModule,
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
export class EditEmployeeComponent implements OnInit {
  public addressArray: any[] = [];
  public roleArray: any[] = [];
  public empId: any;
  public editEmployeeForm: FormGroup;
  protected readonly value = signal('');

  selectedAddress = '';
  selectedRole = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.editEmployeeForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobileNo: ['', [Validators.required, Validators.maxLength(10)]],
      address: ['', Validators.required],
      role: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap)=>{
      let id = params.get('id');
      this.empId = id;
    });

    this.authService.dataUser({ iRequestID: 20310, iEmpID: parseInt(this.empId) }).subscribe({
      next: (response: HttpResponse<any>) => {
        const empObj = response.body[0];
        this.editEmployeeForm.patchValue({
          firstName: empObj.sFirstName,
          lastName: empObj.sLastName,
          email: empObj.sEmail,
          mobileNo: empObj.sMobileNo,
          address: parseInt(empObj.iAddID),
          role: parseInt(empObj.iRoleID),
        });
      },
      error: (error) => {
        console.error('Employee loading failed:', error);
      },
    });

    this.authService.dataUser({ iRequestID: 2016 }).subscribe({
      next: (response: HttpResponse<any>) => {
        this.addressArray = response.body;
      },
      error: (error) => {
        console.error('Address loading failed:', error);
      },
    });

    this.authService.dataUser({ iRequestID: 2094 }).subscribe({
      next: (response: HttpResponse<any>) => {
        this.roleArray = response.body;
      },
      error: (error) => {
        console.error('Role loading failed:', error);
      },
    });
  }

  protected onInput(event: Event) {
    this.value.set((event.target as HTMLInputElement).value);
  }

  editEmployee() {
    if (this.editEmployeeForm.invalid) {
      return;
    }

    const addEmployeeObj = {
      iRequestID: 2033,
      iEmpID: parseInt(this.empId),
      sFirstName: this.editEmployeeForm.value.firstName,
      sLastName: this.editEmployeeForm.value.lastName,
      sEmail: this.editEmployeeForm.value.email,
      sMobileNo: this.editEmployeeForm.value.mobileNo,
      iAddID: parseInt(this.editEmployeeForm.value.address),
      iRoleID: parseInt(this.editEmployeeForm.value.role),
    };

    this.authService.dataUser(addEmployeeObj).subscribe({
      next: (response: HttpResponse<any>) => {
        // console.log('Employee updated successfully:', response.body);
        this.router.navigateByUrl('/employee');
      },
      error: (error) => {
        console.error('Employee updating failed:', error);
      },
    });
  }

}
