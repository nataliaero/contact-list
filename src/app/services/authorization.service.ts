import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from './session.service';

/**
 * Service for authorization features
 */
@Injectable({
  providedIn: 'root',
})
export class AuthorizationService {
  constructor(private sessionService: SessionService, private router: Router) {}

  login() {
    this.sessionService.saveCurrentUserSession({ loginDate: Date.now() });
    this.router.navigate(['/contacts']);
  }

  logout() {
    this.sessionService.deleteCurrentUserSession();
    this.router.navigate(['/home']);
  }
}
