
/* JavaScript content from js/services/cacheService.js in folder common */
/**
 * Implementation of Cache Service
 * @param base64Service
 * @param $rootScope
 * @returns
 */
CacheService = function(base64Service, $rootScope) {
	this._base64Service = base64Service;
	this._$rootScope = $rootScope;
	this._appLevelCache = null;
	this._portfolioLevelCache = null;
		
	this.init();
};

/**
 * Stores any data (ex: service response) Cache 
 * @param cacheType {application/portfolio}
 * @param keyObj {Cache key is derived from this param. It can be a string literal}
 * @param data {object}
 * @returns {Boolean}
 */
CacheService.prototype.put = function(cacheType, keyObj, data) {
	var cache = this._getCache(cacheType);
	if (cache) {
		cache[this._createCacheKey(keyObj)] = data;
		return true;
	}
	
	return false;
};

/**
 * Returns Cached data for requested Service
 * 
 * @param cacheType {application/portfolio}
 * @param keyObj {Cache key is derived from this param. It can be a string literal}
 * @returns
 */
CacheService.prototype.get = function(cacheType, keyObj) {
	var cache = this._getCache(cacheType);
	return cache[this._createCacheKey(keyObj)];
};

/**
 * Removes Cached data for particular Key
 * 
 * @param cacheType {application/portfolio}
 * @param keyObj {Cache key is derived from this param. It can be a string literal}
 * @returns {Boolean}
 */
CacheService.prototype.remove = function(cacheType, keyObj) {
	var cache = this._getCache(cacheType);
	var cacheKey = this._createCacheKey(keyObj);
	if (cache && cache[cacheKey]) {
		delete cache[cacheKey];
		return true;
	}
	
	return false;
};

/**
 * Verifies if cached data exists for particular serviceRq
 * 
 * @param cacheType {application/portfolio}
 * @param keyObj {Cache key is derived from this param. It can be a string literal}
 * @returns {Boolean}
 */
CacheService.prototype.contains = function(cacheType, keyObj) {
	var cache = this._getCache(cacheType);
	var cacheKey = this._createCacheKey(keyObj);
	return (cache && cache[cacheKey]);
};

/**
 * Checks for existence of cache object, If not exists creates an object and stores into it or 
 * if cache object exists then directly stores into it
 * 
 * @param cacheType {application/portfolio}
 * @param keyObj {Cache key is derived from this param. It can be a string literal}
 */
CacheService.prototype._getCache = function(cacheType, keyObj) {
	if (cacheType === AppConstants.CACHE_APP_LEVEL) {
		return _appLevelCache;
	} else if (cacheType === AppConstants.CACHE_PORTFOLIO_LEVEL) {
		return _portfolioLevelCache;
	}
	return null;
	
};

/**
 * Creates A unique key from keyObj to store data
 * @param keyObj {Cache key is derived from this param. It can be a string literal}
 */
CacheService.prototype._createCacheKey = function(keyObj) {
	return keyObj;
	//return this._base64Service.encode(path + '|' + urlParams + '|' + optUrlParams);
};

/**
 * Initiating variables and functions
 */
CacheService.prototype.init = function() {
	this._initAppLevelRootCache();
	this._initPortfolioLevelRootCache();
	
	this._$rootScope.$on(AppEvents.PORTFOLIO_CHANGED, angular.bind(this, this._handlePortfolioChange));
};

/**
 * Listener method for Portfolio changes
 * If Portfolio is changed/deleted then clears the cache data
 * @param changeState
 */
CacheService.prototype._handlePortfolioChange = function(changeState) {
	if (changeState && changeState['closed']) {
		var portfolio = changeState['closed'];
		if (portfolio && this._portfolioLevelRootCache[portfolio]) {
			delete this._portfolioLevelRootCache[portfolio];
		}
	}
};

/**
 * Creating portfolio scope level Cache object
 */
CacheService.prototype._initPortfolioLevelRootCache = function() {
	this._portfolioLevelRootCache = {};	
};

/**
 * Creating application level Cache object
 */
CacheService.prototype._initAppLevelRootCache = function() {
	this._appLevelRootCache = {};	
};
 