'use strict';

var app = angular.module('gccApp');

app.factory('BookmarksSvc', function(localStorageService, BookmarksIndex) {

	var _collectionKey = 'gccApp.bookmarks.';

	var Bookmarks = function() {
		this.index = BookmarksIndex;
		this.collection = [];
	};

	Bookmarks.prototype.load = function() {
		this.collection = this.getAll();
	};

	Bookmarks.prototype.add = function(itemId, type, item) {
		var success = false;
		var hasItem = this.index.hasKey(itemId);
		if(!hasItem) {
			this.index.addKey(itemId);
			item.type = type;
			this.collection.push(item);
			localStorageService.add(_collectionKey + itemId, item);
			success = true;
		}
		return success;
	};

	Bookmarks.prototype.hasItem = function(itemId) {
		return this.index.hasKey(itemId);
	};

	Bookmarks.prototype.get = function(itemId) {
		return localStorageService.get(_collectionKey + itemId);
	};

	Bookmarks.prototype.getAll = function() {
		var selfFunc = this;
		var index = this.index.getKeys();
		var bookmarks = [];
		angular.forEach(index, function(itemId, key) {
			var itm = selfFunc.get(itemId);
			bookmarks.push(itm);
		});
		return bookmarks;
	};

	Bookmarks.prototype.deleteSingle = function(itemId) {
		var item = this.get(itemId);
		for(var i=0; i<this.collection.length; i++) {
			if( angular.equals(item, this.collection[i]) ) {
				this.collection.splice(i, 1);
			}
		}
		localStorageService.remove(_collectionKey + itemId);
		this.index.removeKey(itemId);
	};

	Bookmarks.prototype.deleteAll = function () {
		var index = this.index.getKeys();
		for(var i=index.length; i>-1; i--) {
			this.deleteSingle(index[i]);
		}
	};

	return new Bookmarks();
});


app .factory('BookmarksIndex', function(localStorageService) {

	var _indexKey = 'gccApp.bookmarks.index';
	
	var Index = function() {
		this.count = 0;
		this._keys = [];
		this._init();
	};

	Index.prototype._updateStorage = function(indexArray) {
		localStorageService.add(_indexKey, indexArray);
	};

	Index.prototype._init = function() {
		var _indexArray = localStorageService.get(_indexKey);
		if(_indexArray) {
			this._keys = _indexArray;
			this.count = this._keys.length;
		}
	};

	Index.prototype.getKeys = function() {
		return this._keys;
	};

	Index.prototype.removeKey = function(itemId) {
		for(var i=0; i<this._keys.length; i++) {
			if(this._keys[i] === itemId) {
				this._keys.splice(i, 1);
			}
		}
		this._updateStorage(this._keys);
		this.count = this._keys.length;
	};

	Index.prototype.addKey = function(itemId) {
		this._keys.push(itemId);
		this._updateStorage(this._keys);
		this.count = this._keys.length;
	};

	Index.prototype.hasKey = function(itemId) {
		for(var i=0; i<this._keys.length; i++) {
			if(this._keys[i] === itemId) {
				return true;
			}
		}
		return false;
	};

	Index.prototype.clearAll = function() {
		this._keys = [];
		this._updateStorage(this._keys);
		this.count = this._keys.length;
	};

	return new Index();

});