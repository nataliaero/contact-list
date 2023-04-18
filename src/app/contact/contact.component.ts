import { BehaviorSubject, take, tap } from 'rxjs';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Contact, ContactService } from './contact.service';

@Component({
  selector: 'app-contact-component',
  template: ` <app-bar></app-bar>
    <div class="contacts-container">
      <div *ngFor="let contact of contacts$ | async">
        {{ contact.surname }}, {{ contact.name }}
      </div>
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
