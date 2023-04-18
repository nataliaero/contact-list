import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { SessionService } from '../services';

@Component({
  selector: 'app-bar',
  template: `
    <div class="app-bar">
      <h3>My Contact List</h3>
      <div class="app-bar-button" (click)="onButtonClick()">LOGIN</div>
    </div>
  `,
  styleUrls: ['./app-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppBarComponent implements OnInit {
  constructor(private sessionService: SessionService, private router: Router) {}

  loginText = 'LOGIN';
  logoutText = 'LOGOUT';

  buttonText$ = new BehaviorSubject<string>(this.loginText);

  ngOnInit() {
    const text = this.sessionService.getCurrentUserSession()
      ? this.logoutText
      : this.loginText;

    this.buttonText$.next(text);
  }

  onButtonClick() {}
}
