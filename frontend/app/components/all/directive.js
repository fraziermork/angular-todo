'use strict';
/* global angular */

(function(){
  
  angular.module('allModule')
    .directive('allLists', allLists);
    
  function allLists() {
    return {
      restrict: 'E',
      templateUrl: 'all/all-view.html', 
      controller: 'allController', 
      controllerAs: 'allCtrl'
    };
  }
  
})();
