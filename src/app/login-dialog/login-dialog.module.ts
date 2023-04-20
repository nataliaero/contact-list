import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { LoginDialogComponent } from './login-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    FormsModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  declarations: [LoginDialogComponent],
  providers: [],
  exports: [LoginDialogComponent],
  entryComponents: [LoginDialogComponent],
})
export class LoginDialogModule {}
