'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
var module = angular.module('myApp.services', []);

module.factory('socket', function (socketFactory) {
    return socketFactory();
  }).
  value('version', '0.1');

module.factory('alert', function($rootScope) {
  return {
    play: function(){
      playAlert()
      console.log("Play alert")
    }
  };
});
