import { Session, SessionService } from './session.service';

import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';

function setup() {
  TestBed.configureTestingModule({
    providers: [SessionService],
  });

  const service = TestBed.inject(SessionService);

  return { service };
}

describe('SessionService', () => {
  beforeEach(() => {
    window.sessionStorage.clear();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('saveCurrentUserSession()', () => {
    test('should save the session', async () => {
      const { service } = setup();

      const session: Session = {
        accessToken: '1234-5678',
        expiresIn: 3600,
      };

      service.saveCurrentUserSession(session);

      const savedSession = await firstValueFrom(
        service.getCurrentUserSession()
      );

      expect(savedSession).toEqual({
        accessToken: '1234-5678',
        expiresIn: 3600,
      });
    });
  });

  describe('getCurrentUserSession()', () => {
    test('should return null if there is no session', async () => {
      window.sessionStorage.clear();
      const { service } = setup();
      const savedSession = await firstValueFrom(
        service.getCurrentUserSession()
      );
      expect(savedSession).toEqual(null);
    });

    test('should return the session if exists', async () => {
      window.sessionStorage.setItem(
        'contact-list',
        JSON.stringify({ accessToken: '1234-5678', expiresIn: 3600 })
      );
      const { service } = setup();
      const savedSession = await firstValueFrom(
        service.getCurrentUserSession()
      );
      expect(savedSession).toEqual({
        accessToken: '1234-5678',
        expiresIn: 3600,
      });
    });
  });
});
