import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { AddClientAddressComponent } from '../add-client-address/add-client-address.component';
import { AddClientContactComponent } from '../add-client-contact/add-client-contact.component';
import { AddClientVehicleComponent } from '../add-client-vehicle/add-client-vehicle.component';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { HttpResponse } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { AlertComponent } from '../../dialog/alert/alert.component';

@Component({
  selector: 'app-add-client',
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatTabsModule,
    MatIconModule,
    MatTableModule,
    MatDialogModule,
    MatSelectModule,
    MatOptionModule,
  ],
  templateUrl: './add-client.component.html',
  styleUrl: './add-client.component.css',
})
export class AddClientComponent {
  selectedTab = 0;
  cliId = 0;
  tabsUnlocked = [true, false, false, false];
  client = { name: '', type: '', mobile: '', alternative: '', email: '' };

  displayedColumns: string[] = [
    'line1',
    'line2',
    'city',
    'postalCode',
    'action',
  ];

  clientAddresses = new MatTableDataSource();

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private authService: AuthService
  ) {}

  saveClient() {
    if (
      this.client.name &&
      this.client.type &&
      this.client.mobile &&
      this.client.email
    ) {
      this.tabsUnlocked = this.tabsUnlocked.map(() => true);
      if (this.selectedTab === 0) {
        this.selectedTab = 1;
      }
      this.addClient();
    }
  }

  addClient() {
    const addClientObj = {
      iRequestID: 2121,
      sCliName: this.client.name,
      sEmailID: this.client.email,
      sMobileNo: this.client.mobile,
      sTelNo: this.client.alternative,
      iCliType: this.client.type,
    };

    this.authService.dataUser(addClientObj).subscribe({
      next: (response: HttpResponse<any>) => {
        console.log('Client added successfully:', response.body);
        this.cliId = response.body[0].iCliID;
        this.getAllClientAddress();
      },
      error: (error) => {
        console.error('Client adding failed:', error);
      },
    });
  }

  getAllClientAddress() {
    const getAllClientAddressObj = {
      iRequestID: 2161,
      iCliID: this.cliId,
    };

    this.authService.dataUser(getAllClientAddressObj).subscribe({
      next: (response: HttpResponse<any>) => {
        console.log('All client address loaded successfully:', response);
        this.clientAddresses.data = response.body;
      },
      error: (error) => {
        console.error('Client address loading failed:', error);
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.clientAddresses.filter = filterValue.trim().toLowerCase();
  }

  onTabChange(event: any) {
    this.selectedTab = event.index;
  }

  displayedContactColumns: string[] = ['name', 'mobile', 'email', 'action'];

  clientContacts = [
    { name: 'John ', mobile: '98743210', email: 'com' },
    { name: 'Jane ', mobile: '432109', email: 'com' },
  ];

  displayedCarColumns: string[] = [
    'brand',
    'model',
    'variant',
    'registration',
    'chassisNo',
    'engineNo',
    'color',
    'action',
  ];

  clientCars = [
    {
      brand: 'Toyota',
      model: 'Civic',
      variant: 'New',
      registration: '4',
      chassisNo: '89',
      engineNo: 'ENG',
      color: 'White',
    },
    {
      brand: 'Honda',
      model: 'Civic',
      variant: 'New',
      registration: '5678',
      chassisNo: '321',
      engineNo: 'ENG',
      color: 'Black',
    },
  ];

  navigateToAdd() {
    this.router.navigate(['/add-client-address']);
  }

  editClientAddress(element: any) {
    console.log('Editing:', element);
    // Implement edit logic here
  }

  deleteClientAddress(element: any) {
    console.log(element);
    const deleteClientAddressObj = {
      iRequestID: 2165,
      // iCliAddID: element.iEmpID,
      // iCliID: element.iEmpID
    };

    let dialogRef = this.dialog.open(AlertComponent, {
      data: { msg: 'Are you sure you want to delete this client address?' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'true') {
        this.authService.dataUser(deleteClientAddressObj).subscribe({
          next: (response: HttpResponse<any>) => {
            console.log('Client address deleted successfully:', response.body);
            this.getAllClientAddress();
          },
          error: (error) => {
            console.error('Client address deleting failed:', error);
          },
        });
      }
    });
  }

  editClientContact(element: any) {
    console.log('Editing Contact:', element);
    // Implement edit logic here
  }

  deleteClientContact(element: any) {
    console.log('Deleting Contact:', element);
    this.clientContacts = this.clientContacts.filter((c) => c !== element);
  }

  editClientCar(element: any) {
    console.log('Editing Car:', element);
    // Implement edit logic here
  }

  deleteClientCar(element: any) {
    console.log('Deleting Car:', element);
    this.clientCars = this.clientCars.filter((car) => car !== element);
  }

  openAddressDialog(): void {
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;
    this.dialog.open(AddClientAddressComponent, {
      width: '90vw',
      maxWidth: '930px',
      data: { cliId: this.cliId },
      panelClass: 'custom-dialog-container',
      position: {
        top: `${viewportHeight * 0.2}px`,
        left: `${viewportWidth * 0.2}px`,
      },
    });
  }

  openContactDialog(): void {
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;
    const dialogCont = this.dialog.open(AddClientContactComponent, {
      width: '90vw',
      maxWidth: '930px',
      data: null,
      panelClass: 'custom-dialog-container',
      position: {
        top: `${viewportHeight * 0.2}px`,
        left: `${viewportWidth * 0.2}px`,
      },
    });

    dialogCont.afterClosed().subscribe((result) => {
      if (result) {
        this.clientContacts.push(result);
      }
    });
  }

  openCarDialog(): void {
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;
    const dialogRef = this.dialog.open(AddClientVehicleComponent, {
      width: '90vw',
      maxWidth: '930px',
      data: null,
      panelClass: 'custom-dialog-container',
      position: {
        top: `${viewportHeight * 0.2}px`,
        left: `${viewportWidth * 0.2}px`,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.clientCars.push(result);
      }
    });
  }

  cancel() {
    this.router.navigate(['/client']);
  }

  clientTypes: any[] = [
    {
      id: 1,
      clientType: 'Individual',
    },
    {
      id: 2,
      clientType: 'Company',
    },
  ];
}
