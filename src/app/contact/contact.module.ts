import { AppBarModule } from '../app-bar';
import { CommonModule } from '@angular/common';
import { ContactComponent } from './contact.component';
import { ContactRoutingModule } from './contact-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [AppBarModule, CommonModule, ContactRoutingModule, MatButtonModule],
  declarations: [ContactComponent],
  providers: [],
  exports: [ContactComponent],
})
export class ContactModule {}
