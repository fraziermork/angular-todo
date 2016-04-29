'use strict';
/* global angular */

(function(){
  angular.module('itemModule', ['dataServiceModule'])
    .controller('itemController', ['$log', '$scope', 'dataService', itemController]);
  
  function itemController($log, $scope, dataService) {
    const vm                = this;
    vm.editItemFormVis      = false;
    vm.editItemButText      = 'Edit this item';
    vm.itemId               = $scope.item._id;
    vm.tempItem             = {};
    vm.tempItem.name        = $scope.list.name;
    vm.tempItem.description = $scope.list.description;
    
    vm.toggleEditItemVis    = toggleEditItemVis;
    vm.editItemFormHandler  = editItemFormHandler;
    vm.deleteItemHandler    = deleteItemHandler;
    
    ////////////////////////////////////////////////////////////
    
    
    
    function toggleEditItemVis() {
      $log.log('itemController toggleEditItemVis');
      if (vm.editItemFormVis) {
        vm.editItemFormVis      = false;
        vm.editItemButText      = 'Edit this item';   
      } else {
        vm.editItemFormVis      = true;
        vm.editItemButText      = 'Cancel';   
      }
    }
    
    function editItemFormHandler() {
      $log.log('itemController editItemFormHandler');
      
      
    }
    
    function deleteItemHandler() {
      $log.log('itemController deleteItemHandler');
      
      
    }
  }
  
})();
