import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-dialog-component',
  template: `
    <mat-dialog-actions class="close-dialog">
      <button mat-button mat-dialog-close>
        <i class="material-icons">close</i>
      </button>
    </mat-dialog-actions>
    <h2 mat-dialog-title class="dialog-title">Add new contact</h2>
    <mat-dialog-content class="dialog-content">
      <form [formGroup]="addContactForm" (ngSubmit)="addContact()">
        <mat-form-field class="form-field">
          <input matInput [formControl]="nameFormControl" placeholder="Name" />
          <mat-error *ngIf="nameFormControl.hasError('required')"
            >Name is required</mat-error
          >
        </mat-form-field>

        <mat-form-field class="form-field">
          <input
            matInput
            [formControl]="surnameFormControl"
            placeholder="Surname"
          />
          <mat-error *ngIf="surnameFormControl.hasError('required')"
            >Surname is required</mat-error
          >
        </mat-form-field>

        <mat-form-field class="form-field">
          <input
            matInput
            [formControl]="phoneNumberFormControl"
            placeholder="Phone Number"
          />
          <mat-error *ngIf="phoneNumberFormControl.hasError('required')"
            >Phone number is required</mat-error
          >
        </mat-form-field>

        <mat-form-field class="form-field">
          <input
            matInput
            [formControl]="emailFormControl"
            placeholder="Email"
            type="email"
          />
          <mat-error *ngIf="emailFormControl.hasError('required')"
            >Email is required</mat-error
          >
          <mat-error *ngIf="emailFormControl.hasError('email')">
            You must enter an email.
          </mat-error>
        </mat-form-field>

        <mat-form-field class="form-field">
          <input
            matInput
            [formControl]="addressFormControl"
            placeholder="Address"
          />
          <mat-error *ngIf="addressFormControl.hasError('required')"
            >Address is required</mat-error
          >
        </mat-form-field>

        <button
          class="add-contact-button"
          [disabled]="!this.addContactForm.valid"
        >
          Add Contact
        </button>
      </form>
    </mat-dialog-content>
  `,
  styleUrls: ['./contact-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactDialogComponent {
  addContactForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    surname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phoneNumber: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
  });

  get nameFormControl() {
    return this.addContactForm.get('name') as FormControl;
  }

  get surnameFormControl() {
    return this.addContactForm.get('surname') as FormControl;
  }

  get emailFormControl() {
    return this.addContactForm.get('email') as FormControl;
  }

  get phoneNumberFormControl() {
    return this.addContactForm.get('phoneNumber') as FormControl;
  }

  get addressFormControl() {
    return this.addContactForm.get('address') as FormControl;
  }

  addContact() {
    if (this.addContactForm.invalid) {
      return;
    }
  }
}