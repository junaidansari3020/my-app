import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FooterComponent } from './components/footer/footer.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CommonModule } from '@angular/common';
import { HttpResponse } from '@angular/common/http';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    SidebarComponent,
    FooterComponent,
    ToolbarComponent,
    DashboardComponent,
    CommonModule,
    RouterOutlet,
    RouterLink,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  public firstName: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    const accessToken = {
      iRequestID: 1023,
    };

    this.authService.loginUser(accessToken).subscribe({
      next: (response: HttpResponse<any>) => {
        console.log('Access Token:', response);
        this.dashboard();
      },
      error: (error) => {
        console.error('Access Token failed:', error);
      },
    });
  }

  dashboard(){
    const getUserData = {
      iRequestID: 2036,
    };

    this.authService.dataUser(getUserData).subscribe({
      next: (response: HttpResponse<any>) => {
        console.log('user data:', response.body[0].sFirstName);
        this.firstName = response.body[0].sFirstName;
      },
      error: (error) => {
        console.error('user data failed:', error);
      },
    });
  }
}
