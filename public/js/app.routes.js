(function(){
  'use strict';

  angular.module('diceroller')
    .config(router);

  function router($stateProvider, $urlRouterProvider, $locationProvider){

    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'partials/home',
        controller: 'HomeController',
        controllerAs: 'home'
      })
      .state('room', {
        url: '/room/{id:[123]}',
        templateUrl: 'partials/room',
        controller: 'DicerollerRoomController',
        controllerAs: 'room'
      });

      $locationProvider.html5Mode(true);
  }
})();