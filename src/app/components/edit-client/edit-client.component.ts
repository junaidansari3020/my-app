import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-client',
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
  templateUrl: './edit-client.component.html',
  styleUrl: './edit-client.component.css',
})
export class EditClientComponent implements OnInit {
  selectedTab = 0;
  cliId: any = 0;
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
    private authService: AuthService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      this.cliId = id ? parseInt(id) : null;

      if (this.cliId) {
        this.loadData(this.cliId);
      }
    });
  }

  private loadData(cliId: number) {
    this.authService.dataUser({ iRequestID: 2122, iCliID: cliId }).subscribe({
      next: (response: HttpResponse<any>) => {
        // console.log('Client data loaded successfully:', response.body);
        const cliObj = response.body[0];
        this.client.name = cliObj.sCliName;
        this.client.type = cliObj.iCliType;
        this.client.mobile = cliObj.sMobileNo;
        this.client.alternative = cliObj.sTelNo;
        this.client.email = cliObj.sEmailID;
      },
      error: (error) => {
        console.error('Data loading failed:', error);
      },
    });
  }

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
      this.updateClient();
    }
  }

  updateClient() {
    if (!this.cliId) {
      console.error('Client ID is missing. Cannot update client.');
      return;
    }

    const updateClientObj = {
      iRequestID: 2125,
      iCliID: this.cliId,
      sCliName: this.client.name,
      sEmailID: this.client.email,
      sMobileNo: this.client.mobile,
      sTelNo: this.client.alternative,
      iCliType: this.client.type,
    };

    this.authService.dataUser(updateClientObj).subscribe({
      next: (response: HttpResponse<any>) => {
        // console.log('Client updated successfully:', response.body);
        this.snackBar.open('Client updated successfully', 'Close', { duration: 2000 });
        this.getAllClientAddress();
        this.getAllClientContact();
        this.getAllClientVehicle();
      },
      error: (error) => {
        console.error('Client updating failed:', error);
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
        // console.log('All client address loaded successfully:', response);
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
  clientContacts = new MatTableDataSource();

  getAllClientContact() {
    const getAllClientContactObj = {
      iRequestID: 2174,
      iCliID: this.cliId,
    };

    this.authService.dataUser(getAllClientContactObj).subscribe({
      next: (response: HttpResponse<any>) => {
        // console.log('All client contact loaded successfully:', response);
        this.clientContacts.data = response.body;
      },
      error: (error) => {
        console.error('Client contact loading failed:', error);
      },
    });
  }


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

  clientCars = new MatTableDataSource();

  getAllClientVehicle() {
    const getAllClientVehicleObj = {
      iRequestID: 2134,
      iCliID: this.cliId,
    };

    this.authService.dataUser(getAllClientVehicleObj).subscribe({
      next: (response: HttpResponse<any>) => {
        // console.log('All client vehicle loaded successfully:', response);
        this.clientCars.data = response.body;
      },
      error: (error) => {
        console.error('Client vehicle loading failed:', error);
      },
    });
  }

  navigateToAdd() {
    this.router.navigate(['/add-client-address']);
  }

  editClientAddress(element: any) {
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;
    const dialogRef = this.dialog.open(AddClientAddressComponent, {
      width: '90vw',
      maxWidth: '930px',
      data: { cliId: this.cliId, title: 'Edit Address', element },
      panelClass: 'custom-dialog-container',
      position: {
        top: `${viewportHeight * 0.2}px`,
        left: `${viewportWidth * 0.2}px`,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.snackBar.open('Client address updated successfully', 'Close', { duration: 2000 });
        this.getAllClientAddress();
      }
    });
  }

  deleteClientAddress(element: any) {
    const deleteClientAddressObj = {
      iRequestID: 2165,
      iCliAddID: element.iCliAddID,
      iCliID: element.iCliID
    };

    let dialogRef = this.dialog.open(AlertComponent, {
      data: { msg: 'Are you sure you want to delete this client address?' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'true') {
        this.authService.dataUser(deleteClientAddressObj).subscribe({
          next: (response: HttpResponse<any>) => {
            // console.log('Client address deleted successfully:', response.body);
            this.snackBar.open('Client address deleted successfully', 'Close', { duration: 2000 });
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
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;
    const dialogCont = this.dialog.open(AddClientContactComponent, {
      width: '90vw',
      maxWidth: '930px',
      data: { cliId: this.cliId, title: 'Edit Contact', element },
      panelClass: 'custom-dialog-container',
      position: {
        top: `${viewportHeight * 0.2}px`,
        left: `${viewportWidth * 0.2}px`,
      },
    });

    dialogCont.afterClosed().subscribe((result) => {
      if (result) {
        this.snackBar.open('Client contact updated successfully', 'Close', { duration: 2000 });
        this.getAllClientContact();
      }
    });
  }

  deleteClientContact(element: any) {
    const deleteClientContactObj = {
      iRequestID: 2173,
      iContactID: element.iContactID,
      iCliID: element.iCliID
    };

    let dialogRef = this.dialog.open(AlertComponent, {
      data: { msg: 'Are you sure you want to delete this client contact?' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'true') {
        this.authService.dataUser(deleteClientContactObj).subscribe({
          next: (response: HttpResponse<any>) => {
            // console.log('Client contact deleted successfully:', response.body);
            this.snackBar.open('Client contact deleted successfully', 'Close', { duration: 2000 });
            this.getAllClientContact();
          },
          error: (error) => {
            console.error('Client contact deleting failed:', error);
          },
        });
      }
    });
  }

  editClientVehicle(element: any) {
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;
    const dialogRef = this.dialog.open(AddClientVehicleComponent, {
      width: '90vw',
      maxWidth: '930px',
      data: { title: 'Edit Vehicle', element },
      panelClass: 'custom-dialog-container',
      position: {
        top: `${viewportHeight * 0.2}px`,
        left: `${viewportWidth * 0.2}px`,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.snackBar.open('Client vehicle updated successfully', 'Close', { duration: 2000 });
        this.getAllClientVehicle();
      }
    });
  }

  deleteClientVehicle(element: any) {
    const deleteClientVehicleObj = {
      iRequestID: 2133,
      iCliVehID: element.iCliVehID
    };

    let dialogRef = this.dialog.open(AlertComponent, {
      data: { msg: 'Are you sure you want to delete this client vehicle?' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'true') {
        this.authService.dataUser(deleteClientVehicleObj).subscribe({
          next: (response: HttpResponse<any>) => {
            console.log('Client vehicle deleted successfully:', response.body);
            this.snackBar.open('Client vehicle deleted successfully', 'Close', { duration: 2000 });
            this.getAllClientVehicle();
          },
          error: (error) => {
            console.error('Client vehicle deleting failed:', error);
          },
        });
      }
    });
  }

  openAddressDialog(): void {
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;
    const dialogRef = this.dialog.open(AddClientAddressComponent, {
      width: '90vw',
      maxWidth: '930px',
      data: { cliId: this.cliId, title: 'Add Address' },
      panelClass: 'custom-dialog-container',
      position: {
        top: `${viewportHeight * 0.2}px`,
        left: `${viewportWidth * 0.2}px`,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.snackBar.open('Client address added successfully', 'Close', { duration: 2000 });
        this.getAllClientAddress();
      }
    });
  }

  openContactDialog(): void {
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;
    const dialogCont = this.dialog.open(AddClientContactComponent, {
      width: '90vw',
      maxWidth: '930px',
      data: { cliId: this.cliId, title: 'Add Contact' },
      panelClass: 'custom-dialog-container',
      position: {
        top: `${viewportHeight * 0.2}px`,
        left: `${viewportWidth * 0.2}px`,
      },
    });

    dialogCont.afterClosed().subscribe((result) => {
      if (result) {
        this.snackBar.open('Client contact added successfully', 'Close', { duration: 2000 });
        this.getAllClientContact();
      }
    });
  }

  openVehicleDialog(): void {
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;
    const dialogRef = this.dialog.open(AddClientVehicleComponent, {
      width: '90vw',
      maxWidth: '930px',
      data: { cliId: this.cliId, title: 'Add Vehicle' },
      panelClass: 'custom-dialog-container',
      position: {
        top: `${viewportHeight * 0.2}px`,
        left: `${viewportWidth * 0.2}px`,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.snackBar.open('Client vehicle added successfully', 'Close', { duration: 2000 });
        this.getAllClientVehicle();
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
