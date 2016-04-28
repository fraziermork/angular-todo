'use strict';
/* global angular */

(function(){
  
  angular.module('listModule')
    .directive('oneList', oneList)
    .directive('listSummary', listSummary);
    
  function oneList() {
    return {
      restrict: 'E',
      templateUrl: 'all/list-view.html', 
      controller: 'listController', 
      controllerAs: 'listCtrl'
    };
  }
  
  function listSummary() {
    return {
      restrict: 'E',
      templateUrl: 'list/list-summary-view.html', 
      controller: 'listSummaryController', 
      controllerAs: 'listSumCtrl'
    };
  }
  
  

})();
