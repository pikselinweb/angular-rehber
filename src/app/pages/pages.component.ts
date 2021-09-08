import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService, ContactService } from '@core/services';
import { USER } from '@models/auth';
import { CONTACT } from '@models/contacts';
// Modal bileşeni
import { ContactFormModal } from './modals';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss'],
})
export class PagesComponent implements OnInit {
  currentUser!: USER | null;
  userContactList!: Promise<CONTACT[]>;
  constructor(
    private authService: AuthService,
    private contactService: ContactService,
    private dialog: MatDialog
  ) {}

  async ngOnInit() {
    this.currentUser = await this.authService.userProfile();
    // kullanıcı id ile rehber bilgilerini almak
    if (this.currentUser?.id) {
      this.userContactList = this.contactService.contactList(
        this.currentUser.id
      );
    }
  }
  // Rehber Ekleme  - Düzenleme Formu
  openContactFormDialog(contact?: CONTACT) {
    this.dialog
      .open(ContactFormModal, {
        width: '95%',
        maxWidth: '600px',
        data: { contact, userId: this.currentUser?.id },
      })
      .afterClosed()
      .subscribe(async (dialogResult: CONTACT) => {
        if (dialogResult?.id) {
          const tempCList = await this.userContactList;
          tempCList.push(dialogResult);
        }
      });
  }
  logOut() {
    this.authService.logOut();
  }
}
