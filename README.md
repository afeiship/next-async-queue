<p align="center">
  <a href="https://afeiship.github.io/next-queue/">
    <img width="880" src="https://tva1.sinaimg.cn/large/006tNbRwgy1gaa2xerbv3j30w40hugon.jpg">
  </a>
</p>

# next-queue
> Async queue for next.

## installation
```bash
npm install -S @feizheng/next-queue
```

## apis
| api | params | description   |
| --- | ------ | ------------- |
| run | -      | desc balabala |

## usage
```js
import NxQueue from '@feizheng/next-queue';

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

NxQueue.run(fn1, fn2, fn3).then((res) => {
  console.log(res);
});

// results:
// 123 1s
// 456 2s
// 789 3s
// [ { result: 1 }, { result: 2 }, { result: 3 } ]
```
