import { Injectable } from '@angular/core';

const CURRENT_SESSION = 'contact-list';
const EXPIRATION_TIME = 86400000; // 1 day

export interface Session {
  loginDate?: number;
}

/**
 * Service for saving session cookies
 */
@Injectable({
  providedIn: 'root',
})
export class SessionService {
  saveCurrentUserSession(data: Session) {
    sessionStorage.setItem(CURRENT_SESSION, JSON.stringify(data));
  }

  getCurrentUserSession(): Session | null {
    const storage = sessionStorage.getItem(CURRENT_SESSION);
    if (!storage) {
      return null;
    }

    const session: Session = JSON.parse(storage);

    if (this.hasSessionExpired(session)) {
      this.deleteCurrentUserSession();
      return null;
    }

    return JSON.parse(storage);
  }

  deleteCurrentUserSession() {
    sessionStorage.clear();
  }

  private hasSessionExpired(session: Session): boolean {
    return session.loginDate + EXPIRATION_TIME < Date.now();
  }
}
