'use strict';

angular.module('gccApp')
.config(function ($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'scripts/home/home.html',
    controller: 'HomeCtrl'
  })
  .when('/corridor/:corridorId', {
    templateUrl: 'scripts/corridors/corridor.html',
    controller: 'CorridorCtrl'
  })
  .when('/corridor/:corridorId/county/:countyId', {
    templateUrl: 'scripts/counties/county.html',
    controller: 'CountyCtrl'
  })
  .when('/corridor/:corridorId/county/:countyId/office/:propertyId', {
    templateUrl: 'scripts/properties/offices/office-detail.html',
    controller: 'OfficeDetailCtrl'
  })
  .when('/corridor/:corridorId/county/:countyId/industrial/:propertyId', {
    templateUrl: 'scripts/properties/industrial/industrial-detail.html',
    controller: 'IndustrialDetailCtrl'
  })
  .when('/corridor/:corridorId/county/:countyId/site/:propertyId', {
    templateUrl: 'scripts/properties/sites/site-detail.html',
    controller: 'SiteDetailCtrl'
  })
  .when('/search', {
    templateUrl: 'scripts/search/search.html',
    controller: 'SearchCtrl'
  })
  .when('/bookmarks', {
    templateUrl: 'scripts/bookmarks/bookmarks-list.html',
    controller: 'BookmarksListCtrl'
  })
  .when('/bookmarks/office/:propertyId', {
    templateUrl: 'scripts/properties/offices/office-detail.html',
    controller: 'OfficeDetailCtrl'
  })
  .when('/bookmarks/industrial/:propertyId', {
    templateUrl: 'scripts/properties/industrial/industrial-detail.html',
    controller: 'IndustrialDetailCtrl'
  })
  .when('/bookmarks/site/:propertyId', {
    templateUrl: 'scripts/properties/sites/site-detail.html',
    controller: 'SiteDetailCtrl'
  })
  .otherwise({
    redirectTo: '/'
  });
});