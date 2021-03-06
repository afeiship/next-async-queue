# next-async-queue
> Async queue for next.

[![version][version-image]][version-url]
[![license][license-image]][license-url]
[![size][size-image]][size-url]
[![download][download-image]][download-url]

## installation
```bash
npm install -S @jswork/next-async-queue
```

## apis
| api    | params    | description                           |
| ------ | --------- | ------------------------------------- |
| run    | items     | Run a list of async functions         |
| repeat | fn, count | Get a repeat functions                |
| wrap   | [fn,fn]   | Wrap an list of functions to runnable |

## status
| status | name | code | description                   |
| ------ | ---- | ---- | ----------------------------- |
| LOAD   | load | 1    | Status when task is running   |
| DONE   | done | 0    | Status when all task has done |

## usage
```js
import NxAsyncQueue from '@jswork/next-async-queue';

var fn1 = function(next){
  setTimeout(function(){
    console.log(123,'1s');
    next({ result: 1});
  },1000);
};

var fn2 = function(next){
  setTimeout(function(){
    console.log(456,'2s');
    next({ result: 2});
  },1000);
};

var fn3 = function(next){
  setTimeout(function(){
    console.log(789,'3s');
    next({ result: 3});
  },1000);
};

NxAsyncQueue.run(fn1, fn2, fn3).then((res) => {
  console.log(res);
});

// results:
// 123 1s
// 456 2s
// 789 3s
// [ { result: 1 }, { result: 2 }, { result: 3 } ]
```

## license
Code released under [the MIT license](https://github.com/afeiship/next-async-queue/blob/master/LICENSE.txt).

[version-image]: https://img.shields.io/npm/v/@jswork/next-async-queue
[version-url]: https://npmjs.org/package/@jswork/next-async-queue

[license-image]: https://img.shields.io/npm/l/@jswork/next-async-queue
[license-url]: https://github.com/afeiship/next-async-queue/blob/master/LICENSE.txt

[size-image]: https://img.shields.io/bundlephobia/minzip/@jswork/next-async-queue
[size-url]: https://github.com/afeiship/next-async-queue/blob/master/dist/next-async-queue.min.js

[download-image]: https://img.shields.io/npm/dm/@jswork/next-async-queue
[download-url]: https://www.npmjs.com/package/@jswork/next-async-queue
