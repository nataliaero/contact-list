import { BehaviorSubject, Observable, delay, map, of } from 'rxjs';

import { Injectable } from '@angular/core';
import server from './CONTACTS.json';

const ERROR_PROBABILITY = 5;

export interface Contact {
  id: string;
  name: string;
  surname: string;
  phoneNumber: string;
  address: string;
  email: string;
}

export interface ErrorMessage {
  error: string;
}

@Injectable()
export class ContactService {
  contacts: Contact[] = server.data;

  private _contacts$ = new BehaviorSubject<Contact[]>(server.data);

  getContacts(): Observable<Contact[]> {
    return this._contacts$.asObservable().pipe(
      delay(1000),
      map((list) => sortContact(list))
    );
  }

  private setContacts(contacts: Contact[]) {
    this._contacts$.next(contacts);
  }

  addContact(contact: Contact): Observable<ErrorMessage | null> {
    const randomInt = getRandomInt(10);

    if (randomInt > ERROR_PROBABILITY) {
      return of({ error: 'Adding a new contact failed. Please try again.' });
    }

    const list = this._contacts$.value;
    list.push(contact);
    const sortedList = sortContact(list);
    this.setContacts(sortedList);

    return of(null);
  }

  deleteContact(id: string): Observable<ErrorMessage | null> {
    const randomInt = getRandomInt(10);

    if (randomInt > ERROR_PROBABILITY) {
      return of({ error: 'Contact deletion failed. Please try again.' });
    }

    const list = this._contacts$.value;
    const indexToRemove = list.findIndex((el) => el.id === id);
    if (indexToRemove > -1) {
      list.splice(indexToRemove, 1);
    }
    this.setContacts(list);

    return of(null);
  }
}

function sortContact(list: Contact[]) {
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

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
