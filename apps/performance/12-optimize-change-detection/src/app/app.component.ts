import { AsyncPipe, NgIf } from '@angular/common';
import { Component, NgZone, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BehaviorSubject, fromEvent } from 'rxjs';

@Component({
  standalone: true,
  imports: [NgIf, AsyncPipe],
  selector: 'app-root',
  template: `
    <div>Top</div>
    <div>Middle</div>
    <div>Bottom</div>
    <button (click)="goToTop()" *ngIf="displayButton$ | async">Top</button>
  `,
  styles: [
    `
      :host {
        height: 1500px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        button {
          position: fixed;
          bottom: 1rem;
          left: 1rem;
          z-index: 1;
          padding: 1rem;
        }
      }
    `,
  ],
})
export class AppComponent implements OnInit {
  title = 'scroll-cd';

  private displayButtonSubject = new BehaviorSubject<boolean>(false);
  displayButton$ = this.displayButtonSubject.asObservable();

  private readonly ngZone = inject(NgZone);
  scroll$ = fromEvent(window, 'scroll').pipe(takeUntilDestroyed());

  //   @HostListener('window:scroll', ['$event'])
  //   onScroll() {
  //  this.handleScrollEvent();
  //   }

  ngOnInit(): void {
    this.ngZone.runOutsideAngular(() => {
      this.scroll$.subscribe(() => {
        this.handleScrollEvent();
      });
    });
  }

  private handleScrollEvent() {
    const pos = window.pageYOffset;
    this.displayButtonSubject.next(pos > 50);
  }

  goToTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }
}
