import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-edit-employee',
  standalone: true,
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
  public addressArray: { iAddID: number; sAddress: string }[] = [];
  public roleArray: { iRoleID: number; sRoleName: string }[] = [];
  public empId: number | null = null;
  public editEmployeeForm: FormGroup;
  protected readonly value = signal('');

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
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      this.empId = id ? parseInt(id) : null;

      if (this.empId) {
        this.loadData(this.empId);
      }
    });
  }

  private loadData(empId: number) {
    forkJoin({
      employee: this.authService.dataUser({ iRequestID: 20310, iEmpID: empId }),
      addresses: this.authService.dataUser({ iRequestID: 2016 }),
      roles: this.authService.dataUser({ iRequestID: 2094 }),
    }).subscribe({
      next: ({ employee, addresses, roles }: any) => {
        if (addresses.body) {
          this.addressArray = addresses.body;
        }
        if (roles.body) {
          this.roleArray = roles.body;
        }

        if (employee.body && employee.body.length > 0) {
          const empObj = employee.body[0];
          this.editEmployeeForm.patchValue({
            firstName: empObj.sFirstName,
            lastName: empObj.sLastName,
            email: empObj.sEmail,
            mobileNo: empObj.sMobileNo,
            address: empObj.iAddID,
            role: empObj.iRoleID,
          });
        }
      },
      error: (error) => {
        console.error('Data loading failed:', error);
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

    const updatedEmployee = {
      iRequestID: 2033,
      iEmpID: this.empId,
      sFirstName: this.editEmployeeForm.value.firstName,
      sLastName: this.editEmployeeForm.value.lastName,
      sEmail: this.editEmployeeForm.value.email,
      sMobileNo: this.editEmployeeForm.value.mobileNo,
      iAddID: this.editEmployeeForm.value.address,
      iRoleID: this.editEmployeeForm.value.role,
    };

    this.authService.dataUser(updatedEmployee).subscribe({
      next: () => {
        this.router.navigateByUrl('/employee');
      },
      error: (error) => {
        console.error('Employee updating failed:', error);
      },
    });
  }
}


