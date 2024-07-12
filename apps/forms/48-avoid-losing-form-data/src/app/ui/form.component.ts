import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  ControlContainer,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () => inject(ControlContainer, { skipSelf: true }),
    },
  ],
  template: `
    <div class="space-y-4">
      <div>
        <label class="sr-only" for="name">Name</label>
        <input
          class="w-full rounded-lg border-gray-200 p-3 text-sm"
          placeholder="Name"
          type="text"
          formControlName="name"
          id="name" />
      </div>

      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label class="sr-only" for="email">Email</label>
          <input
            class="w-full rounded-lg border-gray-200 p-3 text-sm"
            placeholder="Email address"
            type="email"
            formControlName="email"
            id="email" />
        </div>

        <div>
          <label class="sr-only" for="phone">Phone</label>
          <input
            class="w-full rounded-lg border-gray-200 p-3 text-sm"
            placeholder="Phone Number"
            type="tel"
            formControlName="phone"
            id="phone" />
        </div>
      </div>

      <div>
        <label class="sr-only" for="message">Message</label>

        <textarea
          class="w-full rounded-lg border-gray-200 p-3 text-sm"
          placeholder="Message"
          rows="8"
          formControlName="message"
          id="message"></textarea>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormComponent implements OnInit, OnDestroy {
  controlContainer = inject(ControlContainer);

  get parentFormGroup() {
    return this.controlContainer.control as FormGroup;
  }

  get isNotValid() {
    return this.parentFormGroup.invalid;
  }

  ngOnInit(): void {
    this.parentFormGroup.addControl(
      'name',
      new FormControl('', [Validators.required]),
    );
    this.parentFormGroup.addControl(
      'email',
      new FormControl('', [Validators.required, Validators.email]),
    );
    this.parentFormGroup.addControl('phone', new FormControl(''));
    this.parentFormGroup.addControl('message', new FormControl(''));
  }

  ngOnDestroy(): void {
    this.parentFormGroup.removeControl('name');
    this.parentFormGroup.removeControl('email');
    this.parentFormGroup.removeControl('phone');
    this.parentFormGroup.removeControl('message');
  }
}
