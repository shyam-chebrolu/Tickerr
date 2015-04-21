/**
 * 
 */

StorageService = function() {

  this.supported = function(handler) {
    try {
      return 'localStorage' in window && window['localStorage'] !== null;
    } catch(e) {
      return false;
    }
  };
  
  this.setObject = function(name, value) {
	  localStorage.setItem(name, JSON.stringify(value));
  };
  
  this.getObject = function(name) {
	  if (localStorage.getItem(name)) {
		  return JSON.parse(localStorage.getItem(name));  
	  }
	  console.log("Data not found for " + name);
	  return {};
  };
  
  this.setValue =  function(name, value) {
	  localStorage.setItem(name, value);
  };
  
  this.getValue = function(name) {
	  return localStorage.getItem(name);
  };
  
};
