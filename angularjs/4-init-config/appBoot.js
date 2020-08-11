(function() {
    
	angular.module("app", ["ngSanitize"]);
	
	/**
	 * Recupera o módulo $http para efetuar a requisição ao resource
	 * onde os dados de configuração estão armazenados
	 */
	var injectorHttp = angular.injector(["ng"]).get("$http");
	
	/**
	 * Requisição via GET ao config.json, onde estará os dados de configuração,
	 * retornando uam promisse onde faremos o processamento e inicialização do módulo.
	 */
	var promisse = injectorHttp.get("config.json").then(function(response){
			angular.module("app").value("appConfig", response.data);
    });
	
	/**
	 * Inicialização da app via bootstrap, assim não usamos o ngApp na pagina html
	 */
	promisse.then(function(){
    	 angular.element(document).ready(function() {
             angular.bootstrap(document, ["app"]);
         });
	});
})();