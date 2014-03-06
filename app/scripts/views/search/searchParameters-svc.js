'use strict';

angular.module('gccApp')
.factory('SearchParametersSvc', function() {
	var Search = {
		fields: {
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