(function(){
  'use strict';

  angular.module('diceroller.room')
    .controller('DicerollerRoomController', ['socket', 'alert', '$stateParams', DicerollerRoomCtrl]);

  function DicerollerRoomCtrl(socket, alert, $stateParams){
    var vm = this;
    vm.id = $stateParams.id;
    vm.sound = true; // sound on by default
    vm.rolls = [];
    vm.roll = roll;

    // join the room
    socket.emit('hello', $stateParams.id);

    // socket listeners
    socket.on('roll-response', pushRoll);

    function roll(n){
      socket.emit('roll', n);
    }

    function pushRoll(data){
      vm.rolls.unshift(data.roll);
      if(vm.sound)
        alert.play();
    }
  }
})();