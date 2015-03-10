(function() {
	"use strict";
	theApp.controller('IndexesController', IndexesController);

	IndexesController.$inject = ['$scope', '$state'];

	function IndexesController($scope, $state) {
		 var vm = this;
		 
		 vm.loadQuotes = _loadQuotes;
		 
		function _loadQuotes() {
			$state.transitionTo("QUOTES");
		}
	}
})($);
