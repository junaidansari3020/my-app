import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { HttpResponse } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-client',
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatCardModule,
    RouterLink,
  ],
  templateUrl: './client.component.html',
  styleUrl: './client.component.css'
})
export class ClientComponent  implements OnInit {

  displayedColumns: string[] = ['name', 'type', 'mobile', 'alternative', 'email', 'action'];
  clients = new MatTableDataSource();

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.getAllClients();
  }

  getAllClients() {
    const getAllClientsObj = {
      iRequestID: 2126
    };

    this.authService.dataUser(getAllClientsObj).subscribe({
      next: (response: HttpResponse<any>) => {
        // console.log('All clients loaded successfully:', response.body);
        this.clients.data = response.body;
      },
      error: (error) => {
        console.error('Clients loading failed:', error);
      }
    });
  }

  editClient(client: any) {
    console.log('Editing client:', client);
    // Add edit functionality here
  }

  deleteClient(client: any) {
    console.log('Deleting client:', client);
    // this.clients= this.clients.filter(c => c !== client);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.clients.filter = filterValue.trim().toLowerCase();
  }

}
