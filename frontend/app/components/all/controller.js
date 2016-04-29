'use strict';
/* global angular */

(function(){
  angular.module('allModule', ['dataServiceModule', 'listModule'])
    .controller('allController', ['$log', '$location', 'dataService', allController]);
  
  function allController($log, $location, dataService){
    const vm                    = this;
    vm.lists                    = dataService.lists;
    
    vm.addListButText           = 'Add a new list';
    vm.addListFormVisible       = false;
    vm.postError                = null;
    vm.newList                  = {};
    vm.newList._id              = null;
    vm.newList.name             = null;
    vm.newList.description      = null;
    
    vm.addListFormHandler       = addListFormHandler;
    vm.toggleAddListFormVisible = toggleAddListFormVisible;
    
    ////////////////////////////////////////////////////////////
    
    function addListFormHandler() {
      $log.info('allController addListFormHandler');
      
      $log.debug(vm.newList.name);
      $log.debug(vm.newList.description);
      
      dataService.createList({ newList: vm.newList, updateIdNeeded: true }, (err, createdList) => {
        // Update the lists on the controller
        vm.lists    = dataService.lists;
        
        // Reinitialize newList
        vm.newList  = {
          _id:          null,
          name:         null,
          description:  null
        };
        
        // TODO: should take you to list view for the list you just created?
        $location.path(`/lists/${createdList._id}`);
      });
    }
    
    function toggleAddListFormVisible() {
      $log.info('allController toggleAddListFormVisible');
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
