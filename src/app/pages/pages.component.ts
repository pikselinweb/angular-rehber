import { Component, OnInit } from '@angular/core';
// Çerez Servisi
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {
  // Çerez Servisi inject
  constructor(private cookieService: CookieService) { }

  ngOnInit(): void {
    // Örnek Kullanım
    this.cookieService.set( 'test', 'Merhaba ben test çerezim.' );
    console.log(this.cookieService.get('test'))
  }

}
