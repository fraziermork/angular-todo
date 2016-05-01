'use strict';
/* global angular */


(function() {
  angular.module('userModule')
    .controller('UserController', [
      '$log', 
      '$location', 
      '$route', 
      'methodToResource', 
      'authentication', 
      UserController
    ]);
  
  function UserController($log, $location, $route,  methodToResource, authentication) {
    const vm                    = this;
    vm.username                 = null;
    vm.password                 = null;
    vm.newUser                  = {};
    vm.newUser.username         = null;
    vm.newUser.password         = null;
    vm.createUserFormVis        = false;
    vm.createUserButtonText     = 'Or create a new user.';
    vm.toggleCreateUsrFormVis   = toggleCreateUsrFormVis;
    vm.createUser               = createUser;
    vm.logInUser                = logInUser;
    vm.logOutUser               = logOutUser;
    
    function toggleCreateUsrFormVis() {
      $log.info('UserController toggleCreateUsrFormVis');
      if (vm.createUserFormVis) {
        vm.createUserFormVis    = false;
        vm.createUserButtonText = 'Or create a new user.';
      } else {
        vm.createUserFormVis    = true;
        vm.createUserButtonText = 'Cancel';
      }
    }
    
    function logInUser() {
      $log.info('UserController logInUser');
      authentication.logInUser(vm.username, vm.password, (err) => {
        if (err) {
          $log.error('ERROR logging you in.');
        } else {
          $location.url('/lists');
          $route.reload();
        }
      });
    }
    
    function createUser() {
      $log.info('UserController createNewUser');
      authentication.createUser(vm.newUser.username, vm.newUser.password, (err) => {
        if (err) {
          $log.error('ERROR creating your account.');
        } else {
          $location.url('/lists');
          $route.reload();
        }
      });
    }
    
    function logOutUser() {
      $log.info('UserController logOutUser');
      authentication.logOutUser();
      $location.url('/login');
      $route.reload();
    }
    
  }
  
})();
