import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// MASK MODÜLÜ
import { NgxMaskModule, IConfig } from 'ngx-mask'
// MASK MODÜL AYARLARI
const maskConfigFunction: () => Partial<IConfig> = () => {
  return {
    validation: true,
  };
};
// PAYLAŞILAN MODÜL
import { SharedModule } from '../shared/shared.module';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { NavbarContent } from './contents';
import { ContactCardComponent, ContactListItemComponent } from './components';
import { ContactFormModal } from './modals';
import { TruncatePipe } from './pipes';

@NgModule({
  declarations: [
    PagesComponent,
    NavbarContent,
    ContactCardComponent,
    ContactListItemComponent,
    ContactFormModal,
    TruncatePipe,
  ],

  imports: [
    CommonModule,
    PagesRoutingModule,
    //MASK MODÜLÜ
    NgxMaskModule.forRoot(maskConfigFunction),
    // PAYLAŞILAN MODÜL
    SharedModule,
  ],
})
export class PagesModule {}
