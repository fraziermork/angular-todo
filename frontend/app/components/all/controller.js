'use strict';
/* global angular */

(function(){
  angular.module('allModule', ['tabServiceModule', 'dataServiceModule'])
    .controller('allController', ['$log', 'tabService', 'dataService', allController]);
  
  function allController($log, tabService, dataService){
    const vm                    = this;
    vm.lists                    = dataService.lists;
    
    vm.addListButText           = 'Add a new list';
    vm.addListFormVisible       = false;
    vm.postError                = null;
    vm.newList                  = {};
    vm.newList._id              = null;
    vm.newList.newListName      = null;
    vm.newList.newListDesc      = null;
    
    vm.addListFormHandler       = addListFormHandler;
    vm.toggleAddListFormVisible = toggleAddListFormVisible;
    
    ////////////////////////////////////////////////////////////
    
    function addListFormHandler() {
      $log.log('allController addListFormHandler');
      
    }
    
    function toggleAddListFormVisible() {
      $log.log('allController toggleAddListFormVisible');
      if(vm.addListFormVisible) {
        vm.addListFormVisible = !vm.addListFormVisible;
        vm.addListButText     = 'Add a new list';
      } else {
        vm.addListFormVisible = !vm.addListFormVisible;
        vm.addListButText     = 'Cancel';
      }
    }
    
  }
  
})();
