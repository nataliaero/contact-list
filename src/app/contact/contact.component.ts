import { BehaviorSubject, take, tap } from 'rxjs';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Contact, ContactService } from './contact.service';

import { ContactDialogComponent } from './contact-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-contact-component',
  template: ` <app-bar></app-bar>

    <div class="contacts-container">
      <div class="contacts-actions">
        <div class="action" (click)="openAddContactDialog()">Add contact</div>
      </div>
      <mat-accordion class="contacts-list">
        <mat-expansion-panel *ngFor="let contact of contacts$ | async">
          <mat-expansion-panel-header>
            <mat-panel-title>
              {{ contact.surname }}, {{ contact.name }}
            </mat-panel-title>
          </mat-expansion-panel-header>
          <app-contact-details-component
            [contact]="contact"
            (deleteContact)="onDeleteContact(contact.id)"
          ></app-contact-details-component>
        </mat-expansion-panel>
        <div></div>
      </mat-accordion>
    </div>`,
  styleUrls: ['./contact.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactComponent implements OnInit {
  constructor(
    private contactService: ContactService,
    public dialog: MatDialog
  ) {}

  contacts$ = new BehaviorSubject<Contact[]>([]);

  ngOnInit() {
    this.contactService
      .getContacts()
      .pipe(
        take(1),
        tap((list) => this.contacts$.next(list))
      )
      .subscribe();
  }

  onDeleteContact(id: string) {
    this.contactService.deleteContact(id);
  }

  openAddContactDialog() {
    this.dialog.open(ContactDialogComponent);
  }
}
