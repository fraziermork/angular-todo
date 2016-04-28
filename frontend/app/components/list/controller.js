'use strict';
/* global angular */

(function(){
  angular.module('listModule', ['tabServiceModule'])
    .controller('listController', ['$log', 'tabService',  listController])
    .controller('listSummaryController', ['$log', 'tabService',  listSummaryController]);
  
  function listController($log, tabService){
    
    
    
  }
  
  function listSummaryController($log, tabService){
    
    
    
  }
  
})();
