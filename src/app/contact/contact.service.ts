import { BehaviorSubject, Observable, map, of, take } from 'rxjs';

import { Injectable } from '@angular/core';
import server from './CONTACTS.json';

export interface Contact {
  id: string;
  name: string;
  surname: string;
  phoneNumber: string;
  address: string;
  email: string;
}

@Injectable()
export class ContactService {
  contacts: Contact[] = server.data;

  private _contacts$ = new BehaviorSubject<Contact[]>(server.data);

  getContacts(): Observable<Contact[]> {
    return this._contacts$
      .asObservable()
      .pipe(map((list) => this.sortContact(list)));
  }

  private sortContact(list: Contact[]) {
    return list.sort(function (a, b) {
      if (a.surname.toLowerCase() < b.surname.toLowerCase()) {
        return -1;
      }
      if (a.surname.toLowerCase() > b.surname.toLowerCase()) {
        return 1;
      }
      return 0;
    });
  }

  setContacts(contacts: Contact[]) {
    this._contacts$.next(contacts);
  }

  addContact(contact: Contact) {
    const list = this._contacts$.value;
    list.push(contact);
    const sortedList = this.sortContact(list);
    this.setContacts(sortedList);
  }

  deleteContact(id: string) {
    const list = this._contacts$.value;
    const indexToRemove = list.findIndex((el) => el.id === id);
    if (indexToRemove > -1) {
      list.splice(indexToRemove, 1);
    }
    this.setContacts(list);
  }
}
