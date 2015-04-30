/**
 * Service object responsible to make calls to source service.
 * Currently the calls are made to Google Finance Web service. 
 * If there is a need to switch to Yahoo Web service or some other service, the changes are limited to this class. 
 * 
 * @param $q
 * @param backendService
 * @returns
 */
QuoteService = function($q, backendService) {
	this._$q = $q;
	this._backendService = backendService;
};

/**
 * Returns Majo Index Symbols Map
 * 
 * @returns Map of Major Indexes
 */
QuoteService.prototype._getMajorIndexSymbolMap = function() {
	return {
		"INDEXDJX:.DJI": {
			"name": "DOW",
			"country": "us"
		},
		"INDEXSP:.INX": {
			"name": "S&P",
			"country": "us"
		},
		"INDEXNASDAQ:.IXIC": {
			"name": "NASDAQ",
			"country": "us"
		},
		"INDEXFTSE:UKX": {
			"name": "UK",
			"country": "gb"
		},
		"INDEXEURO:PX1": {
			"name": "Paris",
			"country": "fr"
		},
		"INDEXDB:DAX": {
			"name": "German",
			"country": "de"
		},
		"INDEXBOM:SENSEX": {
			"name": "India",
			"country": "in"
		},
		"INDEXNIKKEI:NI225": {
			"name": "Japan",
			"country": "jp"
		},
		"SHA:000001": {
			"name":"China",
			"country": "cn"
		}
	};
};

/**
 * Returns latest figures for Major Indexes
 * 
 * @returns
 */
QuoteService.prototype.getMajorIndexes = function() {
	var self = this;
	var deferred = self._$q.defer();
	
	//Declare the different categories of indexes
	var symbolsUS =["INDEXDJX:.DJI", "INDEXSP:.INX", "INDEXNASDAQ:.IXIC"];
	var symbolsEurope = ["INDEXFTSE:UKX", "INDEXEURO:PX1", "INDEXDB:DAX"];
	var symbolsAsia = ["INDEXBOM:SENSEX", "INDEXNIKKEI:NI225", "SHA:000001"];
	
	//Merge them into a single array
	var allSymbols = symbolsUS.concat(symbolsEurope).concat(symbolsAsia);
	
	//Invoke the Finance Web service  
	this._getQuotes(allSymbols).then(function(data) {
		
										//Declare result object
										var result = {
												"US": [],
												"Europe": [],
												"Asia": []
										};
										
										//Check whether service returned any data
										if (data) {
											var symbolMap = self._getMajorIndexSymbolMap();
											
											//Iterate through list of quotes from response data
											$.each(data, function(index, quote) {

												/**
												 * Below logic is specific Google Finance Web service.
												 * If we switch to Yahoo or some other web service, below code block 
												 * needs to be updated accordingly
												 * 
												 */
												
												//Prepare the key and look it up in the symbol map 
												var key = quote["e"] + ":" + quote["t"];
												var symbol = symbolMap[key];
												
												//Clone the symbol object to return 
												var item = $.extend({}, symbol);
												
												//Map price/change/updatedDate from response
												item = $.extend({
													"price": quote["l"],
													"change": quote["c"],
													"lastUpdated": quote["ltt"]
												}, item);
												
												//Check the key in symbol map and add it to result array
												if (symbolsUS.indexOf(key) >= 0) {
													result["US"].push(item);
												} else if (symbolsEurope.indexOf(key) >= 0) {
													result["Europe"].push(item);
												} else if (symbolsAsia.indexOf(key) >= 0) {
													result["Asia"].push(item);
												}
											});
										}
										
										//return the result to caller i.e. controller
										return deferred.resolve(result);	
									}, function(error) {
											console.log("Failed to retrieve Major Index, " + error);
									});
	
	return deferred.promise;
};

/**
 * Returns US Index Symbols Map
 * 
 * @returns Map of US Indexes
 */
