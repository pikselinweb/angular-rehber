import { Component, OnInit } from '@angular/core';
import { AuthService } from '@core/services';
import { USER } from '@models/auth';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss'],
})
export class PagesComponent implements OnInit {
  currentUser!:USER | null;
  constructor(private authService: AuthService, ) {

  }

  async ngOnInit() {
    this.currentUser = await this.authService.userProfile()

  }
  logOut(){
    this.authService.logOut()
  }
}
