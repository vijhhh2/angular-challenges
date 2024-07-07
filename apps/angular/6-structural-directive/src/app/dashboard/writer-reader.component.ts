import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '../button.component';

@Component({
  selector: 'app-writer-reader',
  standalone: true,
  imports: [RouterLink, ButtonComponent],
  template: `
    <p>dashboard for writer reader works!</p>
    <button app-button routerLink="/">Logout</button>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class WriterReaderComponent {}
