'use strict';

angular.module('gccApp')
.factory('SearchSvc', function() {
	var Search = {
		fields: {
			'Property': {
				'Type': 'Industrial',
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
		},
		PropertyType: {
			INDUSTRIAL: 'Industrial',
			OFFICE: 'Office',
			SITE: 'Site'
		}
	};
	Search.defaults = angular.copy(Search.fields);
	return Search;
});