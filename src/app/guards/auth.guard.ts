import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Observable, map, of } from 'rxjs';

import { Injectable } from '@angular/core';
import { SessionService } from '../services';
import { isNil } from 'lodash-es';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private sessionService: SessionService) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.sessionService.getCurrentUserSession().pipe(
      map((session) => {
        if (!session) {
          this.goToHome();
        }
        return !isNil(session);
      })
    );
  }

  private goToHome() {
    this.router.navigate(['/home']);
  }
}
