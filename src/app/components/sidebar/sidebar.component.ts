import { CommonModule } from '@angular/common';
import { HttpResponse } from '@angular/common/http';
import { Component, Input, OnInit, Renderer2 } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  
  @Input() sideMenu: any[] = [];

  constructor(
    private renderer: Renderer2,
    private authService: AuthService,
    private router: Router
  ) {
  }

  toggleSidebar() {
    const body = document.body;
    const sidebar = document.querySelector('.sidebar');

    if (body && sidebar) {
      body.classList.toggle('sidebar-toggled');
      sidebar.classList.toggle('toggled');
      if (sidebar.classList.contains('toggled')) {
        const collapses = sidebar.querySelectorAll('.collapse');
        collapses.forEach((collapse) => {
          this.renderer.removeClass(collapse, 'show');
        });
      }
    }
  }
}
