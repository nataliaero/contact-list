import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { Observable, of } from 'rxjs';

import { Injectable } from '@angular/core';
import { SessionService } from '../services';
import { isNil } from 'lodash-es';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private sessionService: SessionService) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const session = this.sessionService.getCurrentUserSession();
    return of(true);
  }
}
