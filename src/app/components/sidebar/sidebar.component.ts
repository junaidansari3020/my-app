import { Component, Renderer2 } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {

  constructor(private renderer: Renderer2) {}

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
