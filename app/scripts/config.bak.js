'use strict';

angular.module('gccApp')
.config(function ($routeProvider) {
  $routeProvider

  /* Views */
  .when('/', {
    templateUrl: 'scripts/views/home/home.html',
    controller: 'HomeCtrl'
  })
  .when('/search', {
    templateUrl: 'scripts/views/search/search.html',
    controller: 'SearchCtrl'
  })
  .when('/bookmarks', {
    templateUrl: 'scripts/views/bookmarks/bookmarks-list.html',
    controller: 'BookmarksListCtrl'
  })

  /* Corridors and Counties */
  .when('/corridor/:corridorId', {
    templateUrl: 'scripts/views/corridors/corridor.html',
    controller: 'CorridorCtrl'
  })
  .when('/corridor/:corridorId/county/:countyId', {
    templateUrl: 'scripts/views/counties/county.html',
    controller: 'CountyCtrl'
  })
  .when('/corridor/:corridorId/county/:countyId/office/:propertyId', {
    templateUrl: 'scripts/views/offices/office-detail.html',
    controller: 'OfficeDetailCtrl'
  })
  .when('/corridor/:corridorId/county/:countyId/industrial/:propertyId', {
    templateUrl: 'scripts/views/industrial/industrial-detail.html',
    controller: 'IndustrialDetailCtrl'
  })
  .when('/corridor/:corridorId/county/:countyId/site/:propertyId', {
    templateUrl: 'scripts/views/sites/site-detail.html',
    controller: 'SiteDetailCtrl'
  })

  /* Properties */
  .when('/bookmarks/office/:propertyId', {
    templateUrl: 'scripts/views/offices/office-detail.html',
    controller: 'OfficeDetailCtrl'
  })
  .when('/bookmarks/industrial/:propertyId', {
    templateUrl: 'scripts/views/industrial/industrial-detail.html',
    controller: 'IndustrialDetailCtrl'
  })
  .when('/bookmarks/site/:propertyId', {
    templateUrl: 'scripts/views/sites/site-detail.html',
    controller: 'SiteDetailCtrl'
  })

  /* Default */
  .otherwise({
    redirectTo: '/'
  });
});