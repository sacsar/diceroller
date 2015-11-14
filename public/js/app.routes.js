(function(){
  'use strict';

  angular.module('diceroller')
    .config(['$routeProvider', router])

  function router($routeProvider){
    $routeProvider
        .when('/',
        {
          templateUrl: '/partials/partial1',
          controller: 'HomeController'
          controllerAs: 'home'
        })
        .when('/room/:id',
        {
          templateUrl: '/partials/room',
          controller: 'DicerollerRoomController'
        });
  }
})();