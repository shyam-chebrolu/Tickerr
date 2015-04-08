
/* JavaScript content from pages/quotes/nag_quotes-controller.js in folder common */
//var app = angular.module('MyTicker', ['ionic']);

theApp.controller('NagQuotesController', function($scope,  $http, $ionicPopup) {
	
	$scope.appName = 'Ticker';
	$scope.world = 'World';
	$scope.us_market = 'US Market';
	$scope.commodities = 'Commodities';
	$scope.currencies = 'Currencies';
	$scope.portfolioId = 'Portfolio 1';
	
	
	var url = "http://finance.google.com/finance/info?client=ig&q=AAPL,YHOO,ORCL,RDWR,BOA";
	populateData($http, url);

	$scope.populateQuote = function (id) {
		if (id=='world') {
			url =  "http://finance.google.com/finance/info?client=ig&q=AAPL,C,BABA";
		} else if (id =="usmarket") {
			url =  "http://finance.google.com/finance/info?client=ig&q=AAPL,YHOO,ORCL,RDWR,BOA";
		} else if (id == 'commodities') {
			url =  "http://finance.google.com/finance/info?client=ig&q=COST";
		} else if (id == 'currencies') {
			url =  "http://finance.google.com/finance/info?client=ig&q=GLD";
		}
		populateData($http, url);
	}
	
	$scope.searchMe = function () {
		var quoteName = $scope.searchQuote;
		if (!quoteName) {
			var alertPopup = $ionicPopup.alert({
			       title: 'Please enter the Quote Name',
			       template: 'For multiple Quotes use comma seperated names..'
			 });
		} else {
			
		url =  "http://finance.google.com/finance/info?client=ig&q=" + quoteName;
		populateData($http, url);
		}
	}
	
	$scope.confirmPopup = function() {
	     var confirmPopup = $ionicPopup.confirm({
	         title: 'Confirm Delete',
	         template: 'Are you sure you want to delete Portfolio 1?'
	       });
	       confirmPopup.then(function(res) {
	         if(res) {
	           console.log('You are sure');
	         } else {
	           console.log('You are not sure');
	         }
	       });
	};


		$scope.showAlert = function() {	
		var alertPopup = $ionicPopup.alert({
		       title: 'Under Construction',
		       template: 'Hello....'
		 });	
	}
	
	function alertMessage() {
		
	}
	function populateData($http, url) {
		$http.get(url)
	  	.success(function(response) {
	  		var data = response.substring(3, response.length)
	  		data=JSON.stringify(eval("(" + data + ")"));
	  		$scope.stocks = eval("(" + data + ')');
	  		})
	  	.error(function(response) { $scope.stocks = response;});
	};    
	
	
 });
