/*
 * Serve content over a socket
 */

var Random = require('random-js');
var _ = require('underscore');
var roll = require('../roll.js')

var random = new Random(Random.engines.browserCrypto);

module.exports = function (socket) {
  socket.on('roll', function(n){
    var sendRoll = function(r){
      console.log("Room " + socket.room + ": " + r);
      r = r.join(', ');
      socket.emit('roll-response', {roll: r});
      socket.broadcast.to(socket.room).emit('roll-response', {roll: r});
    }
    
    roll.roll(n, sendRoll);
  });

  socket.on('hello', function(id){
    socket.join(id);
    socket.room = id;
    socket.emit('join-notify', 'Joined room' + id);
    socket.broadcast.to(id).emit('join-notify', 'Someone joined');
  });
};

