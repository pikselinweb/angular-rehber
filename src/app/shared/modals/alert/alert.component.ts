import { Component, Inject } from '@angular/core';
// angular material dialog
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
// alert için belirlediğimiz modeller
import { ALERTDATA, ALERTRESULT } from '@models/common';
@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent {
  constructor(
    // veri alabilmek için
    @Inject(MAT_DIALOG_DATA) public alertData: ALERTDATA,
    // modalı kontrol etmek için
    private dialogRef: MatDialogRef<AlertComponent>
  ) {}

  //onaylama
  confirm() {
    const alertResult: ALERTRESULT = {
      accepted: true,
      data: this.alertData?.data,
    };
    this.dialogRef.close(alertResult);
  }
  // vazgeçme
  cancel() {
    const alertResult: ALERTRESULT = {
      accepted: false,
      data: this.alertData?.data,
    };
    this.dialogRef.close(alertResult);
  }
}
