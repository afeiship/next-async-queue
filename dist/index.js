/*!
 * name: @jswork/next-async-queue
 * description: Async queue for next.
 * homepage: https://github.com/afeiship/next-async-queue
 * version: 1.0.0
 * date: 2020-11-22 18:01:19
 * license: MIT
 */

(function () {
  var global = global || this || window || Function('return this')();
  var nx = global.nx || require('@jswork/next');
  var nxRepeatBy = nx.repeatBy || require('@jswork/next-repeat-by');

  var STATUS = { load: 1, done: 0 };
  var MSG_TIPS_PROMISIFY = 'Promisify must be wrapped to a function.';
  var FUNC = 'function';

  var NxAsyncQueue = nx.declare('nx.AsyncQueue', {
    statics: {
      STATUS: STATUS,
      run: function (inArray, inArgs) {
        var queue = new NxAsyncQueue(inArray, inArgs);
        return new Promise(function (resolve, reject) {
          queue.start().then(
            function (res) {
              if (res.status === STATUS.done) {
                resolve(res.data);
              }
            },
            function (err) {
              reject(err);
            }
          );
        });
      },
      wrap: function (inArray) {
        var result = [];
        for (var i = 0; i < inArray.length; i++) {
          var fn = inArray[i];
          if (typeof fn.then === FUNC) {
            nx.error(MSG_TIPS_PROMISIFY);
            break;
          }

          /* prettier-ignore */
          result.push(
            (function (index) {
              return function(next, data, initial) {
                return inArray[index]().then(function(res) {
                  next(res, data, initial);
                });
              }
            }(i))
          );
        }
        return result;
      },
      repeat: function (inPromisify, inCount) {
        var items = nxRepeatBy(inPromisify, inCount);
        return this.wrap(items);
      }
    },
    methods: {
      init: function (inArray, inArgs) {
        this._callbacks = inArray || [];
        this._thenCallback = nx.noop;
        this._thenErrorCallback = nx.noop;
        this._initial = inArgs;
        return this.make();
      },
      queue: function (inCallback) {
        this._callbacks.push(inCallback);
        return this.make();
      },
      dequeue: function (inCallback) {
        var index = this._callbacks.indexOf(inCallback);
        this._callbacks.splice(index >>> 0, 1);
        return this.make();
      },
      make: function () {
        var next,
          self = this;
        var length = this._callbacks.length;
        var iterations = (this._iterations = Array(length));
        var result = [];
        var done = function (data) {
          data && result.push(data);
          self._thenCallback({ status: STATUS.done, data: result });
        };

        nx.each(this._callbacks, function (i, callback) {
          iterations[i] = function (data) {
            next = iterations[i + 1] || done;
            callback.call(self, next, data, self._initial);
            data && result.push(data);
            self._thenCallback({ status: STATUS.load, data: result });
          };
        });
        return this;
      },
      then: function (inCallback, inErrorCallback) {
        this._thenCallback = inCallback;
        this._thenErrorCallback = inErrorCallback;
        return this;
      },
      start: function () {
        this._iterations[0]();
        return this;
      }
    }
  });

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = NxAsyncQueue;
  }
})();
