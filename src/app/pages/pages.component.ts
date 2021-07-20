import { Component, OnInit } from '@angular/core';
import { AuthService, ContactService } from '@core/services';
import { USER } from '@models/auth';
import { CONTACT } from '@models/contacts';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss'],
})
export class PagesComponent implements OnInit {
  currentUser!: USER | null;
  userContactList!:Promise<CONTACT[]>;
  constructor(
    private authService: AuthService,
    private contactService: ContactService
  ) {}

  async ngOnInit() {
    this.currentUser = await this.authService.userProfile();
    // kullanıcı id ile rehber bilgilerini almak
    if(this.currentUser?.id){
      this.userContactList = this.contactService.contactList(this.currentUser.id)
    }
  }
  logOut() {
    this.authService.logOut();
  }
}
