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
		}
		
}