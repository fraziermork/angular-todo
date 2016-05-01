'use strict';
/* global angular */


(function() {
  angular.module('methodToResourceModule', [])
    .factory('methodToResource', ['$log', '$http', methodToResource]);
  
  function methodToResource($log, $http) {
    return function methodToResource(method, resource, data, id) {
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
    };

  }
})();
