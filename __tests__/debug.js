var nx = require('@feizheng/next-js-core2');
var NxQueue = require('../src/next-queue');

var items = NxQueue.wrap([
  () => {
    return new Promise((resolve) => {
      console.log('task 1');
      setTimeout(() => {
        console.log('task1 done');
        resolve(1);
      }, 3000);
    });
  },
  () => {
    return new Promise((resolve) => {
      console.log('log 2');
      setTimeout(() => {
        console.log('task2 done');
        resolve(2);
      }, 3000);
    });
  }
]);

NxQueue.run(items).then((res) => {
  console.log('res', res);
});
