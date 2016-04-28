'use strict';
/* global angular */

(function(){
  angular.module('tabServiceModule', [])
    .factory('tabService', ['$log', tabService]);
  
  function tabService($log) {
    const tabService      = {};
    tabService.tab        = 'all';
    
    tabService.initialize = initialize;
    tabService.changeTabs = changeTabs;
    tabService.getTab     = getTab;
    
    
    ////////////////////////////////////////////////////////////
    
    
    function initialize() {
      $log.log('tabService initialize');
      tabService.tab = 'all';
    }
    
    function changeTabs(newTab) {
      $log.log('TAB CHANGED TO ' + newTab);
      tabService.tab = newTab;
    }
    
    function getTab() {
      return tabService.tab;
    }
    
    return tabService;
  }
  
})();
