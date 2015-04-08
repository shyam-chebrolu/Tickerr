/**
 * 
 */
theApp.controller('SettingsController',function($scope, $ionicSideMenuDelegate, $ionicModal, $StorageService) {
	
	$scope.SaveSettings = function() {	
		var rtQuotes = $scope.chkRTQuote;
		StorageService.setValue ('RealtimeQuotes', rtQuotes);		 
	}
	
});