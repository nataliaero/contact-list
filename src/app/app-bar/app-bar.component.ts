import { ChangeDetectionStrategy, Component } from '@angular/core';

import { Router } from '@angular/router';

@Component({
  selector: 'app-bar',
  template: `
    <div class="app-bar">
      <h3>My Contact List</h3>

      <div class="app-bar-button">LOGIN</div>
    </div>
  `,
  styleUrls: ['./app-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppBarComponent {
  constructor(private router: Router) {}
}
