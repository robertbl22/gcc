'use strict';

/* 
For nested states using parent ui-view:
https://groups.google.com/forum/#!topic/angular/pCDPOEbwDbY
http://txt.fliglio.com/2013/05/angularjs-state-management-with-ui-router/
*/

angular.module('gccApp')
.config(function ($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise("/");

  $stateProvider
  .state('home', {
    url: '/',
    templateUrl: 'scripts/views/home/home.html',
    controller: 'HomeCtrl'
  })

  /* Search ////////////////////////////////////////// */
  .state('search', {
    url: '/search',
    templateUrl: 'scripts/views/search/search.html',
    controller: 'SearchCtrl'
  })
  .state('search.results', {
    url: '/results',
    views: {
      '@': {
        templateUrl: 'scripts/views/search/results/results.html',
        controller: 'ResultsCtrl'
      }
    }
  })
  .state('search.results.officeDetail', {
    url: '/:propertyId',
    views: {
      '@': {
        templateUrl: 'scripts/views/offices/office-detail.html',
        controller: 'OfficeDetailCtrl'
      }
    }
  })
  .state('search.results.industrialDetail', {
    url: '/:propertyId',
    views: {
      '@': {
        templateUrl: 'scripts/views/industrial/industrial-detail.html',
        controller: 'IndustrialDetailCtrl'
      }
    }
  })
  .state('search.results.siteDetail', {
    url: '/:propertyId',
    views: {
      '@': {
        templateUrl: 'scripts/views/sites/site-detail.html',
        controller: 'SiteDetailCtrl'
      }
    }
  })

  /* Bookmarks ////////////////////////////////////////// */
  .state('bookmarks', {
    url: '/bookmarks',
    templateUrl: 'scripts/views/bookmarks/bookmarks-list.html',
    controller: 'BookmarksListCtrl'
  })
  .state('bookmarks.office', {
    url: '/offices/:propertyId',
    views: {
      '@': {
        templateUrl: 'scripts/views/offices/office-detail.html',
        controller: 'OfficeDetailCtrl'
      }
    }
  })
  .state('bookmarks.industrial', {
    url: '/industrial/:propertyId',
    views: {
      '@': {
        templateUrl: 'scripts/views/industrial/industrial-detail.html',
        controller: 'IndustrialDetailCtrl'
      }
    }
  })
  .state('bookmarks.site', {
    url: '/sites/:propertyId',
    views: {
      '@': {
        templateUrl: 'scripts/views/sites/site-detail.html',
        controller: 'SiteDetailCtrl'
      }
    }
  })

  /* Corridor ////////////////////////////////////////// */
  .state('corridor', {
    url: '/:corridorId',
    templateUrl: 'scripts/views/corridors/corridor.html',
    controller: 'CorridorCtrl'
  })

  /* County ////////////////////////////////////////// */
  .state('corridor.county', {
    url: '/:countyId',
    views: {
      '@': {
        templateUrl: 'scripts/views/counties/countyShell.html',
        controller: 'CountyShellCtrl'
      },
      'countyShell@corridor.county': {
        templateUrl: 'scripts/views/counties/county.html',
        controller: 'CountyCtrl'
      },
      'countyTabs@corridor.county': {
        templateUrl: 'scripts/views/counties/overview.html'
      }
    }
  })
  .state('corridor.county.offices', {
    url: '/offices',
    views: {
      'countyTabs@corridor.county': {
        templateUrl: 'scripts/views/offices/office-list.html',
        controller: 'OfficeListCtrl'
      }
    }
  })
  .state('corridor.county.industrial', {
    url: '/industrial',
    views: {
      'countyTabs@corridor.county': {
        templateUrl: 'scripts/views/industrial/industrial-list.html',
        controller: 'IndustrialListCtrl'
      }
    }
  })
  .state('corridor.county.sites', {
    url: '/sites',
    views: {
      'countyTabs@corridor.county': {
        templateUrl: 'scripts/views/sites/site-list.html',
        controller: 'SiteListCtrl'
      }
    }
  })

  /* Properties ////////////////////////////////////////// */
  .state('corridor.county.offices.officeDetail', {
    url: '/:propertyId',
    views: {
      'countyShell@corridor.county': {
        templateUrl: 'scripts/views/offices/office-detail.html',
        controller: 'OfficeDetailCtrl'
      }
    }
  })
  .state('corridor.county.industrial.industrialDetail', {
    url: '/:propertyId',
    views: {
      'countyShell@corridor.county': {
        templateUrl: 'scripts/views/industrial/industrial-detail.html',
        controller: 'IndustrialDetailCtrl'
      }
    }
  })
  .state('corridor.county.sites.siteDetail', {
    url: '/:propertyId',
    views: {
      'countyShell@corridor.county': {
        templateUrl: 'scripts/views/sites/site-detail.html',
        controller: 'SiteDetailCtrl'
      }
    }
  })

});