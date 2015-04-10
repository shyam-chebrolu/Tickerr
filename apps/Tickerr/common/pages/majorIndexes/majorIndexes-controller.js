
(function() {
	"use strict";
	theApp.controller('IndexesController', IndexesController);

	IndexesController.$inject = ['$scope', '$state', 'quoteService'];

	function IndexesController($scope, $state, quoteService) {
		this._quoteService = quoteService;
		this._$scope = $scope;
		this._$state = $state;
		
		
		//var vm = this;
		//vm.loadQuotes = _loadQuotes;
		
		this._init();
	}
	
	IndexesController.prototype._init = function () {
		this._loadMajorIndexes();
	};
	
	IndexesController.prototype._loadMajorIndexes = function () {
		var self = this;
		
		this._quoteService.getMajorIndexes().then(function(result){
			self._$scope.symbolKeys = Object.keys(result);
			//alert(JSON.stringify(result));
			self._$scope.symbolValues = result;
		});
	};
	
})($);


