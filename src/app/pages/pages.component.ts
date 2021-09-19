import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { AuthService, ContactService, SnackbarService } from '@core/services';
import { AlertService } from '@shared/services';
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
  userContactList = new BehaviorSubject<CONTACT[]>([]);
  constructor(
    private authService: AuthService,
    private contactService: ContactService,
    private dialog: MatDialog,
    private snackService: SnackbarService,
    private alertService: AlertService
  ) {}

  async ngOnInit() {
    this.currentUser = await this.authService.userProfile();
    // kullanıcı id ile rehber bilgilerini almak
    if (this.currentUser?.id) {
      const tempContactList = await this.contactService.contactList(
        this.currentUser.id
      );
      // rehber listesine değer atama
      this.userContactList.next(tempContactList);
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
          // userContactList'den şimdiki değeri alma
          const tempCList = this.userContactList.getValue();

          if (contact) {
            // eğer rehber bilgisi gönderilmişse güncelle
            const itemIndex = tempCList.findIndex(
              (itm) => itm?.id === dialogResult?.id
            );
            if (itemIndex >= 0) {
              tempCList[itemIndex] = dialogResult;
              // güncelleme mesajı
              this.snackService.snackMessage({
                message: `${contact?.fullName} güncellendi.`,
              });
            }
          } else {
            // değilse diziye ekle
            tempCList.push(dialogResult);
            // ekleme mesajı
            this.snackService.snackMessage({
              message: `${dialogResult?.fullName} rehbere eklendi`,
            });
          }
          // değişikliklerle kullanıcı listesini güncellemek
          this.userContactList.next(tempCList);
        }
      });
  }

  // seçili rehber ögesini silme
  async deleteContact(contact: CONTACT) {
    const {accepted} = await this.alertService.openAlert({
      title: 'Silme Onayı',
      body: `${contact?.fullName} isimli kişiyi rehberden silmek istediğinize emin misiniz?`,
      cancelButtonText:"Vazgeç",
      confirmButtonText:"Sil",
      cancelButtonColor:"default",
      confirmButtonColor:"warn"
    });
    if(accepted){
      const deleted = await this.contactService.deleteContact(contact);
      if (deleted) {
        const tempCOntactList = this.userContactList.getValue();
        const deletedContactList = tempCOntactList.filter(
          (itm) => itm.id !== contact.id
        );
        //silme mesajı
        this.snackService.snackMessage({
          message: `${contact?.fullName} isimli kişi rehberden silinmiştir`,
        });
        this.userContactList.next(deletedContactList);
      }
    }

  }

  logOut() {
    this.authService.logOut();
  }
}
