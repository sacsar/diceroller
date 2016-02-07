var randomorg = require('randomorg');
var Random = require('random-js');
var r = new Random(Random.engines.browserCrypto)

var _ = require('underscore');

var semaphore = {
    current: 0,

  take: function(f, fallback){
    if(semaphore.current > 0){
      console.log("calling fallback")
      fallback();
    } else {
      semaphore.current = 1;
      console.log("took semaphore, calling f")
      f();
    }
  },

  leave: function(){
    console.log("Release semaphore")
    semaphore.current = 0;
  }
}

exports.roll = function(n, callback){
  function callRandomOrgApi(){
    randomorg.generateIntegers(n, 1, 10, RandomOrgCallback);
  };

  function RandomOrgCallback(err, body){
    if(!_.isNull(err)){
      // something went wrong, call the fallback
      fallback();
    } else {
      setTimeout(semaphore.leave, body.advisoryDelay);
      callback(body.random.data);
    }
  };

  function fallback(){
    roll = _.map(r.dice(10, n), function(k){return k-1;});
    callback(roll);
  }

  semaphore.take(callRandomOrgApi, fallback);
}

