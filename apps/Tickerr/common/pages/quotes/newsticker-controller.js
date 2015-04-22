
(function() {
	"use strict";
	theApp.controller('NewsTickerController', NewsTickerController);

	NewsTickerController.$inject = ['$scope', '$state', 'quoteService'];

	function NewsTickerController($scope, $state, quoteService) {
		this._quoteService = quoteService;
		this._$scope = $scope;
		this._$state = $state;
		
		this._init();
	}
	
	NewsTickerController.prototype._init = function () {
		this._loadNewsTickers();
	};
	
	NewsTickerController.prototype._loadNewsTickers = function () {
		var self = this;
		
		this._quoteService.getTickerNews('msft').then(function(result){
			self._$scope.newsTickers = result["responseData"]["entries"];
			//alert(JSON.stringify(result));
		});
	};
	
})($);
