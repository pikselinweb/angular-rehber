import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// FORM MODÜLLERİ
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// ANGULAR MATERIAL MODULLERİ
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
// modal components
import { AlertModal } from './modals';
// shared services
import {AlertService} from './services'
@NgModule({
  declarations: [AlertModal],
  providers:[AlertService],
  imports: [CommonModule, MatButtonModule, MatDialogModule],
  exports: [
    // FORM MODÜLLERİ
    FormsModule,
    ReactiveFormsModule,
    // MATERIAL MODULLER
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatToolbarModule,
  ],
})
export class SharedModule {}
