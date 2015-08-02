/*
 * Serve content over a socket
 */

var Random = require('random-js');
var _ = require('underscore');

var engine = Random.engines.mt19937().autoSeed()

module.exports = function (socket) {
  socket.on('roll', function(n){
    roll = _.map(Random.dice(10, n)(engine),
		 function(n){return n-1;});
    console.log(roll)
    roll = roll.join(', ');
    socket.emit('roll-response', {roll: roll});
    socket.broadcast.emit('roll-response', {roll: roll});
  });
};

