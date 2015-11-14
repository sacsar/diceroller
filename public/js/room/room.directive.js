(function(){
  'use strict';

  angular.module('diceroller.room')
    .directive('room', roomDirective);

  function roomDirective(){
    return {
        restrict: 'E',
        scope: {
          id: '='
        },
        templateUrl: '/room.html',
        replace: true,
        controller: 'DicerollerRoomController'
    };
  }
})();