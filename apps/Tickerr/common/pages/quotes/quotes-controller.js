
(function() {
	"use strict";
	theApp.controller('QuotesController', QuotesController);

	QuotesController.$inject = ['$scope', '$state', 'quoteService','dataStashService', '$rootScope'];

	function QuotesController($scope, $state, quoteService, dataStashService, $rootScope) {
		this._quoteService = quoteService;
		this._$scope = $scope;
		this._$state = $state;
		this._dataStashService = dataStashService;
		this._$rootScope = $rootScope;
		this._init();
	}
	
	QuotesController.prototype._init = function () {
		this._loadTicker();
	};
	
	QuotesController.prototype._loadTicker = function () {
		var self = this;
		//var ticker = self._dataStashService.getData();
		var ticker = this._$rootScope.ticker;
		this._quoteService.getQuotes(ticker).then(function(result){
			self._$scope.symbol = result[0];
		});
	};
	
})($);