QuoteService.prototype._getUsIndexSymbolMap = function() {
	return {
		"INDEXDJX:.DJI": {
			"name": "DOW",
			"country": "us"
		},
		"INDEXSP:.INX": {
			"name": "S&P",
			"country": "us"
		},
		"INDEXNASDAQ:.IXIC": {
			"name": "NASDAQ",
			"country": "us"
		},
		"INDEXRUSSELL:RUT": {
			"name": "RUS2K",
			"country": "us"
		},
		"INDEXSP:SP100": {
			"name": "S&P100",
			"country": "us"
		},
		"INDEXNASDAQ:NDX": {
			"name": "NDAQ100",
			"country": "us"
		},
		"INDEXRUSSELL:RUI": {
			"name": "RUS1K",
			"country": "us"
		},
		"INDEXNYSEGIS:NYA": {
			"name": "NYSE COMP",
			"country": "us"
		},
		"INDEXCBOE:VIX": {
			"name":"VIX",
			"country": "us"
		}
	};
};

/**
 * Returns latest figures for US Indexes
 * 
 * @returns
 */
QuoteService.prototype.getUsIndexes = function() {
	var self = this;
	var deferred = self._$q.defer();
	
	//Declare the different categories of indexes
	var symbolsUS =["INDEXDJX:.DJI", "INDEXSP:.INX", "INDEXNASDAQ:.IXIC"];
	var symbolsOther = ["INDEXRUSSELL:RUT", "INDEXSP:SP100", "INDEXNASDAQ:NDX", "INDEXRUSSELL:RUI", "INDEXNYSEGIS:NYA", "INDEXCBOE:VIX"];
	
	//Merge them into a single array
	var allSymbols = symbolsUS.concat(symbolsOther);
	
	//Invoke the Finance Web service  
	this._getQuotes(allSymbols).then(function(data) {
		
										//Declare result object
										var result = {
												"US": [],
												"Other": []
										};
										
										//Check whether service returned any data
										if (data) {
											var symbolMap = self._getUsIndexSymbolMap();
											
											//Iterate through list of quotes from response data
											$.each(data, function(index, quote) {

												/**
												 * Below logic is specific Google Finance Web service.
												 * If we switch to Yahoo or some other web service, below code block 
												 * needs to be updated accordingly
												 * 
												 */
												
												//Prepare the key and look it up in the symbol map 
												var key = quote["e"] + ":" + quote["t"];
												var symbol = symbolMap[key];
												
												//Clone the symbol object to return 
												var item = $.extend({}, symbol);
												
												//Map price/change/updatedDate from response
												item = $.extend({
													"price": quote["l"],
													"change": quote["c"],
													"lastUpdated": quote["ltt"]
												}, item);
												
												//Check the key in symbol map and add it to result array
												if (symbolsUS.indexOf(key) >= 0) {
													result["US"].push(item);
												} else if (symbolsOther.indexOf(key) >= 0) {
													result["Other"].push(item);
												}
											});
										}
										
										//return the result to caller i.e. controller
										return deferred.resolve(result);	
									}, function(error) {
											console.log("Failed to retrieve US Indexes, " + error);
									});
	
	return deferred.promise;
};

/**
 * Returns Portfolio Symbols Map
 * 
 * @returns Map of Portfolio
 */
QuoteService.prototype._getPortfolioSymbolMap = function() {
	return {
		"NASDAQ:AAPL": {
			"name": "AAPL",
			"country": "us",
            "desc": "Apple Inc"
		},
		"NASDAQ:MSFT": {
			"name": "MSFT",
			"country": "us",
            "desc": "Microsoft Inc"
		},
		"NASDAQ:GOOG": {
			"name": "GOOG",
			"country": "us",
            "desc": "Google Inc"
		},
		"NASDAQ:CSCO": {
			"name": "CSCO",
			"country": "us",
            "desc": "Cisco Inc"
		},
		"NYSE:MCD": {
			"name": "MCD",
			"country": "us",
            "desc": "McDonalds Inc"
		},
		"NYSE:ORCL": {
			"name": "ORCL",
			"country": "us",
            "desc": "Oracle Inc"
		},
		"NASDAQ:INTL": {
			"name": "INTL",
			"country": "us",
            "desc": "Intel Inc"
		},
		"NASDAQ:YHOO": {
			"name": "YHOO",
			"country": "us",
            "desc": "Yahoo Inc"
		},
		"NASDAQ:FB": {
			"name":"FB",
			"country": "us",
            "desc": "Facebook Inc"
		},
		"NYSE:BAC": {
			"name": "BAC",
			"country": "us",
            "desc": "Bank Of America"
		}
	};
};

