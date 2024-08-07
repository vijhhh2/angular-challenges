/// <reference lib="webworker" />

addEventListener('message', ({ data }) => {
  randomHeavyCalculationFunction();
  postMessage({ data: 'done' });
});

function randomHeavyCalculationFunction() {
  let l = 0;
  for (let num = 2; num <= 10000000; num++) {
    let randomFlag = true;
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) {
        randomFlag = false;
        break;
      }
    }
    if (randomFlag) {
      l++;
      postMessage({ data: l });
    }
  }
}
