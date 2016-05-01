'use strict';
/* global angular */

(function(){
  // Define the main application and require in dependencies
  // Dependencies start with built-ins, then services, then individual modules
  var app = angular.module('todo-app', ['ngRoute', 'methodToResourceModule', 'dataServiceModule', 'userModule', 'itemModule', 'listModule', 'allModule']);
  
  //attach controller for main view
  app.controller('MainController', ['$log', 'dataService', 'authentication', MainController]);
  
  //attach angular routing
  app.config(['$routeProvider', '$locationProvider', mainRouter]);
  
  ////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////
  
  function MainController($log, dataService) {
    const vm      = this;
    vm.test       = null;
    vm.initialize = initialize;
    
    /////////////////////////////////////
    // Load data for all lists from db
    function initialize() {
      $log.info('MainController initialize ');
      vm.test = 'SUCCESS';
    }
  }
  
  ////////////////////////////////////////////////////////
  
  function mainRouter($routeProvider, $locationProvider) {
    $routeProvider
    
      /////////////////////////////////////
      // Route for all lists view
      .when('/lists', {
        controller:   'allController',
        controllerAs: 'allCtrl',
        templateUrl:  'all/all-view.html'
      })
      
      /////////////////////////////////////
      // Route for an individual list's view
      .when('/lists/:listId', {
        controller:   'listController',
        controllerAs: 'listCtrl',
        templateUrl:  'list/list-view.html'
      })
      
      /////////////////////////////////////
      // Route for the login / user creation view
      .when('/login', {
        controller:    'userController',
        controllerAs:  'userCtrl',
        templateUrl:   'user/user-view.html'
      })
      
      /////////////////////////////////////
      // Default to user creation / login view
      .otherwise('/', {
        redirectTo: '/login'
      });  
  
  
    // TODO: reimplement
    // $locationProvider.html5Mode(true);
  }
  
})();
