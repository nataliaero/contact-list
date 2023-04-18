import { Injectable } from '@angular/core';

const CURRENT_SESSION = 'contact-list';
const EXPIRATION_TIME = 86400000; // 1 day

export interface SessionData {
  loginDate?: number;
}

/**
 * Service for saving session cookies
 */
@Injectable({
  providedIn: 'root',
})
export class SessionService {
  saveCurrentUserSession(data: SessionData) {
    sessionStorage.setItem(CURRENT_SESSION, JSON.stringify(data));
  }

  getCurrentUserSession(): SessionData | null {
    const storage = sessionStorage.getItem(CURRENT_SESSION);
    if (!storage) {
      return null;
    }

    const session: SessionData = JSON.parse(storage);

    if (this.hasSessionExpired(session)) {
      this.deleteCurrentUserSession();
      return null;
    }

    return JSON.parse(storage);
  }

  deleteCurrentUserSession() {
    sessionStorage.clear();
  }

  private hasSessionExpired(session: SessionData): boolean {
    return session.loginDate + EXPIRATION_TIME < Date.now();
  }
}
