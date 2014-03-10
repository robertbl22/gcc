'use strict';

var app = angular.module('gccApp')
.factory('CountyZoomSvc', function ($rootScope) {

	return {
		zoom: function(corridorId, countyId) {
			$rootScope.$on('$stateChangeSuccess', function() {
				$rootScope.rootAnimationClass = 'rb-crossfade';
			});
			$rootScope.rootAnimationClass = 'rb-zoom';
			
			//$location.path('/' + corridorId + '/' + countyId);
			//$state.go('corridor.county', {countyId: countyId});
		}
	};

});