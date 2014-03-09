'use strict';

/* 
For nested states using parent ui-view:
https://groups.google.com/forum/#!topic/angular/pCDPOEbwDbY
http://txt.fliglio.com/2013/05/angularjs-state-management-with-ui-router/
*/

angular.module('gccApp')
.config(function ($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/');

  $stateProvider
  .state('home', {
    data: {title: 'Site Selection'},
    url: '/',
    templateUrl: 'scripts/views/home/home.html',
    controller: 'HomeCtrl'
  })

  /* Search ////////////////////////////////////////// */
  .state('search', {
    data: {title: 'Search'},
    url: '/search',
    templateUrl: 'scripts/views/search/search.html',
    controller: 'SearchCtrl'
  })
  .state('search.results', {
    data: {title: 'Results'},
    url: '/results',
    views: {
      '@': {
        templateUrl: 'scripts/views/search/results/results.html',
        controller: 'ResultsCtrl'
      }
    }
  })
  .state('search.results.officeDetail', {
    data: {title: 'View Details'},
    url: '/offices/:propertyId',
    views: {
      '@': {
        templateUrl: 'scripts/views/offices/office-detail.html',
        controller: 'OfficeDetailCtrl'
      }
    }
  })
  .state('search.results.industrialDetail', {
    data: {title: 'View Details'},
    url: '/industrial/:propertyId',
    views: {
      '@': {
        templateUrl: 'scripts/views/industrial/industrial-detail.html',
        controller: 'IndustrialDetailCtrl'
      }
    }
  })
  .state('search.results.siteDetail', {
    data: {title: 'View Details'},
    url: '/sites/:propertyId',
    views: {
      '@': {
        templateUrl: 'scripts/views/sites/site-detail.html',
        controller: 'SiteDetailCtrl'
      }
    }
  })

  /* Bookmarks ////////////////////////////////////////// */
  .state('bookmarks', {
    data: {title: 'Bookmarks'},
    url: '/bookmarks',
    templateUrl: 'scripts/views/bookmarks/bookmarks-list.html',
    controller: 'BookmarksListCtrl'
  })
  .state('bookmarks.officeDetail', {
    data: {title: 'View Details'},
    url: '/offices/:propertyId',
    views: {
      '@': {
        templateUrl: 'scripts/views/offices/office-detail.html',
        controller: 'OfficeDetailCtrl'
      }
    }
  })
  .state('bookmarks.industrialDetail', {
    data: {title: 'View Details'},
    url: '/industrial/:propertyId',
    views: {
      '@': {
        templateUrl: 'scripts/views/industrial/industrial-detail.html',
        controller: 'IndustrialDetailCtrl'
      }
    }
  })
  .state('bookmarks.siteDetail', {
    data: {title: 'View Details'},
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
    data: {title: 'Corridor'},
    url: '/:corridorId',
    templateUrl: 'scripts/views/corridors/corridor.html',
    controller: 'CorridorCtrl'
  })

  /* County ////////////////////////////////////////// */
  .state('corridor.county', {
    data: {title: 'County'},
    url: '/:countyId',
    views: {
      '@': {
        templateUrl: 'scripts/views/counties/countyShell.html',
        controller: 'CountyShellCtrl'
      },
      'countyShell@corridor.county': {
        templateUrl: 'scripts/views/counties/countyTabs.html',
        controller: 'CountyTabsCtrl'
      },
      'countyTabs@corridor.county': {
        templateUrl: 'scripts/views/counties/countyOverview.html',
        controller: 'CountyOverviewCtrl'
      }
    }
  })
  .state('corridor.county.offices', {
    data: {title: 'Offices'},
    url: '/offices',
    views: {
      'countyTabs@corridor.county': {
        templateUrl: 'scripts/views/offices/office-list.html',
        controller: 'OfficeListCtrl'
      }
    }
  })
  .state('corridor.county.industrial', {
    data: {title: 'Industrial Buildings'},
    url: '/industrial',
    views: {
      'countyTabs@corridor.county': {
        templateUrl: 'scripts/views/industrial/industrial-list.html',
        controller: 'IndustrialListCtrl'
      }
    }
  })
  .state('corridor.county.sites', {
    data: {title: 'Sites'},
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
    data: {title: 'View Details'},
    url: '/:propertyId',
    views: {
      'countyShell@corridor.county': {
        templateUrl: 'scripts/views/offices/office-detail.html',
        controller: 'OfficeDetailCtrl'
      }
    }
  })
  .state('corridor.county.industrial.industrialDetail', {
    data: {title: 'View Details'},
    url: '/:propertyId',
    views: {
      'countyShell@corridor.county': {
        templateUrl: 'scripts/views/industrial/industrial-detail.html',
        controller: 'IndustrialDetailCtrl'
      }
    }
  })
  .state('corridor.county.sites.siteDetail', {
    data: {title: 'View Details'},
    url: '/:propertyId',
    views: {
      'countyShell@corridor.county': {
        templateUrl: 'scripts/views/sites/site-detail.html',
        controller: 'SiteDetailCtrl'
      }
    }
  });

});