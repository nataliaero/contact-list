import { AppBarModule } from '../app-bar';
import { CommonModule } from '@angular/common';
import { ContactComponent } from './contact.component';
import { ContactDetailsComponent } from './contact-details/contact-details.component';
import { ContactDialogComponent } from './contact-dialog/contact-dialog.component';
import { ContactRoutingModule } from './contact-routing.module';
import { ContactService } from './contact.service';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    AppBarModule,
    CommonModule,
    ContactRoutingModule,
    MatButtonModule,
    MatDialogModule,
    MatExpansionModule,
    FormsModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  declarations: [
    ContactComponent,
    ContactDialogComponent,
    ContactDetailsComponent,
  ],
  providers: [ContactService],
  exports: [ContactComponent],
})
export class ContactModule {}
