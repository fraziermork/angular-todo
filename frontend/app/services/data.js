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
    
    // CRUD methods for items
    dataService.createItem  = createItem;
    dataService.updateItem  = updateItem;
    dataService.deleteItem  = deleteItem;
    
    ////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////
    // Begin Methods
    ////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////
    
    
    
    ////////////////////////////////////////////////////////////
    // Helper functions
    ////////////////////////////////////////////////////////////
    
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
    ////////////////////////////////////////////////////////////
    
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
          $log.info('before adding new one, dataService.lists is ');
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
    
    function updateList(data, cb) {
      $log.info('dataService updateList');
      
      
      methodToResource('put', 'lists', data.list, data.list._id)
      .then((response) => {
        $log.info('dataService updateList success callback');
        dataService.lists = dataService.lists.map((list) => {
          if (list._id === response._id) {
            return response;
          } else {
            return list;
          }
        });
      })
      .catch((err) => {
        $log.error('ERROR IN dataService updateList callback', err);
        let list = dataService.lists.filter((list) => {
          return list._id === data.list._id;
        })[0];
        list.errorMessage = 'Error updating list.';
      });
      
    }
    
    
    
    
    function deleteList(listId, cb) {
      $log.info('dataService deleteList');
      dataService.lists = dataService.lists.filter((list) => {
        return list._id !== listId;
      });
      methodToResource('delete', 'lists', null, listId)
        .then((response) => {
          $log.info('dataService deleteList');
          cb && cb(null, response);
        })
        .catch((err) => {
          $log.info('dataService deleteList');
          cb && cb(err);
        });
    }
    
    
    
    ////////////////////////////////////////////////////////////
    // Item methods 
    ////////////////////////////////////////////////////////////
    
    function createItem(data, cb) {
      $log.info('dataService createItem');
      // Eliminate the temp _id from the post object
      methodToResource('post', 'items', {
        name:         data.newItem.name,
        description:  data.newItem.description,
        creationDate: data.newItem.creationDate, 
        dueDate:      data.newItem.dueDate,
        lists:        data.newItem.lists
      })
        .then((response) => {
          $log.info('SUCCESS CREATING ITEM');
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
          $log.error('ERROR WHILE CREATING ITEM');
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
    
    
    function updateItem(data, cb) {
      $log.info('dataService updateItem');
      methodToResource('put', 'items', data.item, data.item._id)
        .then((response) => {
          // TODO: refactor in case an item belongs to more than one list?
          let list = dataService.lists.filter(list => list._id === data.item.lists[0])[0]; 
          list.items = list.items.map((item) => {
            if (item._id === data.item._id) {
              return response;
            } else {
              return item;
            }
          });
          cb && cb(response);
        })
        .catch((err) => {
          // TODO: refactor in case an item belongs to more than one list?
          let list = dataService.lists.filter(list => list._id === data.item.lists[0])[0]; 
          let item = list.items.filter(item => item._id === data.item._id)[0];
          item.errorMessage = 'Failed to update this item.';
          cb && cb(err, item);
        });
    }
    
    function deleteItem(itemToDelete, cb) {
      $log.info('dataService deleteItem');
      // TODO: make this able to handle items in more than one list.
      let list = dataService.lists.filter((list) => {
        return (itemToDelete.lists.indexOf(list._id) !== -1);
      })[0];
      list.items = list.items.filter((item) => {
        return itemToDelete._id !== item._id;
      });
      methodToResource('delete', 'items', null, itemToDelete._id)
      .then((response) => {
        $log.info('dataService deleteItem callback');
        cb && cb(null, response);
      })
      .catch((err) => {
        $log.error('ERROR IN dataService deleteItem callback');
        cb && cb(err);
      });
    }
    
    
    
    ////////////////////////////////////////////////////////////
    // END
    ////////////////////////////////////////////////////////////
    
    return dataService;
  }
  
})();
