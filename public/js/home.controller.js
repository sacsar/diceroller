(function(){
  'use strict';

  angular.module('diceroller')
      .controller('HomeController', [HomeCtrl])

  function HomeCtrl(){
    console.log("home controller")

    var vm = this;

    vm.rooms = [1, 2, 3]
  }

})();