'use strict';
/* global angular */

(function(){
  
  angular.module('itemModule')
    .directive('listItem', listItem);
  
  function listItem() {
    return {
      restrict: 'E',
      templateUrl: 'item/item-view.html', 
      controller: 'ItemController', 
      controllerAs: 'itemCtrl'
    };
  }
  
})();
