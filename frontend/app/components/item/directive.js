'use strict';
/* global angular */

(function(){
  
  angular.module('itemModule')
    .directive('listItem', listItem);
  
  function listItem() {
    return {
      restrict: 'E',
      templateUrl: '', 
      controller: 'itemController', 
      controllerAs: 'itemCtrl', 
      scope: {
        item: '='
      }
    };
  }
  
})();
