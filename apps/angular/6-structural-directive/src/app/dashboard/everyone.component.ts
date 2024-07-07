import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '../button.component';

@Component({
  selector: 'app-everyone',
  standalone: true,
  imports: [RouterLink, ButtonComponent],
  template: `
    <p>dashboard for everyone works!</p>
    <button app-button routerLink="/">Logout</button>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class EveryoneComponent {}
