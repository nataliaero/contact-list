import { BehaviorSubject, take, tap } from 'rxjs';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Contact, ContactService } from './contact.service';

@Component({
  selector: 'app-contact-component',
  template: ` <app-bar></app-bar>
    <div class="contacts-container">
      <mat-accordion>
        <mat-expansion-panel *ngFor="let contact of contacts$ | async">
          <mat-expansion-panel-header>
            <mat-panel-title>
              {{ contact.surname }}, {{ contact.name }}
            </mat-panel-title>
          </mat-expansion-panel-header>
          <div>
            <span class="details-title">Phone number:</span>
            {{ contact.phoneNumber }}
          </div>
          <div>
            <span class="details-title">Email:</span> {{ contact.email }}
          </div>
          <div>
            <span class="details-title">Address:</span> {{ contact.address }}
          </div>
        </mat-expansion-panel>
        <div></div>
      </mat-accordion>
    </div>`,
  styleUrls: ['./contact.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactComponent implements OnInit {
  constructor(private contactService: ContactService) {}

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
}
