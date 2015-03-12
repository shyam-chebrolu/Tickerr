(function() {
	"use strict";
	theApp.controller('IndexesController', IndexesController);

	IndexesController.$inject = ['$scope', '$state'];

	function IndexesController($scope, $state) {
		 var vm = this;
		 
		 vm.loadQuotes = _loadQuotes;
		 vm.loadNagQuotes = _loadNagQuotes;
		 
		function _loadQuotes() {
			$state.transitionTo("QUOTES");
		}
		 
		function _loadNagQuotes() {
			$state.transitionTo("NAG_QUOTES");
		}
		
	}
})($);
