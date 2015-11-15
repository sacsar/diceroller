(function(){
  'use strict';

  angular.module('diceroller.room')
    .controller('DicerollerRoomController', ['socket', 'alert', '$scope', '$stateParams', DicerollerRoomCtrl]);

  function DicerollerRoomCtrl(socket, alert, $scope, $stateParams){
    // join the room
    socket.emit('hello', $stateParams.id);

    $scope.id = $stateParams.id;

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