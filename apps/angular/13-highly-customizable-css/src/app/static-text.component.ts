/* eslint-disable @angular-eslint/component-selector */
import { Component } from '@angular/core';
import { TextComponent } from './text.component';

export type StaticTextType = 'normal' | 'warning' | 'error';

@Component({
  selector: 'static-text',
  standalone: true,
  imports: [TextComponent],
  template: `
    <text>This is a static text</text>
  `,
  styles: [
    `
      text {
        --text-font: 10px;
        --text-color: black;
      }
      :host-context(.error) {
        text {
          --text-font: 30px;
          --text-color: red;
        }
      }
      :host-context(.warning) {
        text {
          --text-font: 25px;
          --text-color: orange;
        }
      }
    `,
  ],
})
export class TextStaticComponent {}
