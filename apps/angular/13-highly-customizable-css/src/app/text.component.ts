/* eslint-disable @angular-eslint/component-selector */
import { Component } from '@angular/core';

@Component({
  selector: 'text',
  standalone: true,
  template: `
    <p class="text-content">
      <ng-content></ng-content>
    </p>
  `,
  styles: [
    `
      .text-content {
        font-size: var(--text-font, 10px);
        color: var(--text-color, black);
      }
    `,
  ],
})
export class TextComponent {}
