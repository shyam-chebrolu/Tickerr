/**
 * Angular Module: Route State Transition
 * Contains angular watchers at application level to watch status of Page navigation
 */
angular.module('route.state.transition',[])
	.run(['$rootScope', '$state', '$log', function($rootScope, $state, $log) {		
		// State transition tracker object: stores state transition details until state transition returns success
		var transitionTracker = {};

		$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
	    	transitionTracker[toState.name] = {time: new Date(), from: fromState.name, to: toState.name};
	    });
	    
	    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
	    	if (transitionTracker[toState.name]) {
	    		var data = transitionTracker[toState.name];
	    		$log.debug('Transition from "{0}" to "{1}" took {2} ms.', data.from, data.to, new Date().getTime() - data.time.getTime());
	    		delete transitionTracker[toState.name];
	    	}
	    });
	    
	    $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error){
	    	$log.debug('$stateChangeError: {0}', toState.to);
	    	MB.Notifications.showErrorMessage('This Feature is not configured correctly. Please contact system administrator.');
	    });
	    
	    $rootScope.$on('$stateNotFound', function(event, unfoundState, fromState, fromParams){
	    	$log.debug('$stateChangeError: {0}', unfoundState.to);
	    	MB.Notifications.showErrorMessage('This Feature is not currently available.');
	    	event.preventDefault();
	    });
}]);