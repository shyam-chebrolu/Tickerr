(function() {
	"use strict";
	theApp.controller('UsIndexesController', UsIndexesController);

	UsIndexesController.$inject = ['$scope', '$state', 'quoteService'];

	function UsIndexesController($scope, $state, quoteService) {
		this._quoteService = quoteService;
		this._$scope = $scope;
		this._$state = $state;
			
		this._init();
	}
	
	UsIndexesController.prototype._init = function () {
		this._loadUsIndexes();
	};
	
	UsIndexesController.prototype._loadUsIndexes = function () {
		var self = this;
		
		this._quoteService.getUsIndexes().then(function(result){
			self._$scope.symbolKeys = Object.keys(result);
			self._$scope.symbolValues = result;
		});
	};
	
})($);