/**
 * Returns latest figures for Portfolio
 * 
 * @returns
 */
QuoteService.prototype.getPortfolio = function() {
	var self = this;
	var deferred = self._$q.defer();
	
	//Declare the different categories of indexes
	var symbolsPortfolio =["NASDAQ:AAPL", "NASDAQ:MSFT", "NASDAQ:GOOG", "NASDAQ:CSCO", "NYSE:MCD", "NYSE:ORCL", "NASDAQ:INTL", "NASDAQ:YHOO", "NASDAQ:FB"];
	
	//Merge them into a single array
	var allSymbols = symbolsPortfolio;
	
	//Invoke the Finance Web service  
	this._getQuotes(allSymbols).then(function(data) {
		
										//Declare result object
										var result = {
												"Portfolio1": []
										};
										
										//Check whether service returned any data
										if (data) {
											var symbolMap = self._getPortfolioSymbolMap();
											
											//Iterate through list of quotes from response data
											$.each(data, function(index, quote) {

												/**
												 * Below logic is specific Google Finance Web service.
												 * If we switch to Yahoo or some other web service, below code block 
												 * needs to be updated accordingly
												 * 
												 */
												
												//Prepare the key and look it up in the symbol map 
												var key = quote["e"] + ":" + quote["t"];
												var symbol = symbolMap[key];
												
												//Clone the symbol object to return 
												var item = $.extend({}, symbol);
												
												//Map price/change/updatedDate from response
												item = $.extend({
													"price": quote["l"],
													"change": quote["c"],
													"lastUpdated": quote["ltt"]
												}, item);
												
												//Check the key in symbol map and add it to result array
												if (symbolsPortfolio.indexOf(key) >= 0) {
													result["Portfolio1"].push(item);
												} 
											});
										}
										
										//return the result to caller i.e. controller
										return deferred.resolve(result);	
									}, function(error) {
											console.log("Failed to retrieve Portfolio1, " + error);
									});
	
	return deferred.promise;
};

/**
 * Returns latest figures for Portfolio
 * 
 * @returns
 */
