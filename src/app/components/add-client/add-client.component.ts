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
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { AddClientAddressComponent } from '../add-client-address/add-client-address.component';
import { AddClientContactComponent } from '../add-client-contact/add-client-contact.component';
import { AddClientVehicleComponent } from '../add-client-vehicle/add-client-vehicle.component';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';

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
  tabsUnlocked = [true, false, false, false];
  client = { name: '', type: '', mobile: '', alternative: '', email: '' };

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
    }
  }
  onTabChange(event: any) {
    this.selectedTab = event.index;
  }

  displayedColumns: string[] = [
    'line1',
    'line2',
    'city',
    'postalCode',
    'action',
  ];
  clientAddresses = [
    {
      line1: '123 Main Road',
      line2: 'Building',
      city: 'Thane',
      postalCode: '70001',
    },
    { line1: '406 Mtnl St', line2: '', city: 'Mumbai', postalCode: '479002' },
  ];

  displayedContactColumns: string[] = [
    'name',
    'mobile',
    'alternate',
    'email',
    'action',
  ];

  clientContacts = [
    { name: 'John ', mobile: '98743210', alternate: '167890', email: 'com' },
    { name: 'Jane ', mobile: '432109', alternate: '11234455', email: 'com' },
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

  constructor(private router: Router, public dialog: MatDialog) {}

  navigateToAdd() {
    this.router.navigate(['/add-client-address']);
  }

  editClientAddress(element: any) {
    console.log('Editing:', element);
    // Implement edit logic here
  }

  deleteClientAddress(element: any) {
    console.log('Deleting:', element);
    this.clientAddresses = this.clientAddresses.filter((a) => a !== element);
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
    const dialogRef = this.dialog.open(AddClientAddressComponent, {
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
        this.clientAddresses.push(result);
      }
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
      clientType: 'Individual'

    },
    {
      id: 2,
      clientType: 'Company',

    },
  ];

}
