const DEFAULT_TIMER = 1000;

import {
  inject,
  InjectionToken,
  InjectOptions,
  ValueProvider,
} from '@angular/core';

export const TIMER = new InjectionToken<number>('default-time', {
  factory: () => DEFAULT_TIMER,
});

export const getDefaultTimerProvider = (num: number): ValueProvider => ({
  provide: TIMER,
  useValue: num,
});

export const injectDefaultTimer = (options: InjectOptions) =>
  inject(TIMER, options);
