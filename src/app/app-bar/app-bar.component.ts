import { ChangeDetectionStrategy, Component } from '@angular/core';

import { Router } from '@angular/router';

@Component({
  selector: 'app-bar',
  template: `
    <div class="app-bar">
      <h3>Contact List</h3>
      <img src="/assets/logoCuadrado.png" alt="Logo" />

      <div class="app-bar-right">
        <button>LOGIN</button>
      </div>
    </div>
  `,
  styleUrls: ['./app-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppBarComponent {
  constructor(private router: Router) {}
}
