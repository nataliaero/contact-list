import { BehaviorSubject, Observable, map } from 'rxjs';

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
  private sessionSubject = new BehaviorSubject<Session | null>(null);

  constructor() {
    const storage = sessionStorage.getItem(CURRENT_SESSION);
    this.sessionSubject.next(JSON.parse(storage));
  }

  saveCurrentUserSession(data: Session) {
    sessionStorage.setItem(CURRENT_SESSION, JSON.stringify(data));
    this.sessionSubject.next(data);
  }

  getCurrentUserSession(): Observable<Session | null> {
    return this.sessionSubject.asObservable().pipe(
      map((session) => {
        if (this.hasSessionExpired(session)) {
          this.deleteCurrentUserSession();
          return null;
        }

        return session;
      })
    );
  }

  getCurrentUserSession2(): Observable<Session | null> {
    const storage = sessionStorage.getItem(CURRENT_SESSION);
    if (!storage) {
      this.sessionSubject.next(null);
      return this.sessionSubject.asObservable();
    }

    const session: Session = JSON.parse(storage);

    if (this.hasSessionExpired(session)) {
      this.deleteCurrentUserSession();
      this.sessionSubject.next(null);
    } else {
      this.sessionSubject.next(JSON.parse(storage));
    }

    return this.sessionSubject.asObservable();
  }

  deleteCurrentUserSession() {
    sessionStorage.clear();
    this.sessionSubject.next(null);
  }

  private hasSessionExpired(session: Session | null): boolean {
    if (!session) {
      return false;
    }
    return session.loginDate + EXPIRATION_TIME < Date.now();
  }
}
