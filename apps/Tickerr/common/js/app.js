/**
 * 
 */
var theApp = angular.module('theApp', ['ionic','ui.router','LocalForageModule', 'route.state.transition']);

theApp.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
	
	// For any unmatched url, send to Dashboard
    $urlRouterProvider.otherwise("/landing");
    
    $stateProvider
				    .state('LANDING', {
						url : "/landing",
						displayName: "Landing",
						templateUrl : "pages/landing/landing.html",
						controller : 'LandingController'
					})
					.state('HOME', {
						abstract: true,
						url : "",
						displayName: "Home",
						templateUrl : "pages/home/home.html",
						controller : 'HomeController'
					})
					.state('MAJOR_INDEXES', {
						parent: 'HOME',
						displayName: "Indexes",
						url : "/indexes",
						templateUrl : "pages/majorIndexes/majorIndexes.html",
						controller : 'IndexesController as vm'
					})
					.state('QUOTES', {
						parent: 'HOME',
						url : "/quotes",
						displayName: "Quotes",
						templateUrl : "pages/quotes/quotes.html",
						controller : 'QuotesController'
					})
					.state('SETTINGS', {
						parent: 'HOME',
						url : "/settings",
						displayName: "Settings",
						templateUrl : "pages/settings/settings.html",
						controller : 'SettingsController'
					})
					
}]);
 
theApp.run(['$state', function($state) {

	$state.go('LANDING');
}]);