QuoteService.prototype.getPortfolio3 = function() {
	var self = this;
	var deferred = self._$q.defer();
	
	//Declare the different categories of indexes
	var symbolsPortfolio =["NYSE:BAC", "NASDAQ:MSFT", "NASDAQ:GOOG", "NASDAQ:CSCO", "NYSE:MCD"];
	
	//Merge them into a single array
	var allSymbols = symbolsPortfolio;
	
	//Invoke the Finance Web service  
	this._getQuotes(allSymbols).then(function(data) {
		
										//Declare result object
										var result = {
												"Portfolio3": []
										};
										
										//Check whether service returned any data
										if (data) {
											var symbolMap = self._getPortfolioSymbolMap();
											
											//Iterate through list of quotes from response data
											$.each(data, function(index, quote) {

												/**
												 * Below logic is specific Google Finance Web service.
												 * If we switch to Yahoo or some other web service, below code block 
												 * needs to be updated accordingly
												 * 
												 */
												
												//Prepare the key and look it up in the symbol map 
												var key = quote["e"] + ":" + quote["t"];
												var symbol = symbolMap[key];
												
												//Clone the symbol object to return 
												var item = $.extend({}, symbol);
												
												//Map price/change/updatedDate from response
												item = $.extend({
													"price": quote["l"],
													"change": quote["c"],
													"lastUpdated": quote["ltt"]
												}, item);
												
												//Check the key in symbol map and add it to result array
												if (symbolsPortfolio.indexOf(key) >= 0) {
													result["Portfolio3"].push(item);
												} 
											});
										}
										
										//return the result to caller i.e. controller
										return deferred.resolve(result);	
									}, function(error) {
											console.log("Failed to retrieve Portfolio3, " + error);
									});
	
	return deferred.promise;
};
///**
// * Returns latest figures for Ticker
// * 
// * @returns
// */
//QuoteService.prototype.getTicker = function(requestTicker) {
//	var self = this;
//	var deferred = self._$q.defer();
//	
//	//Declare the different categories of indexes
//	var symbolsTicker =[requestTicker];
//	
//	//Merge them into a single array
//	var allSymbols = symbolsTicker;
//	
//	//Invoke the Finance Web service  
//	this._getQuotes(requestTicker).then(function(data) {
//		
//										//Declare result object
//										var result = {
//												"Quote": []
//										};
//										
//										//Check whether service returned any data
//										if (data) {
//											var symbolMap = {requestTicker: {
//													"name": requestTicker,
//													"country": "us",
//										            "desc": "Whatever"
//												}};
//											
//											//Iterate through list of quotes from response data
//											$.each(data, function(index, quote) {
//
//												/**
//												 * Below logic is specific Google Finance Web service.
//												 * If we switch to Yahoo or some other web service, below code block 
//												 * needs to be updated accordingly
//												 * 
//												 */
//												
//												//Prepare the key and look it up in the symbol map 
//												var key = quote["t"];
//												var symbol = symbolMap[key];
//												
//												//Clone the symbol object to return 
//												var item = $.extend({}, symbol);
//												
//												//Map price/change/updatedDate from response
//												item = $.extend({
//													"price": quote["l"],
//													"change": quote["c"],
//													"lastUpdated": quote["ltt"]
//												}, item);
//												
//												//Check the key in symbol map and add it to result array
//												if (symbolsTicker.indexOf(key) >= 0) {
//													result["Quote"].push(item);
//												} 
//											});
//										}
//										
//										//return the result to caller i.e. controller
//										return deferred.resolve(result);	
//									}, function(error) {
//											console.log("Failed to retrieve Ticker, " + error);
//									});
//	
//	return deferred.promise;
//};

/**
 * Returns Currency Symbols Map
 * 
 * @returns Map of Currencies
 */
QuoteService.prototype._getCurrencySymbolMap = function() {
	return {
		"USDEUR=X": {
			"name": "USDEUR",
			"country": "us"
		},
		"USDGBP=X": {
			"name": "USDGBP",
			"country": "gb"
		},
		"USDCAD=X": {
			"name": "USDCAD",
			"country": "us"
		},
		"USDJPY=X": {
			"name": "USDJPY",
			"country": "jp"
		},
		"USDRUB=X": {
			"name": "USDRUB",
			"country": "us"
		},
		"USDCNH=X": {
			"name": "USDCNH",
			"country": "cn"
		},
		"USDINR=X": {
			"name": "USDINR",
			"country": "in"
		},
		"USDAUD=X": {
			"name": "USDAUD",
			"country": "us"
		},
		"EURJPY=X": {
			"name":"EURJPY",
			"country": "jp"
		}
	};
};

/**
 * Returns latest figures for Currencies
 * 
 * @returns
 */
QuoteService.prototype.getCurrencies = function() {
	var self = this;
	var deferred = self._$q.defer();
	
	//Declare the different categories of indexes
	var symbolsCurr =["USDEUR=X", "USDGBP=X", "USDCAD=X", "USDJPY=X", "USDRUB=X", "USDCNH=X", "USDINR=X", "USDAUD=X", "EURJPY=X"];
	
	//Merge them into a single array
	var allSymbols = symbolsCurr;
	
	//Invoke the Finance Web service  
	this._getQuotes2(allSymbols).then(function(data) {
		
										//Declare result object
										var result = {
												"Major": []
										};
										
										//Check whether service returned any data
										if (data) {
											var symbolMap = self._getCurrencySymbolMap();
											
											//Iterate through list of quotes from response data
											$.each(data["query"]["results"]["quote"], function(index, quote) {

												/**
												 * Below logic is specific Google Finance Web service.
												 * If we switch to Yahoo or some other web service, below code block 
												 * needs to be updated accordingly
												 * 
												 */
												
												//Prepare the key and look it up in the symbol map 
												var key = quote["symbol"];
												var symbol = symbolMap[key];
												
												//Clone the symbol object to return 
												var item = $.extend({}, symbol);
												
												//Map price/change/updatedDate from response
												item = $.extend({
													"price": quote["Ask"],
													"change": quote["Change"],
													"lastUpdated": quote["LastTradeDate"]
												}, item);
												
												//Check the key in symbol map and add it to result array
												if (symbolsCurr.indexOf(key) >= 0) {
													result["Major"].push(item);
												}
											});
										}
										
										//return the result to caller i.e. controller
										return deferred.resolve(result);	
									}, function(error) {
											console.log("Failed to retrieve Currencies, " + error);
									});
	
	return deferred.promise;
};


