import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true, // If using Angular standalone components
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'], // ✅ Fixed: changed styleUrl to styleUrls
})
export class LoginComponent {
  public email: string = '';
  public password: string = '';

  constructor(private authService: AuthService, private router: Router) {} // ✅ Fixed: Use constructor injection

  login() {
    const loginUserObj = {
      iRequestID: 1021,
      sEmail: this.email,
      sPassword: this.password
    };

    this.authService.loginUser(loginUserObj).subscribe({
      next: (response: HttpResponse<any>) => {
        console.log('Login successful:', response);
        // Handle login success, e.g., store token or navigate
      },
      error: (error) => {
        console.error('Login failed:', error);
      }
    });
    this.getAccessToken();
  }

  getAccessToken() {
    const accessToken = {
      iRequestID: 1023
    };

    this.authService.loginUser(accessToken).subscribe({
      next: (response: HttpResponse<any>) => {
        console.log('Access Token:', response);
      },
      error: (error) => {
        console.error('Access Token failed:', error);
      }
    });
  }
}
