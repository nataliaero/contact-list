import { Injectable } from '@angular/core';

const CURRENT_SESSION = 'contact-list';

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
    localStorage.setItem(CURRENT_SESSION, JSON.stringify(data));
  }

  getCurrentUserSession(): SessionData | null {
    const storage = localStorage.getItem(CURRENT_SESSION);
    if (!storage) {
      return null;
    }
    return JSON.parse(storage);
  }

  deleteCurrentUserSession() {
    localStorage.clear();
  }
}
