import { Component, Input } from '@angular/core';
import { CONTACT } from '@models/contacts';

@Component({
  selector: 'contact-list-item',
  templateUrl: './contact-list-item.component.html',
  styleUrls: ['./contact-list-item.component.scss'],
})
export class ContactListItemComponent {
  @Input() contactItem!: CONTACT;
}
