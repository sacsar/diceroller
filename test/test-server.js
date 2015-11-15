var expect = require('chai').expect;
var io = require('socket.io-client');

var socketURL = "http://localhost:3000";

var options = {
  transports: ['websocket'],
  'force new connection': true
};

describe('Server', function(){
  var client = io.connect(socketURL, options);

  it('should acknowledge a connection', function(){
    client.emit('hello', 1);

    client.on('join-notify', function(data){
      expect(data).to.equl("Joined room 1");
    });
  });


  it('should return object with roll', function(){
    client.emit('roll', 3);

    client.on('roll-response', function(data){
      expect(data.roll).to.be.ok();
    });
  });

  it('should roll the correct number of dice', function(){
    client.emit('roll', 5);

    client.on('roll-reponse', function(data){
      expect(data.roll.to.have.length.eq(5));
    });
  });
});