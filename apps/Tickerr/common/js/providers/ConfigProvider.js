ConfigProvider = function($q, preferencesProvider) {
	this._init = false;
	this._$q = $q;
    this._tickerServiceUrl = "http://finance.google.com/q";
	this._devMode = true;
};

ConfigProvider.prototype.init = function() {
	var self = this;
	var defer = self._$q.defer();
	
	if (self._init === false) {
//		var env = WL.Client.getEnvironment();
//		var promises = new Array();
//		self._$q.all(promises).then(function() {
//			defer.resolve();
//			self._init = true;
//		});
	
		defer.resolve();
		self._init = true;
	} else {
		defer.resolve();
	}
	
	return defer;
};

ConfigProvider.prototype.getTickerServiceUrl = function() {
    return this._tickerServiceUrl;
};

ConfigProvider.prototype.isDevMode = function() {
    return this._devMode;
};
