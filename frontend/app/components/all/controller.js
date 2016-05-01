'use strict';
/* global angular */

(function(){
  angular.module('allModule', ['dataServiceModule', 'listModule'])
    .controller('allController', ['$log', '$location', '$route', '$scope', 'dataService', allController]);
  
  function allController($log, $location, $route, $scope, dataService){
    const vm                    = this;
    vm.lists                    = dataService.lists;
    
    vm.addListButText           = 'Add a new list';
    vm.addListFormVisible       = false;
    vm.postError                = null;
    vm.newList                  = {};
    vm.newList._id              = null;
    vm.newList.creationDate     = null;
    vm.newList.name             = null;
    vm.newList.description      = null;
    
    vm.addListFormHandler       = addListFormHandler;
    vm.toggleAddListFormVisible = toggleAddListFormVisible;
    vm.initialize               = initialize;
    
    ////////////////////////////////////////////////////////////
    // Update the lists on the controller
    // $scope.$watch(function(scope) {
    //   return (dataService.lists);
    // }, function(newLists, oldLists) {
    //   console.log('__________________________________________');
    //   console.log('DATA CHANGE: dataService.lists updated');
    //   console.log('__________________________________________');
    //   vm.lists = newLists;
    // }, true);
    
    
    ////////////////////////////////////////////////////////////
    // Begin methods
    
    function initialize() {
      $log.info('allController initialize');
      dataService.getLists((err, data) => {
        if (err) {
          $location.url('/login');
          $route.reload();
        } else {
          $scope.$digest();
        }
      });
    }
    
    function addListFormHandler() {
      $log.info('allController addListFormHandler');
      // $log.debug(vm.newList.name);
      // $log.debug(vm.newList.description);
      
      // Add the new list locally
      vm.newList._id          = 'newList';
      vm.newList.items        = [];
      vm.newList.creationDate = Date.now();
      vm.lists.push(vm.newList);
      
      dataService.createList({ newList: vm.newList, updateIdNeeded: true }, (err, createdList) => {
        $log.log('allController addListFormHandler callback');
        vm.lists = dataService.lists;
        $scope.$digest();
        
        // TODO: should take you to list view for the list you just created?
        // TODO: this isn't working
        // $location.path(`#/lists/${createdList._id}`);
      });
      
      
      
      // Reinitialize conditions
      vm.newList  = {
        _id:          null,
        name:         null,
        description:  null, 
        creationDate: null
      };
      vm.addListButText           = 'Add a new list';
      vm.addListFormVisible       = false;
    }
    
    function toggleAddListFormVisible() {
      $log.info('allController toggleAddListFormVisible');
      if (vm.addListFormVisible) {
        vm.addListFormVisible = !vm.addListFormVisible;
        vm.addListButText     = 'Add a new list';
      } else {
        vm.addListFormVisible = !vm.addListFormVisible;
        vm.addListButText     = 'Cancel';
      }
    }
    
    
    
  }
  
})();
