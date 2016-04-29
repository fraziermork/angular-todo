'use strict';
/* global angular */

(function(){
  angular.module('dataServiceModule', [])
    .factory('dataService', ['$http', '$log', dataService]);
  
  function dataService($http, $log) {
    const dataService       = {};
    dataService.lists       = [];
    
    // CRUD methods for lists
    dataService.getLists    = getLists;
    dataService.createList  = createList;
    dataService.updateList  = updateList;
    dataService.deleteList  = deleteList;
    // dataService.getList     = getList;
    
    // CRUD methods for items
    // dataService.getItem     = getItem;
    dataService.createItem  = createItem;
    // dataService.updateItem  = updateItem;
    // dataService.deleteItem  = deleteItem;
    
    ////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////
    // Begin Methods
    
    
    ////////////////////////////////////////////////////////////
    // Helper functions
    
    function methodToResource(method, resource, data, id) {
      $log.info('dataService methodToResource');
      // Construct the url
      let url = 'http://localhost:3000/' + resource;
      if (id) {
        url += '/' + id;
      }
      $log.debug(url);
      
      //Construct the arguments
      let args = [url];
      if (data) {
        args.push(data);
      }
      $log.debug(...args);
      
      // Return the promise
      return new Promise((resolve, reject) => {
        $http[method](...args)
          .then((response) => {
            $log.debug(`SUCCESS in methodToResource: ${method} ${resource} ${id}`);
            $log.log(response.data);
            resolve(response.data);
          }, (err) => {
            $log.error(`ERROR in methodToResource: ${method} ${resource} ${id}`);
            $log.log(err);
            reject(err);
          });
      });
    }
    
    
    ////////////////////////////////////////////////////////////
    // List methods
    
    function getLists(cb) {
      $log.info('dataService getLists');
      methodToResource('get', 'lists')
        .then((data) => {
          $log.log(data);
          dataService.lists = data;
          cb && cb(null, data);
        })
        .catch((err) => {
          cb && cb(err);
        });
    }
    
    
    
    function createList(data, cb) {
      $log.info('dataService createList');
      
      // Post to database and update id when complete
      methodToResource('post', 'lists', {
        name:         data.newList.name,
        description:  data.newList.description
      })
        .then((response) => {
          $log.info('create list success');
          // Update the id and creation date to match those stored in the database
          $log.info('before adding new on, dataService.lists is ');
          $log.log(dataService.lists);
          dataService.lists = dataService.lists.map((list) => {
            if (list._id === 'newList') {
              return response;
            } else {
              return list;
            }
          });
          $log.info('After create list, dataService.lists is ');
          $log.log(dataService.lists);
          cb && cb(null, response);  
        })
        .catch((err) => {
          $log.error('create list failure');
          // If post fails, list given an error message and a unique id to prevent interference with future posting
          // TODO: make it delete the list instead? Implement a way for subsequent stuff to try to save it? 
          let newList = dataService.lists.filter((list) => {
            return list._id === 'newList';
          })[0];
          newList._id           = 'PostFailure' + Date.now();
          newList.errorMessage  = 'Failed to save this list.';
          cb && cb(err, newList);  
        });
    }
    
    
    
    // function getList(listId, cb) {
    //   $log.info('dataService getList');
    //     
    //   methodToResource('get', 'lists', null, listId)
    //     .then((data) => {
    //       // put that list into dataService.lists
    //       dataService.lists = dataService.lists.map((list) => {
    //         if (list._id === data._id) {
    //           return data;
    //         } else {
    //           return list;
    //         }
    //       });
    //       cb && cb(null, data);  
    //     })
    //     .catch((err) => {
    //       $log.error('Could not retrieve list with id ' + listId);
    //       cb && cb(err);  
    //     });
    //   
    // }
    
    
    
    function updateList() {
      $log.info('dataService updateList');
    }
    
    
    
    function deleteList(listId, cb) {
      $log.info('dataService deleteList');
      cb && cb();
    }
    
    
    
    ////////////////////////////////////////////////////////////
    // Item methods 
    
    // function getItem() {
    //   
    // }
    
    function createItem(data, cb) {
      $log.info('dataService createItem');
      methodToResource('post', 'items', {
        name:         data.newItem.name,
        description:  data.newItem.description,
        creationDate: data.newItem.creationDate, 
        dueDate:      data.newItem.dueDate
      })
        .then((response) => {
          // Grab the list that the item belongs to 
          let list = dataService.lists.filter((list) => {
            return list._id === data.newItem.lists[0];
          })[0];
          
          // Update the items array with the new item
          list.items = list.items.map((item) => {
            if (item._id === 'newItem') {
              return response;
            } else {
              return item;      
            }
          });
          
          cb && cb(null, response);
        })
        .catch((err) => {
          // Grab the list that the item belongs to 
          let list = dataService.lists.filter((list) => {
            return list._id === data.newItem.lists[0];
          })[0];
          let item = list.items.filter((item) => {
            return item._id === 'newItem';
          })[0];
          item._id          = 'PostFailure' + Date.now();
          item.errorMessage = 'Failed to save this item.';
          cb && cb(err, item);
        });
      
    }
    
    
    // function updateItem() {
    //   
    // }
    
    // function deleteItem() {
    //   
    // }
    
    
    
    ////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////
    
    return dataService;
  }
  
})();
