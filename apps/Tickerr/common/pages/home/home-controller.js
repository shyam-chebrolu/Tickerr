/**
 * 
 */

theApp.controller('HomeController',function($scope, $state) {

});

(function() {
	"use strict";
	theApp.controller('HomeController', HomeController);

	HomeController.$inject = ['$scope', '$state', 'dataStashService'];

	function HomeController($scope, $state, dataStashService) {
		this._dataStashService = dataStashService;
		this._$scope = $scope;
		this._$state = $state;
		
		this._$scope.showTickerDetails = angular.bind(this, this._showTickerDetails);
		
		this._init();
	}
	
	HomeController.prototype._init = function () {

	};
	
	HomeController.prototype._showTickerDetails = function () {
		var self = this;
		
		self._dataStashService.setData(self._$scope.ticker);
		self._$state.go("QUOTES");
	};
	
})($);