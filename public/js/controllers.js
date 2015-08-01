'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('AppCtrl', function ($scope, socket) {
  
  // Socket listeners
  socket.on('init', function(data){
    $scope.rolls.push('Connected');
  });

  socket.on('roll-response', function(data){
    $scope.rolls.unshift(data.roll)
  });

  // scope methods
  //
  $scope.rolls = [];

  $scope.roll = function(n) {
    socket.emit('roll', n);
  };
});
