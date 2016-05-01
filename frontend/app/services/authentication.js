'use strict';
/* global angular */

(function() {
  angular.module('userModule', ['methodToResourceModule'])
    .factory('authentication', ['$log', 'methodToResource', authentication]);
  
  function authentication($log, methodToResource) {
    const authentication      = {};
    authentication.authToken  = null;
    authentication.createUser = createUser;
    authentication.logInUser  = logInUser;
    authentication.logOutUser = logOutUser;
    authentication.getToken   = getToken;
    
    ////////////////////////////////////////////////////////////
    // HANDLING THE USER
    ////////////////////////////////////////////////////////////
    
    function logInUser(username, password, cb) {
      $log.info('authentication logInUser');
      methodToResource('get', 'login')
        .then((response) => {
          $log.info('authentication logInUser');
          authentication.authToken = response.token;
          cb && cb(null);
        })
        .catch((err) => {
          $log.error('ERROR IN authentication logInUser ', err);
          cb && cb(err);
        });
    }
    
    function createUser(username, password, cb) {
      $log.info('authentication createUser');
      methodToResource('post', 'users/signUp', { username, password })
        .then((response) => {
          $log.info('authentication createUser');
          authentication.authToken = response.token;
          cb && cb(null);
        })
        .catch((err) => {
          $log.error('ERROR IN authentication createUser ', err);
          cb && cb(err);
        });
    }
    
    
    ////////////////////////////////////////////////////////////
    // HANDLING THE TOKEN
    ////////////////////////////////////////////////////////////
    
    function logOutUser() {
      $log.info('authentication logOutUser');
      authentication.authToken = null;
    }
    
    function getToken() {
      $log.info('authentication getToken');
      return authentication.authToken;
    }
    
    return authentication;
  }
})();  
