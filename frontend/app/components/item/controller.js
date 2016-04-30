'use strict';
/* global angular */

(function(){
  angular.module('itemModule', ['dataServiceModule'])
    .controller('ItemController', ['$log', '$scope', 'dataService', ItemController]);
  
  function ItemController($log, $scope, dataService) {
    const vm                    = this;
    vm.editItemFormVis          = false;
    vm.editItemButText          = 'Edit this item';
    vm.deleteItemButText        = 'Delete this item';
    vm.itemId                   = $scope.item._id;
    vm.tempItem                 = {};
    vm.tempItem.name            = $scope.item.name;
    vm.tempItem.description     = $scope.item.description;
    vm.tempItem.dueDate         = $scope.item.dueDate;
    vm.toggleEditItemVis        = toggleEditItemVis;
    vm.editItemFormHandler      = editItemFormHandler;
    vm.deleteItemHandler        = deleteItemHandler;
    
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
      if (vm.tempItem.name) {
        // Assign the changes locally
        $scope.item.name        = vm.tempItem.name;
        $scope.item.description = vm.tempItem.description;
        $scope.item.dueDate     = vm.tempItem.dueDate;
        
        // Push the changes to the database
        dataService.updateItem({item: $scope.item, updateIdNeeded: false}, (err, updatedItem) => {
          $log.log('itemController editItemFormHandler callback');
          $scope.$digest();
        });
      }
    }
    
    function deleteItemHandler() {
      $log.log('itemController deleteItemHandler');
      if (vm.deleteItemButText === 'Delete this item') {
        vm.deleteItemButText = 'Click again to confirm.';
      } else {
        dataService.deleteItem(vm.itemId, (err) => {
          $scope.$digest();
        });
      }
    }
  }
  
})();
