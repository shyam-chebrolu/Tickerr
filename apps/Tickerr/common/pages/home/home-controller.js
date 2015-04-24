
(function() {
	"use strict";
	theApp.controller('HomeController', HomeController);

	HomeController.$inject = ['$scope', '$state', 'dataStashService', '$rootScope'];

	function HomeController($scope, $state, dataStashService, $rootScope) {
		this._dataStashService = dataStashService;
		this._$scope = $scope;
		this._$state = $state;
		this._$rootScope = $rootScope;
		this._$scope.showTickerDetails = angular.bind(this, this._showTickerDetails);
		
		this._init();
	}
	
	HomeController.prototype._init = function () {

	};
	
	HomeController.prototype._showTickerDetails = function () {
		var self = this;
		var ticker = self._$scope.ticker;		
		self._dataStashService.setData(self._$scope.ticker);
		this._$rootScope.ticker = self._$scope.ticker;
		if (ticker) {
		self._$state.go("QUOTES");
		}
	};
	
})($);