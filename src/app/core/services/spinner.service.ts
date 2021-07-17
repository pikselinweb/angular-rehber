import { Injectable } from '@angular/core';
// Overlay
import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
// Spinner Component
import { SpinnerComponent } from '../components';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  private overlayRef = this.cdkOverlayCreate();
  private spinnerCount = 0;
  constructor(private overlay: Overlay) {

  }
  private cdkOverlayCreate() {
    return this.overlay.create({
      hasBackdrop: true,
      backdropClass: 'dark-backdrop',
      positionStrategy: this.overlay
        .position()
        .global()
        .centerHorizontally()
        .centerVertically(),
    });
  }
  public addQuene() {
    if (this.spinnerCount > 0) {
      this.spinnerCount++;
    } else {
      this.showSpinner();
      this.spinnerCount = 1;
    }
  }
  public removeQuene() {
    this.spinnerCount--;
    if (this.spinnerCount < 1) {
      this.stopSpinner();
    }
  }
  showSpinner() {
    this.overlayRef.attach(new ComponentPortal(SpinnerComponent));
  }

  stopSpinner() {
    this.overlayRef.detach();
  }
}
