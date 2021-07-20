import { Component, Input } from '@angular/core';
// Kullanıcı interface
import { USER } from '@models/auth';

@Component({
  selector: 'contact-card',
  templateUrl: './contact-card.component.html',
  styleUrls: ['./contact-card.component.scss'],
})
export class ContactCardComponent {
  // Kullanıcı bilgisi
  @Input() userInfo!: USER | null;
}
