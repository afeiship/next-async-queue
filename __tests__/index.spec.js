(function() {
  const NxAsyncQueue = require('../src');

  describe('NxQueue.methods', function () {
    test('api:new/start should work fine:', function (done) {
      var counter = 0;
      var fn1 = function (next) {
        setTimeout(function () {
          console.log(123, '1s');
          next({ result: 1 });
        }, 1000);
      };

      var fn2 = function (next) {
        setTimeout(function () {
          console.log(456, '2s');
          next({ result: 2 });
        }, 1000);
      };

      var fn3 = function (next) {
        setTimeout(function () {
          console.log(789, '3s');
          next({ result: 3 });
        }, 1000);
      };

      var items = [fn1, fn2, fn3];
      var nxQueue = new NxAsyncQueue(items);
      nxQueue.start().then((res) => {
        counter++;
        if (res.status === NxAsyncQueue.STATUS.done) {
          expect(counter === items.length).toBe(true);
          done();
        }
      });
    });

    test('api:repeat should work fine', (done) => {
      var counter = 0;
      var items = NxAsyncQueue.repeat(() => {
        return new Promise((resolve) => {
          console.log('start!');
          setTimeout(() => {
            counter++;
            console.log('execute!');
            resolve(1);
          }, 1000);
        });
      }, 3);

      NxAsyncQueue.run(items).then((res) => {
        expect(counter).toBe(3);
        expect(res).toEqual([1, 1, 1]);
        done();
      });
    });

    test('api:wrap should work fine', (done) => {
      var items = NxAsyncQueue.wrap([
        () => {
          return new Promise((resolve) => {
            console.log('task 1');
            setTimeout(() => {
              console.log('task1 done');
              resolve(1);
            }, 1000);
          });
        },
        () => {
          return new Promise((resolve) => {
            console.log('log 2');
            setTimeout(() => {
              console.log('task2 done');
              resolve(2);
            }, 100);
          });
        }
      ]);

      NxAsyncQueue.run(items).then((res) => {
        expect(res).toEqual([1, 2]);
        done();
      });
    });
  });

})();
