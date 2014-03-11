'use strict';

angular.module('gccApp')
.service('GoogleMaps_InfoWindowSvc', function(GoogleMaps_MapSvc) {

	var _infoWindows = [];

	this.addMarkerInfoWindow = function(map, name, marker) {
		var infowindow = new GoogleMaps_MapSvc.maps.InfoWindow({
			content: name
		});
		GoogleMaps_MapSvc.maps.event.addListener(marker, 'click', function() {
			infowindow.open(map,marker);
		});
	};

	this.addOfficeInfoWindow = function(map, itm, marker) {
		var infowindow = new GoogleMaps_MapSvc.maps.InfoWindow({
			content: '<strong>' + itm.NAME + '</strong><br/>' + itm.ADDRESS + '<br/>' + itm.CITY + ', GA&nbsp;&nbsp;' + itm.COUNTY_NAME
		});
		GoogleMaps_MapSvc.maps.event.addListener(marker, 'click', function() {
			infowindow.open(map,marker);
		});
	};

	this.addSiteInfoWindow = function(map, itm, latLng, polygon) {
		var content = '<strong>' + itm.NAME + '</strong><br/>' + itm.CITY + ', GA&nbsp;&nbsp;' + itm.COUNTY;
		var infowindow = new GoogleMaps_MapSvc.maps.InfoWindow({
			content: content,
			position: latLng
		});
		GoogleMaps_MapSvc.maps.event.addListener(polygon, 'click', function() {
			infowindow.open(map);
		});
	};

	this.addCountyInfoWindow = function(map, countyName, latLng, polygon) {
		var content = '<strong>' + countyName + ' County, GA</strong>';
		var infoWindow = new GoogleMaps_MapSvc.maps.InfoWindow({
			content: content,
			position: latLng
		});
		_infoWindows.push(infoWindow);
		GoogleMaps_MapSvc.maps.event.addListener(polygon, 'click', function() {
			angular.forEach(_infoWindows, function(infoWindow){
				infoWindow.close(map);
			});
			infoWindow.open(map);
		});
		GoogleMaps_MapSvc.maps.event.addListener(map, 'click', function() {
			infoWindow.close(map);
		});
	};

	return this;
});