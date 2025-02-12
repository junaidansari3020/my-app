import { HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'] // Corrected property name
})
export class ResetPasswordComponent {
  public newPassword: string = '';
  public confirmNewPassword: string = '';
  public key: string = 'slJ4wQ6mUVi9d6eibtd58RjqDgS3W3L8JJSD';
  public formValid: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  resetPassword() {
    if (!this.formValid) {
      return;
    }

    const resetPasswordObj = {
      iRequestID: 1026,
      sPassword: this.confirmNewPassword,
      sKey: this.key
    };

    this.authService.loginUser(resetPasswordObj).subscribe({
      next: (response: HttpResponse<any>) => {
        console.log('Password reset successful:', response);
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Password reset failed:', error);
      }
    });
  }

  checkPasswords() {
    this.formValid = this.newPassword === this.confirmNewPassword && this.newPassword.length > 0;
  }
}
