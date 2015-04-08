BackendService = function(config, $log, $http, $q, busyIndicatorService) {
	this._config = config;
	this._logger = $log;
	this._$http = $http;
	this._$q = $q;
	this._busyIndicator = busyIndicatorService;
};

BackendService.prototype.invokeService = function(serviceRq) {
	var service_data_path = this._applyUrlParameters(serviceRq["serviceDef"].Url, serviceRq["queryParams"]);
	
	serviceRq["requestPath"] = service_data_path;

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

BackendService.prototype._invokeDataService = function(serviceRq) {
	var self = this;
	var deferred = self._$q.defer();

	var method = 'GET';
	var data = serviceRq["data"];
	if (serviceRq["serviceDef"].Operation) {
		method = serviceRq["serviceDef"].Operation;
	}
	else if (data) {
		method = 'POST';
	} 

	var responseType = serviceRq["serviceDef"].ResponseType;
	if (responseType == null) {
		responseType = "json";
	}

	var service_url = serviceRq["requestPath"];
	var service_headers = {
		'Content-Type' : 'text/html',
		'Accept' : 'text/html',
	};
 
	var http_request = {
			method : method,
			url : service_url,
			data : data,
			headers : service_headers,
			responseType : responseType
		};
		
	//self._$http.defaults.transformResponse.unshift(responseTransform);
	var doHttp = function() {
		var startTime = (new Date()).getTime();
		self._busyIndicator.show();
		self._$http(http_request)
				.success(
					function(data, status, headers, config) {
						self._logger.debug('Service call [{0}] took {1}ms. ', service_url, (new Date().getTime()) - startTime);
						self._busyIndicator.hide();
						deferred.resolve(data, status, headers, config);
				})
				.error(
					function(data, status, headers, config) {
							self._busyIndicator.hide();
							self._logger.error('Error performing request ['+ service_url + ']');
							alert("Failed to connect to Server. Please check your connection");
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