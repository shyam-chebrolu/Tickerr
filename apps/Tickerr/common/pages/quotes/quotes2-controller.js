/**
 * 
 */
theApp.controller('Quotes2Controller',function($scope, $ionicSideMenuDelegate, $ionicModal) {
	
	$(document).ready(function(){

		var url = "http://query.yahooapis.com/v1/public/yql";
	    var data = encodeURIComponent("select * from yahoo.finance.quotes where symbol in ('MSFT')");
	
	    $.getJSON(url, 'q=' + data + "&format=json&diagnostics=true&env=http://datatables.org/alltables.env")
	        .done(function (data) {
	        $('.MSFTl').prepend(data.query.results.quote.LastTradePriceOnly);
	        $('.MSFTltt').prepend(data.query.results.quote.LastTradeTime);
	        $('.MSFTc').prepend(data.query.results.quote.PercentChange);
	        $('.MSFTv').prepend(data.query.results.quote.Volume);
	        $('.MSFThl').prepend(data.query.results.quote.HighLimit);
	        $('.MSFTll').prepend(data.query.results.quote.LowLimit);
	    })
	        .fail(function (jqxhr, textStatus, error) {
	        $('.MSFTl').prepend('Err!!! ');
	    });
		
		 $.ajax({
			  url      : document.location.protocol + '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=10&callback=?&q=' + encodeURIComponent('http://articlefeeds.nasdaq.com/nasdaq/symbols?symbol=MSFT'),
			  dataType : 'json',
			  success  : function (data) {
			    if (data.responseData.feed && data.responseData.feed.entries) {
			      $.each(data.responseData.feed.entries, function (i, e) {
			    	  $('.StockFeed').prepend("<a href='" + e.link + "' target='_blank'>" + e.title + "</a><br><br>");
			      });
			    }
			  }
			});
		 
		
		});		
	
});
