(function() {
	"use strict";
	theApp.controller('PortfolioController', PortfolioController);

	PortfolioController.$inject = ['$scope', '$state', 'quoteService','dataStashService', '$rootScope'];

	function PortfolioController($scope, $state, quoteService, dataStashService, $rootScope) {
		this._quoteService = quoteService;
		this._$scope = $scope;
		this._$state = $state;
		this._dataStashService = dataStashService;
		this._$rootScope = $rootScope;
		this._$scope.showTickerDetails = angular.bind(this, this._showTickerDetails);
		this._init();
	}
	
	PortfolioController.prototype._init = function () {
		this._loadPortfolio();
	};
	
	PortfolioController.prototype._loadPortfolio = function () {
		var self = this;
		
		this._quoteService.getPortfolio().then(function(result){
			self._$scope.symbolKeys = Object.keys(result);
			self._$scope.symbolValues = result;
		});
	};
	
	PortfolioController.prototype._showTickerDetails = function (pticker) {
		var self = this;
		//var ticker = self._$scope.ticker;
		var ticker = pticker;
		self._dataStashService.setData(ticker);
		self._$rootScope.ticker = ticker;
		
		if (ticker) {
			self._$state.go("QUOTES", null, {reload:true});	
			}
	};
	
})($);

