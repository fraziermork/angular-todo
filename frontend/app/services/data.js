'use strict';
/* global angular */

(function(){
  angular.module('dataServiceModule', [])
    .factory('dataService', ['$http', '$log', dataService]);
  
  function dataService($http, $log){
    const dataService           = {};
    dataService.lists           = [];
    dataService.initialize      = initialize;
    dataService.postToResource  = postToResource;
    
    //////////////////////////////
    
    function initialize(cb) {
      $log.log('dataService initialize');
      $http.get('http://localhost:3000/lists')
        .then((result) => {
          dataService.lists = result.data;
          cb && cb(null, result.data);
        }, (err) => {
          $log.log('ERROR IN dataServiceModule.initialize: ', err);
          cb && cb(err);
        });
    }
    
    
    
    function postToResource(resource, data, callback) {
      $log.log('dataService postToResource');
      
      
    }
    
    
    
    return dataService;
  }
  
})();
