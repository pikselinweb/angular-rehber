import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CONTACT } from '@models/contacts';

@Component({
  selector: 'contact-list-item',
  templateUrl: './contact-list-item.component.html',
  styleUrls: ['./contact-list-item.component.scss'],
})
export class ContactListItemComponent {
  @Input() contactItem!: CONTACT;
  @Output() updateItem = new EventEmitter<CONTACT>();

  updateContactItem(cItem: CONTACT) {
    this.updateItem.emit(cItem);
  }
}
