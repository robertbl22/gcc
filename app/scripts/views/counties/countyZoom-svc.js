'use strict';

var app = angular.module('gccApp')
.factory('CountyZoomSvc', function ($rootScope, $location) {

	return {
		zoom: function(corridorId, countyId, pageX, pageY) {
			$rootScope.$on('$stateChangeSuccess', function() {
				$rootScope.rootAnimationClass = 'rb-crossfade';
			});
			$rootScope.rootAnimationClass = 'rb-zoom';
			$location.path('/corridor/' + corridorId + '/county/' + countyId);
		}
	};

});