'use static';

angular.module('gccApp')
.factory('SearchConditionBuilder', function(PhraseBuilder) {
	var self = this;

	self.getOfficeWhere = function(searchFields, searchParams) {
		var phraseArray = [];
		PhraseBuilder.getCommon(searchFields, searchParams, phraseArray);
		PhraseBuilder.getAcres(searchFields, searchParams, phraseArray);
		PhraseBuilder.getBuilding(searchFields, searchParams, phraseArray);
		PhraseBuilder.getOfficeProximity(searchFields, searchParams, phraseArray);
		return phraseArray.join(' AND ');
	};
	self.getIndustrialWhere = function(searchFields, searchParams) {
		var phraseArray = [];
		PhraseBuilder.getCommon(searchFields, searchParams, phraseArray);
		PhraseBuilder.getAcres(searchFields, searchParams, phraseArray);
		PhraseBuilder.getBuilding(searchFields, searchParams, phraseArray);
		PhraseBuilder.getSiteProximity(searchFields, searchParams, phraseArray);
		return phraseArray.join(' AND ');
	};
	self.getSiteWhere = function(searchFields, searchParams) {
		var phraseArray = [];
		PhraseBuilder.getCommon(searchFields, searchParams, phraseArray);
		PhraseBuilder.getAcres(searchFields, searchParams, phraseArray);
		PhraseBuilder.getSiteProximity(searchFields, searchParams, phraseArray);
		return phraseArray.join(' AND ');
	};

	return self;
});


angular.module('gccApp')
.factory('PhraseBuilder', function() {

	var self = this;

	self._phrase = {
		getString: function(fieldName, searchValue, operator) {
			return fieldName + ' ' + operator + ' \'' + searchValue + '\'';
		},
		getNumeric: function(fieldName, searchValue, operator) {
			return fieldName + ' ' + operator + ' ' + searchValue;
		},
		getStringEq: function(fieldName, searchValue, operator) {
			return self._phrase.getString(fieldName, searchValue, '=');
		},
		getMin: function(fieldName, searchValue) {
			return self._phrase.getNumeric(fieldName, searchValue, '>');
		},
		getMax: function(fieldName, searchValue) {
			return self._phrase.getNumeric(fieldName, searchValue, '<');
		}
	};

	self._safeAddString = function(cfg) {
		if(cfg.searchParam) {
			cfg.searchParam = cfg.searchParam.toString().trim();
			if(cfg.searchParam != '') {
				cfg.phraseArray.push(cfg.func(cfg.searchField, cfg.searchParam));
			}
		}
	};

	self._safeAddNumeric = function(cfg) {
		console.log('_safeAddNumeric cfg.searchParam',cfg.searchParam)
		if(cfg.searchParam){
			if(angular.isString(cfg.searchParam)) {
				console.log('_safeAddNumeric says it is a string')
				var cleanNum = cfg.searchParam.replace(/\D/g,'');
				cfg.searchParam = parseInt(cleanNum);
			}
			console.log(' _safeAddNumeric cfg.searchParam cleaned',cfg.searchParam)
			if(cfg.searchParam > 0) {
				cfg.phraseArray.push(cfg.func(cfg.searchField, cfg.searchParam));
			}
		}
	};

	self.getCommon = function(searchFields, searchParams, phraseArray) {
		self._safeAddString({
			searchField: searchFields.Property.Listing,
			searchParam: searchParams.Property.Listing,
			phraseArray: phraseArray,
			func: self._phrase.getStringEq
		});
		self._safeAddString({
			searchField: searchFields.Location.County,
			searchParam: searchParams.Location.County,
			phraseArray: phraseArray,
			func: self._phrase.getStringEq
		});
		self._safeAddString({
			searchField: searchFields.Location.City,
			searchParam: searchParams.Location.City,
			phraseArray: phraseArray,
			func: self._phrase.getStringEq
		});
	};

	self.getAcres = function(searchFields, searchParams, phraseArray) {
		self._safeAddNumeric({
			searchField: searchFields.Property.Acres,
			searchParam: searchParams.Property.Acres.Min,
			phraseArray: phraseArray,
			func: self._phrase.getMin
		});
		self._safeAddNumeric({
			searchField: searchFields.Property.Acres,
			searchParam: searchParams.Property.Acres.Max,
			phraseArray: phraseArray,
			func: self._phrase.getMax
		});
	};

	self.getBuilding = function(searchFields, searchParams, phraseArray) {
		self._safeAddNumeric({
			searchField: searchFields.Property.SqFt,
			searchParam: searchParams.Property.SqFt.Min,
			phraseArray: phraseArray,
			func: self._phrase.getMin
		});
		self._safeAddNumeric({
			searchField: searchFields.Property.SqFt,
			searchParam: searchParams.Property.SqFt.Max,
			phraseArray: phraseArray,
			func: self._phrase.getMax
		});
	};

	self.getOfficeProximity = function(searchFields, searchParams, phraseArray) {
		self._safeAddNumeric({
			searchField: searchFields.Proximity.Airport,
			searchParam: searchParams.Proximity.Airport,
			phraseArray: phraseArray,
			func: self._phrase.getMax
		});
		self._safeAddNumeric({
			searchField: searchFields.Proximity.Atlanta,
			searchParam: searchParams.Proximity.Atlanta,
			phraseArray: phraseArray,
			func: self._phrase.getMax
		});
		self._safeAddNumeric({
			searchField: searchFields.Proximity.Interstate,
			searchParam: searchParams.Proximity.Interstate,
			phraseArray: phraseArray,
			func: self._phrase.getMax
		});
		self._safeAddNumeric({
			searchField: searchFields.Proximity.Highway,
			searchParam: searchParams.Proximity.Highway,
			phraseArray: phraseArray,
			func: self._phrase.getMax
		});
	};

	self.getSiteProximity = function(searchFields, searchParams, phraseArray) {
		self._safeAddNumeric({
			searchField: searchFields.Proximity.Airport,
			searchParam: searchParams.Proximity.Airport,
			phraseArray: phraseArray,
			func: self._phrase.getMax
		});
		self._safeAddNumeric({
			searchField: searchFields.Proximity.Port,
			searchParam: searchParams.Proximity.Port,
			phraseArray: phraseArray,
			func: self._phrase.getMax
		});
		self._safeAddNumeric({
			searchField: searchFields.Proximity.Intermodal,
			searchParam: searchParams.Proximity.Intermodal,
			phraseArray: phraseArray,
			func: self._phrase.getMax
		});
	};

	return self;

});