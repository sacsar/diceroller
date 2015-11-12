(function(){
    'use strict';

// Declare app level module which depends on filters, and services

angular.module('myApp', [
  'ngRoute',
  'myApp.filters',
  'myApp.services',
  'diceroller.room',

  // 3rd party dependencies
  'btford.socket-io'
]);
})();
