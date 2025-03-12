import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    RouterLink,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  public email: string = '';
  public password: string = '';

  constructor(private authService: AuthService, private router: Router, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.getAccessToken();
  }

  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
  
  login() {
    const loginUserObj = {
      iRequestID: 1021,
      sEmail: this.email,
      sPassword: this.password,
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
      },
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
