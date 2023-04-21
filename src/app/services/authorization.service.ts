import { Observable, of } from 'rxjs';
import { Session, SessionError, SessionService } from './session.service';

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

const USERNAME = 'john_doe';
const PASSWORD = 'Pass1234';

/**
 * Service for authorization features
 */
@Injectable({
  providedIn: 'root',
})
export class AuthorizationService {
  constructor(private sessionService: SessionService, private router: Router) {}

  login(
    username: string,
    password: string
  ): Observable<Session | SessionError> {
    if (username === USERNAME && password === PASSWORD) {
      const session = {
        accessToken:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
        expiresIn: 3600, //seconds
      };
      this.sessionService.saveCurrentUserSession(session);
      this.router.navigate(['/contacts']);
      return of(session);
    } else {
      return of({ error: 'Incorrect username or password' });
    }
  }

  logout() {
    this.sessionService.deleteCurrentUserSession();
    this.router.navigate(['/home']);
  }
}
