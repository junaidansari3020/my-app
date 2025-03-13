import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatSnackBar} from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  ngOnInit(): void {
    this.getAccessToken();
  }

  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    const loginUserObj = {
      iRequestID: 1021,
      sEmail: this.loginForm.value.email,
      sPassword: this.loginForm.value.password,
    };

    this.authService.loginUser(loginUserObj).subscribe({
      next: (response: HttpResponse<any>) => {
        sessionStorage.setItem('statusCode', response.body.StatusCode);
        if (response.body.StatusCode === '200') {
          this.getAccessToken();
        }
      },
      error: (error) => {
        console.error('Login failed:', error);
      }
    });
  }
  
  getAccessToken() {
    const accessToken = {
      iRequestID: 1023,
    };
    
    this.authService.loginUser(accessToken).subscribe({
      next: (response: HttpResponse<any>) => {
        sessionStorage.setItem('statusCode', response.body.StatusCode);
        if (response.body.StatusCode === '200') {
          this.router.navigateByUrl('dashboard');
          this.snackBar.open('Login successful', 'Close', { duration: 2000 });
        }
      },
      error: (error) => {
        sessionStorage.setItem('statusCode', error.error.StatusCode);
        console.error('Access Token failed:', error);
      },
    });
  }
}
