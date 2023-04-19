import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import { Contact } from '../contact.service';

@Component({
  selector: 'app-contact-details-component',
  template: `
    <div class="contact-details">
      <div>
        <span class="details-title">Phone number:</span>
        {{ contact.phoneNumber }}
      </div>
      <div><span class="details-title">Email:</span> {{ contact.email }}</div>
      <div>
        <span class="details-title">Address:</span> {{ contact.address }}
      </div>
    </div>
    <i class="material-icons delete-action" (click)="deleteContact.emit()"
      >delete</i
    >
  `,
  styleUrls: ['./contact-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactDetailsComponent {
  @Input() contact: Contact;
  @Output() deleteContact = new EventEmitter();
}
