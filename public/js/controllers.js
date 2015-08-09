'use strict';

/* Controllers */

angular.module('myApp.controllers', ['myApp.services']).
  controller('AppCtrl', function ($scope, socket, alert) {
  
  $scope.sound = true; // have sound on by default

  // Socket listeners
  socket.on('init', function(data){
    $scope.rolls.push('Connected');
  });

  socket.on('roll-response', function(data){
    $scope.rolls.unshift(data.roll)
    if($scope.sound)
      alert.play()
  });

  // scope methods
  //
  $scope.rolls = [];

  $scope.roll = function(n) {
    socket.emit('roll', n);
  };
});
