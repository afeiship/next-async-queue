(function () {

  var global = global || this || self || window;
  var nx = global.nx || require('next-js-core2');
  var _ = nx.remove || require('next-remove');
  var STATUS = {
    LOAD:'load',
    DONE:'done'
  };

  var NxQueue = nx.declare('nx.Queue', {
    methods: {
      init: function (inArray) {
        this._callbacks = inArray || [];
        this._thenCallback = nx.noop;
        return this.make();
      },
      queue: function(inCallback){
        this._callbacks.push( inCallback );
        return this.make();
      },
      dequeue: function(inCallback){
        nx.remove( this._callbacks, [ inCallback ]);
        return this.make();
      },
      make: function(){
        var next, self = this;
        var length = this._callbacks.length;
        var iterations = this._iterations = Array( length );
        var result = [];
        var done = function(data){
          result.push( data );
          self._thenCallback({ status: STATUS.LOAD, data: result });
        };

        nx.each( this._callbacks, function(i, callback){
          iterations[ i ] = function(data){
            next = iterations[ i + 1 ] || done;
            callback.call(self, next);
            data && result.push(data);
            self._thenCallback({ status: STATUS.DONE, data: result });
          };
        });
        return this;
      },
      then: function(inCallback){
        this._thenCallback = inCallback;
        return this;
      },
      start: function () {
        this._iterations[0]();
        return this;
      }
    }
  });

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = NxQueue;
  }

}());
