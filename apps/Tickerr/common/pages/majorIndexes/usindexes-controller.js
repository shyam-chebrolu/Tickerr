/**
 * 
 */
theApp.controller('UsIndexesController',function($scope, $ionicSideMenuDelegate, $ionicModal) {
	
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
		
		$.getJSON('https://finance.google.com/finance/info?client=ig&q=INDEXNASDAQ:NDX&callback=?',function(response){

			var stockInfo = response[0];

			$('.NDXl').prepend(stockInfo.l);
			$('.NDXc').prepend(stockInfo.c);
			$('.NDXltt').prepend(stockInfo.ltt);

			});
		
		$.getJSON('https://finance.google.com/finance/info?client=ig&q=INDEXSP:SP100&callback=?',function(response){

			var stockInfo = response[0];

			$('.SP100l').prepend(stockInfo.l);
			$('.SP100c').prepend(stockInfo.c);
			$('.SP100ltt').prepend(stockInfo.ltt);

			});
		
		$.getJSON('https://finance.google.com/finance/info?client=ig&q=INDEXRUSSELL:RUT&callback=?',function(response){

			var stockInfo = response[0];

			$('.RUTl').prepend(stockInfo.l);
			$('.RUTc').prepend(stockInfo.c);
			$('.RUTltt').prepend(stockInfo.ltt);

			});
		
		$.getJSON('https://finance.google.com/finance/info?client=ig&q=INDEXRUSSELL:RUI&callback=?',function(response){

			var stockInfo = response[0];

			$('.RUIl').prepend(stockInfo.l);
			$('.RUIc').prepend(stockInfo.c);
			$('.RUIltt').prepend(stockInfo.ltt);

			});
		
		$.getJSON('https://finance.google.com/finance/info?client=ig&q=INDEXNYSEGIS:NYA&callback=?',function(response){

			var stockInfo = response[0];

			$('.NYAl').prepend(stockInfo.l);
			$('.NYAc').prepend(stockInfo.c);
			$('.NYAltt').prepend(stockInfo.ltt);

			});
		
		});
	
});
