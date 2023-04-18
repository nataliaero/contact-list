import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { Observable, of } from 'rxjs';

import { Injectable } from '@angular/core';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor() {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return of(true);
  }
}
