
theApp.controller('SettingsController',function($scope, $state) {

});

(function() {
	"use strict";
	theApp.controller('SettingsController', SettingsController);

	SettingsController.$inject = ['$scope', '$state', 'storageService'];

	function SettingsController($scope, $state, storageService) {
		this._storageService = storageService;
		this._$scope = $scope;
		this._$state = $state;
		
		this._$scope.saveSettings = angular.bind(this, this._saveSettings);
		
		this._init();
	}
	
	SettingsController.prototype._init = function () {
		var settings = {
				passcode: "true",
				realtime: "true",
				backup: "true"
		};
		
		this._$scope.settings = settings;
	};
	
	SettingsController.prototype._saveSettings = function () {
		var self = this;

		alert(this._$scope.settings.realtime);
	};
	
})($);