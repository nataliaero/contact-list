import { AuthorizationService, SessionService } from '../services';
import { BehaviorSubject, take, tap } from 'rxjs';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { LoginDialogComponent } from '../login-dialog';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

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
export class AppBarComponent implements OnInit {
  constructor(
    private authorizationService: AuthorizationService,
    public dialog: MatDialog,
    private sessionService: SessionService,
    private router: Router
  ) {}

  login = 'LOGIN';
  logout = 'LOGOUT';

  buttonText$ = new BehaviorSubject<string>(this.login);

  ngOnInit() {
    console.log(this.buttonText$.value);
    this.sessionService
      .getCurrentUserSession()
      .pipe(
        take(1),
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
      this.buttonText$.next(this.logout);
      this.openLoginDialog();
    } else {
      this.authorizationService.logout();
      this.buttonText$.next(this.login);
    }
  }
}
