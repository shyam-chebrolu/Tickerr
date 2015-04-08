
/* JavaScript content from js/services/services.js in folder common */
theApp
	.service('appConfigProvider', ['$q', ConfigProvider])
	.service('base64Service', [Base64Service])
	.service('dataStashService',[DataStashService])
	.service('busyIndicatorService', [BusyIndicatorService])
	.service('cacheService', ['base64Service', '$rootScope', CacheService])
	.service('portfolioService', ['$rootScope','cacheService', PortfolioService])
	.service('backendService', ['appConfigProvider', '$log', '$http', '$q', 'busyIndicatorService', BackendService])
	.service('storageService', [StorageService]);