import { Component, OnInit } from '@angular/core';
import { AuthService } from '@core/services';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss'],
})
export class PagesComponent implements OnInit {
  constructor(private authService: AuthService, ) {}

  ngOnInit(): void {
    this.authService
      .userProfile()
      .then((val) => console.table(val));
  }
}
