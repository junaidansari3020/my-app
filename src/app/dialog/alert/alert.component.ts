import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';


@Component({
  selector: 'app-alert',
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlertComponent {
  readonly dialogRef = inject(MatDialogRef<AlertComponent>);

}

