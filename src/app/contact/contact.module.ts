import { AppBarModule } from '../app-bar';
import { CommonModule } from '@angular/common';
import { ContactComponent } from './contact.component';
import { ContactDetailsComponent } from './contact-details.component';
import { ContactRoutingModule } from './contact-routing.module';
import { ContactService } from './contact.service';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    AppBarModule,
    CommonModule,
    ContactRoutingModule,
    MatButtonModule,
    MatExpansionModule,
  ],
  declarations: [ContactComponent, ContactDetailsComponent],
  providers: [ContactService],
  exports: [ContactComponent],
})
export class ContactModule {}
