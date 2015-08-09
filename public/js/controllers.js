'use strict';

/* Controllers */

angular.module('myApp.controllers', ['myApp.services']).
  controller('AppCtrl', function ($scope, socket, alert) {
  
  // Socket listeners
  socket.on('init', function(data){
    $scope.rolls.push('Connected');
  });

  socket.on('roll-response', function(data){
    $scope.rolls.unshift(data.roll)
    alert.play()
  });

  // scope methods
  //
  $scope.rolls = [];

  $scope.roll = function(n) {
    socket.emit('roll', n);
  };
});
