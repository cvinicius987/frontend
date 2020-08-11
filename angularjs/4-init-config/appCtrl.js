(function() {
    
	
	angular.module("app", []);
	
	angular.module("app").value("appConfig", {"url":"http://localhost/", "gmt": -3, "format": "dd/MM/yyyy HH:mm:ss"});
	 
	 angular.element(document).ready(function() {
         angular.bootstrap(document, ["app"]);
     });
	 
	
	angular.module("app").controller("appCtrl", appCtrl);
	
	appCtrl.$inject = ["appConfig"];

	 function appCtrl(appConfig){
		
    	var self = this;
    	
    	self.url 	= appConfig.url;
    	self.gmt 	= appConfig.gmt;
    	self.format = appConfig.format;
	 };
  
})();