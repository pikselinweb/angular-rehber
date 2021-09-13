import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CONTACT } from '@models/contacts';

@Component({
  selector: 'contact-list-item',
  templateUrl: './contact-list-item.component.html',
  styleUrls: ['./contact-list-item.component.scss'],
})
export class ContactListItemComponent {
  @Input() contactItem!: CONTACT;
  //güncelleme işlemi
  @Output() updateItem = new EventEmitter<CONTACT>();
  //silme işlemi
  @Output() deleteItem = new EventEmitter<CONTACT>();

  // güncelleme fonksiyonu
  updateContactItem(cItem: CONTACT) {
    this.updateItem.emit(cItem);
  }

  // silme fonksiyonu
  deleteContactItem(cItem: CONTACT) {
    this.deleteItem.emit(cItem);
  }
}
