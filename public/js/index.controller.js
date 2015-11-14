(function(){
  'use strict';

  angular.module('diceroller')
      .controller('HomeController', ['$scope', IndexCtrl])

  function IndexCtrl($scope){
    console.log("home controller")
  }

})();