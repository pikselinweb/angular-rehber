import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// FORM MODÜLLERİ
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// ANGULAR MATERIAL MODULLERİ
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [
    // FORM MODÜLLERİ
    FormsModule,
    ReactiveFormsModule,
    // MATERIAL MODULLER
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatToolbarModule,
  ],
})
export class SharedModule {}
