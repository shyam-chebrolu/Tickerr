
/* JavaScript content from js/services/dataStashService.js in folder common */
/**
** It is a single property cache, mainly used to hand over the data between pages during page transition or modal popup to parent page
*/
DataStashService = function(){
	 var data = null;

     return {
         getData: function () {
             return data;
         },
         setData: function(value) {
             property = value;
         },
         reset: function(){
        	 data = null;
         }
     };
};