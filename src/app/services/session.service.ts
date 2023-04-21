import { BehaviorSubject, Observable, map } from 'rxjs';

import { Injectable } from '@angular/core';

const CURRENT_SESSION = 'contact-list';
const EXPIRATION_TIME = 86400000; // 1 day

export interface Session {
  accessToken: string;
  expiresIn: number; //seconds
}

export interface SessionError {
  error: string;
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
    return this.sessionSubject.asObservable();
  }

  deleteCurrentUserSession() {
    sessionStorage.clear();
    this.sessionSubject.next(null);
  }
}
