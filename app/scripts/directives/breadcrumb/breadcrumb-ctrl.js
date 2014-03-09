'use strict';

angular.module('gccApp')
.controller('BreadcrumbCtrl', function ($scope, $rootScope, $state, $stateParams, SelectGeorgia_CountiesSvc) {

	$scope.$state = $state;
	$scope.$stateParams = $stateParams;

	$scope.getName = function(key) {
		if(key==='Corridor') {
			if($scope.Corridors) {
				for (var i = 0; i < $scope.Corridors.length; i++) {
					var c = $scope.Corridors[i];
					if(c.id===$stateParams.corridorId) {
						$rootScope.docTitle = c.shortname;
						return c.shortname;
					}
				};
			}
		};
		if(key==='County') {
			var name = SelectGeorgia_CountiesSvc.countyIdToCountyName($stateParams.countyId);
			name = name + ' County'
			$rootScope.docTitle = name;
			return name;
		}
		$rootScope.docTitle = key;
		return key;
	}

});



