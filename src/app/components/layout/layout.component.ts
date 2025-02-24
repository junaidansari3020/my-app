import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { HttpResponse } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-layout',
  imports: [
    RouterOutlet,
    SidebarComponent,
    ToolbarComponent,
    CommonModule,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent implements OnInit {
  public userName: string = '';

  constructor(private authService: AuthService, private router: Router) {}
  
  ngOnInit(): void {
    this.userData();
  }

  userData(){
    const getUserData = {
      iRequestID: 2036,
    };

    this.authService.dataUser(getUserData).subscribe({
      next: (response: HttpResponse<any>) => {
        console.log('user data:', response.body);
        sessionStorage.setItem('statusCode', response.body.StatusCode);
        this.userName = response.body[0].sFirstName;
      },
      error: (error) => {
        console.error('user data failed:', error);
      },
    });
  }
}
