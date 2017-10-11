var assert = require('assert');
var nx = require('next-js-core2');
require('../src/next-queue');

describe('next/Queue', function () {

  var fn1 = function(next){
    setTimeout(function(){
      console.log(123,'1s');
      next();
    },1000);
  };

  var fn2 = function(next){
    setTimeout(function(){
      console.log(456,'2s');
      next();
    },2000);
  };

  var fn3 = function(next){
    setTimeout(function(){
      console.log(789,'3s');
      next();
    },3000);
  };


  var nxQueue = new nx.Queue( [fn1, fn2, fn3] );
  nxQueue.start();

});
