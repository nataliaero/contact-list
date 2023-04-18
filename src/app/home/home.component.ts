import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

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
export class HomeComponent implements OnInit {
  ngOnInit() {}
}
