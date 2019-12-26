/*!
 * name: @feizheng/next-queue
 * description: Async queue for next.
 * url: https://github.com/afeiship/next-queue
 * version: 1.0.0
 * date: 2019-12-26 13:49:07
 * license: MIT
 */

(function() {
  var global = global || this || window || Function('return this')();
  var nx = global.nx || require('@feizheng/next-js-core2');

  var STATUS = {
    LOAD: 'load',
    DONE: 'done'
  };

  var NxQueue = nx.declare('nx.Queue', {
    methods: {
      init: function(inArray) {
        this._callbacks = inArray || [];
        this._thenCallback = nx.noop;
        this._thenErrorCallback = nx.noop;
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
          self._thenCallback({ status: STATUS.DONE, data: result });
        };

        nx.each(this._callbacks, function(i, callback) {
          iterations[i] = function(data) {
            next = iterations[i + 1] || done;
            callback.call(self, next);
            data && result.push(data);
            self._thenCallback({ status: STATUS.LOAD, data: result });
          };
        });
        return this;
      },
      then: function(inCallback, inErrorCallback) {
        this._thenCallback = inCallback;
        this._thenErrorCallback = inErrorCallback;
        return this;
      },
      start: function() {
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
