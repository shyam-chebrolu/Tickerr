(function() {
	"use strict";
	theApp.controller('CurrenciesController', CurrenciesController);

	CurrenciesController.$inject = ['$scope', '$state', 'quoteService'];

	function CurrenciesController($scope, $state, quoteService) {
		this._quoteService = quoteService;
		this._$scope = $scope;
		this._$state = $state;
			
		this._init();
	}
	
	CurrenciesController.prototype._init = function () {
		this._loadCurrencies();
	};
	
	CurrenciesController.prototype._loadCurrencies = function () {
		var self = this;
		
		this._quoteService.getCurrencies().then(function(result){
			self._$scope.symbolKeys = Object.keys(result);
			self._$scope.symbolValues = result;
		});
	};
	
})($);

