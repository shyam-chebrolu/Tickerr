/**
 * 
 */
theApp.controller('NewsController',function($scope, $ionicSideMenuDelegate, $ionicModal) {
	
	$(document).ready(function(){

		$.getJSON('https://finance.google.com/finance/info?client=ig&q=NYSE:AAPL&callback=?',function(response){

			var stockInfo = response[0];

			$('.AAPLl').prepend(stockInfo.l);
			$('.AAPLc').prepend(stockInfo.c);
			$('.AAPLltt').prepend(stockInfo.ltt);
			$('.AAPLdiv').prepend(stockInfo.div);
			$('.AAPLyld').prepend(stockInfo.yld);

			});
		
		 $.ajax({
			  url      : document.location.protocol + '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=10&callback=?&q=' + encodeURIComponent('http://articlefeeds.nasdaq.com/nasdaq/symbols?symbol=AAPL'),
			  dataType : 'json',
			  success  : function (data) {
			    if (data.responseData.feed && data.responseData.feed.entries) {
			      $.each(data.responseData.feed.entries, function (i, e) {
			    	  $('.StockFeed').prepend("<p><a href='" + e.link + "' target='_blank'>" + e.title + "</a></p><br>");
			      });
			    }
			  }
			});
		
		});
	
});
