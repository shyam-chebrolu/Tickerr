/**
 * 
 */
theApp.controller('HistoryController',function($scope, $ionicSideMenuDelegate, $ionicModal) {
	
	 $(document).ready(function(){

		var url = 'http://query.yahooapis.com/v1/public/yql';
		var startDate = '2015-01-01';
		var endDate = '2015-01-31';
		var data = encodeURIComponent('select * from yahoo.finance.historicaldata where symbol in ("MSFT") and startDate = "' + startDate + '" and endDate = "' + endDate + '"');
		$.getJSON(url, 'q=' + data + "&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=")
		.done(function (data) {

			var datastring ="<div>";
			datastring += "<div class='row'>"; 	
			datastring += "<div class='col text-small-medium text-gray'><i>Date</i></div>";
			datastring += "<div class='col text-small-medium text-gray'><i>High</i></div>";
			datastring += "<div class='col text-small-medium text-gray'><i>Low</i></div>";
			datastring += "<div class='col text-small-medium text-gray'><i>Volume</i></div>";
			datastring += "</div>";
			for (i = 0; i < data.query.results.quote.length; i++) { 
				datastring += "<div class='row'>"; 	
				datastring += "<div class='col text-small-medium text-gray'><i>" + data.query.results.quote[i].Date + "</i></div>";
				datastring += "<div class='col text-small-medium text-gray'><i>" + data.query.results.quote[i].High + "</i></div>";
				datastring += "<div class='col text-small-medium text-gray'><i>" + data.query.results.quote[i].Low + "</i></div>";
				datastring += "<div class='col text-small-medium text-gray'><i>" + data.query.results.quote[i].Volume/1000000 + "M</i></div>";
				datastring += "</div>";
			}
			datastring += "</div>";
	        $('.HistoryData').prepend(datastring);
	      })
	        .fail(function (jqxhr, textStatus, error) {
			$('.HistoryData').prepend("Err!!!");
	    });		
			
	 });
	
});
