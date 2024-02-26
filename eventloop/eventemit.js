const EventEmitter = require('events');

class TimerEmitter extends EventEmitter {
  constructor() {
    super();
    this.eventName = 'CleanTimer';
    this.timerIds = []; // set timer should add a timer to this array
  }
  addTimerId(id) {
    this.timerIds.push(id);
  }
  removeTimerId(id) {
    this.timerIds.shift(id);
  }
  trigger() {
    this.emit(this.eventName); // should trigger clean timer event (...after call backs)
  }
}

const bar = (x, timerCleaner) => {
  console.log(`${x} : bar`);
  timerCleaner.trigger(); // this called after timer is executed
}
const baz = () => console.log('baz');
const foo = (a, timerCleaner) => {
  console.log('foo');
  const tid = setTimeout(function() { // new timeout
    bar(a, timerCleaner);
  }, 0);
  baz();
  return tid; // id to be added to timers
}

const timerEmitter = new TimerEmitter();
timerEmitter.on(timerEmitter.eventName, () => { // when this is triggered
  console.log(`${timerEmitter.eventName} cleaning up timer`); // will cleanup
  clearTimeout(timerEmitter.timerIds[0]); // clear up the timers ; has to happen after call back
});
timerEmitter.addTimerId(foo(2, timerEmitter)); // foo returns timer ID; timer itself triggers our event
timerEmitter.removeTimerId(foo(1, timerEmitter));

// more control than existing garbage cleanup functionality
