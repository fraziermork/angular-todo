'use strict';
/* global angular */

(function() {
  angular.module('userModule', ['methodToResourceModule'])
    .factory('authentication', ['$log', 'methodToResource', authentication]);
  
  function authentication($log, methodToResource) {
    const authentication = {};
    
    authentication.createUser = createUser;
    authentication.logInUser  = logInUser;
    
    
    function logInUser() {
      
    }
    
    function createUser() {
      
    }
    
    return authentication;
  }
})();  
