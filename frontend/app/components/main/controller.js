'use strict';
/* global angular */


//, 'listModule', 'itemModule'

(function(){
  // Define the main application and require in dependencies
  // Dependencies start with built-ins, then services, then individual modules
  var app = angular.module('todo-app', ['ngRoute', 'dataServiceModule', 'allModule']);
  
  //attach controller for main view
  app.controller('MainController', ['$log', 'dataService', MainController]);
  
  //attach angular routing
  app.config(['$routeProvider', mainRouter]);
  
  
  
  ////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////
  
  function MainController($log, dataService) {
    const vm      = this;
    vm.test       = null;
    vm.initialize = initialize;
    
    /////////////////////////////////////
    // Load data for all lists from db
    function initialize() {
      $log.log('MainController initialize ');
      vm.test = 'SUCCESS';
      
      dataService.initialize();
    }
    
  }
  
  ////////////////////////////////////////////////////////
  
  function mainRouter($routeProvider) {
    $routeProvider
    
      /////////////////////////////////////
      // Route for home page showing all lists
      .when('/', {
        controller: 'allController',
        controllerAs: 'allCtrl',
        templateUrl: 'all/all-view.html'
      })
      
      /////////////////////////////////////
      // Route for an individual list's page
      .when('/lists/:id', {
        controller: 'listController',
        controllerAs: 'listCtrl',
        templateUrl: 'all/list-view.html'
      });
        
  }
  
})();
