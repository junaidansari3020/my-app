import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';


import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
} from '@angular/material/dialog';


@Component({
  selector: 'app-alert',
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogContent],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlertComponent {
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: {msg: string}) { }

}

