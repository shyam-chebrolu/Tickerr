/**
 * 
 */
ServiceConfig = {
//		SERVICE_NAME: {
//			Url: "https://finance.google.com/finance/info?client=ig&q={0}&callback=?",
//			Operation: "GET"/"POST",
//			ResponseType: "JSON"/"XML"
//		},
		QUOTE_PRICES: {
			Url: "https://finance.google.com/finance/info?client=ig&q={0}&callback=?JSON_CALLBACK",
			Operation: "JSONP"
		},		
		QUOTE_PRICES2: {
			Url: "http://query.yahooapis.com/v1/public/yql?q=select * from yahoo.finance.quotes where symbol in ('{0}')&format=json&diagnostics=true&env=http://datatables.org/alltables.env",
			Operation: "GET"
		},

		QUOTE_NEWS: {
			Url: "https://ajax.googleapis.com/ajax/services/feed/find?v=1.0&q={0}",
			Operation: "GET"
		}		
		
}

