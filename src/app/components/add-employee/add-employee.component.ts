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
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { forkJoin } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-employee',
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
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddEmployeeComponent implements OnInit {
  public addressArray: { iAddID: number; sAddress: string }[] = [];
  public roleArray: { iRoleID: number; sRoleName: string }[] = [];
  public addEmployeeForm: FormGroup;
  protected readonly value = signal('');

  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.addEmployeeForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobileNo: ['', [Validators.required, Validators.maxLength(10)]],
      address: ['', Validators.required],
      role: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadData();
  }

  private loadData() {
    forkJoin({
      addresses: this.authService.dataUser({ iRequestID: 2016 }),
      roles: this.authService.dataUser({ iRequestID: 2094 }),
    }).subscribe({
      next: ({ addresses, roles }: any) => {
        if (addresses.body) {
          this.addressArray = addresses.body;
        }
        if (roles.body) {
          this.roleArray = roles.body;
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

  addEmployee() {
    if (this.addEmployeeForm.invalid) {
      return;
    }

    const addEmployeeObj = {
      iRequestID: 2032,
      sFirstName: this.addEmployeeForm.value.firstName,
      sLastName: this.addEmployeeForm.value.lastName,
      sEmail: this.addEmployeeForm.value.email,
      sMobileNo: this.addEmployeeForm.value.mobileNo,
      iAddID: this.addEmployeeForm.value.address,
      iRoleID: this.addEmployeeForm.value.role,
    };

    this.authService.dataUser(addEmployeeObj).subscribe({
      next: (response: HttpResponse<any>) => {
        // console.log('Employee added successfully:', response.body);
        this.router.navigateByUrl('/employee');
        this.snackBar.open('Employee added successfully', 'Close', { duration: 2000 });
      },
      error: (error) => {
        console.error('Employee adding failed:', error);
      },
    });
  }
}
