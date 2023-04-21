import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthorizationService } from '../services';
import { BehaviorSubject, take, tap } from 'rxjs';

export interface DialogData {
  closeCallback: () => void;
}

@Component({
  selector: 'app-login-dialog-component',
  template: `
    <mat-dialog-actions class="close-dialog">
      <button mat-button mat-dialog-close>
        <i class="material-icons">close</i>
      </button>
    </mat-dialog-actions>
    <h2 mat-dialog-title class="dialog-title">Login</h2>
    <mat-dialog-content class="dialog-content">
      <form
        [formGroup]="loginContactForm"
        (ngSubmit)="login()"
        (keydown.enter)="login()"
      >
        <mat-form-field class="form-field">
          <input
            matInput
            [formControl]="usernameFormControl"
            placeholder="Username"
          />
          <mat-error *ngIf="usernameFormControl.hasError('required')"
            >Username is required</mat-error
          >
        </mat-form-field>

        <mat-form-field class="form-field">
          <input
            matInput
            type="password"
            [formControl]="passwordFormControl"
            placeholder="Password"
          />
          <mat-error *ngIf="passwordFormControl.hasError('required')"
            >Password is required</mat-error
          >
        </mat-form-field>
        <mat-error *ngIf="loginError$ | async as error">{{ error }}</mat-error>

        <button class="login-button" [disabled]="!this.loginContactForm.valid">
          Login
        </button>
      </form>
    </mat-dialog-content>
  `,
  styleUrls: ['./login-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginDialogComponent {
  constructor(
    private authorizationService: AuthorizationService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private router: Router
  ) {}

  loginContactForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  get usernameFormControl() {
    return this.loginContactForm.get('username') as FormControl;
  }

  get passwordFormControl() {
    return this.loginContactForm.get('password') as FormControl;
  }

  loginError$ = new BehaviorSubject<string | null>(null);

  login() {
    this.authorizationService
      .login(
        this.loginContactForm.value.username,
        this.loginContactForm.value.password
      )
      .pipe(
        take(1),
        tap((res) => {
          if (res?.['error']) {
            this.loginError$.next(res['error']);
          } else {
            this.data.closeCallback();
          }
        })
      )
      .subscribe();
  }
}
