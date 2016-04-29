'use strict';
/* global angular */

(function(){
  angular.module('listModule', [])
    .controller('listController', ['$log', '$routeParams', 'dataService', listController])
    .controller('listSummaryController', ['$log', listSummaryController]);
  
  
  
  ////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////
  
  
  function listController($log, $routeParams, dataService) {
    //INITIAL VARIABLE DECLARATION
    const vm                = this;
    vm.listId               = $routeParams.listId;
    vm.list                 = {};
    vm.items                = [];
    
    // ADD AN ITEM
    vm.addItemButText       = 'Make a new item';
    vm.addItemFormVisible   = false;
    vm.tempItem             = {};
    vm.tempItem.name        = null;
    vm.tempItem.description = null;
    
    // EDIT THE LIST
    vm.editListButText      = 'Edit or delete this list';
    vm.editListFormVisible  = false;
    vm.tempList             = {};
    vm.tempList.name        = vm.list.name;
    vm.tempList.description = vm.list.description;
    
    // ATTACH METHODS
    vm.initialize           = initialize;
    
    ////////////////////////////////////////////////////////////
    
    
    function initialize() {
      $log.info('listController initialize');
      
      // Initialize based on cached data
      vm.list   = dataService.lists.filter(list => list._id === vm.listId)[0];
      vm.items  = vm.list.items;
      
      // Make request to get the list to get the full parameters
      dataService.getList(vm.listId, (err, data) => {
        vm.list                 = data;
        vm.items                = data.items;
        vm.tempList.name        = vm.list.name;
        vm.tempList.description = vm.list.description;
      }); 
    }
    
    
    
  }
  
  ////////////////////////////////////////////////////////////
  
  
  function listSummaryController($log) {
    //TODO: implement ability to reroute to edit a single list
    const vm        = this;
    vm.editThisList = editThisList; 
    
    ////////////////////////////////////////////////////////////
    
    
    function editThisList(list) {
      $log.info('Would have tried to edit list with id ' + list._id);
      
      
    }
    
    
  }
  
})();
