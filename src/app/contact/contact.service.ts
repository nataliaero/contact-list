import { BehaviorSubject, Observable, map, of } from 'rxjs';

import { HttpClient } from '@angular/common/http';
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

const CONTACT_API = 'https://my.api.mockaroo.com/contacts.json';

@Injectable()
export class ContactService {
  constructor(private http: HttpClient) {}

  contacts: Contact[] = server.data;

  private _contacts$ = new BehaviorSubject<Contact[]>(server.data);

  getContacts(): Observable<Contact[]> {
    return this.http
      .get<Contact[]>(CONTACT_API, {
        headers: { 'X-API-Key': '6a2ea9f0' },
      })
      .pipe(
        map((res) => {
          console.log(res);
          return sortContact(res);
        })
      );
  }

  private setContacts(contacts: Contact[]) {
    this._contacts$.next(contacts);
  }

  addContact(contact: Contact): Observable<boolean> {
    const list = this._contacts$.value;
    list.push(contact);
    const sortedList = sortContact(list);
    this.setContacts(sortedList);

    return of(true);
  }

  deleteContact(id: string): Observable<boolean> {
    const list = this._contacts$.value;
    const indexToRemove = list.findIndex((el) => el.id === id);
    if (indexToRemove > -1) {
      list.splice(indexToRemove, 1);
    }
    this.setContacts(list);

    return of(true);
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
