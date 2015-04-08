/**
 * 
 */
theApp.controller('CommoditiesController',function($scope, $ionicSideMenuDelegate, $ionicModal) {
	
	$(document).ready(function(){

		var url = "http://query.yahooapis.com/v1/public/yql";
	    var data = encodeURIComponent("select * from yahoo.finance.quotes where symbol in ('GCJ15.CMX')");
	
	    $.getJSON(url, 'q=' + data + "&format=json&diagnostics=true&env=http://datatables.org/alltables.env")
	        .done(function (data) {
	        $('.GOLDl').prepend(data.query.results.quote.LastTradePriceOnly);
	        $('.GOLDltt').prepend(data.query.results.quote.LastTradeTime);
	        $('.GOLDc').prepend(data.query.results.quote.PercentChange);
	    })
	        .fail(function (jqxhr, textStatus, error) {
	        $('.GOLDl').prepend('Err!!! ');
	    });
	    
	    var url = "http://query.yahooapis.com/v1/public/yql";
	    var data = encodeURIComponent("select * from yahoo.finance.quotes where symbol in ('SIJ15.CMX')");
	
	    $.getJSON(url, 'q=' + data + "&format=json&diagnostics=true&env=http://datatables.org/alltables.env")
	        .done(function (data) {
	        $('.SILVERl').prepend(data.query.results.quote.LastTradePriceOnly);
	        $('.SILVERltt').prepend(data.query.results.quote.LastTradeTime);
	        $('.SILVERc').prepend(data.query.results.quote.PercentChange);
	    })
	        .fail(function (jqxhr, textStatus, error) {
	        $('.SILVERl').prepend('Err!!! ');
	    });	
	    
	    var url = "http://query.yahooapis.com/v1/public/yql";
	    var data = encodeURIComponent("select * from yahoo.finance.quotes where symbol in ('PLJ15.NYM')");
	
	    $.getJSON(url, 'q=' + data + "&format=json&diagnostics=true&env=http://datatables.org/alltables.env")
	        .done(function (data) {
	        $('.PLTNUMl').prepend(data.query.results.quote.LastTradePriceOnly);
	        $('.PLTNUMltt').prepend(data.query.results.quote.LastTradeTime);
	        $('.PLTNUMc').prepend(data.query.results.quote.PercentChange);
	    })
	        .fail(function (jqxhr, textStatus, error) {
	        $('.PLTNUMl').prepend('Err!!! ');
	    });	
	    
	    var url = "http://query.yahooapis.com/v1/public/yql";
	    var data = encodeURIComponent("select * from yahoo.finance.quotes where symbol in ('HGJ15.CMX')");
	
	    $.getJSON(url, 'q=' + data + "&format=json&diagnostics=true&env=http://datatables.org/alltables.env")
	        .done(function (data) {
	        $('.COPPERl').prepend(data.query.results.quote.LastTradePriceOnly);
	        $('.COPPERltt').prepend(data.query.results.quote.LastTradeTime);
	        $('.COPPERc').prepend(data.query.results.quote.PercentChange);
	    })
	        .fail(function (jqxhr, textStatus, error) {
	        $('.COPPERl').prepend('Err!!! ');
	    });	
	
		var url = "http://query.yahooapis.com/v1/public/yql";
	    var data = encodeURIComponent("select * from yahoo.finance.quotes where symbol in ('CLK15.NYM')");
	
	    $.getJSON(url, 'q=' + data + "&format=json&diagnostics=true&env=http://datatables.org/alltables.env")
	        .done(function (data) {
	        $('.OILl').prepend(data.query.results.quote.LastTradePriceOnly);
	        $('.OILltt').prepend(data.query.results.quote.LastTradeTime);
	        $('.OILc').prepend(data.query.results.quote.PercentChange);
	    })
	        .fail(function (jqxhr, textStatus, error) {
	        $('.OILl').prepend('Err!!! ');
	    });		    
	    
	    var url = "http://query.yahooapis.com/v1/public/yql";
	    var data = encodeURIComponent("select * from yahoo.finance.quotes where symbol in ('NGK15.NYM')");
	
	    $.getJSON(url, 'q=' + data + "&format=json&diagnostics=true&env=http://datatables.org/alltables.env")
	        .done(function (data) {
	        $('.NATGASl').prepend(data.query.results.quote.LastTradePriceOnly);
	        $('.NATGASltt').prepend(data.query.results.quote.LastTradeTime);
	        $('.NATGASc').prepend(data.query.results.quote.PercentChange);
	    })
	        .fail(function (jqxhr, textStatus, error) {
	        $('.NATGASl').prepend('Err!!! ');
	    });
		
		});
});