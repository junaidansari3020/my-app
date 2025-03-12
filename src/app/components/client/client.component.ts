import { Component, inject, OnInit } from '@angular/core';
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
import { AlertComponent } from '../../dialog/alert/alert.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  styleUrl: './client.component.css',
})
export class ClientComponent implements OnInit {
  readonly dialog = inject(MatDialog);
 
  displayedColumns: string[] = [
    'name',
    'type',
    'mobile',
    'alternative',
    'email',
    'action',
  ];
  clients = new MatTableDataSource();

  constructor(private authService: AuthService, private router: Router, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.getAllClients();
  }

  getAllClients() {
    const getAllClientsObj = {
      iRequestID: 2126,
    };

    this.authService.dataUser(getAllClientsObj).subscribe({
      next: (response: HttpResponse<any>) => {
        // console.log('All clients loaded successfully:', response.body);
        this.clients.data = response.body;
      },
      error: (error) => {
        console.error('Clients loading failed:', error);
      },
    });
  }

  editClient(client: any) {
    this.router.navigate(['/client', client.iCliID]);
  }

  deleteClient(client: any) {
    const deleteClientObj = {
      iRequestID: 2127,
      iCliID: client.iCliID,
    };

    let dialogRef = this.dialog.open(AlertComponent, {
      data: { msg: 'Are you sure you want to delete this client?' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'true') {
        this.authService.dataUser(deleteClientObj).subscribe({
          next: (response: HttpResponse<any>) => {
            // console.log('Client deleted successfully:', response.body);
            this.snackBar.open('Client deleted successfully', 'Close', { duration: 2000 });
            this.getAllClients();
          },
          error: (error) => {
            console.error('Client deleting failed:', error);
          },
        });
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.clients.filter = filterValue.trim().toLowerCase();
  }
}
