import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FooterComponent } from './components/footer/footer.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CommonModule } from '@angular/common';


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
    RouterLink
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {}
