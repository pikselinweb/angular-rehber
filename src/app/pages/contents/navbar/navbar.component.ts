import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { USER } from '@models/auth';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  @Input() user!: USER | null;
  @Output() logOut = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}
}
