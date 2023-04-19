import { Contact, ContactService } from './contact.service';

import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';
import server from './CONTACTS.json';

function setup() {
  TestBed.configureTestingModule({
    providers: [ContactService],
  });

  const service = TestBed.inject(ContactService);
  return { service };
}

describe('ContactService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getContacts()', () => {
    test('should retrieve contacts sorted by surname', async () => {
      const { service } = setup();

      const contacts = await firstValueFrom(service.getContacts());
      expect(contacts[0].surname).toBe('Bardor');
      expect(contacts[contacts.length - 1].surname).toBe('Williams');
    });
  });

  describe('addContact()', () => {
    test('should add a new contact and sort them out by surname', async () => {
      const { service } = setup();

      const newContact: Contact = {
        id: '12345',
        name: 'John',
        surname: 'Albert',
        phoneNumber: '+417659828',
        email: 'john.albert@gmail.com',
        address: "John's St Andrews House",
      };

      service.addContact(newContact);
      const contacts = await firstValueFrom(service.getContacts());
      expect(contacts[0].surname).toBe('Albert');
      expect(contacts[1].surname).toBe('Bardor');
    });
  });

  describe('deleteContact()', () => {
    test('should delete a contact from the list', async () => {
      const { service } = setup();

      const contacts = await firstValueFrom(service.getContacts());
      expect(contacts.findIndex((el) => el.name === 'Paula')).toBeGreaterThan(
        -1
      );

      const id = '929a8b26-2932-48c1-afdc-8f01b0820341';
      service.deleteContact(id);

      const contactsAfterDeletion = await firstValueFrom(service.getContacts());
      expect(contactsAfterDeletion.findIndex((el) => el.name === 'Paula')).toBe(
        -1
      );
    });
  });
});
