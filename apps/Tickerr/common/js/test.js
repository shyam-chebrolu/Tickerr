angular.module('app', ['ngResource']);

function AppCtrl($scope, $resource) {
    
    $scope.googleFinance = $resource('https://finance.google.com/finance/info', 
                                     {client:'ig', callback:'JSON_CALLBACK'},
                                     {get: {method:'JSONP', params:{q:'GOOG'}, isArray: true}});

    $scope.indexResult = $scope.googleFinance.get();

}