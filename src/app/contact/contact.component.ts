import { BehaviorSubject, Subject, take, takeUntil, tap } from 'rxjs';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Contact, ContactService } from './contact.service';

import { ContactDialogComponent } from './contact-dialog/contact-dialog.component';
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
export class ContactComponent implements OnInit, OnDestroy {
  constructor(
    private contactService: ContactService,
    public dialog: MatDialog
  ) {}

  contacts$ = new BehaviorSubject<Contact[]>([]);
  private destroy$ = new Subject<void>();

  ngOnInit() {
    this.contactService
      .getContacts()
      .pipe(
        tap((list) => this.contacts$.next(list)),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  onDeleteContact(id: string) {
    this.contactService.deleteContact(id);
  }

  openAddContactDialog() {
    this.dialog.open(ContactDialogComponent);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
