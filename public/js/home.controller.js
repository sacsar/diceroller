(function(){
  'use strict';

  angular.module('diceroller')
      .controller('HomeController', [HomeCtrl]);

  function HomeCtrl(){
    var vm = this;

    vm.rooms = [1, 2, 3];
  }

})();