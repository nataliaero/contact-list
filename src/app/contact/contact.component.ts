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
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-contact-component',
  template: ` <app-bar></app-bar>
    <div
      *ngIf="isContactLoading$ | async; else offeringList"
      class="loading-spinner"
    >
      <mat-spinner color="primary"></mat-spinner>
    </div>

    <ng-template #offeringList>
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
      </div>
    </ng-template>`,
  styleUrls: ['./contact.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactComponent implements OnInit, OnDestroy {
  constructor(
    private contactService: ContactService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  contacts$ = new BehaviorSubject<Contact[]>([]);
  isContactLoading$ = new BehaviorSubject<boolean>(true);
  private destroy$ = new Subject<void>();

  ngOnInit() {
    this.contactService
      .getContacts()
      .pipe(
        tap((list) => {
          this.contacts$.next(list);
          this.isContactLoading$.next(false);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  onDeleteContact(id: string) {
    this.contactService
      .deleteContact(id)
      .pipe(
        take(1),
        tap((res) => {
          const message = res
            ? `⚠️  ${res.error}`
            : '✅  Contact deleted successfully';
          this.snackBar.open(message, 'Close', {
            duration: 3000,
          });
        })
      )
      .subscribe();
  }

  openAddContactDialog() {
    this.dialog.open(ContactDialogComponent, {
      data: {
        closeCallback: () => this.dialog.closeAll(),
      },
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
