(function () {

  var global = global || this || self || window;
  var nx = global.nx || require('next-js-core2');
  var _ = nx.remove || require('next-remove');

  var NxQueue = nx.declare('nx.Queue', {
    methods: {
      init: function (inArray) {
        this._result = [];
        this._callbacks = inArray || [];
        this.make();
      },
      make: function(){
        var next, self  = this;
        nx.each( this._callbacks, function(i, callback){
          self._callbacks[ i ] = function(){
            next = self._callbacks[ i + 1 ] || nx.noop;
            callback.call(self, next);
          };
        },this);
      },
      start: function () {
        this._callbacks[0]();
        return this;
      }
    }
  });

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = NxQueue;
  }

}());
