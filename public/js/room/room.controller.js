(function(){
  'use strict';

  angular.module('diceroller.room')
    .controller('DicerollerRoomController', ['socket', 'alert', '$scope', DicerollerRoomCtrl]);

  function DicerollerRoomCtrl(socket, alert, $scope){
    // join the room
    socket.emit('hello', $scope.id)

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

    socket.on('reply', function(data){
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