import { Injectable } from '@angular/core';
// snackbar
import { MatSnackBar } from '@angular/material/snack-bar';
// snack interface
import { SNACK_DATA } from '@models/common';
@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  constructor(private snackbar: MatSnackBar) {}
  public snackMessage(snackData: SNACK_DATA) {
    this.snackbar.open(snackData?.message, snackData?.action || 'Tamam', {
      duration: snackData?.duration || 3000,
    });
  }
}
