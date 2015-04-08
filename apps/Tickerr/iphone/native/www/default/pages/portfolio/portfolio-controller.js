
/* JavaScript content from pages/portfolio/portfolio-controller.js in folder common */
/**
 * 
 */
theApp.controller('PortfolioController',function($scope, $ionicSideMenuDelegate, $ionicModal) {
	
	$(document).ready(function(){

		$.getJSON('https://finance.google.com/finance/info?client=ig&q=NYSE:AAPL&callback=?',function(response){

		var stockInfo = response[0];

		$('.AAPLl').prepend(stockInfo.l);
		$('.AAPLc').prepend(stockInfo.c);
		$('.AAPLltt').prepend(stockInfo.ltt);

		});
		
		$.getJSON('https://finance.google.com/finance/info?client=ig&q=NYSE:MSFT&callback=?',function(response){

			var stockInfo = response[0];

			$('.MSFTl').prepend(stockInfo.l);
			$('.MSFTc').prepend(stockInfo.c);
			$('.MSFTltt').prepend(stockInfo.ltt);

			});
		
		$.getJSON('https://finance.google.com/finance/info?client=ig&q=NYSE:GOOG&callback=?',function(response){

			var stockInfo = response[0];

			$('.GOOGl').prepend(stockInfo.l);
			$('.GOOGc').prepend(stockInfo.c);
			$('.GOOGltt').prepend(stockInfo.ltt);

			});
		

		});
	
});

