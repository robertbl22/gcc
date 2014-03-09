'use strict',

angular.module('gccApp')
.factory('CorridorHighlightSvc', function() {
	return {
		highlightedCorridorId: undefined,
		highlightCorridor: function(corridorId) {
			this.highlightedCorridorId = corridorId;
		}
	};
});