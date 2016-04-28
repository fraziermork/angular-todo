'use strict';
/* global angular */

(function(){
  
  angular.module('itemModule')
    .directive('oneItem', oneItem);
  
  function oneItem() {
    return {
      restrict: 'E',
      templateUrl: ''
    };
  }
  
})();
