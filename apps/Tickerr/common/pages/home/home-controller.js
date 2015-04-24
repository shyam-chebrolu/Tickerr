<<<<<<< HEAD

(function() {
	"use strict";
	theApp.controller('HomeController', HomeController);

	HomeController.$inject = ['$scope', '$state', 'dataStashService', '$rootScope'];

	function HomeController($scope, $state, dataStashService, $rootScope) {
		this._dataStashService = dataStashService;
		this._$scope = $scope;
		this._$state = $state;
		this._$rootScope = $rootScope;
=======
(function() {
	"use strict";
	theApp.controller('HomeController', HomeController);

	HomeController.$inject = ['$scope', '$state', 'dataStashService'];

	function HomeController($scope, $state, dataStashService) {
		this._dataStashService = dataStashService;
		this._$scope = $scope;
		this._$state = $state;
		
>>>>>>> 5b635c44bcf8f46232c71290a1349b31e2104bff
		this._$scope.showTickerDetails = angular.bind(this, this._showTickerDetails);
		
		this._init();
	}
	
	HomeController.prototype._init = function () {

	};
	
	HomeController.prototype._showTickerDetails = function () {
		var self = this;
<<<<<<< HEAD
		var ticker = self._$scope.ticker;		
		self._dataStashService.setData(self._$scope.ticker);
		this._$rootScope.ticker = self._$scope.ticker;
		if (ticker) {
		self._$state.go("QUOTES");
		}
=======
		
		self._dataStashService.setData(self._$scope.ticker);
		self._$state.go("QUOTES", null, {reload:true});	
		
>>>>>>> 5b635c44bcf8f46232c71290a1349b31e2104bff
	};
	
})($);