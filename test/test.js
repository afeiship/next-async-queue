var nx = require('next-js-core2');
require('../src/next-queue');

// test('next/Queue', function() {
var fn1 = function(next) {
  console.log('start 1 task');
  setTimeout(function() {
    console.log(123, '1s');
    next({ result: 1 });
  }, 1000);
};

var fn2 = function(next) {
  console.log('start 2 task');
  setTimeout(function() {
    console.log(456, '2s');
    next({ result: 2 });
  }, 1000);
};

var fn3 = function(next) {
  console.log('start 3 task');
  setTimeout(function() {
    console.log(789, '3s');
    next({ result: 3 });
  }, 1000);
};

var nxQueue = new nx.Queue([fn1, fn2, fn3]);
nxQueue.start().then(({ status, data }) => {
  //console.log('end!', status, data);
  if (status === 'done') {
    console.log(data);
  }
});
// });
