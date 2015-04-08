
/* JavaScript content from pages/majorIndexes/majorIndexes-controller.js in folder common */
/**
 * 
 */
theApp.controller('IndexesController',function($scope, $ionicSideMenuDelegate, $ionicModal) {
	
	$(document).ready(function(){

		$.getJSON('https://finance.google.com/finance/info?client=ig&q=INDEXDJX:.DJI&callback=?',function(response){

		var stockInfo = response[0];

		$('.DJIl').prepend(stockInfo.l);
		$('.DJIc').prepend(stockInfo.c);
		$('.DJIltt').prepend(stockInfo.ltt);

		});
		
		$.getJSON('https://finance.google.com/finance/info?client=ig&q=INDEXSP:.INX&callback=?',function(response){

			var stockInfo = response[0];
			$('.INXl').prepend(stockInfo.l);
			$('.INXc').prepend(stockInfo.c);
			$('.INXltt').prepend(stockInfo.ltt);

			});
		
		$.getJSON('https://finance.google.com/finance/info?client=ig&q=INDEXNASDAQ:.IXIC&callback=?',function(response){

			var stockInfo = response[0];

			$('.IXICl').prepend(stockInfo.l);
			$('.IXICc').prepend(stockInfo.c);
			$('.IXICltt').prepend(stockInfo.ltt);

			});
		
		$.getJSON('https://finance.google.com/finance/info?client=ig&q=INDEXFTSE:UKX&callback=?',function(response){

			var stockInfo = response[0];

			$('.UKXl').prepend(stockInfo.l);
			$('.UKXc').prepend(stockInfo.c);
			$('.UKXltt').prepend(stockInfo.ltt);

			});
		
		$.getJSON('https://finance.google.com/finance/info?client=ig&q=INDEXEURO:PX1&callback=?',function(response){

			var stockInfo = response[0];

			$('.PX1l').prepend(stockInfo.l);
			$('.PX1c').prepend(stockInfo.c);
			$('.PX1ltt').prepend(stockInfo.ltt);

			});
		
		$.getJSON('https://finance.google.com/finance/info?client=ig&q=INDEXDB:DAX&callback=?',function(response){

			var stockInfo = response[0];

			$('.DAXl').prepend(stockInfo.l);
			$('.DAXc').prepend(stockInfo.c);
			$('.DAXltt').prepend(stockInfo.ltt);

			});
		
		$.getJSON('https://finance.google.com/finance/info?client=ig&q=INDEXBOM:SENSEX&callback=?',function(response){

			var stockInfo = response[0];

			$('.SENSEXl').prepend(stockInfo.l);
			$('.SENSEXc').prepend(stockInfo.c);
			$('.SENSEXltt').prepend(stockInfo.ltt);

			});
		
		$.getJSON('https://finance.google.com/finance/info?client=ig&q=SHA:000001&callback=?',function(response){

			var stockInfo = response[0];

			$('.000001l').prepend(stockInfo.l);
			$('.000001c').prepend(stockInfo.c);
			$('.000001ltt').prepend(stockInfo.ltt);

			});
		
		$.getJSON('https://finance.google.com/finance/info?client=ig&q=INDEXNIKKEI:NI225&callback=?',function(response){

			var stockInfo = response[0];

			$('.NI225l').prepend(stockInfo.l);
			$('.NI225c').prepend(stockInfo.c);
			$('.NI225ltt').prepend(stockInfo.ltt);

			});		
		
		});
	
});
