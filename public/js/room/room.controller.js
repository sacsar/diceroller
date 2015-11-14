(function(){
  'use strict';

  angular.module('diceroller.room')
    .controller('DicerollerRoomController', ['socket', 'alert', '$scope', '$routeParams', DicerollerRoomCtrl]);

  function DicerollerRoomCtrl(socket, alert, $scope, $routeParams){
    // join the room
    socket.emit('hello', $routeParams.id)

    $scope.sound = true; // have sound on by default
    // Socket listeners
    socket.on('init', function(data){
      $scope.rolls.push('Connected');
    });

    socket.on('roll-response', function(data){
      $scope.rolls.unshift(data.roll);
      if($scope.sound)
        alert.play();
    });

    socket.on('join-notify', function(data){
      console.log(data)
    })

    // scope methods
    //
    $scope.rolls = [];

    $scope.roll = function(n) {
      socket.emit('roll', n);
    };
  }
})();