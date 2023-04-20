import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { LoginDialogComponent } from '../login-dialog';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SessionService } from '../services';

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
    public dialog: MatDialog,
    private sessionService: SessionService,
    private router: Router
  ) {}

  login = 'LOGIN';
  logout = 'LOGOUT';

  buttonText$ = new BehaviorSubject<string>(this.login);

  ngOnInit() {
    const text = this.sessionService.getCurrentUserSession()
      ? this.logout
      : this.login;

    this.buttonText$.next(text);
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
      this.sessionService.saveCurrentUserSession({ loginDate: Date.now() });
      this.openLoginDialog();
      this.buttonText$.next(this.logout);
    } else {
      this.sessionService.deleteCurrentUserSession();
      this.buttonText$.next(this.login);
      this.router.navigate(['/home']);
    }
  }
}
