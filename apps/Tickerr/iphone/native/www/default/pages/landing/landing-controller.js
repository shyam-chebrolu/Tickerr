
/* JavaScript content from pages/landing/landing-controller.js in folder common */
/**
 * 
 */

theApp.controller('LandingController',function($scope, $state) {
	setTimeout(function() {
		$state.go("MAJOR_INDEXES");
	}, 3000);
});