var nx = require('@feizheng/next-js-core2');
var NxQueue = require('../src/next-queue');

var fn1 = function(next, data) {
  setTimeout(function() {
    console.log(123, '1s', data);
    next({ result: 1 });
  }, 1000);
};

var fn2 = function(next, data) {
  setTimeout(function() {
    console.log(456, '2s', data);
    next({ result: 2 });
  }, 1000);
};

var fn3 = function(next, data) {
  setTimeout(function() {
    console.log(789, '3s', data);
    next({ result: 3 });
  }, 1000);
};

// var nxQueue = new nx.Queue([fn1, fn2, fn3]);
// nxQueue.start().then((resp) => {
//   console.log(resp);
// });

NxQueue.run([fn1, fn2, fn3], 'aaa').then((res) => {
  console.log(res);
});
