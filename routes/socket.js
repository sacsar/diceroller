/*
 * Serve content over a socket
 */

var Random = require('random-js');
var _ = require('underscore');

var engine = Random.engines.mt19937().autoSeed();

module.exports = function (socket) {
  socket.on('roll', function(n){
    roll = _.map(Random.dice(10, n)(engine),
		 function(n){return n-1;});
    console.log("Room " + socket.room + ": " + roll);
    roll = roll.join(', ');
    socket.emit('roll-response', {roll: roll});
    socket.broadcast.to(socket.room).emit('roll-response', {roll: roll});
  });

  socket.on('hello', function(id){
    socket.join(id);
    socket.room = id;
    socket.emit('join-notify', 'Joined room' + id);
    socket.broadcast.to(id).emit('join-notify', 'Someone joined');
  });
};

