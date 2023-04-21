import { AuthorizationService, SessionService } from '../services';
import { BehaviorSubject, Subject, takeUntil, tap } from 'rxjs';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';

import { LoginDialogComponent } from '../login-dialog';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-bar',
  template: `
    <div class="app-bar">
      <h3>My Contact List</h3>
      <div class="app-bar-button" (click)="onButtonClick()">
        {{ buttonText$ | async }}
      </div>
    </div>
  `,
  styleUrls: ['./app-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppBarComponent implements OnInit, OnDestroy {
  constructor(
    private authorizationService: AuthorizationService,
    public dialog: MatDialog,
    private sessionService: SessionService
  ) {}

  login = 'LOGIN';
  logout = 'LOGOUT';

  buttonText$ = new BehaviorSubject<string>(this.login);
  private destroy$ = new Subject<void>();

  ngOnInit() {
    this.sessionService
      .getCurrentUserSession()
      .pipe(
        takeUntil(this.destroy$),
        tap((session) => {
          const text = session ? this.logout : this.login;
          this.buttonText$.next(text);
        })
      )
      .subscribe();
  }

  openLoginDialog() {
    this.dialog.open(LoginDialogComponent, {
      data: {
        closeCallback: () => this.dialog.closeAll(),
      },
    });
  }

  onButtonClick() {
    if (this.buttonText$.value === this.login) {
      this.openLoginDialog();
    } else {
      this.authorizationService.logout();
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
