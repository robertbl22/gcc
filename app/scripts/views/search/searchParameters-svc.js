'use strict';

angular.module('gccApp')
.factory('SearchParametersSvc', function(localStorageService) {

	var self = this;
	
	self.fields = undefined;

	self.defaults = {
		Property: {
			Type: 'Industrial',
			Listing: 'Both', /* Lease, Sale, Both */
			SqFt: {
				Min: '',
				Max: ''
			},
			Acres: {
				Min: '',
				Max: ''
			}
		},
		Proximity: {
			Airport: '',
			Atlanta: '',
			Port: '',
			Intermodal: '',
			Interstate: '',
			Highway: ''
		},
		Location: {
			Corridor: '',
			Tier: '',
			County: '',
			City: ''
		}
	};

	self.PropertyType = {
		INDUSTRIAL: 'Industrial',
		OFFICE: 'Office',
		SITE: 'Site'
	};

	var _indexKey = 'gccApp.searchparams'
	var _store = {
		save: function() {
			localStorageService.add(_indexKey, self.fields);
		},
		clear: function() {
			localStorageService.remove(_indexKey);
		},
		get: function() {
			return localStorageService.get(_indexKey);
		}	
	};

	self.save = function() {
		_store.save();
	};

	self.reset = function() {
		_store.clear();
		self.fields = angular.copy(self.defaults);
	};

	self.load = function() {
		var savedParams = _store.get();
		if(savedParams != null) {
			self.fields = savedParams;
		} else {
			self.fields = angular.copy(self.defaults);
		}
	};

	(function init() {
		self.load();
	}());

	return self;
});