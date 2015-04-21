
(function() {
	"use strict";
	theApp.controller('HomeController', HomeController);

	HomeController.$inject = ['$scope', '$state', 'quoteService','$rootScope'];

	function HomeController($scope, $state, quoteService, $rootScope) {
		this._quoteService = quoteService;
		this._$scope = $scope;
		this._$state = $state;
		this._$rootScope = $rootScope;
		this._$scope.searchMe = angular.bind(this,this.searchMe);
		this._init();
	}
	
	HomeController.prototype._init = function () {
		this._loadQuote();
	};
	
	HomeController.prototype._loadQuote = function () {
		var self = this;
		//this.searchMe();
		//alert(this._$scope.search);
	};
	
	HomeController.prototype.searchMe = function () {
		var quoteName = this._$scope.searchTicker;
		if (quoteName) {			
			//url =  "http://finance.google.com/finance/info?client=ig&q=" + quoteName;
			//populateData($http, url);
			//Store it in rootScope so it can accessed everywhere.
			//$rootScope.ticker = quoteName;
			alert(quoteName);
		}
	}
	
//	function populateData($http, url) {
//		$http.get(url)
//	  	.success(function(response) {
//	  		alert(response);
//	  		})
//	  	.error(function(response) { $scope.searchTicker = "Error";});
//	};    
	
})($);