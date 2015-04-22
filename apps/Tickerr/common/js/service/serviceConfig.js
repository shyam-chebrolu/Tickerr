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

		QUOTE_NEWS: {
			Url: "https://ajax.googleapis.com/ajax/services/feed/find?v=1.0&q={0}",
			Operation: "GET"
		}
		
		
}