import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// PAYLAŞILAN MODÜL
import { SharedModule } from '../shared/shared.module';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { NavbarContent } from './contents';
import { ContactCardComponent, ContactListComponent } from './components';
import { TruncatePipe } from './pipes';

@NgModule({
  declarations: [
    PagesComponent,
    NavbarContent,
    ContactCardComponent,
    ContactListComponent,
    TruncatePipe,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    // PAYLAŞILAN MODÜL
    SharedModule,
  ],
})
export class PagesModule {}
