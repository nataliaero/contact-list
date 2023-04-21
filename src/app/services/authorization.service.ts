import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from './session.service';
import { of } from 'rxjs';

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

  login(username: string, password: string) {
    if (username === USERNAME && password === PASSWORD) {
      this.sessionService.saveCurrentUserSession({ loginDate: Date.now() });
      this.router.navigate(['/contacts']);
      return of(null);
    } else {
      return of({ error: 'Incorrect username or password' });
    }
  }

  logout() {
    this.sessionService.deleteCurrentUserSession();
    this.router.navigate(['/home']);
  }
}
