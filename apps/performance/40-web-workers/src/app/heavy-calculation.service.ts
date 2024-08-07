import { Injectable, computed, signal } from '@angular/core';

@Injectable()
export class HeavyCalculationService {
  private finalLength = 664579;
  private loadingLength = signal(0);

  loadingPercentage = computed(
    () => (this.loadingLength() * 100) / this.finalLength,
  );

  startLoading() {
    if (typeof Worker !== 'undefined') {
      // Create a new
      const worker = new Worker(
        new URL('./heavy-calculation-worker.worker', import.meta.url),
      );
      worker.onmessage = ({ data }) => {
        if (data.data !== 'done') {
          this.loadingLength.set(data.data);
        } else {
          console.log(`page got message ${data.data}`);
        }
      };
      worker.postMessage({ data: 'start' });
    } else {
      // Web Workers are not supported in this environment.
      // You should add a fallback so that your program still executes correctly.
      this.randomHeavyCalculationFunction();
    }
  }

  private randomHeavyCalculationFunction() {
    for (let num = 2; num <= 10000000; num++) {
      let randomFlag = true;
      for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) {
          randomFlag = false;
          break;
        }
      }
      if (randomFlag) {
        this.loadingLength.update((l) => l + 1);
      }
    }
  }
}
