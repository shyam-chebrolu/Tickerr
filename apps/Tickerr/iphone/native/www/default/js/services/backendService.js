
/* JavaScript content from js/services/backendService.js in folder common */
BackendService = function(config, $log, $http, $q, busyIndicatorService) {
	this._config = config;
	this._logger = $log;
	this._$http = $http;
	this._$q = $q;
	this._busyIndicator = busyIndicatorService;
};

BackendService.prototype.invokeService = function(serviceData) {
	var serviceRq = serviceData.clone();
	var service_data_path = this._applyUrlParameters(serviceRq.getServicePath(), serviceRq.getUrlParams());
	
	serviceRq.setServicePath(service_data_path);

	if (this._config.isDevMode()) {
		/**
		 * In DEV mode, invoke WL adapter to avoid cross-domain restriction
		 */
		return this._invokeWLAdapter(serviceRq);
	} else {
		/**
		 * invoke the service directly from the device
		 */
		return this._invokeDataService(serviceRq);
		
	}
};

BackendService.prototype._invokeWLAdapter = function(request) {
	var self = this;
	var invocationData = {
		adapter : 'ServiceAdapter',
		procedure : 'invokeService',
		parameters : [ request ]
	};

	var deferred = self._$q.defer();
	WL.Client.invokeProcedure(invocationData, {
		onSuccess : function(result) {
			deferred.resolve(result);
		},
		onFailure : function() {
			self._logger.error('service failure:' + serviceData.getServicePath());
			deferred.reject('service failure');
		}
	});

	return deferred.promise;
};

BackendService.prototype._invokeDataService = function(request) {
	var self = this;
	var deferred = self._$q.defer();

	var method = 'GET';
	var data = request.getData();
	if (request.getOperation() != null) {
		method = request.getOperation();
	}
	else if (request.getData() != null) {
		method = 'POST';
	} 

	var responseType = request.getResponseType();
	if (responseType == null) {
		responseType = "json";
	}

	//var credentials = request.getCredentials();
	//var authToken = credentials.getAuthToken();
	var service_url = this._config.getChannelUnitedUrl() + request.getServicePath();
	var service_headers = {
		//'Authorization' : authToken,
		'Content-Type' : 'application/json',
		'Accept' : 'application/json',
	};
	
	var http_request = {
		method : method,
		url : service_url,
		data : data,
		headers : service_headers,
		responseType : responseType
	};
	
	var doHttp = function() {
		var startTime = (new Date()).getTime();
		this._busyIndicator.show();
		self._$http(http_request)
				.success(
					function(data, status, headers, config) {
						self._logger.debug('Service call [{0}] took {1}ms. ', service_url, (new Date().getTime()) - startTime);
						this._busyIndicator.hide();
						deferred.resolve(data, status, headers, config);
				})
				.error(
					function(data, status, headers, config) {
							self._busyIndicator.hide();
							self._logger.error('Error performing request ['+ service_url + ']');
							MB.Notifications.showErrorMessage("Failed to connect to Server. Please check your connection");
						});
	};

	doHttp();

	return deferred.promise;
};
 

BackendService.prototype._applyUrlParameters = function(service_uri, params) {
	var service_uri_result = service_uri;
 	
	if (params == null) {
		return service_uri_result;
	}
	
	 
	if (params instanceof Array){
		for (var i = 0; i < params.length; i++) {
			service_uri_result = service_uri_result.replace("{" + i + "}",
					params[i]);
		}
	} else {
		service_uri_result = service_uri_result.replace("{0}",params);
	}

	this._logger.debug('resulting service uri [' + service_uri_result + ']');

	return service_uri_result;
};