
/* JavaScript content from js/app.js in folder common */
/**
 * 
 */
//var theApp = angular.module('theApp', ['ionic','ui.router','LocalForageModule', 'route.state.transition']);

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
					.state('US_INDEXES', {
						parent: 'HOME',
						url : "/indexes",
						displayName: "Us Indexes",
						templateUrl : "pages/majorIndexes/usindexes.html",
						controller : 'UsIndexesController as vm'
					})
					.state('COMMODITIES', {
						parent: 'HOME',
						url : "/indexes",
						displayName: "Commodities",
						templateUrl : "pages/majorIndexes/commodities.html",
						controller : 'CommoditiesController as vm'
					})
					.state('QUOTES', {
						parent: 'HOME',
						url : "/quotes",
						displayName: "Quotes",
						templateUrl : "pages/quotes/quotes.html",
						controller : 'QuotesController'
					})
<<<<<<< HEAD
					.state('QUOTES2', {
						parent: 'HOME',
						url : "/quotes",
						displayName: "Quotes",
						templateUrl : "pages/quotes/quotes2.html",
						controller : 'Quotes2Controller'
					})
					.state('NEWS', {
						parent: 'HOME',
						url : "/quotes",
						displayName: "Quotes",
						templateUrl : "pages/quotes/news.html",
						controller : 'NewsController'
					})
					.state('HISTORY', {
						parent: 'HOME',
						url : "/quotes",
						displayName: "Quotes",
						templateUrl : "pages/quotes/history.html",
						controller : 'HistoryController'
=======
					.state('NAG_QUOTES', {
						parent: 'HOME',
						url : "/nag_quotes",
						displayName: "Quotes",
						templateUrl : "pages/quotes/nag_quotes.html",
						controller : 'NagQuotesController'
>>>>>>> origin/master
					})
					.state('SETTINGS', {
						parent: 'HOME',
						url : "/settings",
						displayName: "Settings",
						templateUrl : "pages/settings/settings.html",
						controller : 'SettingsController'
					})
					.state('PORTFOLIO', {
						parent: 'HOME',
						url : "/portfolio",
						displayName: "Portfolio",
						templateUrl : "pages/portfolio/portfolio.html",
						controller : 'PortfolioController'
					})
					.state('PORTFOLIO2', {
						parent: 'HOME',
						url : "/test",
						displayName: "Portfolio2",
						templateUrl : "pages/test/portfolio2.html",
						controller : 'Portfolio2Controller'
					})
					
}]);
 
theApp.run(['$state', function($state) {

	$state.go('LANDING');
}]);