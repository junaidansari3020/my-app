import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true, // If using Angular standalone components
  imports: [FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public email: string = '';
  public password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.getAccessToken();
  }

  login() {
    const loginUserObj = {
      iRequestID: 1021,
      sEmail: this.email,
      sPassword: this.password
    };

    this.authService.loginUser(loginUserObj).subscribe({
      next: (response: HttpResponse<any>) => {
        console.log('Login successful:', response.body);
        this.getAccessToken();
      },
      error: (error) => {
        console.error('Login failed:', error);
      }
    });
  }

  getAccessToken() {
    const accessToken = {
      iRequestID: 1023
    };

    this.authService.loginUser(accessToken).subscribe({
      next: (response: HttpResponse<any>) => {
        console.log('Access Token:', response.body);
        this.router.navigateByUrl('dashboard');
      },
      error: (error) => {
        console.error('Access Token failed:', error);
      }
    });
  }
}
