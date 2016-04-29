'use strict';
/* global angular */

(function(){
  angular.module('listModule', ['dataServiceModule', 'itemModule'])
    .controller('listController', ['$log', '$location', '$routeParams', 'dataService', listController])
    .controller('listSummaryController', ['$log', listSummaryController]);
  
  
  
  ////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////
  
  function listController($log, $location, $routeParams, dataService) {
    //INITIAL VARIABLE DECLARATION
    const vm                  = this;
    vm.listId                 = $routeParams.listId;
    $log.debug(dataService.lists);
    $log.debug(typeof dataService.lists);
    vm.list                   = dataService.lists.filter(list => list._id === vm.listId)[0];
    vm.items                  = vm.list.items;
    
    // EDIT THE LIST
    vm.editListButText        = 'Edit or delete this list';
    vm.editListFormVisible    = false;
    vm.tempList               = {};
    vm.tempList.name          = vm.list.name;
    vm.tempList.description   = vm.list.description;
    vm.toggleEditListVis      = toggleEditListVis;
    vm.editListFormHandler    = editListFormHandler;
    vm.deleteListHandler      = deleteListHandler;
    
    // ADD AN ITEM
    vm.addItemButText         = 'Make a new item';
    vm.addItemFormVisible     = false;
    vm.tempItem               = {};
    vm.tempItem.name          = null;
    vm.tempItem.description   = null;
    vm.tempItem.dueDate       = null;
    vm.tempItem.creationDate  = null;
    vm.addItemFormHandler     = addItemFormHandler;
    vm.toggleAddItemVis       = toggleAddItemVis;
    
    // OTHER METHODS
    // vm.initialize           = initialize;
    
    ////////////////////////////////////////////////////////////
    
    // Not needed?
    // function initialize() {
    //   $log.info('listController initialize');
    //   
    //   // Initialize based on cached data
    //   vm.list   = dataService.lists.filter(list => list._id === vm.listId)[0];
    //   vm.items  = vm.list.items;
    //   
    //   // Make request to get the list to get the full parameters
    //   // dataService.getList(vm.listId, (err, data) => {
    //   //   vm.list                 = data;
    //   //   vm.items                = data.items;
    //   //   vm.tempList.name        = vm.list.name;
    //   //   vm.tempList.description = vm.list.description;
    //   // }); 
    // }
    
    //////////////////////////////
    // Edit list methods
    //////////////////////////////
    
    
    function editListFormHandler() {
      $log.info('listController editListFormHandler');
      if (vm.tempList.name) {
        // overwrite the properties locally
        vm.list.name            = vm.tempList.name;
        vm.list.description     = vm.tempList.description;
        
        // hide form
        vm.editListFormVisible  = false;
        vm.editListButText      = 'Edit or delete this list';
        
        // update the list in the database
        dataService.updateList(vm.listId, vm.list, () => {
          $log.log('listController editListFormHandler callback');
        });
      } 
    }
    
    function toggleEditListVis() {
      $log.info('listController toggleEditListVis');
      if (vm.editListFormVisible) {
        vm.editListFormVisible  = false;
        vm.editListButText      = 'Edit or delete this list';
      } else {
        vm.editListFormVisible  = true;
        vm.editListButText      = 'Cancel';
      }
    }
    
    function deleteListHandler() {
      $log.info('listController deleteListHandler');
      dataService.deleteList(vm.listId, (err) => {
        $log.log('listController deleteListHandler callback');
        $location.path('/lists');
      });  
    }
    
    //////////////////////////////
    // Add item methods
    //////////////////////////////
    
    function addItemFormHandler() {
      $log.info('listController addItemFormHandler');
      // Only act if they put in a name b/c it's required
      if (vm.tempItem.name) {
        // Add the new item locally
        vm.tempItem.creationDate  = Date.now();
        vm.tempItem._id           = 'newItem';
        vm.tempItem.lists         = [vm.listId];
        vm.items.push(vm.tempItem);
        
        // Update the database with the new item
        dataService.createItem({newItem: vm.tempItem, updateIdNeeded: true}, (savedItem) => {
          $log.log('listController addItemFormHandler callback');
          vm.list   = dataService.lists.filter(list => list._id === vm.listId)[0];
          vm.items  = vm.list.items;
        });
        
        // Reinitialize conditions
        vm.tempItem = {
          name: null,
          description: null,
          creationDate: null,
          dueDate: null
        };
        vm.addItemButText       = 'Make a new item';
        vm.addItemFormVisible   = false;
      }
    }
    
    
    
    
    
    function toggleAddItemVis() {
      $log.info('listController toggleAddItemVis');
      if (vm.addItemFormVisible) {
        vm.addItemFormVisible   = false;
        vm.addItemButText       = 'Make a new item';
      } else {
        vm.addItemFormVisible   = true;
        vm.addItemButText       = 'Cancel';
      }
    }
    
    
    
  }
  
  
  
  
  
  
  
  
  
  
  
  
  ////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////
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
