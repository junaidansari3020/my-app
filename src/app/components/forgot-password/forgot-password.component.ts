import { CommonModule } from '@angular/common';
import { HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
  public email: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  forgotPassword() {
    const forgotPasswordObj = {
      iRequestID: 1025,
      sEmail: this.email,
    };
   
    this.authService.loginUser(forgotPasswordObj).subscribe({
      next: (response: HttpResponse<any>) => {
        console.log('Forgot Password successful:', response);
        this.router.navigate(['/reset-password']);
      },
      error: (error) => {
        console.error('Forgot Password failed:', error);
      }
    });
  }
}
