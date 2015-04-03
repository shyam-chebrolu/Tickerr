
var theApp = angular.module('theApp', ['ionic','ui.router','LocalForageModule', 'route.state.transition']);

function wlCommonInit(){
	// setting Device Height
	 $("html, body").css("height",$(document).height());
	 
	/*
	 * Use of WL.Client.connect() API before any connectivity to a MobileFirst Server is required. 
	 * This API should be called only once, before any other WL.Client methods that communicate with the MobileFirst Server.
	 * Don't forget to specify and implement onSuccess and onFailure callback functions for WL.Client.connect(), e.g:
	 *    
	 *    WL.Client.connect({
	 *    		onSuccess: onConnectSuccess,
	 *    		onFailure: onConnectFailure
	 *    });
	 *     
	 */
	
	// Common initialization code goes here
	
	console.log("Bootstrap Angular JS");
	angular.element(document).ready(function() {
		angular.bootstrap(document, ['theApp']);
	});
	 
}

function onDeviceReady() {
    angular.bootstrap(document);
}


