/*!
 * name: @feizheng/next-queue
 * description: Async queue for next.
 * url: https://github.com/afeiship/next-queue
 * version: 1.2.1
 * date: 2020-01-04 22:19:34
 * license: MIT
 */

(function() {
  var global = global || this || window || Function('return this')();
  var nx = global.nx || require('@feizheng/next-js-core2');

  var NxQueue = nx.declare('nx.Queue', {
    statics: {
      run: function(inArray, inArgs) {
        var queue = new nx.Queue(inArray, inArgs);
        return queue.start();
      }
    },
    methods: {
      init: function(inArray, inArgs) {
        this._callbacks = inArray || [];
        this._thenCallback = nx.noop;
        this._thenErrorCallback = nx.noop;
        this._initial = inArgs;
        return this.make();
      },
      queue: function(inCallback) {
        this._callbacks.push(inCallback);
        return this.make();
      },
      dequeue: function(inCallback) {
        var index = this._callbacks.indexOf(inCallback);
        this._callbacks.splice(index >>> 0, 1);
        return this.make();
      },
      make: function() {
        var next,
          self = this;
        var length = this._callbacks.length;
        var iterations = (this._iterations = Array(length));
        var result = [];
        var done = function(data) {
          data && result.push(data);
          self._thenCallback({ status: 'done', data: result });
        };

        nx.each(this._callbacks, function(i, callback) {
          iterations[i] = function(data) {
            next = iterations[i + 1] || done;
            callback.call(self, next, data || self._initial);
            data && result.push(data);
            self._thenCallback({ status: 'load', data: result });
          };
        });
        return this;
      },
      then: function(inCallback, inErrorCallback) {
        this._thenCallback = inCallback;
        this._thenErrorCallback = inErrorCallback;
        return this;
      },
      start: function(inArgs) {
        this._iterations[0]();
        return this;
      }
    }
  });

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = NxQueue;
  }
})();

//# sourceMappingURL=next-queue.js.map
