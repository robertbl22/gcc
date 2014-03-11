'use strict';

angular.module('gccApp')
.service('GoogleMaps_DistanceSvc', function($q, GoogleMaps_MapSvc) {

	/* See:
	https://developers.google.com/maps/documentation/javascript/distancematrix
	*/
	var _service = new GoogleMaps_MapSvc.maps.DistanceMatrixService();
	var _portOfSavannah = new GoogleMaps_MapSvc.maps.LatLng(32.127369,-81.152019);
	var _portOfBrunswick = new GoogleMaps_MapSvc.maps.LatLng(31.151783,-81.497194);
	var _destinationsArray = [_portOfSavannah, _portOfBrunswick];

	this.getDistanceToPort = function(latLng) {
		var defer = $q.defer();

		_service.getDistanceMatrix(
		{
			origins: 			[latLng],
			destinations: 		_destinationsArray,
			travelMode: 		GoogleMaps_MapSvc.maps.TravelMode.DRIVING,
			unitSystem: 		GoogleMaps_MapSvc.maps.UnitSystem.IMPERIAL,
			durationInTraffic: 	true,
			avoidHighways: 		false,
			avoidTolls: 		false
		}, callback);

		function callback(response, status) {
			if (status === GoogleMaps_MapSvc.maps.DistanceMatrixStatus.OK) {
				defer.resolve(response);
			} else {
				defer.reject();
			}
		};
		return defer.promise;
	};

	return this;

});