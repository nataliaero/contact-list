import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subject, take, takeUntil, tap } from 'rxjs';

import { Router } from '@angular/router';
import { SessionService } from '../services';

@Component({
  selector: 'app-home-component',
  template: `
    <app-bar></app-bar>
    <div class="welcome-container">
      <div class="welcome-title">My contact list app</div>
      <img src="/assets/girl-books.png" alt="books" />
      <div class="welcome-subtitle">Please login to see all your contacts</div>
    </div>
  `,
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit, OnDestroy {
  constructor(private sessionService: SessionService, private router: Router) {}

  private destroy$ = new Subject<void>();

  ngOnInit() {
    this.sessionService
      .getCurrentUserSession()
      .pipe(
        takeUntil(this.destroy$),
        tap((session) => {
          if (session) {
            this.router.navigate(['contacts']);
          }
        })
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
