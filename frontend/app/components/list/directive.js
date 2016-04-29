'use strict';
/* global angular */

(function(){
  
  angular.module('listModule')
    .directive('listSummary', listSummary);
    
  
  function listSummary() {
    return {
      restrict: 'E',
      templateUrl: 'list/list-summary-view.html', 
      controller: 'listSummaryController', 
      controllerAs: 'listSumCtrl', 
      scope: {
        list: '='
      }
    };
  }
  
  

})();
