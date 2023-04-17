import { AppBarComponent } from './app-bar.component';
import { CommonModule } from '@angular/common';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [CommonModule, MatButtonModule, MatMenuModule, MatBadgeModule],
  declarations: [AppBarComponent],
  providers: [],
  exports: [AppBarComponent],
})
export class AppBarModule {}
