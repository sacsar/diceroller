(function(){
  'use strict';

  angular.module('diceroller.room')
    .controller('DicerollerRoomController', ['$scope', 'socket', 'alert', DicerollerRoomCtrl]);

  function DicerollerRoomCtrl($scope, socket, alert){
    console.log(socket)
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

    // scope methods
    //
    $scope.rolls = [];

    $scope.roll = function(n) {
      socket.emit('roll', n);
    };
  }
})();