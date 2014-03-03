'use strict';

angular.module('gccApp')
.factory('SearchSvc', function() {
	var Search = {
		fields: {
			'Property': {
				'Type': 'IndustrialBuilding',
				'Listing': 'LeaseOrSale',
				'SqFt': {
					'Min': '',
					'Max': ''
				},
				'Acres': {
					'Min': '',
					'Max': ''
				}
			},
			'Proximity': {
					'Airport': '',
					'Port': '',
					'Intermodal': '',
					'Interstate': '',
					'Highway': ''
				},
			'Location': {
				'Corridor': '',
				'Tier' : '',
				'County': '',
				'City': ''
			}
		}
	};
	Search.defaults = angular.copy(Search.fields);
	return Search;
});