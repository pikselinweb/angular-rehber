import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ALERTDATA } from '@models/common';
@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public alertData:ALERTDATA,
    private dialogRef: MatDialogRef<AlertComponent>
  ) {}

  ngOnInit(): void {}

  confirm(){
    this.dialogRef.close(this.alertData?.data)
  }
}
