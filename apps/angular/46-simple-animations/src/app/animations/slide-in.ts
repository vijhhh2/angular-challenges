import {
  animate,
  keyframes,
  query,
  stagger,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const slideInAnimation = trigger('slideIn', [
  state(
    'in',
    style({
      transform: 'translateX(0)',
      opacity: 1,
    }),
  ),
  transition(':enter', [
    style({
      transform: 'translateX(-10%)',
      opacity: 0,
    }),
    animate('200ms ease-out'),
  ]),
]);

export const slideInSequenceAnimation = trigger('slideInSequence', [
  transition(':enter', [
    query('.list-item', [
      stagger('100ms', [
        animate(
          '0.5s ease-out',
          keyframes([
            style({
              transform: 'translateX(-5%)',
              opacity: 0,
            }),
            style({
              transform: 'translateX(1%)',
              opacity: 1,
            }),
            style({
              transform: 'translateX(0)',
              opacity: 1,
            }),
          ]),
        ),
      ]),
    ]),
  ]),
]);
