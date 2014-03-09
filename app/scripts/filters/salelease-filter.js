'use strict';

angular.module('gccApp')
.filter('salelease',
	[ '$filter', '$locale',
	function(filter, locale) {

		return function(SaleOrLease) {
			switch (SaleOrLease) {
				case 'Sale':
					return 'For Sale';
				case 'Lease':
					return 'For Lease';
				case 'Both':
					return 'For Sale or Lease';
			}
			return '';
		};
	}
]);