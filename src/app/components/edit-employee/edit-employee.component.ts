import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  signal,
} from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { forkJoin } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  public empId: number | null = null;
  public editEmployeeForm: FormGroup;
  protected readonly value = signal('');

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router,
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

  protected onInput(event: Event) {
    this.value.set((event.target as HTMLInputElement).value);
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
      address: this.authService.dataUser({ iRequestID: 2016 }),
      role: this.authService.dataUser({ iRequestID: 2094 }),
      employee: this.authService.dataUser({ iRequestID: 20312, iEmpID: this.empId }),
    }).subscribe({
      next: ({ role, address, employee }: any) => {
        if (address.body) {
          this.addressArray = address.body;
        }
        if (role.body) {
          this.roleArray = role.body;
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

  editEmployee() {
    if (this.editEmployeeForm.invalid) {
      return;
    }

    const addEmployeeObj = {
      iRequestID: 2033,
      iEmpID: this.empId,
      sFirstName: this.editEmployeeForm.value.firstName,
      sLastName: this.editEmployeeForm.value.lastName,
      sEmail: this.editEmployeeForm.value.email,
      sMobileNo: this.editEmployeeForm.value.mobileNo,
      iAddID: this.editEmployeeForm.value.address,
      iRoleID: this.editEmployeeForm.value.role,
    };

    this.authService.dataUser(addEmployeeObj).subscribe({
      next: (response: HttpResponse<any>) => {
        // console.log('Employee updated successfully:', response.body);
        this.router.navigateByUrl('/employee');
        this.snackBar.open('Employee updated successfully', 'Close', { duration: 2000 });
      },
      error: (error) => {
        console.error('Employee updating failed:', error);
      },
    });
  }
}
