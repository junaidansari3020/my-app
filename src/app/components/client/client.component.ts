import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';

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
    MatCardModule
  ],
  templateUrl: './client.component.html',
  styleUrl: './client.component.css'
})
export class ClientComponent {
  displayedColumns: string[] = ['name', 'type', 'mobile', 'alternative', 'email', 'action'];
  clients = [
    { name: 'John Doe', type: 'Corporate', mobile: '9876543210', alternative: '9876543201', email: 'john@example.com' },
    { name: 'Jane Smith', type: 'Individual', mobile: '8765432109', alternative: '8765432198', email: 'jane@example.com' },
    { name: 'Acme Inc.', type: 'Business', mobile: '7654321098', alternative: '7654321987', email: 'acme@example.com' },
  ];

  constructor(private router: Router) {}

  navigateToAdd() {
    console.log('Navigating to add client form...');
    this.router.navigate(['/add-client']);
    // Add navigation logic here
  }

  editClient(client: any) {
    console.log('Editing client:', client);
    // Add edit functionality here
  }

  deleteClient(client: any) {
    console.log('Deleting client:', client);
    this.clients= this.clients.filter(c => c !== client);
  }
}
