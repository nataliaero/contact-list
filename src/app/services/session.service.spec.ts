import { Session, SessionService } from './session.service';

import { TestBed } from '@angular/core/testing';

const dateConstructor = Date;
const UTC_PRESENT_DATE = Date.parse('January 1, 2020 00:00:00');
const PRESENT_DATE = new Date(UTC_PRESENT_DATE);

function setup() {
  TestBed.configureTestingModule({
    providers: [SessionService],
  });

  const service = TestBed.inject(SessionService);
  global.Date.now = jest.fn(() => PRESENT_DATE.getTime());
  return { service };
}

describe('SessionService', () => {
  beforeEach(() => {
    window.sessionStorage.clear();
  });

  afterEach(() => {
    jest.clearAllMocks();
    global.Date = dateConstructor;
  });

  describe('saveCurrentUserSession()', () => {
    test('should save the session', async () => {
      const { service } = setup();

      const session: Session = {
        loginDate: Date.now(),
      };

      service.saveCurrentUserSession(session);

      const savedSession = service.getCurrentUserSession();

      expect(savedSession).toEqual({
        loginDate: UTC_PRESENT_DATE,
      });
    });
  });

  describe('getCurrentUserSession()', () => {
    test('should return null if there is no session', async () => {
      window.sessionStorage.clear();
      const { service } = setup();
      const savedSession = service.getCurrentUserSession();
      expect(savedSession).toEqual(null);
    });

    test('should return the session if it has not expired', async () => {
      window.sessionStorage.setItem(
        'contact-list',
        JSON.stringify({ loginDate: Date.now() })
      );
      const { service } = setup();
      const savedSession = service.getCurrentUserSession();
      expect(savedSession).toEqual({ loginDate: Date.now() });
    });

    test('should return null if the session has expired', async () => {
      const UTC_PAST_DATE = Date.parse('January 1, 2019 00:00:00');

      window.sessionStorage.setItem(
        'contact-list',
        JSON.stringify({ loginDate: UTC_PAST_DATE })
      );
      const { service } = setup();
      const savedSession = service.getCurrentUserSession();
      expect(savedSession).toEqual(null);
    });
  });
});
