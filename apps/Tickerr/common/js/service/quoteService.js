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
	
	//Invoke the Finanace Web service  
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
 * Returns latest figures from Google/Yahoo finance web service.
 *  
 * @param requestParams - It can be a single Ticker or an array of symbols
 * @returns
 */
QuoteService.prototype.getQuotes = function(requestParams) {
	var self = this;
	var deferred = self._$q.defer();

	this._getQuotes(allSymbols).then(function(data) {
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
