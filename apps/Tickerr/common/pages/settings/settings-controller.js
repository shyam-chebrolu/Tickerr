/**
 * 
 */

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
		//this._$scope.SaveSettings = angular.bind(this,this.SaveSettings);	
		this._$scope.saveSettings = angular.bind(this, this._saveSettings);

		this._init();
	}
	
	SettingsController.prototype._init = function () {
		this._getSettings();
		//var settings = {
		//		passcode: "true",
		//		realtime: "true",
		//		backup: "true"
		//};
		
		//this._$scope.settings = settings;

	};
	
	SettingsController.prototype._saveSettings = function () {
		var self = this;
		var mySettings = {
				realtime: this._$scope.settings.realtime,
			    passcode: this._$scope.settings.passcode,
			    password: this._$scope.settings.password,
			    backup:this._$scope.settings.backup,
			    flashonpricechange: this._$scope.settings.flashonpricechange,
			    banneralerts: this._$scope.settings.banneralerts,
			    flashnews: this._$scope.settings.flashnews
			};
		this._storageService.setObject('Settings', mySettings);
		//this._quoteService.setValue('RealtimeQuotes', this._$scope.chkRTQuote);
		//this._storageService.setObject('RealtimeQuotes', 'checked');
	};
	
	
	SettingsController.prototype._getSettings = function () {
		//this._storageService.getObject('RealtimeQuotes');
		//var myObj = JSON.parse(this._storageService.getObject("Settings"));
		var mySettings = this._storageService.getObject('Settings');
		if (mySettings) {
		this._$scope.settings = mySettings;
		//alert(this._$scope.settings);
		}
	};

})($);