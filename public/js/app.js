(function(){
    'use strict';

// Declare app level module which depends on filters, and services

angular.module('diceroller', [
  'ngRoute',
  'diceroller.filters',
  'diceroller.services',
  'diceroller.room',

  // 3rd party dependencies
  'btford.socket-io'
]);
})();
