import { HttpResponse } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-toolbar',
  imports: [],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css',
})
export class ToolbarComponent {
  @Input() user: string = "";
  
  constructor(private authService: AuthService, private router: Router) {}

  onLogout() {
    const logoutUserObj = {
      iRequestID: 1027,
    };

    this.authService.logoutUser(logoutUserObj).subscribe({
      next: (response: HttpResponse<any>) => {
        console.log('Logout successful:', response.body);
        this.router.navigateByUrl('login');
      },
      error: (error) => {
        console.error('Logout failed:', error);
      },
    });
  }

}
