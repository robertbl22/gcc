'use strict';

angular.module('gccApp')
.directive('distanceToPort', function(GoogleMapsSvc) {
	return {
		template: '<p>Port of Savannah:<br/> \
		{{posDistance}} ({{posDuration}})</p> \
		<p>Port of Brunswick:<br/> \
		{{pobDistance}} ({{pobDuration}})</p>',
		scope : {
			lat: '@',
			lng: '@'
		},
		restrict: 'A',
		link: function(scope, element, attrs) {
			scope.$watchCollection('[lat, lng]', function(newValues) {
				if(newValues[0] && newValues[1]) {
					var lat = newValues[0];
					var lng = newValues[1];
					var latLng = new GoogleMapsSvc.maps.LatLng(lat, lng);
					GoogleMapsSvc.distance.getDistanceToPort(latLng).then(function(data) {

						var pos = data.rows[0].elements[0];
						scope.posDistance = pos.distance.text;
						scope.posDuration = pos.duration.text;

						var pob = data.rows[0].elements[1];
						scope.pobDistance = pob.distance.text;
						scope.pobDuration = pob.duration.text;

						console.log('data',data);
					})
					['catch'](function() {
						element.hide();
					});
				}
			});

		}
	};
});