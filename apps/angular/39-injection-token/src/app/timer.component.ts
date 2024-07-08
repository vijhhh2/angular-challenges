import { Component } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { interval } from 'rxjs';
import { injectDefaultTimer } from './data';

@Component({
  selector: 'timer',
  standalone: true,
  template: `
    Timer running {{ timer() }}
  `,
})
export class TimerComponent {
  interval = injectDefaultTimer({});
  timer = toSignal(interval(this.interval as number));
}
