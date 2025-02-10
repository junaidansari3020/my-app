import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  public email: string = '';
  public password: string = '';

  constructor(private _router: Router, private _auth: AuthService) {}

  login() {
    const loginUserObj = {
      iRequestID: 1021,
      sEmail: this.email,
      sPassword: this.password
    };

    this._auth.loginUser(loginUserObj).subscribe({
      next: (response: HttpResponse<any>) => {
        console.log('Login successfully:', response);
        // this.message = response.body.StatusMessage;
        // const Rfid = response.headers.get('rfid');
        // const Rft = response.headers.get('rft');
        // if (Rfid && Rft) {
        //   localStorage.setItem('rfid', Rfid);
        //   localStorage.setItem('rft', Rft);
        //   this.setHeadersAndLogin();
        // } else {
        //   console.error('RFID or RFT header missing in the response');
        // }
      },
      error: (error) => {
        console.error('Login failed:', error);
      }
    });
  }

}
