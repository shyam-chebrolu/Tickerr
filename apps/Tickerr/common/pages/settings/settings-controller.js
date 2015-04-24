/**
 * 
 */
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
	};
	
	SettingsController.prototype._saveSettings = function () {
		var self = this;
		var mySettings = {
				RealtimeQuotes: "true",
			    Passcode: "false",
			    Password: "",
			    BackupAndRestore: "false",
			    FlashOnPriceChange: "false",
			    BannerAlerts: "false",
			    FlashNews: "false"
			};
		this._storageService.setObject('Settings', JSON.stringify(mySettings));
		//this._quoteService.setValue('RealtimeQuotes', this._$scope.chkRTQuote);
		//this._storageService.setObject('RealtimeQuotes', 'checked');
	};
	
	
	SettingsController.prototype._getSettings = function () {
		//this._storageService.getObject('RealtimeQuotes');
		//var myObj = JSON.parse(this._storageService.getObject("Settings"));
		var mySettings = JSON.parse(this._storageService.getObject('Settings'));
//		var checked = this._storageService.getObject('RealtimeQuotes');
		if (mySettings) {
			this._$scope.chkRealtimeQuotes.checked = mySettings.RealtimeQuotes;
		}
	};
//	
//	SettingsController.prototype.SaveSettings = function() {
//		alert(this._storageService.getObject('RealtimeQuotes'));
//		//this._storageService.getObject('RealtimeQuotes');
//		this._storageService.setObject('RealtimeQuotes', this._$scope.chkRTQuote.checked);
//	}
	
})($);