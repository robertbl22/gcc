'use strict';

var app = angular.module('gccApp')
.filter('salelease',
	[ '$filter', '$locale',
	function(filter, locale) {

		return function(SaleOrLease) {
			switch (SaleOrLease) {
				case 'Sale': return 'For Sale'; break;
				case 'Lease': return 'For Lease'; break;
				case 'Both': return 'For Sale or Lease'; break;
			}
			return '';
		};
	} 
]);