import { Injectable } from '@angular/core';
// Angular Material Dialog
import { MatDialog } from '@angular/material/dialog';
// Modeller
import { ALERTDATA, ALERTRESULT } from '@models/common';
// Alert bileşeni
import { AlertModal } from '../modals';
// prove in root kaldırıldı
@Injectable()
export class AlertService {
  constructor(private dialog: MatDialog) {}
  // alert açma
  openAlert(alertData: ALERTDATA): Promise<ALERTRESULT> {
    return this.dialog
      .open(AlertModal, {
        data: alertData,
        disableClose: true,
        maxWidth: '400px',
      })
      .afterClosed()
      .toPromise();
  }
}