/**
 * Returns latest figures from Google/Yahoo finance web service.
 *  
 * @param requestParams - It can be a single Ticker or an array of symbols
 * @returns
 */
QuoteService.prototype.getQuotes = function(requestParams) {
	var self = this;
	var deferred = self._$q.defer();

	this._getQuotes(requestParams).then(function(data) {
		var result = [];
		
		if (data) {
			//Iterate through list of quotes from response data
			$.each(data, function(index, quote) {

				//Map price/change/updatedDate from response
				var item = {
					"name": quote["t"],
					"price": quote["l"],
					"change": quote["c"],
					"lastUpdated": quote["ltt"]
				};
				result.push(item);
			});
			
			//return the result to caller i.e. controller
			return deferred.resolve(result);	
		}
	});
	
	return deferred.promise;
};

/***
 * Internal function/method. Not to be invoked from external scripts
 * 
 * Returns latest figures from Google/Yahoo finance web service.
 *  
 * @param requestParams - It can be a single Ticker or an array of symbols
 * @returns
 */
QuoteService.prototype._getQuotes = function(requestParams) {
	var urlParams = requestParams;
	if (requestParams instanceof Array) {
		urlParams = requestParams.join(",");
	}
	
	var request = {
			'serviceDef' : ServiceConfig.QUOTE_PRICES,
			'queryParams' : urlParams
	};
	
	return this._backendService.invokeService(request);
};

/**
 * Returns latest figures from Google/Yahoo finance web service.
 *  
 * @param requestParams - It can be a single Ticker or an array of symbols
 * @returns
 */
QuoteService.prototype.getQuotes2 = function(requestParams) {
	var self = this;
	var deferred = self._$q.defer();

	this._getQuotes2(allSymbols).then(function(data) {
		var result = [];
		
		if (data) {
			//Iterate through list of quotes from response data
			$.each(data, function(index, quote) {

				//Map price/change/updatedDate from response
				var item = {
					"price": quote["l"],
					"change": quote["c"],
					"lastUpdated": quote["ltt"]
				};
				result.push(item);
			});
			
			//return the result to caller i.e. controller
			return deferred.resolve(result);	
		}
	});
	
	return deferred.promise;
};

/***
 * Internal function/method. Not to be invoked from external scripts
 * 
 * Returns latest figures from Google/Yahoo finance web service.
 *  
 * @param requestParams - It can be a single Ticker or an array of symbols
 * @returns
 */
QuoteService.prototype._getQuotes2 = function(requestParams) {
	var urlParams = requestParams;
	if (requestParams instanceof Array) {
		urlParams = requestParams.join(",");
	}
	
	var request = {
			'serviceDef' : ServiceConfig.QUOTE_PRICES2,
			'queryParams' : urlParams
	};
	
	return this._backendService.invokeService(request);
};

/*
 * Returns News for Ticker Symbol passed
 * 
 * @returns
 */
QuoteService.prototype.getTickerNews = function(requestParams) {
	var self = this;
	var deferred = self._$q.defer();
			
	var request = {
	'serviceDef' : ServiceConfig.QUOTE_NEWS,
	'queryParams' : requestParams
	};
	
	return this._backendService.invokeService(request);
};

