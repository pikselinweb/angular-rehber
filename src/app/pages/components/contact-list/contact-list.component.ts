import { Component, Input } from '@angular/core';
// rehber interface
import { CONTACT } from '@models/contacts';

@Component({
  selector: 'contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss'],
})
export class ContactListComponent {
  @Input() contactList!: CONTACT[];
}
