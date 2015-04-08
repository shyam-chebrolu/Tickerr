
/* JavaScript content from js/services/portfolioService.js in folder common */
/**
 * Implementation of portfolio Session service
 * 
 * @param $rootScope
 * @param cacheService
 * @returns
 */
PortfolioService = function($rootScope, cacheService) {
	this._rootScope = $rootScope;
	this._cacheService = cacheService;

	this.portfolios = null;
	this.current = null;
	this.reset();
};

/**
 * Loads current portfolio into portfolios object
 * @param portfolio
 */
PortfolioService.prototype.load = function(portfolio) {
	if (portfolio) {
		var pName = portfolio.getName();
		if (pName) {
			this.portfolios[pName] = portfolio;
		}
		
		this.current = portfolio;
		this.broadcastPortfolioChange();
	}
};

/**
 * Update Portfolio Profile
 * @param portfolio -- portfolio object
 */
PortfolioService.prototype.update = function(portfolio) {
	this.load(portfolio)
};

/**
 * Removes current portfolio from portfolios object
 * @param portfolio -- can be portfolio object or portfolio ID
 */
PortfolioService.prototype.remove = function(portfolio) {
	if (portfolio) {
		var pName = portfolio.getName();
		if (pName && this.portfolios[pName]) {
			delete this.portfolios[pName];
			
			if (this.current && this.current.getName() == pName) {
				this.current = null;
			}
			this.broadcastPortfolioChange({'removed': portfolio});
		}
	}
};
/**
 * portfolio if available in session  or   null if portfolio is not in session
 * @param portfolio -- can be portfolio object or portfolio ID
 * @returns portfolio   
 */
PortfolioService.prototype.getPortfolio = function(portfolio) {
	if (portfolio) {
		var pName = null;
		if (portfolio instanceof Portfolio) {
			pName = portfolio.getName();
		} else {
			pName = portfolio;
		}

		if (pName && this.portfolios[pName] ) {
			return this.portfolios[pName];
		}
	}
	return null;
};

/**
 * Returns currently active portfolio object
 * @returns
 */
PortfolioService.prototype.getCurrentportfolio = function() {
	return this.current;
};

/**
 * Sets the portfolio as current portfolio. portfolio must have been loaded into session already.
 * @param portfolio -- portfolio object or portfolio ID
 */
PortfolioService.prototype.setCurrentportfolio = function(portfolio) {
	if (portfolio) {
		var pName = null;
		if (portfolio instanceof Portfolio) {
			pName = portfolio.getName();
		} else {
			pName = portfolio;
		}

		if (pName && this.portfolios[pName] ) {
			this.current = this.portfolios[pName];
			this.broadcastPortfolioChange();
		}
	}
};



/**
 * Resets controller variables
 */
PortfolioService.prototype.reset = function() {
	this.portfolios = {};
	this.current = null;
};


/**
 * Broadcasts change event on application level
 * @param changeStatus
 */
PortfolioService.prototype.broadcastPortfolioChange = function(changeStatus){
	this._rootScope.$broadcast(AppEvents.PORTFOLIO_CHANGED, changeStatus);
};


/**
 * Broadcasts refresh change event on application level
 * @param changeStatus
 */
PortfolioService.prototype.broadcastRefreshPortfolioChange = function(){
	this._rootScope.$broadcast(AppEvents.portfolio_SESSION_REFRESHED);
};