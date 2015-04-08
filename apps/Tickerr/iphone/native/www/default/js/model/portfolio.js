
/* JavaScript content from js/model/portfolio.js in folder common */
/**
 * 
 */
Portfolio = function () {
	this.name = null;
	this.tickers = [];
}

Portfolio.prototype.getName = function () {
	return this.name;
}

Portfolio.prototype.setName = function (value) {
	this.name = value;
}

Portfolio.prototype.getTickers = function () {
	return this.tickers;
}

Portfolio.prototype.setTickers = function (value) {
	this.tickers = value;
}


