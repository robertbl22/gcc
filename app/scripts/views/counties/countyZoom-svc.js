'use strict';

var app = angular.module('gccApp')
.factory('CountyZoomSvc', function ($rootScope, $timeout) {

	return {
		zoom: function() {
			
			$rootScope.rootAnimationClass = 'rb-zoom-in';

			$rootScope.$on('$stateChangeSuccess', function() {
				$timeout(function(){
					$rootScope.rootAnimationClass = 'rb-crossfade';
				}, 1000)
			});
			
			//$location.path('/' + corridorId + '/' + countyId);
			//$state.go('corridor.county', {countyId: countyId});
		},
		zoomOut: function() {

			$rootScope.rootAnimationClass = 'rb-zoom-out';

			$rootScope.$on('$stateChangeSuccess', function() {
				$timeout(function(){
					$rootScope.rootAnimationClass = 'rb-crossfade';
				}, 1000)
			});
			
		}
	};

});