const fs = require('fs');

function someAsyncOperation(callback) { // takes ina  call back
  // this is added to async event loop
  fs.readFile('./data/test.txt', callback);
}

const timeoutScheduled = Date.now();

// Put on event loop, run after main thread is doe
setTimeout(() => {
  const delay = Date.now() - timeoutScheduled;

  console.log(`${delay}ms have passed since I was scheduled`);
}, 2);

// do someAsyncOperation which takes 95 ms to complete
someAsyncOperation(() => {
  const startCallback = Date.now();
  console.log('someAsyncOperation');
  // do something that will take 10ms...
  while (Date.now() - startCallback < 10) {
    // do nothing
  }
});
