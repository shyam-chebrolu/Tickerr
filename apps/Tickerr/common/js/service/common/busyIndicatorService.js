BusyIndicatorService = function() {
	this._counter = 0;
	this._busyIndicator = new WL.BusyIndicator(null, {
	        text: "Please wait..",
	        fullScreen: false,
	        bounceAnimation: false,
	        opacity:0
	    });
};

BusyIndicatorService.prototype.show = function() {
	if(!this._busyIndicator.isVisible()) {
		this._busyIndicator.show();	
	}
	this._counter +=1;
};

BusyIndicatorService.prototype.hide = function(force) {
	if (force === true){
		this._counter = 0;
	} else {
		this._counter -=1;	
	}
	
	if (this._counter <= 0) {
		this._busyIndicator.hide();
	}
};